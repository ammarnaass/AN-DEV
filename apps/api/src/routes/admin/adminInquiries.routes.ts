import { FastifyInstance } from "fastify";
import { getDb } from "../../db";
import { inquiries } from "../../db/schema";
import { eq, desc, sql, and, or } from "drizzle-orm";
import { UpdateInquirySchema, InquiryActivityEvent } from "@andev/shared";
import crypto from "crypto";
import { safeJsonParse } from "./adminUtils";

export async function adminInquiriesRoutes(app: FastifyInstance) {
  // GET /inquiries
  app.get("/inquiries", async (request, reply) => {
    const { status, type, search } = request.query as {
      status?: string;
      type?: string;
      search?: string;
    };
    const db = getDb();

    let query = db.select().from(inquiries);
    const conditions = [];

    if (status && status !== "all") {
      if (status === "pending" || status === "new") {
        conditions.push(or(eq(inquiries.status, "pending"), eq(inquiries.status, "new")));
      } else {
        conditions.push(eq(inquiries.status, status));
      }
    }

    if (type && ["project", "consultation"].includes(type)) {
      conditions.push(eq(inquiries.request_type, type));
    }

    if (search && search.trim().length > 0) {
      const term = `%${search.trim().toLowerCase()}%`;
      conditions.push(
        or(
          sql`lower(${inquiries.name}) LIKE ${term}`,
          sql`lower(${inquiries.email}) LIKE ${term}`,
          sql`lower(coalesce(${inquiries.tracking_code}, '')) LIKE ${term}`,
          sql`lower(coalesce(${inquiries.phone}, '')) LIKE ${term}`,
          sql`lower(coalesce(${inquiries.company}, '')) LIKE ${term}`
        )
      );
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions)) as any;
    }

    const rows = await query.orderBy(desc(inquiries.created_at));
    return reply.send(
      rows.map(r => ({
        ...r,
        activity_log: safeJsonParse<InquiryActivityEvent[]>(r.activity_log_json, [])
      }))
    );
  });

  // PATCH /inquiries/:id (Update Status / Internal Note)
  app.patch("/inquiries/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const parseResult = UpdateInquirySchema.safeParse(request.body);

    if (!parseResult.success) {
      return reply.status(400).send({
        error: "بيانات غير صالحة",
        details: parseResult.error.format()
      });
    }

    const db = getDb();
    const [existing] = await db.select().from(inquiries).where(eq(inquiries.id, Number(id)));
    if (!existing) {
      return reply.status(404).send({ error: "الطلب غير موجود" });
    }

    const { status, admin_note, quote_amount, estimated_timeline, confirmed_datetime, meeting_link } = parseResult.data;
    const now = new Date().toISOString();
    const existingLog = safeJsonParse<InquiryActivityEvent[]>(existing.activity_log_json, []);

    const updatedLog: InquiryActivityEvent[] = [...existingLog];
    if (status && status !== existing.status) {
      updatedLog.push({
        id: crypto.randomUUID(),
        author: "admin",
        action: "status_changed",
        title: `تحديث الحالة إلى (${status})`,
        body: admin_note || undefined,
        created_at: now
      });
    } else if (admin_note && admin_note !== existing.admin_note) {
      updatedLog.push({
        id: crypto.randomUUID(),
        author: "admin",
        action: "admin_note",
        title: "إضافة ملاحظة إدارية",
        body: admin_note,
        created_at: now
      });
    }

    await db
      .update(inquiries)
      .set({
        status,
        ...(admin_note !== undefined ? { admin_note } : {}),
        ...(quote_amount !== undefined ? { quote_amount } : {}),
        ...(estimated_timeline !== undefined ? { estimated_timeline } : {}),
        ...(confirmed_datetime !== undefined ? { confirmed_datetime } : {}),
        ...(meeting_link !== undefined ? { meeting_link } : {}),
        activity_log_json: JSON.stringify(updatedLog),
        updated_at: now
      })
      .where(eq(inquiries.id, Number(id)));

    return reply.send({ success: true, message: "تم تحديث الطلب بنجاح" });
  });

  // DELETE /inquiries/:id (Hard Deletion)
  app.delete("/inquiries/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const db = getDb();
    const [existing] = await db.select().from(inquiries).where(eq(inquiries.id, Number(id)));
    if (!existing) {
      return reply.status(404).send({ error: "الطلب غير موجود أو تم حذفه مسبقاً" });
    }

    await db.delete(inquiries).where(eq(inquiries.id, Number(id)));
    return reply.send({ success: true, message: "تم حذف الطلب نهائياً من قاعدة البيانات" });
  });
}
