import { FastifyInstance } from "fastify";
import { getDb } from "../../db";
import { projects } from "../../db/schema";
import { eq } from "drizzle-orm";
import { ProjectSchema } from "@andev/shared";
import { safeJsonParse } from "./adminUtils";

export async function adminProjectsRoutes(app: FastifyInstance) {
  // GET /projects
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

  // POST /projects
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

  // PUT /projects/:id
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

  // DELETE /projects/:id
  app.delete("/projects/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const db = getDb();
    await db.delete(projects).where(eq(projects.id, Number(id)));
    return reply.send({ success: true });
  });
}
