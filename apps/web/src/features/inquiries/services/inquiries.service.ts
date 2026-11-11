import { apiFetch } from "../../../lib/api";
import { InquiryInput, InquiryActivityEvent } from "@andev/shared";

export interface SubmitInquiryResponse {
  success: boolean;
  id: number;
  tracking_code: string;
  message: string;
}

export interface TrackInquiryResponse {
  tracking_code: string;
  request_type: "project" | "consultation";
  name: string;
  masked_email: string;
  phone?: string | null;
  company?: string | null;
  project_type: string;
  budget_range?: string | null;
  consultation_domain?: string | null;
  preferred_date?: string | null;
  preferred_time_slot?: string | null;
  meeting_mode?: string | null;
  meeting_link?: string | null;
  confirmed_datetime?: string | null;
  quote_amount?: string | null;
  estimated_timeline?: string | null;
  cancellation_reason?: string | null;
  status: string;
  message: string;
  activity_log: InquiryActivityEvent[];
  created_at: string;
  updated_at?: string;
}

export const inquiriesService = {
  submitInquiry: async (data: InquiryInput): Promise<SubmitInquiryResponse> => {
    return apiFetch<SubmitInquiryResponse>("/api/inquiries", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  trackInquiry: async (trackingCode: string): Promise<TrackInquiryResponse> => {
    return apiFetch<TrackInquiryResponse>(`/api/inquiries/track/${encodeURIComponent(trackingCode.trim())}`, {
      method: "GET",
    });
  },

  cancelInquiry: async (trackingCode: string, reason: string): Promise<{ success: boolean; message: string }> => {
    return apiFetch<{ success: boolean; message: string }>(`/api/inquiries/track/${encodeURIComponent(trackingCode.trim())}/cancel`, {
      method: "POST",
      body: JSON.stringify({ reason }),
    });
  },

  sendMessage: async (trackingCode: string, message: string): Promise<{ success: boolean; message: string }> => {
    return apiFetch<{ success: boolean; message: string }>(`/api/inquiries/track/${encodeURIComponent(trackingCode.trim())}/message`, {
      method: "POST",
      body: JSON.stringify({ message }),
    });
  },
};
