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
});
