import { FastifyInstance } from "fastify";
import { LoginSchema } from "@andev/shared";
import { getDb } from "../db";
import { admins } from "../db/schema";
import { eq } from "drizzle-orm";
import { verifyPassword, createSession, destroySession } from "../services/auth";
import { requireAdmin } from "../plugins/auth";

export async function authRoutes(app: FastifyInstance) {
  app.post("/login", async (request, reply) => {
    const parseResult = LoginSchema.safeParse(request.body);
    if (!parseResult.success) {
      return reply.status(400).send({
        error: "Validation failed",
        details: parseResult.error.format()
      });
    }

    const { email, password } = parseResult.data;
    const db = getDb();
    const [admin] = await db.select().from(admins).where(eq(admins.email, email));

    if (!admin) {
      return reply.status(401).send({ error: "البريد الإلكتروني أو كلمة المرور غير صحيحة" });
    }

    const isValid = await verifyPassword(admin.password_hash, password);
    if (!isValid) {
      return reply.status(401).send({ error: "البريد الإلكتروني أو كلمة المرور غير صحيحة" });
    }

    const sessionId = await createSession(admin.id);

    reply.setCookie("andev_session", sessionId, {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 // 7 days in seconds
    });

    return reply.send({
      success: true,
      admin: {
        id: admin.id,
        email: admin.email
      }
    });
  });

  app.post("/logout", async (request, reply) => {
    const sessionId = request.cookies.andev_session;
    if (sessionId) {
      await destroySession(sessionId);
    }

    reply.clearCookie("andev_session", { path: "/" });
    return reply.send({ success: true });
  });

  app.get("/me", { preHandler: [requireAdmin] }, async (request, reply) => {
    return reply.send({
      admin: request.admin
    });
  });
}

