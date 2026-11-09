import { apiFetch } from "../../../lib/api";
import { InquiryInput } from "@andev/shared";

export const inquiriesService = {
  submitInquiry: async (data: InquiryInput): Promise<{ success: boolean }> => {
    return apiFetch<{ success: boolean }>("/api/inquiries", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};

