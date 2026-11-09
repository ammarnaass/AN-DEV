import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { buildApp } from "../app";
import { FastifyInstance } from "fastify";
import { getDb } from "../db";
import { inquiries, admins } from "../db/schema";
import { hashPassword, createSession } from "../services/auth";
import { eq } from "drizzle-orm";

describe("Admin Management API", () => {
  let app: FastifyInstance;
  let sessionCookie: string;
  let inquiryId: number;

  beforeAll(async () => {
    app = await buildApp({ test: true });
    await app.ready();
    const db = getDb();

    let [admin] = await db.select().from(admins).where(eq(admins.email, "boss@andev.dz"));
    if (!admin) {
      [admin] = await db.insert(admins).values({
        email: "boss@andev.dz",
        password_hash: await hashPassword("pass123456"),
        created_at: new Date().toISOString()
      }).returning();
    }

    const sessionId = await createSession(admin.id);
    sessionCookie = `andev_session=${sessionId}`;

    const [inq] = await db.insert(inquiries).values({
      name: "Client Enterprise",
      email: "client@dz.com",
      project_type: "web",
      message: "Important enterprise project description",
      status: "new",
      ip_hash: "test-hash",
      created_at: new Date().toISOString()
    }).returning();
    inquiryId = inq.id;
  });

  afterAll(async () => {
    await app.close();
  });

  it("GET /api/admin/inquiries fails with 401 without valid session", async () => {
    const res = await app.inject({ method: "GET", url: "/api/admin/inquiries" });
    expect(res.statusCode).toBe(401);
  });

  it("PATCH /api/admin/inquiries/:id updates status and admin note", async () => {
    const res = await app.inject({
      method: "PATCH",
      url: `/api/admin/inquiries/${inquiryId}`,
      headers: { cookie: sessionCookie },
      payload: { status: "in_progress", admin_note: "تم الاتصال بالعميل هاتفياً وجارِ إعداد العرض الفني" }
    });
    expect(res.statusCode).toBe(200);

    const db = getDb();
    const [updated] = await db.select().from(inquiries).where(eq(inquiries.id, inquiryId));
    expect(updated?.status).toBe("in_progress");
    expect(updated?.admin_note).toContain("تم الاتصال");
  });

  it("GET /api/admin/stats returns aggregate statistics", async () => {
    const res = await app.inject({
      method: "GET",
      url: "/api/admin/stats",
      headers: { cookie: sessionCookie }
    });
    expect(res.statusCode).toBe(200);
    const body = JSON.parse(res.body);
    expect(body.total_inquiries).toBeGreaterThanOrEqual(1);
  });
});
