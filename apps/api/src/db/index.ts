import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const DEFAULT_CONNECTION = "postgresql://neondb_owner:npg_s2hjOkANc3tF@ep-damp-bird-zajgsfr3-pooler.c-2.eu-west-2.aws.neon.tech/neondb?sslmode=require";

let dbInstance: ReturnType<typeof drizzle> | null = null;
let rawSql: ReturnType<typeof neon> | null = null;

export async function initDb(connStr?: string) {
  const connectionString = connStr || process.env.DATABASE_URL || DEFAULT_CONNECTION;
  rawSql = neon(connectionString);
  dbInstance = drizzle(rawSql, { schema });

  const statements = [
    `CREATE TABLE IF NOT EXISTS admins (
      id SERIAL PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      created_at TEXT NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      admin_id INTEGER NOT NULL REFERENCES admins(id) ON DELETE CASCADE,
      expires_at TEXT NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS projects (
      id SERIAL PRIMARY KEY,
      slug TEXT NOT NULL UNIQUE,
      title_ar TEXT NOT NULL,
      title_en TEXT NOT NULL,
      summary_ar TEXT NOT NULL,
      summary_en TEXT NOT NULL,
      body_ar TEXT NOT NULL,
      body_en TEXT NOT NULL,
      tech_json TEXT NOT NULL DEFAULT '[]',
      cover_image TEXT NOT NULL,
      live_url TEXT,
      repo_url TEXT,
      featured BOOLEAN NOT NULL DEFAULT FALSE,
      published BOOLEAN NOT NULL DEFAULT TRUE,
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS project_images (
      id SERIAL PRIMARY KEY,
      project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
      path TEXT NOT NULL,
      alt_ar TEXT NOT NULL DEFAULT '',
      alt_en TEXT NOT NULL DEFAULT '',
      sort_order INTEGER NOT NULL DEFAULT 0
    )`,
    `CREATE TABLE IF NOT EXISTS inquiries (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      project_type TEXT NOT NULL,
      budget_range TEXT,
      message TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'new',
      admin_note TEXT,
      ip_hash TEXT NOT NULL,
      created_at TEXT NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS posts (
      id SERIAL PRIMARY KEY,
      slug TEXT NOT NULL UNIQUE,
      title_ar TEXT NOT NULL,
      title_en TEXT NOT NULL,
      body_md_ar TEXT NOT NULL,
      body_md_en TEXT NOT NULL,
      published BOOLEAN NOT NULL DEFAULT TRUE,
      published_at TEXT NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS page_views (
      id SERIAL PRIMARY KEY,
      path TEXT NOT NULL,
      day TEXT NOT NULL,
      count INTEGER NOT NULL DEFAULT 1
    )`
  ];

  for (const stmt of statements) {
    try {
      await rawSql.query(stmt);
    } catch (e) {
      // already exists or non-fatal
    }
  }

  return dbInstance;
}

export function getDb() {
  if (!dbInstance) {
    const connectionString = process.env.DATABASE_URL || DEFAULT_CONNECTION;
    rawSql = neon(connectionString);
    dbInstance = drizzle(rawSql, { schema });
  }
  return dbInstance;
}

export { schema };
