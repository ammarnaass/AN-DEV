import { z } from "zod";

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
  tech_json: z.array(z.string()).default([]),
  cover_image: z.string().min(1, "صورة الغلاف مطلوبة"),
  live_url: z.string().optional().nullable().default(""),
  repo_url: z.string().optional().nullable().default(""),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
  sort_order: z.number().int().default(0),
});

export type ProjectInput = z.infer<typeof ProjectSchema>;
