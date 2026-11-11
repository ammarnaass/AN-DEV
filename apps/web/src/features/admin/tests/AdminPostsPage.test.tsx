/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { AdminPostsPage } from "../pages/AdminPostsPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { I18nProvider } from "../../../lib/i18n";
import React from "react";

afterEach(cleanup);

describe("AdminPostsPage (Feature)", () => {
  const createWrapper = () => {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    return ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>
        <I18nProvider initialLocale="ar">{children}</I18nProvider>
      </QueryClientProvider>
    );
  };

  it("renders page header and metric banners", () => {
    render(<AdminPostsPage />, { wrapper: createWrapper() });

    expect(
      screen.getByText(/إدارة المدونة الهندسية والتقنية/i)
    ).toBeDefined();
    expect(screen.getByText(/إجمالي المقالات/i)).toBeDefined();
    expect(screen.getByText(/المقالات المنشورة/i)).toBeDefined();
    expect(screen.getAllByText(/المسودات/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/مقالات مميزة/i)).toBeDefined();
  });

  it("renders status filter pills and category selectors", () => {
    render(<AdminPostsPage />, { wrapper: createWrapper() });

    expect(screen.getByRole("button", { name: /الكل/i })).toBeDefined();
    expect(screen.getByRole("button", { name: /المنشورة/i })).toBeDefined();
    expect(screen.getByRole("button", { name: /المسودات/i })).toBeDefined();
    expect(screen.getByRole("button", { name: /المميزة/i })).toBeDefined();
    expect(
      screen.getByRole("button", { name: /معمارية الأنظمة/i })
    ).toBeDefined();
  });

  it("opens create post modal when clicking new post button", () => {
    render(<AdminPostsPage />, { wrapper: createWrapper() });

    const newBtn = screen.getByRole("button", { name: /مقال تقني جديد/i });
    fireEvent.click(newBtn);

    expect(
      screen.getByText(/إضافة مقال تقني جديد للمدونة/i)
    ).toBeDefined();
    expect(screen.getByText(/المحتوى العربي \(RTL\)/i)).toBeDefined();
    expect(screen.getByText(/English Content \(LTR\)/i)).toBeDefined();
  });
});
