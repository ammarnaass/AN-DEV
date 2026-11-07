import { describe, it, expect } from "vitest";
import { InquirySchema } from "./inquiry";

describe("InquirySchema", () => {
  it("validates valid inquiry input", () => {
    const valid = {
      name: "Ahmed Benali",
      email: "ahmed@example.com",
      project_type: "web",
      budget_range: "50k-100k DZD",
      message: "نحتاج إلى موقع تعريفي مع لوحة تحكم لإدارة الطلبات",
      honeypot: ""
    };
    const result = InquirySchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it("fails if honeypot is filled", () => {
    const botPayload = {
      name: "Spam Bot",
      email: "bot@spam.com",
      project_type: "web",
      message: "Check out this link",
      honeypot: "http://spam.ru"
    };
    const result = InquirySchema.safeParse(botPayload);
    expect(result.success).toBe(false);
  });

  it("fails if name or message is too short", () => {
    const invalid = {
      name: "A",
      email: "valid@email.com",
      project_type: "web",
      message: "short",
      honeypot: ""
    };
    const result = InquirySchema.safeParse(invalid);
    expect(result.success).toBe(false);
  });
});

