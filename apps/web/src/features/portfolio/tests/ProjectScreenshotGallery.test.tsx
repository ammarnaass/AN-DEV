/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import React from "react";
import { ProjectScreenshotGallery } from "../components/ProjectScreenshotGallery";
import { ProjectGalleryItem } from "@andev/shared";

afterEach(cleanup);

describe("ProjectScreenshotGallery component", () => {
  const mockItems: ProjectGalleryItem[] = [
    {
      url: "/uploads/pos-cashier.webp",
      caption_ar: "واجهة نقطة البيع السريعة",
      caption_en: "Ultra-fast POS Checkout UI",
      device_frame: "browser"
    },
    {
      url: "/uploads/pos-mobile.webp",
      caption_ar: "تطبيق الجوال لجرد المخزون",
      caption_en: "Mobile Stock Inventory App",
      device_frame: "mobile"
    }
  ];

  it("renders screenshots within appropriate device frames", () => {
    render(<ProjectScreenshotGallery items={mockItems} title="AN POS" />);

    expect(screen.getByTestId("device-frame-browser")).toBeDefined();
    expect(screen.getByTestId("device-frame-mobile")).toBeDefined();
    expect(screen.getByText("واجهة نقطة البيع السريعة")).toBeDefined();
  });

  it("opens lightbox when a screenshot is clicked", () => {
    render(<ProjectScreenshotGallery items={mockItems} title="AN POS" />);

    const itemBtn = screen.getByTestId("gallery-item-0");
    fireEvent.click(itemBtn);

    expect(screen.getByTestId("screenshot-lightbox")).toBeDefined();
    expect(screen.getByRole("button", { name: /إغلاق|Close/i })).toBeDefined();
  });
});
