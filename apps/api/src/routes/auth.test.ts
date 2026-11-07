import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { buildApp } from "../app";
import { FastifyInstance } from "fastify";
import { getDb } from "../db";
import { admins } from "../db/schema";
import { hashPassword } from "../services/auth";

describe("Auth Routes", () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = await buildApp({ test: true });
    await app.ready();
    const db = getDb();
    const hash = await hashPassword("admin123456");
    db.insert(admins).values({
      email: "ammar@andev.dz",
      password_hash: hash,
      created_at: new Date().toISOString()
    }).run();
  });

  afterAll(async () => {
    await app.close();
  });

  it("POST /api/auth/login succeeds with correct credentials", async () => {
    const res = await app.inject({
      method: "POST",
      url: "/api/auth/login",
      payload: { email: "ammar@andev.dz", password: "admin123456" }
    });
    expect(res.statusCode).toBe(200);
    const cookies = res.cookies;
    expect(cookies.some(c => c.name === "andev_session")).toBe(true);
  });

  it("POST /api/auth/login fails with invalid credentials", async () => {
    const res = await app.inject({
      method: "POST",
      url: "/api/auth/login",
      payload: { email: "ammar@andev.dz", password: "wrongpassword" }
    });
    expect(res.statusCode).toBe(401);
  });

  it("POST /api/auth/login fails with malformed payload", async () => {
    const res = await app.inject({
      method: "POST",
      url: "/api/auth/login",
      payload: { email: "not-an-email", password: "123" }
    });
    expect(res.statusCode).toBe(400);
  });
});

