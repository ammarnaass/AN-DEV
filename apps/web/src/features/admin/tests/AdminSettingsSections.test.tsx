/**
 * @vitest-environment jsdom
 */
import React from "react";
import "@testing-library/jest-dom/vitest";
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SettingsLogoSection } from "../components/SettingsLogoSection";
import { SettingsSocialSection } from "../components/SettingsSocialSection";
import { SettingsSeoSection } from "../components/SettingsSeoSection";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

afterEach(cleanup);

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>
  );
};

describe("AdminSettingsSections", () => {
  it("renders SettingsLogoSection and triggers onChange for brand prefix", () => {
    const handleChange = vi.fn();
    const mockSettings = {
      logo_image: "",
      logo_name_prefix: "AN",
      logo_name_suffix: "DEV",
      logo_tagline: "CODE · CREATE · SOLVE",
      logo_display_mode: "full",
    };

    renderWithProviders(
      <SettingsLogoSection settings={mockSettings} onChange={handleChange} />
    );

    expect(screen.getByText("تخصيص الشعار وهوية العلامة التجارية")).toBeInTheDocument();
    expect(screen.getByText("استعادة الشعار الأصلي")).toBeInTheDocument();

    const prefixInput = screen.getByPlaceholderText("AN");
    fireEvent.change(prefixInput, { target: { value: "DZ" } });
    expect(handleChange).toHaveBeenCalledWith("logo_name_prefix", "DZ");
  });

  it("renders SettingsSocialSection with multiple platforms and counts active ones", () => {
    const handleChange = vi.fn();
    const mockSettings = {
      facebook: "https://facebook.com/andev.dz",
      github: "https://github.com/an-dev",
      instagram: "",
    };

    renderWithProviders(
      <SettingsSocialSection settings={mockSettings} onChange={handleChange} />
    );

    expect(screen.getByText("روابط شبكات التواصل الاجتماعي والمجتمعات")).toBeInTheDocument();
    expect(screen.getByText("2 منصات مفعلة")).toBeInTheDocument();
    expect(screen.getByText("صفحة فيسبوك الرسمية")).toBeInTheDocument();
    expect(screen.getByText("منظمة GitHub التقنية")).toBeInTheDocument();
  });

  it("renders SettingsSeoSection and triggers onChange for footer description", () => {
    const handleChange = vi.fn();
    const mockSettings = {
      tagline_ar: "نطوّر برمجيات",
      tagline_en: "We engineer software",
      footer_description_ar: "نبني حلولاً رقمية وتطبيقات قابلة للتوسع بدقة هندسية عالية - ا.",
      footer_description_en: "Algerian software agency",
    };

    renderWithProviders(
      <SettingsSeoSection settings={mockSettings} onChange={handleChange} />
    );

    expect(screen.getByText("مركز إدارة الـ SEO وتصدر محركات البحث (SEO Engine Hub)")).toBeInTheDocument();
    expect(screen.getByText("نبذة وتوصيف الموقع في التذييل (Footer Bio بالعربية)")).toBeInTheDocument();

    const textarea = screen.getByDisplayValue(mockSettings.footer_description_ar);
    fireEvent.change(textarea, { target: { value: "نص جديد معدل" } });
    expect(handleChange).toHaveBeenCalledWith("footer_description_ar", "نص جديد معدل");

    // Test tab switching to Google SERP simulator
    const serpTabBtn = screen.getByText("محاكي Google SERP");
    fireEvent.click(serpTabBtn);
    expect(screen.getByText(/محاكاة بطاقة Google الحقيقية/)).toBeInTheDocument();
  });
});
