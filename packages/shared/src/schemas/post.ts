import { z } from "zod";

export const PostCategoryEnum = z.enum([
  "architecture",
  "performance",
  "security",
  "pos_erp",
  "ai_llm",
  "frontend",
  "general"
]);
export type PostCategory = z.infer<typeof PostCategoryEnum>;

export const PostSchema = z.object({
  id: z.number().optional(),
  slug: z
    .string()
    .min(2, "المعرّف مطلوب ويجب ألا يقل عن حرفين")
    .regex(/^[a-z0-9-]+$/, "المعرّف يجب أن يحتوي على أحرف صغيرة وأرقام وشرطات فقط"),
  title_ar: z.string().min(2, "العنوان بالعربية مطلوب"),
  title_en: z.string().min(2, "English title is required"),
  summary_ar: z.string().default(""),
  summary_en: z.string().default(""),
  body_md_ar: z.string().min(10, "محتوى المقال بالعربية يجب ألا يقل عن 10 أحرف"),
  body_md_en: z.string().min(10, "English article body must be at least 10 characters"),
  cover_image: z.string().default("/uploads/blog/default.webp"),
  category: PostCategoryEnum.default("architecture"),
  tags: z.array(z.string()).default([]),
  tags_json: z.string().optional(),
  author_name: z.string().default("عمار ناعس"),
  author_role: z.string().default("Senior Systems Architect"),
  author_avatar: z.string().default("/uploads/author.webp"),
  reading_time_minutes: z.number().int().min(1).default(5),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
  published_at: z.string().optional(),
  views_count: z.number().int().default(0),
  seo_title_ar: z.string().optional(),
  seo_title_en: z.string().optional(),
  seo_desc_ar: z.string().optional(),
  seo_desc_en: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional()
});

export type PostInput = z.infer<typeof PostSchema>;
