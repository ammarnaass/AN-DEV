import { FastifyInstance } from "fastify";
import { InquirySchema, InquiryActivityEvent } from "@andev/shared";
import { getDb } from "../../db";
import { inquiries } from "../../db/schema";
import crypto from "crypto";
import { sendInquiryNotification } from "../../services/email";
import { checkRateLimit, hashIp, maskEmail } from "./inquiryUtils";

export async function inquirySubmitRoutes(app: FastifyInstance) {
  // 1. Submit New Inquiry (Project or Consultation)
  app.post("/inquiries", async (request, reply) => {
    const rawIp = request.ip || "127.0.0.1";
    if (!checkRateLimit(rawIp)) {
      return reply.status(429).send({
        error: "تجاوزت الحد المسموح به من الطلبات، يرجى المحاولة لاحقاً"
      });
    }

    const ipHash = hashIp(rawIp);
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
    const trackingCode = `AND-${new Date().getFullYear()}-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;

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
}
