import { FastifyInstance } from "fastify";
import { requireAdmin } from "../plugins/auth";
import { getDb } from "../db";
import { inquiries, projects, project_images, posts, settings, page_views } from "../db/schema";
import { eq, desc, and, sql } from "drizzle-orm";
import { ProjectSchema, UpdateInquirySchema, SettingsSchema } from "@andev/shared";
import { processAndSaveImage } from "../services/upload";

export async function adminRoutes(app: FastifyInstance) {
  // Enforce session check on all admin routes
  app.addHook("preHandler", requireAdmin);

  // 1. Stats
  app.get("/stats", async (request, reply) => {
    const db = getDb();

    const [inquiriesCount] = db.select({ count: sql<number>`count(*)` }).from(inquiries).all();
    const [newInquiriesCount] = db.select({ count: sql<number>`count(*)` })
      .from(inquiries)
      .where(eq(inquiries.status, "new"))
      .all();

    const [projectsCount] = db.select({ count: sql<number>`count(*)` })
      .from(projects)
      .where(eq(projects.published, true))
      .all();

    const [postsCount] = db.select({ count: sql<number>`count(*)` }).from(posts).all();

    const [viewsCount] = db.select({ sum: sql<number>`sum(count)` }).from(page_views).all();

    return reply.send({
      total_inquiries: inquiriesCount?.count || 0,
      new_inquiries: newInquiriesCount?.count || 0,
      published_projects: projectsCount?.count || 0,
      total_posts: postsCount?.count || 0,
      views_last_30_days: viewsCount?.sum || 0
    });
  });

  // 2. Inquiries
  app.get("/inquiries", async (request, reply) => {
    const { status } = request.query as { status?: string };
    const db = getDb();

    let query = db.select().from(inquiries);
    if (status && ["new", "in_progress", "closed"].includes(status)) {
      query = query.where(eq(inquiries.status, status)) as any;
    }

    const rows = query.orderBy(desc(inquiries.created_at)).all();
    return reply.send(rows);
  });

  app.patch("/inquiries/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const parseResult = UpdateInquirySchema.safeParse(request.body);

    if (!parseResult.success) {
      return reply.status(400).send({
        error: "Validation failed",
        details: parseResult.error.format()
      });
    }

    const db = getDb();
    const existing = db.select().from(inquiries).where(eq(inquiries.id, Number(id))).get();
    if (!existing) {
      return reply.status(404).send({ error: "Inquiry not found" });
    }

    const { status, admin_note } = parseResult.data;

    db.update(inquiries)
      .set({
        status,
        ...(admin_note !== undefined ? { admin_note } : {})
      })
      .where(eq(inquiries.id, Number(id)))
      .run();

    return reply.send({ success: true, message: "Inquiry updated successfully" });
  });

  // 3. Projects CRUD
  app.get("/projects", async (request, reply) => {
    const db = getDb();
    const rows = db.select().from(projects).orderBy(projects.sort_order).all();
    return reply.send(rows.map(r => ({
      ...r,
      tech: JSON.parse(r.tech_json || "[]")
    })));
  });

  app.post("/projects", async (request, reply) => {
    const parseResult = ProjectSchema.safeParse(request.body);
    if (!parseResult.success) {
      return reply.status(400).send({
        error: "Validation failed",
        details: parseResult.error.format()
      });
    }

    const data = parseResult.data;
    const db = getDb();
    const now = new Date().toISOString();

    const [created] = db.insert(projects).values({
      slug: data.slug,
      title_ar: data.title_ar,
      title_en: data.title_en,
      summary_ar: data.summary_ar,
      summary_en: data.summary_en,
      body_ar: data.body_ar,
      body_en: data.body_en,
      tech_json: JSON.stringify(data.tech_json),
      cover_image: data.cover_image,
      live_url: data.live_url || null,
      repo_url: data.repo_url || null,
      featured: data.featured,
      published: data.published,
      sort_order: data.sort_order,
      created_at: now,
      updated_at: now
    }).returning().all();

    return reply.status(201).send(created);
  });

  app.put("/projects/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const parseResult = ProjectSchema.safeParse(request.body);

    if (!parseResult.success) {
      return reply.status(400).send({
        error: "Validation failed",
        details: parseResult.error.format()
      });
    }

    const data = parseResult.data;
    const db = getDb();
    const now = new Date().toISOString();

    db.update(projects)
      .set({
        slug: data.slug,
        title_ar: data.title_ar,
        title_en: data.title_en,
        summary_ar: data.summary_ar,
        summary_en: data.summary_en,
        body_ar: data.body_ar,
        body_en: data.body_en,
        tech_json: JSON.stringify(data.tech_json),
        cover_image: data.cover_image,
        live_url: data.live_url || null,
        repo_url: data.repo_url || null,
        featured: data.featured,
        published: data.published,
        sort_order: data.sort_order,
        updated_at: now
      })
      .where(eq(projects.id, Number(id)))
      .run();

    return reply.send({ success: true, message: "Project updated" });
  });

  app.delete("/projects/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const db = getDb();
    db.delete(projects).where(eq(projects.id, Number(id))).run();
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
    const rows = db.select().from(settings).all();
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
      db.insert(settings)
        .values({ key, value })
        .onConflictDoUpdate({ target: settings.key, set: { value } })
        .run();
    }

    return reply.send({ success: true });
  });
}

