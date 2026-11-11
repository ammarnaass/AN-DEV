import { FastifyInstance } from "fastify";
import { getDb } from "../../db";
import { posts } from "../../db/schema";
import { eq, desc, and, or, sql } from "drizzle-orm";
import { PostSchema } from "@andev/shared";
import { safeJsonParse } from "./adminUtils";

export async function adminPostsRoutes(app: FastifyInstance) {
  // GET /posts
  app.get("/posts", async (request, reply) => {
    const { status, category, search } = request.query as {
      status?: string;
      category?: string;
      search?: string;
    };
    const db = getDb();
    let query = db.select().from(posts);
    const conditions = [];

    if (status === "published") {
      conditions.push(eq(posts.published, true));
    } else if (status === "draft") {
      conditions.push(eq(posts.published, false));
    } else if (status === "featured") {
      conditions.push(eq(posts.featured, true));
    }

    if (category && category !== "all") {
      conditions.push(eq(posts.category, category));
    }

    if (search && search.trim().length > 0) {
      const term = `%${search.trim().toLowerCase()}%`;
      conditions.push(
        or(
          sql`lower(${posts.title_ar}) LIKE ${term}`,
          sql`lower(${posts.title_en}) LIKE ${term}`,
          sql`lower(${posts.slug}) LIKE ${term}`,
          sql`lower(${posts.tags_json}) LIKE ${term}`
        )
      );
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions)) as any;
    }

    const rows = await query.orderBy(desc(posts.featured), desc(posts.created_at));
    return reply.send(
      rows.map(r => ({
        ...r,
        tags: safeJsonParse(r.tags_json, [])
      }))
    );
  });

  // POST /posts
  app.post("/posts", async (request, reply) => {
    const parseResult = PostSchema.safeParse(request.body);
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

    const [created] = await db.insert(posts).values({
      slug: data.slug,
      title_ar: data.title_ar,
      title_en: data.title_en,
      summary_ar: data.summary_ar || "",
      summary_en: data.summary_en || "",
      body_md_ar: data.body_md_ar,
      body_md_en: data.body_md_en,
      cover_image: data.cover_image || "/uploads/blog/default.webp",
      category: data.category || "architecture",
      tags_json: JSON.stringify(data.tags || []),
      author_name: data.author_name || "عمار ناعس",
      author_role: data.author_role || "Senior Systems Architect",
      author_avatar: data.author_avatar || "/uploads/author.webp",
      reading_time_minutes: data.reading_time_minutes || 5,
      featured: data.featured || false,
      published: data.published !== undefined ? data.published : true,
      published_at: data.published_at || now,
      views_count: data.views_count || 0,
      seo_title_ar: data.seo_title_ar || null,
      seo_title_en: data.seo_title_en || null,
      seo_desc_ar: data.seo_desc_ar || null,
      seo_desc_en: data.seo_desc_en || null,
      created_at: now,
      updated_at: now
    }).returning();

    return reply.status(201).send({
      ...created,
      tags: safeJsonParse(created.tags_json, [])
    });
  });

  // PUT /posts/:id
  app.put("/posts/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const parseResult = PostSchema.safeParse(request.body);
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

    await db.update(posts)
      .set({
        slug: data.slug,
        title_ar: data.title_ar,
        title_en: data.title_en,
        summary_ar: data.summary_ar || "",
        summary_en: data.summary_en || "",
        body_md_ar: data.body_md_ar,
        body_md_en: data.body_md_en,
        cover_image: data.cover_image,
        category: data.category,
        tags_json: JSON.stringify(data.tags || []),
        author_name: data.author_name,
        author_role: data.author_role,
        author_avatar: data.author_avatar,
        reading_time_minutes: data.reading_time_minutes,
        featured: data.featured,
        published: data.published,
        published_at: data.published_at || now,
        seo_title_ar: data.seo_title_ar || null,
        seo_title_en: data.seo_title_en || null,
        seo_desc_ar: data.seo_desc_ar || null,
        seo_desc_en: data.seo_desc_en || null,
        updated_at: now
      })
      .where(eq(posts.id, Number(id)));

    return reply.send({ success: true, message: "تم تحديث المقال بنجاح" });
  });

  // DELETE /posts/:id
  app.delete("/posts/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const db = getDb();
    await db.delete(posts).where(eq(posts.id, Number(id)));
    return reply.send({ success: true, message: "تم حذف المقال بنجاح" });
  });

  // PATCH /posts/:id/publish
  app.patch("/posts/:id/publish", async (request, reply) => {
    const { id } = request.params as { id: string };
    const db = getDb();
    const [existing] = await db.select().from(posts).where(eq(posts.id, Number(id)));
    if (!existing) {
      return reply.status(404).send({ error: "المقال غير موجود" });
    }
    const nextPublished = !existing.published;
    await db.update(posts)
      .set({
        published: nextPublished,
        updated_at: new Date().toISOString()
      })
      .where(eq(posts.id, Number(id)));

    return reply.send({ success: true, published: nextPublished });
  });

  // PATCH /posts/:id/featured
  app.patch("/posts/:id/featured", async (request, reply) => {
    const { id } = request.params as { id: string };
    const db = getDb();
    const [existing] = await db.select().from(posts).where(eq(posts.id, Number(id)));
    if (!existing) {
      return reply.status(404).send({ error: "المقال غير موجود" });
    }
    const nextFeatured = !existing.featured;
    await db.update(posts)
      .set({
        featured: nextFeatured,
        updated_at: new Date().toISOString()
      })
      .where(eq(posts.id, Number(id)));

    return reply.send({ success: true, featured: nextFeatured });
  });
}
