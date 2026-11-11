import { FastifyInstance } from "fastify";
import {
  InquirySchema,
  ClientCancelSchema,
  ClientMessageSchema,
  InquiryActivityEvent
} from "@andev/shared";
import { getDb } from "../db";
import { inquiries } from "../db/schema";
import { eq, sql } from "drizzle-orm";
import crypto from "crypto";
import { sendInquiryNotification } from "../services/email";

// Simple in-memory rate limiter per IP hash: timestamp array
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 mins
const MAX_REQUESTS = 5;

function safeParseJson<T>(raw: string | null | undefined, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function maskEmail(email: string): string {
  if (!email || !email.includes("@")) return email;
  const [user, domain] = email.split("@");
  if (user.length <= 2) return `${user[0]}***@${domain}`;
  return `${user[0]}***${user[user.length - 1]}@${domain}`;
}

export async function inquiryRoutes(app: FastifyInstance) {
  // 1. Submit New Inquiry (Project or Consultation)
  app.post("/inquiries", async (request, reply) => {
    // 1. Hash IP address
    const rawIp = request.ip || "127.0.0.1";
    const ipHash = crypto
      .createHash("sha256")
      .update(rawIp + (process.env.IP_SALT || "andev-salt"))
      .digest("hex");

    // 2. Check rate limit
    const now = Date.now();
    const timestamps = (rateLimitMap.get(ipHash) || []).filter(t => now - t < RATE_LIMIT_WINDOW_MS);
    if (timestamps.length >= MAX_REQUESTS) {
      return reply.status(429).send({
        error: "تجاوزت الحد المسموح به من الطلبات، يرجى المحاولة لاحقاً"
      });
    }

    // 3. Validate payload with Zod
    const parseResult = InquirySchema.safeParse(request.body);
    if (!parseResult.success) {
      const isHoneypot = parseResult.error.issues.some(i => i.path.includes("honeypot"));
      return reply.status(400).send({
        error: isHoneypot ? "تم حظر الطلب لاشتباه نشاط آلي (Bot detected)" : "بيانات غير صالحة",
        details: parseResult.error.format()
      });
    }

    const data = parseResult.data;
    const db = getDb();
    const createdAt = new Date().toISOString();

    // Generate unique human-readable tracking code (e.g., AND-2026-A1B2C3)
    const trackingCode = `AND-${new Date().getFullYear()}-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;

    // Initial activity log event
    const initialActivity: InquiryActivityEvent[] = [
      {
        id: crypto.randomUUID(),
        author: "client",
        action: "submitted",
        title: data.request_type === "consultation" ? "تقديم طلب استشارة معمارية" : "تقديم طلب مشروع برمجيات",
        body: `تم إرسال الطلب بواسطة ${data.name} (${maskEmail(data.email)})`,
        created_at: createdAt
      }
    ];

    const [created] = await db
      .insert(inquiries)
      .values({
        tracking_code: trackingCode,
        request_type: data.request_type,
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        company: data.company || null,
        project_type: data.project_type,
        budget_range: data.budget_range || null,
        consultation_domain: data.consultation_domain || "general",
        preferred_date: data.preferred_date || null,
        preferred_time_slot: data.preferred_time_slot || "morning",
        meeting_mode: data.meeting_mode || "google_meet",
        message: data.message,
        status: "pending",
        activity_log_json: JSON.stringify(initialActivity),
        ip_hash: ipHash,
        created_at: createdAt,
        updated_at: createdAt
      })
      .returning();

    // Update rate limit record
    timestamps.push(now);
    rateLimitMap.set(ipHash, timestamps);

    // Trigger email notification
    sendInquiryNotification({
      name: data.name,
      email: data.email,
      phone: data.phone,
      request_type: data.request_type,
      project_type: data.project_type,
      budget_range: data.budget_range,
      tracking_code: trackingCode,
      message: data.message
    }).catch(() => {});

    return reply.status(201).send({
      success: true,
      id: created.id,
      tracking_code: trackingCode,
      status: "pending",
      message:
        data.request_type === "consultation"
          ? "تم استلام طلب الاستشارة بنجاح، سنراجع الموعد ونتواصل معك لتأكيد الجلسة"
          : "تم استلام طلب المشروع بنجاح، سنقوم بدراسته والرد عليك خلال يومي عمل"
    });
  });

  // 2. Track Inquiry Status by Tracking Code (Public)
  app.get("/inquiries/track/:trackingCode", async (request, reply) => {
    const { trackingCode } = request.params as { trackingCode: string };
    if (!trackingCode || trackingCode.trim().length < 5) {
      return reply.status(400).send({ error: "كود التتبع غير صالح" });
    }

    const db = getDb();
    const cleanCode = trackingCode.trim().toUpperCase();

    const [row] = await db
      .select()
      .from(inquiries)
      .where(sql`upper(${inquiries.tracking_code}) = ${cleanCode}`);

    if (!row) {
      return reply.status(404).send({
        error: "لم يتم العثور على أي طلب مرتبط بكود التتبع المدخل، يرجى التحقق من الكود والمحاولة مجدداً"
      });
    }

    const activityLog = safeParseJson<InquiryActivityEvent[]>(row.activity_log_json, []);

    return reply.send({
      tracking_code: row.tracking_code,
      request_type: row.request_type || "project",
      name: row.name,
      masked_email: maskEmail(row.email),
      phone: row.phone,
      company: row.company,
      project_type: row.project_type,
      budget_range: row.budget_range,
      consultation_domain: row.consultation_domain,
      preferred_date: row.preferred_date,
      preferred_time_slot: row.preferred_time_slot,
      meeting_mode: row.meeting_mode,
      meeting_link: row.meeting_link,
      confirmed_datetime: row.confirmed_datetime,
      quote_amount: row.quote_amount,
      estimated_timeline: row.estimated_timeline,
      cancellation_reason: row.cancellation_reason,
      status: row.status,
      message: row.message,
      activity_log: activityLog,
      created_at: row.created_at,
      updated_at: row.updated_at
    });
  });

  // 3. Client Cancels Inquiry
  app.post("/inquiries/track/:trackingCode/cancel", async (request, reply) => {
    const { trackingCode } = request.params as { trackingCode: string };
    const parseResult = ClientCancelSchema.safeParse(request.body);
    if (!parseResult.success) {
      return reply.status(400).send({
        error: "يرجى توضيح سبب الإلغاء",
        details: parseResult.error.format()
      });
    }

    const db = getDb();
    const cleanCode = trackingCode.trim().toUpperCase();

    const [row] = await db
      .select()
      .from(inquiries)
      .where(sql`upper(${inquiries.tracking_code}) = ${cleanCode}`);

    if (!row) {
      return reply.status(404).send({ error: "طلب غير موجود" });
    }

    if (row.status === "completed" || row.status === "cancelled") {
      return reply.status(400).send({
        error: `لا يمكن إلغاء الطلب لأنه في حالة (${row.status}) مسبقاً`
      });
    }

    const now = new Date().toISOString();
    const existingLog = safeParseJson<InquiryActivityEvent[]>(row.activity_log_json, []);
    const updatedLog: InquiryActivityEvent[] = [
      ...existingLog,
      {
        id: crypto.randomUUID(),
        author: "client",
        action: "cancelled",
        title: "إلغاء الطلب من قِبل العميل",
        body: parseResult.data.reason,
        created_at: now
      }
    ];

    await db
      .update(inquiries)
      .set({
        status: "cancelled",
        cancellation_reason: parseResult.data.reason,
        activity_log_json: JSON.stringify(updatedLog),
        updated_at: now
      })
      .where(eq(inquiries.id, row.id));

    return reply.send({
      success: true,
      message: "تم إلغاء الطلب بنجاح، نشكرك على إعلامنا"
    });
  });

  // 4. Client Sends Follow-up Message / Note
  app.post("/inquiries/track/:trackingCode/message", async (request, reply) => {
    const { trackingCode } = request.params as { trackingCode: string };
    const parseResult = ClientMessageSchema.safeParse(request.body);
    if (!parseResult.success) {
      return reply.status(400).send({
        error: "نص الرسالة غير صالح",
        details: parseResult.error.format()
      });
    }

    const db = getDb();
    const cleanCode = trackingCode.trim().toUpperCase();

    const [row] = await db
      .select()
      .from(inquiries)
      .where(sql`upper(${inquiries.tracking_code}) = ${cleanCode}`);

    if (!row) {
      return reply.status(404).send({ error: "طلب غير موجود" });
    }

    const now = new Date().toISOString();
    const existingLog = safeParseJson<InquiryActivityEvent[]>(row.activity_log_json, []);
    const updatedLog: InquiryActivityEvent[] = [
      ...existingLog,
      {
        id: crypto.randomUUID(),
        author: "client",
        action: "client_note",
        title: "رسالة / استفسار إضافي من العميل",
        body: parseResult.data.message,
        created_at: now
      }
    ];

    await db
      .update(inquiries)
      .set({
        activity_log_json: JSON.stringify(updatedLog),
        updated_at: now
      })
      .where(eq(inquiries.id, row.id));

    return reply.send({
      success: true,
      message: "تم إرسال رسالتك إلى الفريق الهندسي بنجاح"
    });
  });
}
