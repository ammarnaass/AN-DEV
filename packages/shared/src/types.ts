import { z } from "zod";
import {
  InquirySchema,
  InquiryStatus,
  InquiryActivityEvent
} from "./schemas/inquiry";
import { ProjectSchema, ProjectTypeSpecs } from "./schemas/project";
import { PostSchema } from "./schemas/post";

export * from "./schemas/inquiry";
export * from "./schemas/post";

export type Inquiry = z.infer<typeof InquirySchema> & {
  id: number;
  tracking_code: string;
  status: InquiryStatus;
  admin_note?: string | null;
  cancellation_reason?: string | null;
  quote_amount?: string | null;
  estimated_timeline?: string | null;
  meeting_link?: string | null;
  confirmed_datetime?: string | null;
  activity_log?: InquiryActivityEvent[];
  activity_log_json?: string;
  ip_hash: string;
  created_at: string;
  updated_at?: string;
};

export type Project = z.infer<typeof ProjectSchema> & {
  id: number;
  created_at: string;
  updated_at: string;
  images?: ProjectImage[];
  type_specs?: ProjectTypeSpecs;
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
