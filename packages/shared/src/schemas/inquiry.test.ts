import { describe, it, expect } from "vitest";
import {
  InquirySchema,
  ApproveProjectSchema,
  ScheduleConsultationSchema,
  RejectInquirySchema,
  ClientCancelSchema
} from "./inquiry";

describe("Enhanced InquirySchema", () => {
  it("validates a standard project inquiry with phone and budget", () => {
    const input = {
      name: "أحمد بن علي",
      email: "ahmed@example.dz",
      phone: "0555123456",
      company: "Sarl Tech Algerie",
      request_type: "project",
      project_type: "pos",
      budget_range: "200,000 - 500,000 DZD",
      message: "نحتاج نظام نقاط بيع مع ربط بطابعات فواتير متعددة ومخزون مركزي",
      honeypot: ""
    };

    const result = InquirySchema.safeParse(input);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.request_type).toBe("project");
      expect(result.data.phone).toBe("0555123456");
      expect(result.data.consultation_domain).toBe("general");
    }
  });

  it("validates a technical consultation inquiry with preferred time and meeting mode", () => {
    const input = {
      name: "Karim Meziane",
      email: "karim@startup.dz",
      phone: "0661987654",
      request_type: "consultation",
      consultation_domain: "cloud_devops",
      preferred_date: "2026-11-25",
      preferred_time_slot: "morning",
      meeting_mode: "google_meet",
      message: "نحتاج استشارة معمارية لترحيل البنية التحتية إلى Kubernetes وتحسين الأمان",
      honeypot: ""
    };

    const result = InquirySchema.safeParse(input);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.request_type).toBe("consultation");
      expect(result.data.consultation_domain).toBe("cloud_devops");
      expect(result.data.meeting_mode).toBe("google_meet");
    }
  });

  it("fails validation if honeypot is populated", () => {
    const input = {
      name: "Spam Bot",
      email: "bot@spam.com",
      message: "Buy cheap backlinks now!",
      honeypot: "gotcha"
    };

    const result = InquirySchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it("validates action schemas for approval, scheduling, and rejection", () => {
    const approve = ApproveProjectSchema.safeParse({
      quote_amount: "450,000 DZD",
      estimated_timeline: "6 أسابيع",
      admin_note: "تمت مراجعة المواصفات والموافقة عليها"
    });
    expect(approve.success).toBe(true);

    const schedule = ScheduleConsultationSchema.safeParse({
      confirmed_datetime: "2026-11-25T10:00:00Z",
      meeting_mode: "google_meet",
      meeting_link: "https://meet.google.com/abc-defg-hij"
    });
    expect(schedule.success).toBe(true);

    const reject = RejectInquirySchema.safeParse({
      reason: "عذراً، مجال العمل خارج اختصاصنا الحالي"
    });
    expect(reject.success).toBe(true);

    const cancel = ClientCancelSchema.safeParse({
      reason: "تم تأجيل المشروع للعام القادم"
    });
    expect(cancel.success).toBe(true);
  });
});
