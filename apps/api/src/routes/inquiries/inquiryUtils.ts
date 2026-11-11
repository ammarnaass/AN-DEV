import crypto from "crypto";

// Simple in-memory rate limiter per IP hash: timestamp array
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 mins
const MAX_REQUESTS = 5;

export function checkRateLimit(ip: string): boolean {
  const ipHash = crypto
    .createHash("sha256")
    .update(ip + (process.env.IP_SALT || "andev-salt"))
    .digest("hex");

  const now = Date.now();
  const timestamps = (rateLimitMap.get(ipHash) || []).filter(t => now - t < RATE_LIMIT_WINDOW_MS);

  if (timestamps.length >= MAX_REQUESTS) {
    return false;
  }

  timestamps.push(now);
  rateLimitMap.set(ipHash, timestamps);
  return true;
}

export function hashIp(rawIp: string): string {
  return crypto
    .createHash("sha256")
    .update(rawIp + (process.env.IP_SALT || "andev-salt"))
    .digest("hex");
}

export function safeParseJson<T>(raw: string | null | undefined, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function maskEmail(email: string): string {
  if (!email || !email.includes("@")) return email;
  const [user, domain] = email.split("@");
  if (user.length <= 2) return `${user[0]}***@${domain}`;
  return `${user[0]}***${user[user.length - 1]}@${domain}`;
}

