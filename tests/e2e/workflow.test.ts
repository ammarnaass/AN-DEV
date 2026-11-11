import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { buildApp } from "../../apps/api/src/app";
import { FastifyInstance } from "fastify";
import { seedDatabase } from "../../apps/api/src/db/seed";

describe("E2E Integration Journey", () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    app = await buildApp({ test: true });
    await app.ready();
    await seedDatabase();
  }, 60000);

  afterAll(async () => {
    await app.close();
  });

  it("completes full inquiry submission, admin triage, and portfolio publishing cycle", async () => {
    // 1. Visitor submits a new project inquiry
    const inquiryPayload = {
      name: "Omar Khelifi",
      email: "omar@logistics.dz",
      project_type: "system",
      budget_range: "200k-400k DZD",
      message: "نحتاج إلى نظام مخصص لإدارة المخازن وتتبع الشحنات بالباركود",
      honeypot: ""
    };

    const inquiryRes = await app.inject({
      method: "POST",
      url: "/api/inquiries",
      payload: inquiryPayload
    });

    expect(inquiryRes.statusCode).toBe(201);
    const inqData = JSON.parse(inquiryRes.body);
    expect(inqData.success).toBe(true);
    expect(inqData.id).toBeDefined();
    const newInquiryId = inqData.id;

    // 2. Admin logs in
    const loginRes = await app.inject({
      method: "POST",
      url: "/api/auth/login",
      payload: { email: "ammar@andev.dz", password: "admin123456" }
    });

    expect(loginRes.statusCode).toBe(200);
    const sessionCookie = loginRes.cookies.find(c => c.name === "andev_session");
    expect(sessionCookie).toBeDefined();
    const cookieHeader = `andev_session=${sessionCookie?.value}`;

    // 3. Admin verifies inquiries list contains the new inquiry
    const inquiriesListRes = await app.inject({
      method: "GET",
      url: "/api/admin/inquiries?status=new",
      headers: { cookie: cookieHeader }
    });

    expect(inquiriesListRes.statusCode).toBe(200);
    const inquiriesList = JSON.parse(inquiriesListRes.body);
    const found = inquiriesList.find((i: any) => i.id === newInquiryId);
    expect(found).toBeDefined();
    expect(found.email).toBe("omar@logistics.dz");

    // 4. Admin updates inquiry status to in_progress and leaves note
    const patchRes = await app.inject({
      method: "PATCH",
      url: `/api/admin/inquiries/${newInquiryId}`,
      headers: { cookie: cookieHeader },
      payload: {
        status: "in_progress",
        admin_note: "تم إرسال العرض المبدئي عبر البريد"
      }
    });

    expect(patchRes.statusCode).toBe(200);

    // 5. Admin creates a new showcase project
    const projectSlug = `barid-pay-pos-${Date.now()}`;
    const newProjectPayload = {
      slug: projectSlug,
      title_ar: "نظام بريد باي لنقاط البيع",
      title_en: "BaridPay - Retail POS Terminal Integration",
      summary_ar: "نظام نقاط بيع متصل سحابياً يدعم الدفع ببطاقات الذهبية وحسابات البريد.",
      summary_en: "Cloud POS integration with national postal and Edahabia cards.",
      body_ar: "تفاصيل الحل والتحدي والنتائج...",
      body_en: "Detailed solution, challenges, and results...",
      tech_json: ["React", "Fastify", "PostgreSQL", "WebSockets"],
      cover_image: "/uploads/projects/barid-pos.webp",
      live_url: "https://baridpay-demo.andev.dz",
      repo_url: "",
      featured: true,
      published: true,
      sort_order: 10
    };

    const createProjectRes = await app.inject({
      method: "POST",
      url: "/api/admin/projects",
      headers: { cookie: cookieHeader },
      payload: newProjectPayload
    });

    expect(createProjectRes.statusCode).toBe(201);

    // 6. Public visitor views portfolio and retrieves the new project
    const publicProjectRes = await app.inject({
      method: "GET",
      url: `/api/projects/${projectSlug}`
    });

    expect(publicProjectRes.statusCode).toBe(200);
    const publishedProject = JSON.parse(publicProjectRes.body);
    expect(publishedProject.slug).toBe(projectSlug);
    expect(publishedProject.title_ar).toBe("نظام بريد باي لنقاط البيع");
  });
});

