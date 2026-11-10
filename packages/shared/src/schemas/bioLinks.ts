import { z } from "zod";

export const BioLinkInputSchema = z.object({
  title: z.string().min(1, "عنوان الرابط مطلوب").max(100, "العنوان طويل جداً"),
  url: z.string().min(1, "رابط الوجهة مطلوب"),
  subtitle: z.string().max(200, "الوصف طويل جداً").optional().default(""),
  icon_or_image: z.string().optional().default(""),
  image_size: z.enum(["sm", "md", "lg", "banner"]).optional().default("md"),
  image_radius: z.enum(["none", "md", "full"]).optional().default("md"),
  image_fit: z.enum(["contain", "cover"]).optional().default("cover"),
  font_family: z.string().default("cairo"),
  text_color: z.string().default("#ffffff"),
  bg_color: z.string().default("#1e293b"),
  border_color: z.string().default("#334155"),
  style_variant: z.enum(["solid", "gradient", "outline", "glow"]).default("solid"),
  gradient_from: z.string().optional().default("#0d6efd"),
  gradient_to: z.string().optional().default("#00f2fe"),
  is_active: z.boolean().default(true),
  is_featured: z.boolean().default(false),
  sort_order: z.number().int().default(0),
});

export type BioLinkInput = z.infer<typeof BioLinkInputSchema>;

export const BioLinkSchema = BioLinkInputSchema.extend({
  id: z.number().int().positive(),
  click_count: z.number().int().default(0),
  created_at: z.string(),
  updated_at: z.string(),
});

export type BioLink = z.infer<typeof BioLinkSchema>;

export const ReorderBioLinksSchema = z.array(
  z.object({
    id: z.number().int().positive(),
    sort_order: z.number().int(),
  })
);

export type ReorderBioLinksInput = z.infer<typeof ReorderBioLinksSchema>;

