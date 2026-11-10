/**
 * @vitest-environment jsdom
 */
import React from "react";
import "@testing-library/jest-dom/vitest";
import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BioLinksPage } from "./BioLinksPage";

afterEach(cleanup);

const mockBioData = {
  settings: {
    bio_page_title: "AN DEV | وكالة البرمجيات",
    bio_page_bio: "نبني حلولاً رقمية وتطبيقات قابلة للتوسع بدقة هندسية عالية.",
    bio_page_avatar: "/brand/logo-squircle.webp",
    bio_page_bg_type: "mesh",
    whatsapp: "https://wa.me/213555000000",
    github: "https://github.com/an-dev",
  },
  links: [
    {
      id: 1,
      title: "الموقع الرسمي لوكالة AN DEV",
      url: "https://andev.dz",
      subtitle: "تصفح خدماتنا البرمجية",
      icon_or_image: "Globe",
      font_family: "cairo",
      text_color: "#ffffff",
      bg_color: "#0d6efd",
      border_color: "#0d6efd",
      style_variant: "solid",
      gradient_from: null,
      gradient_to: null,
      is_active: true,
      is_featured: true,
      sort_order: 10,
      click_count: 50,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: 2,
      title: "معرض المشاريع التقنية",
      url: "https://andev.dz/projects",
      subtitle: "أنظمة ويب وموبايل منفذة بدقة",
      icon_or_image: "FolderKanban",
      font_family: "tajawal",
      text_color: "#ffffff",
      bg_color: "#1e293b",
      border_color: "#334155",
      style_variant: "outline",
      gradient_from: null,
      gradient_to: null,
      is_active: true,
      is_featured: false,
      sort_order: 20,
      click_count: 25,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ],
};

vi.mock("../features/bioLinks/hooks/useBioLinks", () => ({
  usePublicBioLinks: () => ({
    links: mockBioData.links,
    settings: mockBioData.settings,
    isLoading: false,
    trackClick: vi.fn(),
  }),
}));

describe("BioLinksPage (Dual-Theme Adaptation)", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    localStorage.clear();
    document.documentElement.setAttribute("data-theme", "dark");
  });

  it("renders profile header, title, bio and links in default dark mode", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <BioLinksPage />
        </BrowserRouter>
      </QueryClientProvider>
    );

    expect(screen.getByText("AN DEV | وكالة البرمجيات")).toBeInTheDocument();
    expect(
      screen.getByText(/نبني حلولاً رقمية وتطبيقات قابلة للتوسع/)
    ).toBeInTheDocument();
    expect(screen.getByText("الموقع الرسمي لوكالة AN DEV")).toBeInTheDocument();
    expect(screen.getByText("معرض المشاريع التقنية")).toBeInTheDocument();
  });

  it("toggles theme between dark and light mode when clicking theme button", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <BioLinksPage />
        </BrowserRouter>
      </QueryClientProvider>
    );

    const themeToggleBtn = screen.getByLabelText("Toggle Theme Mode");
    expect(themeToggleBtn).toBeInTheDocument();

    // Toggle to Light Mode
    fireEvent.click(themeToggleBtn);
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
    expect(document.documentElement.classList.contains("light")).toBe(true);
    expect(localStorage.getItem("andev-theme")).toBe("light");

    // Toggle back to Dark Mode
    fireEvent.click(themeToggleBtn);
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(localStorage.getItem("andev-theme")).toBe("dark");
  });
});

