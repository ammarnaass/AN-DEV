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

  it("POST /api/inquiries saves inquiry to database, returns 201 and tracking_code", async () => {
    const payload = {
      name: "Karim Benali",
      email: "karim@business.dz",
      phone: "0555987654",
      request_type: "project",
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
    expect(body.tracking_code).toBeDefined();
    expect(body.tracking_code).toContain("AND-");

    const trackRes = await app.inject({
      method: "GET",
      url: `/api/inquiries/track/${body.tracking_code}`
    });
    expect(trackRes.statusCode).toBe(200);
    const trackBody = JSON.parse(trackRes.body);
    expect(trackBody.tracking_code).toBe(body.tracking_code);
    expect(trackBody.status).toBe("pending");
    expect(trackBody.activity_log.length).toBeGreaterThan(0);
  });

  it("POST /api/inquiries rejects spam when honeypot is populated", async () => {
    const res = await app.inject({
      method: "POST",
      url: "/api/inquiries",
      payload: {
        name: "Spam Bot",
        email: "bot@spam.com",
        project_type: "web",
        message: "Spam content message here",
        honeypot: "gotcha"
      }
    });

    expect(res.statusCode).toBe(400);
    const body = JSON.parse(res.body);
    expect(body.error).toContain("تم حظر الطلب");
  });

  it("allows client to send message and cancel using tracking code", async () => {
    // 1. Create a consultation
    const createRes = await app.inject({
      method: "POST",
      url: "/api/inquiries",
      payload: {
        name: "Amina Cherif",
        email: "amina@healthtech.dz",
        phone: "0770123456",
        request_type: "consultation",
        consultation_domain: "security_audit",
        preferred_date: "2026-12-01",
        preferred_time_slot: "morning",
        meeting_mode: "google_meet",
        message: "طلب تدقيق أمني لتطبيق طبي متوافق مع معايير حماية البيانات",
        honeypot: ""
      }
    });

    expect(createRes.statusCode).toBe(201);
    const { tracking_code } = JSON.parse(createRes.body);

    // 2. Client adds a note
    const msgRes = await app.inject({
      method: "POST",
      url: `/api/inquiries/track/${tracking_code}/message`,
      payload: {
        message: "أضفنا ملخص المتطلبات وسنكون متاحين في الأسبوع القادم أيضاً"
      }
    });
    expect(msgRes.statusCode).toBe(200);

    // 3. Client cancels inquiry
    const cancelRes = await app.inject({
      method: "POST",
      url: `/api/inquiries/track/${tracking_code}/cancel`,
      payload: {
        reason: "تم تأجيل المشروع نظراً لتغيير في متطلبات المستشفى"
      }
    });
    expect(cancelRes.statusCode).toBe(200);

    // 4. Verify updated state on tracking endpoint
    const trackRes = await app.inject({
      method: "GET",
      url: `/api/inquiries/track/${tracking_code}`
    });
    const trackData = JSON.parse(trackRes.body);
    expect(trackData.status).toBe("cancelled");
    expect(trackData.cancellation_reason).toContain("تأجيل المشروع");
    expect(trackData.activity_log.length).toBe(3); // submitted, client_note, cancelled
  });
});
