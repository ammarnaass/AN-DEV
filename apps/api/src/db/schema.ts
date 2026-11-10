import { pgTable, serial, text, integer, boolean } from "drizzle-orm/pg-core";

export const admins = pgTable("admins", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  password_hash: text("password_hash").notNull(),
  created_at: text("created_at").notNull()
});

export const sessions = pgTable("sessions", {
  id: text("id").primaryKey(), // UUID token
  admin_id: integer("admin_id").notNull().references(() => admins.id, { onDelete: "cascade" }),
  expires_at: text("expires_at").notNull()
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
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
  featured: boolean("featured").notNull().default(false),
  published: boolean("published").notNull().default(true),
  sort_order: integer("sort_order").notNull().default(0),
  created_at: text("created_at").notNull(),
  updated_at: text("updated_at").notNull()
});

export const project_images = pgTable("project_images", {
  id: serial("id").primaryKey(),
  project_id: integer("project_id").notNull().references(() => projects.id, { onDelete: "cascade" }),
  path: text("path").notNull(),
  alt_ar: text("alt_ar").notNull().default(""),
  alt_en: text("alt_en").notNull().default(""),
  sort_order: integer("sort_order").notNull().default(0)
});

export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
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

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title_ar: text("title_ar").notNull(),
  title_en: text("title_en").notNull(),
  body_md_ar: text("body_md_ar").notNull(),
  body_md_en: text("body_md_en").notNull(),
  published: boolean("published").notNull().default(true),
  published_at: text("published_at").notNull()
});

export const settings = pgTable("settings", {
  key: text("key").primaryKey(),
  value: text("value").notNull()
});

export const page_views = pgTable("page_views", {
  id: serial("id").primaryKey(),
  path: text("path").notNull(),
  day: text("day").notNull(), // YYYY-MM-DD
  count: integer("count").notNull().default(1)
});

export const bio_links = pgTable("bio_links", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  url: text("url").notNull(),
  subtitle: text("subtitle"),
  icon_or_image: text("icon_or_image"),
  image_size: text("image_size").notNull().default("md"),
  image_radius: text("image_radius").notNull().default("md"),
  image_fit: text("image_fit").notNull().default("cover"),
  font_family: text("font_family").notNull().default("cairo"),
  text_color: text("text_color").notNull().default("#ffffff"),
  bg_color: text("bg_color").notNull().default("#1e293b"),
  border_color: text("border_color").notNull().default("#334155"),
  style_variant: text("style_variant").notNull().default("solid"), // solid, gradient, outline, glow
  gradient_from: text("gradient_from"),
  gradient_to: text("gradient_to"),
  is_active: boolean("is_active").notNull().default(true),
  is_featured: boolean("is_featured").notNull().default(false),
  sort_order: integer("sort_order").notNull().default(0),
  click_count: integer("click_count").notNull().default(0),
  created_at: text("created_at").notNull(),
  updated_at: text("updated_at").notNull()
});
