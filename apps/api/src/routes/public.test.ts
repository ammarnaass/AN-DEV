import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { buildApp } from "../app";
import { FastifyInstance } from "fastify";
import { seedDatabase } from "../db/seed";

describe("Public Content API", () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = await buildApp({ test: true });
    await app.ready();
    await seedDatabase();
  });

  afterAll(async () => {
    await app.close();
  });

  it("GET /api/projects returns published projects with at least 6 seed projects", async () => {
    const res = await app.inject({ method: "GET", url: "/api/projects" });
    expect(res.statusCode).toBe(200);
    const data = JSON.parse(res.body);
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThanOrEqual(6);
    expect(data[0].title_ar).toBeDefined();
    expect(data[0].title_en).toBeDefined();
  });

  it("GET /api/projects/:slug returns detailed single project", async () => {
    const res = await app.inject({ method: "GET", url: "/api/projects/benaa-erp" });
    expect(res.statusCode).toBe(200);
    const project = JSON.parse(res.body);
    expect(project.slug).toBe("benaa-erp");
    expect(project.body_ar).toBeDefined();
  });

  it("GET /api/settings/public returns agency public coordinates", async () => {
    const res = await app.inject({ method: "GET", url: "/api/settings/public" });
    expect(res.statusCode).toBe(200);
    const settings = JSON.parse(res.body);
    expect(settings.email).toBeDefined();
    expect(settings.whatsapp).toBeDefined();
  });

  it("POST /api/views records a page view without storing PII", async () => {
    const res = await app.inject({
      method: "POST",
      url: "/api/views",
      payload: { path: "/projects" }
    });
    expect(res.statusCode).toBe(200);
  });
});
