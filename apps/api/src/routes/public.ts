import { FastifyInstance } from "fastify";
import { getDb } from "../db";
import { projects, project_images, posts, settings, page_views } from "../db/schema";
import { eq, and } from "drizzle-orm";

export async function publicRoutes(app: FastifyInstance) {
  // 1. Projects listing
  app.get("/projects", async (request, reply) => {
    const db = getDb();
    const rows = await db.select({
      id: projects.id,
      slug: projects.slug,
      title_ar: projects.title_ar,
      title_en: projects.title_en,
      summary_ar: projects.summary_ar,
      summary_en: projects.summary_en,
      tech_json: projects.tech_json,
      cover_image: projects.cover_image,
      live_url: projects.live_url,
      repo_url: projects.repo_url,
      featured: projects.featured,
      sort_order: projects.sort_order
    })
    .from(projects)
    .where(eq(projects.published, true))
    .orderBy(projects.sort_order);

    const formatted = rows.map(r => ({
      ...r,
      tech: JSON.parse(r.tech_json || "[]")
    }));

    return reply.send(formatted);
  });

  // 2. Project details
  app.get("/projects/:slug", async (request, reply) => {
    const { slug } = request.params as { slug: string };
    const db = getDb();

    const [project] = await db.select()
      .from(projects)
      .where(and(eq(projects.slug, slug), eq(projects.published, true)));

    if (!project) {
      return reply.status(404).send({ error: "المشروع غير موجود" });
    }

    const images = await db.select()
      .from(project_images)
      .where(eq(project_images.project_id, project.id))
      .orderBy(project_images.sort_order);

    return reply.send({
      ...project,
      tech: JSON.parse(project.tech_json || "[]"),
      images
    });
  });

  // 3. Blog posts
  app.get("/posts", async (request, reply) => {
    const db = getDb();
    const rows = await db.select({
      id: posts.id,
      slug: posts.slug,
      title_ar: posts.title_ar,
      title_en: posts.title_en,
      published_at: posts.published_at
    })
    .from(posts)
    .where(eq(posts.published, true));

    return reply.send(rows);
  });

  app.get("/posts/:slug", async (request, reply) => {
    const { slug } = request.params as { slug: string };
    const db = getDb();

    const [post] = await db.select()
      .from(posts)
      .where(and(eq(posts.slug, slug), eq(posts.published, true)));

    if (!post) {
      return reply.status(404).send({ error: "المقال غير موجود" });
    }

    return reply.send(post);
  });

  // 4. Public settings
  app.get("/settings/public", async (request, reply) => {
    const db = getDb();
    const rows = await db.select().from(settings);
    const result: Record<string, string> = {};
    for (const r of rows) {
      result[r.key] = r.value;
    }
    return reply.send(result);
  });

  // 5. Page views tracking
  app.post("/views", async (request, reply) => {
    const { path } = (request.body || {}) as { path?: string };
    if (!path) {
      return reply.status(400).send({ error: "Path is required" });
    }

    const today = new Date().toISOString().split("T")[0];
    const db = getDb();

    const [existing] = await db.select()
      .from(page_views)
      .where(and(eq(page_views.path, path), eq(page_views.day, today)));

    if (existing) {
      await db.update(page_views)
        .set({ count: existing.count + 1 })
        .where(eq(page_views.id, existing.id));
    } else {
      await db.insert(page_views).values({
        path,
        day: today,
        count: 1
      });
    }

    return reply.send({ success: true });
  });
}
