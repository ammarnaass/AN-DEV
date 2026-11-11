import { z } from "zod";

export const ProjectGalleryItemSchema = z.object({
  url: z.string(),
  caption_ar: z.string().optional().default(""),
  caption_en: z.string().optional().default(""),
  device_frame: z.enum(["mobile", "browser", "desktop"]).default("browser"),
});

export type ProjectGalleryItem = z.infer<typeof ProjectGalleryItemSchema>;

export const WebSpecsSchema = z.object({
  live_url: z.string().optional().default(""),
  enable_live_preview: z.boolean().default(true),
  pwa_ready: z.boolean().default(false),
  hosting_env: z.string().optional().default(""),
  architecture: z.string().optional().default(""),
});

export const MobileSpecsSchema = z.object({
  apk_url: z.string().optional().default(""),
  play_store_url: z.string().optional().default(""),
  app_store_url: z.string().optional().default(""),
  min_os: z.string().optional().default("Android 8.0+ / iOS 15+"),
  package_size: z.string().optional().default(""),
  offline_first: z.boolean().default(true),
  hardware_features: z.array(z.string()).default(["Camera", "Barcode"]),
});

export const DesktopSpecsSchema = z.object({
  installer_url: z.string().optional().default(""),
  package_size: z.string().optional().default(""),
  architectures: z.array(z.string()).default(["x64", "arm64"]),
  database_type: z.string().optional().default("SQLite Local"),
  system_requirements: z.string().optional().default(""),
});

export const PosSpecsSchema = z.object({
  printer_sizes: z.array(z.string()).default(["80mm", "58mm"]),
  peripherals: z.array(z.string()).default(["barcode_scanner", "cash_drawer"]),
  fiscal_compliant: z.boolean().default(true),
  offline_engine: z.string().default("SQLite Local Engine"),
  cloud_sync: z.boolean().default(true),
});

export const ErpSpecsSchema = z.object({
  modules: z.array(z.string()).default(["inventory", "sales", "invoicing", "accounting"]),
  deployment_mode: z.enum(["cloud", "on_premise", "hybrid"]).default("cloud"),
  multi_branch: z.boolean().default(true),
  rbac_security: z.boolean().default(true),
  audit_trail: z.boolean().default(true),
});

export type WebSpecs = z.infer<typeof WebSpecsSchema>;
export type MobileSpecs = z.infer<typeof MobileSpecsSchema>;
export type DesktopSpecs = z.infer<typeof DesktopSpecsSchema>;
export type PosSpecs = z.infer<typeof PosSpecsSchema>;
export type ErpSpecs = z.infer<typeof ErpSpecsSchema>;

export type ProjectTypeSpecs = {
  web?: Partial<WebSpecs>;
  mobile?: Partial<MobileSpecs>;
  desktop?: Partial<DesktopSpecs>;
  pos?: Partial<PosSpecs>;
  system?: Partial<ErpSpecs>;
  [key: string]: any;
};

export const ProjectSchema = z.object({
  slug: z
    .string()
    .min(2, "معرف الرابط يجب أن يكون حرفين على الأقل")
    .regex(/^[a-z0-9-]+$/, "معرف الرابط (Slug) يجب أن يحتوي على أحرف إنجليزية صغيرة وأرقام وشرطات فقط"),
  title_ar: z.string().min(2, "عنوان المشروع بالعربية مطلوب"),
  title_en: z.string().optional().default(""),
  summary_ar: z.string().min(5, "الملخص القصير بالعربية مطلوب"),
  summary_en: z.string().optional().default(""),
  body_ar: z.string().min(10, "تفاصيل المشروع بالعربية مطلوبة"),
  body_en: z.string().optional().default(""),
  project_type: z.enum(["web", "mobile", "desktop", "pos", "system"]).default("web"),
  version: z.string().default("v1.0.0"),
  package_size: z.string().default(""),
  platforms_json: z.array(z.string()).default(["web"]),
  download_url: z.string().optional().nullable().default(""),
  enable_live_preview: z.boolean().default(true),
  gallery_json: z.array(ProjectGalleryItemSchema).default([]),
  type_specs_json: z.record(z.any()).or(z.string()).optional().default({}),
  tech_json: z.array(z.string()).default([]),
  cover_image: z.string().min(1, "صورة الغلاف مطلوبة"),
  live_url: z.string().optional().nullable().default(""),
  repo_url: z.string().optional().nullable().default(""),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
  sort_order: z.number().int().default(0),
});

export type ProjectInput = z.infer<typeof ProjectSchema>;
