import { z } from "zod";

export const ProjectSchema = z.object({
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric with hyphens"),
  title_ar: z.string().min(2),
  title_en: z.string().min(2),
  summary_ar: z.string().min(5),
  summary_en: z.string().min(5),
  body_ar: z.string().min(10),
  body_en: z.string().min(10),
  tech_json: z.array(z.string()).default([]),
  cover_image: z.string().min(1),
  live_url: z.string().url().or(z.literal("")).optional(),
  repo_url: z.string().url().or(z.literal("")).optional(),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
  sort_order: z.number().int().default(0)
});

export type ProjectInput = z.infer<typeof ProjectSchema>;

