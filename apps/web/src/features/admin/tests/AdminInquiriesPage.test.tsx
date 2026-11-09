/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { AdminInquiriesPage } from "../pages/AdminInquiriesPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { I18nProvider } from "../../../lib/i18n";
import React from "react";

afterEach(cleanup);

describe("AdminInquiriesPage (Feature)", () => {
  it("renders status filter pills", () => {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <I18nProvider initialLocale="ar">
          <AdminInquiriesPage />
        </I18nProvider>
      </QueryClientProvider>
    );
    expect(screen.getByRole("button", { name: /جميع الطلبات/i })).toBeDefined();
    expect(screen.getByRole("button", { name: /جديد/i })).toBeDefined();
    expect(screen.getByRole("button", { name: /قيد المتابعة/i })).toBeDefined();
  });
});

