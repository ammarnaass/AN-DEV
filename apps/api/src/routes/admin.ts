import { FastifyInstance } from "fastify";
import { requireAdmin } from "../plugins/auth";
import { getDb } from "../db";
import { inquiries, projects, settings, page_views, posts } from "../db/schema";
import { eq, desc, sql, and, or, like } from "drizzle-orm";
import {
  ProjectSchema,
  UpdateInquirySchema,
  ApproveProjectSchema,
  ScheduleConsultationSchema,
  RejectInquirySchema,
  SettingsSchema,
  InquiryActivityEvent
} from "@andev/shared";
import { processAndSaveImage } from "../services/upload";
import crypto from "crypto";

function safeJsonParse<T>(value: string | null | undefined, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

export async function adminRoutes(app: FastifyInstance) {
  // Enforce session check on all admin routes
  app.addHook("preHandler", requireAdmin);

  // 1. Stats
  app.get("/stats", async (request, reply) => {
    const db = getDb();

    const [inquiriesCount] = await db.select({ count: sql<number>`count(*)` }).from(inquiries);
    const [newInquiriesCount] = await db.select({ count: sql<number>`count(*)` })
      .from(inquiries)
      .where(or(eq(inquiries.status, "new"), eq(inquiries.status, "pending")));

    const [projectsCount] = await db.select({ count: sql<number>`count(*)` })
      .from(projects)
      .where(eq(projects.published, true));

    const [postsCount] = await db.select({ count: sql<number>`count(*)` }).from(posts);
    const [viewsCount] = await db.select({ sum: sql<number>`sum(count)` }).from(page_views);

    return reply.send({
      total_inquiries: Number(inquiriesCount?.count || 0),
      new_inquiries: Number(newInquiriesCount?.count || 0),
      published_projects: Number(projectsCount?.count || 0),
      total_posts: Number(postsCount?.count || 0),
      views_last_30_days: Number(viewsCount?.sum || 0)
    });
  });

  // 2. Inquiries Management
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

  // Update Status / Internal Note
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

  // Approve Project (Provide Quote & Timeline)
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

  // Schedule Consultation (Confirm Meeting Date & Link)
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

  // Reject / Decline Inquiry with Reason
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

  // REAL HARD DELETION
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

  // 3. Projects CRUD
  app.get("/projects", async (request, reply) => {
    const db = getDb();
    const rows = await db.select().from(projects).orderBy(projects.sort_order);
    return reply.send(rows.map(r => ({
      ...r,
      tech: safeJsonParse(r.tech_json, []),
      tech_json: safeJsonParse(r.tech_json, []),
      platforms: safeJsonParse(r.platforms_json, ["web"]),
      platforms_json: safeJsonParse(r.platforms_json, ["web"]),
      gallery: safeJsonParse(r.gallery_json, []),
      gallery_json: safeJsonParse(r.gallery_json, []),
      type_specs: safeJsonParse(r.type_specs_json, {}),
      type_specs_json: safeJsonParse(r.type_specs_json, {})
    })));
  });

  app.post("/projects", async (request, reply) => {
    const parseResult = ProjectSchema.safeParse(request.body);
    if (!parseResult.success) {
      const firstIssue = parseResult.error.issues[0]?.message;
      return reply.status(400).send({
        error: firstIssue || "Validation failed",
        details: parseResult.error.format()
      });
    }

    const data = parseResult.data;
    const db = getDb();
    const now = new Date().toISOString();

    const [created] = await db.insert(projects).values({
      slug: data.slug,
      title_ar: data.title_ar,
      title_en: data.title_en,
      summary_ar: data.summary_ar,
      summary_en: data.summary_en,
      body_ar: data.body_ar,
      body_en: data.body_en,
      project_type: data.project_type,
      version: data.version,
      package_size: data.package_size,
      platforms_json: JSON.stringify(data.platforms_json),
      download_url: data.download_url || null,
      enable_live_preview: data.enable_live_preview,
      gallery_json: JSON.stringify(data.gallery_json),
      type_specs_json: typeof data.type_specs_json === "string" ? data.type_specs_json : JSON.stringify(data.type_specs_json || {}),
      tech_json: JSON.stringify(data.tech_json),
      cover_image: data.cover_image,
      live_url: data.live_url || null,
      repo_url: data.repo_url || null,
      featured: data.featured,
      published: data.published,
      sort_order: data.sort_order,
      created_at: now,
      updated_at: now
    }).returning();

    return reply.status(201).send(created);
  });

  app.put("/projects/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const parseResult = ProjectSchema.safeParse(request.body);

    if (!parseResult.success) {
      const firstIssue = parseResult.error.issues[0]?.message;
      return reply.status(400).send({
        error: firstIssue || "Validation failed",
        details: parseResult.error.format()
      });
    }

    const data = parseResult.data;
    const db = getDb();
    const now = new Date().toISOString();

    await db.update(projects)
      .set({
        slug: data.slug,
        title_ar: data.title_ar,
        title_en: data.title_en,
        summary_ar: data.summary_ar,
        summary_en: data.summary_en,
        body_ar: data.body_ar,
        body_en: data.body_en,
        project_type: data.project_type,
        version: data.version,
        package_size: data.package_size,
        platforms_json: JSON.stringify(data.platforms_json),
        download_url: data.download_url || null,
        enable_live_preview: data.enable_live_preview,
        gallery_json: JSON.stringify(data.gallery_json),
        type_specs_json: typeof data.type_specs_json === "string" ? data.type_specs_json : JSON.stringify(data.type_specs_json || {}),
        tech_json: JSON.stringify(data.tech_json),
        cover_image: data.cover_image,
        live_url: data.live_url || null,
        repo_url: data.repo_url || null,
        featured: data.featured,
        published: data.published,
        sort_order: data.sort_order,
        updated_at: now
      })
      .where(eq(projects.id, Number(id)));

    return reply.send({ success: true, message: "Project updated" });
  });

  app.delete("/projects/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const db = getDb();
    await db.delete(projects).where(eq(projects.id, Number(id)));
    return reply.send({ success: true });
  });

  // 4. File uploads
  app.post("/uploads", async (request, reply) => {
    const data = await request.file();
    if (!data) {
      return reply.status(400).send({ error: "No file uploaded" });
    }

    const buffer = await data.toBuffer();
    const result = await processAndSaveImage(buffer, "projects");
    return reply.send(result);
  });

  // 5. Settings
  app.get("/settings", async (request, reply) => {
    const db = getDb();
    const rows = await db.select().from(settings);
    const result: Record<string, string> = {};
    for (const r of rows) {
      result[r.key] = r.value;
    }
    return reply.send(result);
  });

  app.put("/settings", async (request, reply) => {
    const parseResult = SettingsSchema.safeParse(request.body);
    if (!parseResult.success) {
      return reply.status(400).send({ error: "Invalid settings payload" });
    }

    const db = getDb();
    for (const [key, value] of Object.entries(parseResult.data)) {
      await db.insert(settings)
        .values({ key, value })
        .onConflictDoUpdate({ target: settings.key, set: { value } });
    }

    return reply.send({ success: true });
  });
}
