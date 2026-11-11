import { z } from "zod";

export const InquiryTypeEnum = z.enum(["project", "consultation"]);
export type InquiryType = z.infer<typeof InquiryTypeEnum>;

export const InquiryStatusEnum = z.enum([
  "pending",
  "approved",
  "in_progress",
  "completed",
  "cancelled",
  "rejected",
  "new",
  "closed"
]);
export type InquiryStatus = z.infer<typeof InquiryStatusEnum>;

export const ConsultationDomainEnum = z.enum([
  "cloud_devops",
  "security_audit",
  "feasibility_study",
  "pos_erp",
  "ai_agent",
  "performance_troubleshooting",
  "general"
]);
export type ConsultationDomain = z.infer<typeof ConsultationDomainEnum>;

export const MeetingModeEnum = z.enum(["google_meet", "phone", "in_person"]);
export type MeetingMode = z.infer<typeof MeetingModeEnum>;

export const InquiryActivityEventSchema = z.object({
  id: z.string(),
  author: z.enum(["client", "admin", "system"]),
  action: z.enum([
    "submitted",
    "status_changed",
    "quote_provided",
    "consultation_scheduled",
    "cancelled",
    "rejected",
    "client_note",
    "admin_note"
  ]),
  title: z.string(),
  body: z.string().optional(),
  created_at: z.string()
});
export type InquiryActivityEvent = z.infer<typeof InquiryActivityEventSchema>;

export const InquirySchema = z.object({
  name: z.string().min(2, "الاسم مطلوب ويجب ألا يقل عن حرفين"),
  email: z.string().email("البريد الإلكتروني غير صالح"),
  phone: z.string().optional().default(""),
  company: z.string().optional().default(""),
  request_type: InquiryTypeEnum.default("project"),
  project_type: z.enum(["web", "mobile", "desktop", "pos", "system", "other"]).default("web"),
  budget_range: z.string().optional().default(""),
  
  // Consultation fields
  consultation_domain: ConsultationDomainEnum.default("general"),
  preferred_date: z.string().optional().default(""),
  preferred_time_slot: z.enum(["morning", "afternoon", "any"]).default("morning"),
  meeting_mode: MeetingModeEnum.default("google_meet"),
  
  // Content & Anti-bot
  message: z.string().min(10, "تفاصيل الطلب أو الاستشارة يجب ألا تقل عن 10 أحرف"),
  honeypot: z.string().max(0, "Bot detected").optional().default("")
});

export type InquiryInput = z.infer<typeof InquirySchema>;

export const ApproveProjectSchema = z.object({
  quote_amount: z.string().min(1, "يرجى تحديد عرض السعر التقديري"),
  estimated_timeline: z.string().min(1, "يرجى تحديد المدة التقديرية للتنفيذ"),
  admin_note: z.string().optional()
});
export type ApproveProjectInput = z.infer<typeof ApproveProjectSchema>;

export const ScheduleConsultationSchema = z.object({
  confirmed_datetime: z.string().min(1, "يرجى تحديد تاريخ وتوقيت الجلسة"),
  meeting_mode: MeetingModeEnum.default("google_meet"),
  meeting_link: z.string().optional().default(""),
  admin_note: z.string().optional()
});
export type ScheduleConsultationInput = z.infer<typeof ScheduleConsultationSchema>;

export const RejectInquirySchema = z.object({
  reason: z.string().min(5, "يرجى توضيح سبب الاعتذار أو الرفض للعميل")
});
export type RejectInquiryInput = z.infer<typeof RejectInquirySchema>;

export const ClientCancelSchema = z.object({
  reason: z.string().min(3, "يرجى كتابة سبب الإلغاء")
});
export type ClientCancelInput = z.infer<typeof ClientCancelSchema>;

export const ClientMessageSchema = z.object({
  message: z.string().min(3, "نص الرسالة يجب ألا يقل عن 3 أحرف")
});
export type ClientMessageInput = z.infer<typeof ClientMessageSchema>;

export const UpdateInquirySchema = z.object({
  status: InquiryStatusEnum,
  admin_note: z.string().optional(),
  quote_amount: z.string().optional(),
  estimated_timeline: z.string().optional(),
  confirmed_datetime: z.string().optional(),
  meeting_link: z.string().optional()
});

export type UpdateInquiryInput = z.infer<typeof UpdateInquirySchema>;
