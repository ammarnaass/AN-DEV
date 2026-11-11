import { FastifyInstance } from "fastify";
import { getDb } from "../../db";
import { inquiries, projects, page_views, posts } from "../../db/schema";
import { eq, sql, or } from "drizzle-orm";

export async function adminStatsRoutes(app: FastifyInstance) {
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
}

