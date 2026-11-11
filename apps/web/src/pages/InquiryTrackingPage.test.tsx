/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, afterEach, vi } from "vitest";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { InquiryTrackingPage } from "./InquiryTrackingPage";
import { I18nProvider } from "../lib/i18n";
import { inquiriesService } from "../features/inquiries/services/inquiries.service";
import React from "react";

afterEach(cleanup);

describe("InquiryTrackingPage", () => {
  it("renders tracking search input by default", () => {
    render(
      <MemoryRouter initialEntries={["/track"]}>
        <I18nProvider initialLocale="ar">
          <InquiryTrackingPage />
        </I18nProvider>
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText("AND-2026-XXXX")).toBeDefined();
    expect(screen.getByRole("button", { name: /استعلام/i })).toBeDefined();
  });

  it("fetches and displays tracking details when trackingCode param is present", async () => {
    vi.spyOn(inquiriesService, "trackInquiry").mockResolvedValueOnce({
      tracking_code: "AND-2026-SAMPLE",
      request_type: "consultation",
      name: "Samir Bouzid",
      masked_email: "s***d@corp.dz",
      phone: "0550112233",
      company: "Algeria Cloud SARL",
      project_type: "web",
      consultation_domain: "cloud_devops",
      preferred_date: "2026-12-05",
      preferred_time_slot: "morning",
      meeting_mode: "google_meet",
      meeting_link: "https://meet.google.com/test-meet",
      confirmed_datetime: "2026-12-05T10:00:00Z",
      status: "approved",
      message: "نحتاج جلسة استشارية لترحيل خوادمنا",
      activity_log: [
        {
          id: "1",
          author: "client",
          action: "submitted",
          title: "تقديم طلب استشارة معمارية",
          created_at: new Date().toISOString()
        }
      ],
      created_at: new Date().toISOString()
    });

    render(
      <MemoryRouter initialEntries={["/track/AND-2026-SAMPLE"]}>
        <I18nProvider initialLocale="ar">
          <Routes>
            <Route path="/track/:trackingCode" element={<InquiryTrackingPage />} />
          </Routes>
        </I18nProvider>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("AND-2026-SAMPLE")).toBeDefined();
      expect(screen.getByText("Samir Bouzid")).toBeDefined();
      expect(screen.getByText(/تفاصيل جلسة الاستشارة المؤكدة/i)).toBeDefined();
      expect(screen.getByText(/الانضمام لاجتماع Google Meet/i)).toBeDefined();
    });
  });
});

