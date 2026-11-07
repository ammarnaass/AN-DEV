/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { InquiryForm } from "./InquiryForm";
import { I18nProvider } from "../../lib/i18n";
import React from "react";

afterEach(cleanup);

describe("InquiryForm", () => {
  it("renders all required fields in Arabic by default", () => {
    render(
      <I18nProvider initialLocale="ar">
        <InquiryForm />
      </I18nProvider>
    );
    expect(screen.getByLabelText(/الاسم الكامل/i)).toBeDefined();
    expect(screen.getByLabelText(/البريد الإلكتروني/i)).toBeDefined();
    expect(screen.getByLabelText(/نوع المشروع/i)).toBeDefined();
    expect(screen.getByLabelText(/تفاصيل الفكرة/i)).toBeDefined();
  });
});
