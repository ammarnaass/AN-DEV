import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const admins = sqliteTable("admins", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  password_hash: text("password_hash").notNull(),
  created_at: text("created_at").notNull()
});

export const sessions = sqliteTable("sessions", {
  id: text("id").primaryKey(), // UUID token
  admin_id: integer("admin_id").notNull().references(() => admins.id, { onDelete: "cascade" }),
  expires_at: text("expires_at").notNull()
});

export const projects = sqliteTable("projects", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  title_ar: text("title_ar").notNull(),
  title_en: text("title_en").notNull(),
  summary_ar: text("summary_ar").notNull(),
  summary_en: text("summary_en").notNull(),
  body_ar: text("body_ar").notNull(),
  body_en: text("body_en").notNull(),
  tech_json: text("tech_json").notNull().default("[]"),
  cover_image: text("cover_image").notNull(),
  live_url: text("live_url"),
  repo_url: text("repo_url"),
  featured: integer("featured", { mode: "boolean" }).notNull().default(false),
  published: integer("published", { mode: "boolean" }).notNull().default(true),
  sort_order: integer("sort_order").notNull().default(0),
  created_at: text("created_at").notNull(),
  updated_at: text("updated_at").notNull()
});

export const project_images = sqliteTable("project_images", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  project_id: integer("project_id").notNull().references(() => projects.id, { onDelete: "cascade" }),
  path: text("path").notNull(),
  alt_ar: text("alt_ar").notNull().default(""),
  alt_en: text("alt_en").notNull().default(""),
  sort_order: integer("sort_order").notNull().default(0)
});

export const inquiries = sqliteTable("inquiries", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  project_type: text("project_type").notNull(),
  budget_range: text("budget_range"),
  message: text("message").notNull(),
  status: text("status").notNull().default("new"), // 'new' | 'in_progress' | 'closed'
  admin_note: text("admin_note"),
  ip_hash: text("ip_hash").notNull(),
  created_at: text("created_at").notNull()
});

export const posts = sqliteTable("posts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  title_ar: text("title_ar").notNull(),
  title_en: text("title_en").notNull(),
  body_md_ar: text("body_md_ar").notNull(),
  body_md_en: text("body_md_en").notNull(),
  published: integer("published", { mode: "boolean" }).notNull().default(true),
  published_at: text("published_at").notNull()
});

export const settings = sqliteTable("settings", {
  key: text("key").primaryKey(),
  value: text("value").notNull()
});

export const page_views = sqliteTable("page_views", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  path: text("path").notNull(),
  day: text("day").notNull(), // YYYY-MM-DD
  count: integer("count").notNull().default(1)
});

