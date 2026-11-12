/**
 * @vitest-environment jsdom
 */
import React from "react";
import "@testing-library/jest-dom/vitest";
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { BioLinksLivePreview } from "../components/BioLinksLivePreview";
import { BioLinkEditModal } from "../components/BioLinkEditModal";
import { AdminBioLinksPage } from "../pages/AdminBioLinksPage";
import { BioLink } from "@andev/shared";

afterEach(cleanup);

const mockLinks: BioLink[] = [
  {
    id: 1,
    title: "موقع وكالة AN DEV الرئيسي",
    url: "https://andev.dz",
    subtitle: "تصفح خدماتنا البرمجية وحلولنا",
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
    click_count: 42,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 2,
    title: "معرض المشاريع ودراسات الحالة",
    url: "https://andev.dz/projects",
    subtitle: "أحدث الأنظمة المنفذة بدقة",
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
    click_count: 18,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const mockSettings = {
  bio_page_title: "AN DEV | استوديو البرمجيات",
  bio_page_bio: "نبني منصات وتطبيقات ويب وهواتف فائقة الجودة بدقة هندسية عالية",
  bio_page_avatar: "/brand/logo-squircle.webp",
  bio_page_bg_type: "mesh",
  bio_page_bg_value: "#090d16",
  whatsapp: "https://wa.me/213555000000",
  github: "https://github.com/an-dev",
};

vi.mock("../../bioLinks/hooks/useBioLinks", () => ({
  useAdminBioLinks: () => ({
    links: mockLinks,
    settings: mockSettings,
    stats: { totalLinks: 2, activeLinks: 2, totalClicks: 60 },
    isLoading: false,
    createBioLink: vi.fn(),
    isCreating: false,
    updateBioLink: vi.fn(),
    isUpdating: false,
    deleteBioLink: vi.fn(),
    reorderBioLinks: vi.fn(),
    isReordering: false,
    updateBioSettings: vi.fn(),
    isUpdatingSettings: false,
  }),
}));

describe("BioLinks Components & Page", () => {
  it("renders BioLinksLivePreview with profile info and active links", () => {
    render(
      <BioLinksLivePreview settings={mockSettings} links={mockLinks} />
    );

    expect(screen.getByText("AN DEV | استوديو البرمجيات")).toBeInTheDocument();
    expect(screen.getByText(/نبني منصات وتطبيقات ويب/)).toBeInTheDocument();
    expect(screen.getAllByText("موقع وكالة AN DEV الرئيسي").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("معرض المشاريع ودراسات الحالة").length).toBeGreaterThanOrEqual(1);
  });

  it("renders BioLinkEditModal and triggers onSave with form input values", async () => {
    const handleSave = vi.fn().mockResolvedValue(undefined);
    const handleClose = vi.fn();

    render(
      <BioLinkEditModal
        isOpen={true}
        link={null}
        onClose={handleClose}
        onSave={handleSave}
        isSaving={false}
      />
    );

    expect(screen.getByText("إضافة رابط مخصص جديد")).toBeInTheDocument();

    const titleInput = screen.getByPlaceholderText("مثال: حجز استشارة برمجية مجانية");
    const urlInput = screen.getByPlaceholderText("https://example.com أو /contact");

    fireEvent.change(titleInput, { target: { value: "قناة التلغرام الرسمية" } });
    fireEvent.change(urlInput, { target: { value: "https://t.me/andev_news" } });

    const submitBtn = screen.getByText("حفظ الرابط");
    fireEvent.click(submitBtn);

    expect(handleSave).toHaveBeenCalledTimes(1);
    expect(handleSave).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "قناة التلغرام الرسمية",
        url: "https://t.me/andev_news",
      })
    );
  });

  it("renders AdminBioLinksPage with stats, links list, and allows tab switching", () => {
    render(
      <BrowserRouter>
        <AdminBioLinksPage />
      </BrowserRouter>
    );

    expect(screen.getByText("صفحة اختصارات الروابط (Bio Links)")).toBeInTheDocument();
    expect(screen.getByText("BIOLINKS_ENGINE // CMS")).toBeInTheDocument();
    expect(screen.getByText("إجمالي النقرات المجمعة")).toBeInTheDocument();
    expect(screen.getByText("60")).toBeInTheDocument();

    // Check tabs
    const appearanceTabBtn = screen.getByText("الهوية والمظهر والخلفية");
    expect(appearanceTabBtn).toBeInTheDocument();
    fireEvent.click(appearanceTabBtn);

    expect(screen.getByText("الهيدر والصورة الشخصية (Hero Header)")).toBeInTheDocument();
    expect(screen.getByText("نمط وخلفية الصفحة (Background Style)")).toBeInTheDocument();
    expect(screen.getByText("Tiktok")).toBeInTheDocument();
  });
});
