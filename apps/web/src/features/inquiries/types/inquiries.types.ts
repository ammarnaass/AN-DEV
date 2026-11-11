import { Inquiry, InquiryActivityEvent } from "@andev/shared";

export type { Inquiry, InquiryActivityEvent };

export type InquiryRequestType = "project" | "consultation";

export interface InquiryStatusFilterItem {
  id: string;
  label: string;
  count: number;
}

export interface InquiryTypeFilterItem {
  id: string;
  label: string;
  iconName?: string;
  count: number;
}
