import { FastifyInstance } from "fastify";
import { getDb } from "../../db";
import { settings } from "../../db/schema";
import { SettingsSchema } from "@andev/shared";

export async function adminSettingsRoutes(app: FastifyInstance) {
  // GET /settings
  app.get("/settings", async (request, reply) => {
    const db = getDb();
    const rows = await db.select().from(settings);
    const result: Record<string, string> = {};
    for (const r of rows) {
      result[r.key] = r.value;
    }
    return reply.send(result);
  });

  // PUT /settings
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
