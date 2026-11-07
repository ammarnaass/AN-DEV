import * as argon2 from "argon2";
import crypto from "crypto";
import { getDb } from "../db";
import { admins, sessions } from "../db/schema";
import { eq, and, gt } from "drizzle-orm";

export async function hashPassword(password: string): Promise<string> {
  return argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: 65536,
    timeCost: 3
  });
}

export async function verifyPassword(hash: string, password: string): Promise<boolean> {
  try {
    return await argon2.verify(hash, password);
  } catch {
    return false;
  }
}

export async function createSession(adminId: number): Promise<string> {
  const db = getDb();
  const sessionId = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(); // 7 days

  db.insert(sessions).values({
    id: sessionId,
    admin_id: adminId,
    expires_at: expiresAt
  }).run();

  return sessionId;
}

export async function validateSession(sessionId: string) {
  if (!sessionId) return null;
  const db = getDb();
  const now = new Date().toISOString();

  const sessionRecord = db.select({
    sessionId: sessions.id,
    adminId: admins.id,
    email: admins.email,
    expiresAt: sessions.expires_at
  })
  .from(sessions)
  .innerJoin(admins, eq(sessions.admin_id, admins.id))
  .where(and(eq(sessions.id, sessionId), gt(sessions.expires_at, now)))
  .get();

  return sessionRecord || null;
}

export async function destroySession(sessionId: string): Promise<void> {
  if (!sessionId) return;
  const db = getDb();
  db.delete(sessions).where(eq(sessions.id, sessionId)).run();
}

