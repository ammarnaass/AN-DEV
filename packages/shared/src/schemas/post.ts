import { z } from "zod";

export const PostSchema = z.object({
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/),
  title_ar: z.string().min(2),
  title_en: z.string().min(2),
  body_md_ar: z.string().min(10),
  body_md_en: z.string().min(10),
  published: z.boolean().default(true),
  published_at: z.string().optional()
});

export type PostInput = z.infer<typeof PostSchema>;

