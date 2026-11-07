import { z } from "zod";

export const InquirySchema = z.object({
  name: z.string().min(2, "الاسم مطلوب ويجب ألا يقل عن حرفين"),
  email: z.string().email("البريد الإلكتروني غير صالح"),
  project_type: z.enum(["web", "mobile", "system", "other"], {
    errorMap: () => ({ message: "نوع المشروع غير صالح" })
  }),
  budget_range: z.string().optional().default(""),
  message: z.string().min(10, "تفاصيل الفكرة يجب ألا تقل عن 10 أحرف"),
  honeypot: z.string().max(0, "Bot detected")
});

export type InquiryInput = z.infer<typeof InquirySchema>;

export const UpdateInquirySchema = z.object({
  status: z.enum(["new", "in_progress", "closed"]),
  admin_note: z.string().optional()
});

export type UpdateInquiryInput = z.infer<typeof UpdateInquirySchema>;
