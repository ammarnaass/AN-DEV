import { FastifyInstance } from "fastify";
import { eq, desc, asc, sql } from "drizzle-orm";
import { getDb } from "../db";
import { bio_links, settings } from "../db/schema";
import { requireAdmin } from "../plugins/auth";
import { BioLinkInputSchema, ReorderBioLinksSchema, SettingsSchema } from "@andev/shared";

export async function bioLinksRoutes(app: FastifyInstance) {
  // -------------------------------------------------------------
  // Public Routes (No authentication required)
  // -------------------------------------------------------------

  // 1. Get public bio links and settings
  app.get("/bio-links/public", async (request, reply) => {
    const db = getDb();

    // Fetch settings
    const settingsRows = await db.select().from(settings);
    const settingsMap: Record<string, string> = {};
    for (const row of settingsRows) {
      settingsMap[row.key] = row.value;
    }
    settingsMap.bio_page_bg_type = settingsMap.bio_page_bg_type || "mesh";
    settingsMap.bio_page_bg_value = settingsMap.bio_page_bg_value || "#090d16";

    // Fetch active links ordered by sort_order
    const links = await db
      .select()
      .from(bio_links)
      .where(eq(bio_links.is_active, true))
      .orderBy(asc(bio_links.sort_order), asc(bio_links.id));

    return reply.send({
      settings: settingsMap,
      links,
    });
  });

  // 2. Track link click atomically
  app.post("/bio-links/:id/click", async (request, reply) => {
    const { id } = request.params as { id: string };
    const linkId = parseInt(id, 10);
    if (isNaN(linkId)) {
      return reply.status(400).send({ error: "Invalid link ID" });
    }

    const db = getDb();
    await db
      .update(bio_links)
      .set({
        click_count: sql`${bio_links.click_count} + 1`,
        updated_at: new Date().toISOString(),
      })
      .where(eq(bio_links.id, linkId));

    return reply.send({ success: true });
  });

  // -------------------------------------------------------------
  // Admin Routes (Protected by requireAdmin)
  // -------------------------------------------------------------

  // 3. Get all bio links with admin analytics
  app.get("/admin/bio-links", { preHandler: [requireAdmin] }, async (request, reply) => {
    const db = getDb();

    const links = await db
      .select()
      .from(bio_links)
      .orderBy(asc(bio_links.sort_order), asc(bio_links.id));

    const settingsRows = await db.select().from(settings);
    const settingsMap: Record<string, string> = {};
    for (const row of settingsRows) {
      settingsMap[row.key] = row.value;
    }
    settingsMap.bio_page_bg_type = settingsMap.bio_page_bg_type || "mesh";
    settingsMap.bio_page_bg_value = settingsMap.bio_page_bg_value || "#090d16";

    const totalClicks = links.reduce((sum, link) => sum + (link.click_count || 0), 0);
    const activeLinks = links.filter((l) => l.is_active).length;

    return reply.send({
      links,
      settings: settingsMap,
      stats: {
        totalLinks: links.length,
        activeLinks,
        totalClicks,
      },
    });
  });

  // 4. Create new bio link
  app.post("/admin/bio-links", { preHandler: [requireAdmin] }, async (request, reply) => {
    const parseResult = BioLinkInputSchema.safeParse(request.body);
    if (!parseResult.success) {
      return reply.status(400).send({
        error: "بيانات الرابط غير صحيحة",
        details: parseResult.error.format(),
      });
    }

    const db = getDb();
    const now = new Date().toISOString();

    const [created] = await db
      .insert(bio_links)
      .values({
        ...parseResult.data,
        created_at: now,
        updated_at: now,
      })
      .returning();

    return reply.status(201).send(created);
  });

  // 5. Update existing bio link
  app.put("/admin/bio-links/:id", { preHandler: [requireAdmin] }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const linkId = parseInt(id, 10);
    if (isNaN(linkId)) {
      return reply.status(400).send({ error: "Invalid link ID" });
    }

    const parseResult = BioLinkInputSchema.safeParse(request.body);
    if (!parseResult.success) {
      return reply.status(400).send({
        error: "بيانات الرابط غير صحيحة",
        details: parseResult.error.format(),
      });
    }

    const db = getDb();
    const now = new Date().toISOString();

    const [updated] = await db
      .update(bio_links)
      .set({
        ...parseResult.data,
        updated_at: now,
      })
      .where(eq(bio_links.id, linkId))
      .returning();

    if (!updated) {
      return reply.status(404).send({ error: "الرابط غير موجود" });
    }

    return reply.send(updated);
  });

  // 6. Delete bio link
  app.delete("/admin/bio-links/:id", { preHandler: [requireAdmin] }, async (request, reply) => {
    const { id } = request.params as { id: string };
    const linkId = parseInt(id, 10);
    if (isNaN(linkId)) {
      return reply.status(400).send({ error: "Invalid link ID" });
    }

    const db = getDb();
    await db.delete(bio_links).where(eq(bio_links.id, linkId));

    return reply.send({ success: true });
  });

  // 7. Bulk reorder bio links
  app.put("/admin/bio-links/reorder", { preHandler: [requireAdmin] }, async (request, reply) => {
    const parseResult = ReorderBioLinksSchema.safeParse(request.body);
    if (!parseResult.success) {
      return reply.status(400).send({
        error: "بيانات الترتيب غير صحيحة",
        details: parseResult.error.format(),
      });
    }

    const db = getDb();
    const now = new Date().toISOString();

    for (const item of parseResult.data) {
      await db
        .update(bio_links)
        .set({
          sort_order: item.sort_order,
          updated_at: now,
        })
        .where(eq(bio_links.id, item.id));
    }

    return reply.send({ success: true });
  });

  // 8. Update bio page settings
  app.put("/admin/bio-links/settings", { preHandler: [requireAdmin] }, async (request, reply) => {
    const rawBody = (request.body as Record<string, any>) || {};
    const db = getDb();

    for (const [key, val] of Object.entries(rawBody)) {
      if (typeof key === "string" && key.trim().length > 0) {
        const value = typeof val === "string" ? val : val == null ? "" : String(val);
        await db
          .insert(settings)
          .values({ key, value })
          .onConflictDoUpdate({ target: settings.key, set: { value } });
      }
    }

    return reply.send({ success: true });
  });
}

