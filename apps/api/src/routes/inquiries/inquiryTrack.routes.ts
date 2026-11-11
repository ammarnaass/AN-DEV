import { FastifyInstance } from "fastify";
import { ClientCancelSchema, ClientMessageSchema, InquiryActivityEvent } from "@andev/shared";
import { getDb } from "../../db";
import { inquiries } from "../../db/schema";
import { eq, sql } from "drizzle-orm";
import crypto from "crypto";
import { safeParseJson, maskEmail } from "./inquiryUtils";

export async function inquiryTrackRoutes(app: FastifyInstance) {
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

