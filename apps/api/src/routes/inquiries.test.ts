import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { buildApp } from "../app";
import { FastifyInstance } from "fastify";
import { getDb } from "../db";
import { inquiries } from "../db/schema";

describe("Inquiries API", () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = await buildApp({ test: true });
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("POST /api/inquiries saves inquiry to database and returns 201", async () => {
    const payload = {
      name: "Karim Benali",
      email: "karim@business.dz",
      project_type: "mobile",
      budget_range: "100k-300k DZD",
      message: "نريد تطبيق لتوصيل الطلبات مع إشعارات مباشرة وسريعة",
      honeypot: ""
    };

    const res = await app.inject({
      method: "POST",
      url: "/api/inquiries",
      payload
    });

    expect(res.statusCode).toBe(201);
    const body = JSON.parse(res.body);
    expect(body.success).toBe(true);

    const db = getDb();
    const saved = db.select().from(inquiries).all();
    expect(saved.some(i => i.email === "karim@business.dz")).toBe(true);
  });

  it("POST /api/inquiries rejects spam when honeypot is populated", async () => {
    const res = await app.inject({
      method: "POST",
      url: "/api/inquiries",
      payload: {
        name: "Spam Bot",
        email: "bot@spam.com",
        project_type: "web",
        message: "Spam advertising content here",
        honeypot: "not-empty"
      }
    });

    expect(res.statusCode).toBe(400);
  });
});

