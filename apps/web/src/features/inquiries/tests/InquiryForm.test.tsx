/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { InquiryForm } from "../components/InquiryForm";
import { I18nProvider } from "../../../lib/i18n";
import React from "react";

afterEach(cleanup);

describe("InquiryForm (Feature)", () => {
  it("renders all required fields in Arabic by default and switches between project and consultation", () => {
    render(
      <BrowserRouter>
        <I18nProvider initialLocale="ar">
          <InquiryForm />
        </I18nProvider>
      </BrowserRouter>
    );

    expect(screen.getByLabelText(/الاسم الكامل/i)).toBeDefined();
    expect(screen.getByLabelText(/البريد الإلكتروني/i)).toBeDefined();
    expect(screen.getByLabelText(/نوع المشروع/i)).toBeDefined();
    expect(screen.getByLabelText(/تفاصيل الفكرة/i)).toBeDefined();

    // Switch to consultation
    const consultationTab = screen.getByText(/حجز استشارة تقنية معمارية/i);
    fireEvent.click(consultationTab);

    expect(screen.getByLabelText(/مجال الاستشارة المطلوب/i)).toBeDefined();
    expect(screen.getByLabelText(/وسيلة عقد الاستشارة/i)).toBeDefined();
  });
});
