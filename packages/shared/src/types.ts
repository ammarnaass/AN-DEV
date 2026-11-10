import { z } from "zod";
import { InquirySchema } from "./schemas/inquiry";
import { ProjectSchema } from "./schemas/project";
import { PostSchema } from "./schemas/post";

export type Inquiry = z.infer<typeof InquirySchema> & {
  id: number;
  status: "new" | "in_progress" | "closed";
  admin_note?: string | null;
  ip_hash: string;
  created_at: string;
};

export type Project = z.infer<typeof ProjectSchema> & {
  id: number;
  created_at: string;
  updated_at: string;
  images?: ProjectImage[];
};

export type ProjectImage = {
  id: number;
  project_id: number;
  path: string;
  alt_ar: string;
  alt_en: string;
  sort_order: number;
};

export type Post = z.infer<typeof PostSchema> & {
  id: number;
};

export type Admin = {
  id: number;
  email: string;
  created_at: string;
};

export type AdminStats = {
  new_inquiries: number;
  total_inquiries: number;
  published_projects: number;
  total_posts: number;
  views_last_30_days: number;
};
