import { FastifyInstance } from "fastify";
import { getDb } from "../../db";
import { inquiries } from "../../db/schema";
import { eq } from "drizzle-orm";
import {
  ApproveProjectSchema,
  ScheduleConsultationSchema,
  RejectInquirySchema,
  InquiryActivityEvent,
} from "@andev/shared";
import crypto from "crypto";
import { safeJsonParse } from "./adminUtils";

export async function adminInquiriesActionsRoutes(app: FastifyInstance) {
  // POST /inquiries/:id/approve (Provide Quote & Timeline)
  app.post("/inquiries/:id/approve", async (request, reply) => {
    const { id } = request.params as { id: string };
    const parseResult = ApproveProjectSchema.safeParse(request.body);

    if (!parseResult.success) {
      return reply.status(400).send({
        error: "بيانات الاعتماد غير صالحة",
        details: parseResult.error.format()
      });
    }

    const db = getDb();
    const [existing] = await db.select().from(inquiries).where(eq(inquiries.id, Number(id)));
    if (!existing) {
      return reply.status(404).send({ error: "الطلب غير موجود" });
    }

    const now = new Date().toISOString();
    const existingLog = safeJsonParse<InquiryActivityEvent[]>(existing.activity_log_json, []);
    const { quote_amount, estimated_timeline, admin_note } = parseResult.data;

    const updatedLog: InquiryActivityEvent[] = [
      ...existingLog,
      {
        id: crypto.randomUUID(),
        author: "admin",
        action: "quote_provided",
        title: "تمت الموافقة على المشروع وتقديم عرض السعر",
        body: `عرض السعر: ${quote_amount} | المدة التقديرية: ${estimated_timeline}${admin_note ? `\nملاحظة: ${admin_note}` : ""}`,
        created_at: now
      }
    ];

    await db
      .update(inquiries)
      .set({
        status: "approved",
        quote_amount,
        estimated_timeline,
        admin_note: admin_note || existing.admin_note,
        activity_log_json: JSON.stringify(updatedLog),
        updated_at: now
      })
      .where(eq(inquiries.id, Number(id)));

    return reply.send({ success: true, message: "تمت الموافقة على المشروع وإرسال العرض للعميل" });
  });

  // POST /inquiries/:id/schedule (Confirm Meeting Date & Link)
  app.post("/inquiries/:id/schedule", async (request, reply) => {
    const { id } = request.params as { id: string };
    const parseResult = ScheduleConsultationSchema.safeParse(request.body);

    if (!parseResult.success) {
      return reply.status(400).send({
        error: "بيانات جدولة الاستشارة غير مكتملة",
        details: parseResult.error.format()
      });
    }

    const db = getDb();
    const [existing] = await db.select().from(inquiries).where(eq(inquiries.id, Number(id)));
    if (!existing) {
      return reply.status(404).send({ error: "طلب الاستشارة غير موجود" });
    }

    const now = new Date().toISOString();
    const existingLog = safeJsonParse<InquiryActivityEvent[]>(existing.activity_log_json, []);
    const { confirmed_datetime, meeting_mode, meeting_link, admin_note } = parseResult.data;

    const updatedLog: InquiryActivityEvent[] = [
      ...existingLog,
      {
        id: crypto.randomUUID(),
        author: "admin",
        action: "consultation_scheduled",
        title: "تم تأكيد موعد الاستشارة التقنية",
        body: `الموعد: ${confirmed_datetime} | وسيلة الاجتماع: ${meeting_mode}${meeting_link ? `\nالرابط: ${meeting_link}` : ""}${admin_note ? `\nملاحظة: ${admin_note}` : ""}`,
        created_at: now
      }
    ];

    await db
      .update(inquiries)
      .set({
        status: "approved",
        confirmed_datetime,
        meeting_mode,
        meeting_link: meeting_link || null,
        admin_note: admin_note || existing.admin_note,
        activity_log_json: JSON.stringify(updatedLog),
        updated_at: now
      })
      .where(eq(inquiries.id, Number(id)));

    return reply.send({ success: true, message: "تم تأكيد موعد الاستشارة وتحديث رابط الاجتماع" });
  });

  // POST /inquiries/:id/reject (Decline Inquiry with Reason)
  app.post("/inquiries/:id/reject", async (request, reply) => {
    const { id } = request.params as { id: string };
    const parseResult = RejectInquirySchema.safeParse(request.body);

    if (!parseResult.success) {
      return reply.status(400).send({
        error: "يرجى كتابة سبب الاعتذار",
        details: parseResult.error.format()
      });
    }

    const db = getDb();
    const [existing] = await db.select().from(inquiries).where(eq(inquiries.id, Number(id)));
    if (!existing) {
      return reply.status(404).send({ error: "الطلب غير موجود" });
    }

    const now = new Date().toISOString();
    const existingLog = safeJsonParse<InquiryActivityEvent[]>(existing.activity_log_json, []);
    const { reason } = parseResult.data;

    const updatedLog: InquiryActivityEvent[] = [
      ...existingLog,
      {
        id: crypto.randomUUID(),
        author: "admin",
        action: "rejected",
        title: "تم الاعتذار عن قبول الطلب",
        body: reason,
        created_at: now
      }
    ];

    await db
      .update(inquiries)
      .set({
        status: "rejected",
        cancellation_reason: reason,
        activity_log_json: JSON.stringify(updatedLog),
        updated_at: now
      })
      .where(eq(inquiries.id, Number(id)));

    return reply.send({ success: true, message: "تم تسجيل الاعتذار وتحديث حالة الطلب" });
  });
}
