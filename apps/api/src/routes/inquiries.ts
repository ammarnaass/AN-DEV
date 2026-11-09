import { FastifyInstance } from "fastify";
import { InquirySchema } from "@andev/shared";
import { getDb } from "../db";
import { inquiries } from "../db/schema";
import crypto from "crypto";
import { sendInquiryNotification } from "../services/email";

// Simple in-memory rate limiter per IP hash: timestamp array
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 mins
const MAX_REQUESTS = 5;

export async function inquiryRoutes(app: FastifyInstance) {
  app.post("/inquiries", async (request, reply) => {
    // 1. Hash IP address
    const rawIp = request.ip || "127.0.0.1";
    const ipHash = crypto.createHash("sha256").update(rawIp + (process.env.IP_SALT || "andev-salt")).digest("hex");

    // 2. Check rate limit
    const now = Date.now();
    const timestamps = (rateLimitMap.get(ipHash) || []).filter(t => now - t < RATE_LIMIT_WINDOW_MS);
    if (timestamps.length >= MAX_REQUESTS) {
      return reply.status(429).send({
        error: "تجاوزت الحد المسموح به من الطلبات، يرجى المحاولة لاحقاً"
      });
    }

    // 3. Validate payload with Zod
    const parseResult = InquirySchema.safeParse(request.body);
    if (!parseResult.success) {
      const isHoneypot = parseResult.error.issues.some(i => i.path.includes("honeypot"));
      return reply.status(400).send({
        error: isHoneypot ? "تم حظر الطلب لاشتباه نشاط آلي (Bot detected)" : "بيانات غير صالحة",
        details: parseResult.error.format()
      });
    }

    const { name, email, project_type, budget_range, message } = parseResult.data;

    // 4. Save to SQLite database
    const db = getDb();
    const createdAt = new Date().toISOString();

    const [created] = await db.insert(inquiries).values({
      name,
      email,
      project_type,
      budget_range: budget_range || null,
      message,
      status: "new",
      ip_hash: ipHash,
      created_at: createdAt
    }).returning();

    // 5. Update rate limit record
    timestamps.push(now);
    rateLimitMap.set(ipHash, timestamps);

    // 6. Trigger notification
    sendInquiryNotification({
      name,
      email,
      project_type,
      budget_range,
      message
    }).catch(() => {});

    return reply.status(201).send({
      success: true,
      id: created.id,
      message: "تم استلام طلبك بنجاح، سنقوم بالرد عليك خلال يومي عمل"
    });
  });
}

