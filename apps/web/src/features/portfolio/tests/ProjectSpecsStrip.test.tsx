/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import React from "react";
import { ProjectSpecsStrip } from "../components/ProjectSpecsStrip";
import { Project } from "@andev/shared";

afterEach(cleanup);

describe("ProjectSpecsStrip component", () => {
  const mockProject: Project = {
    id: 1,
    slug: "anpos",
    title_ar: "نظام كاشير AN POS",
    title_en: "AN POS System",
    summary_ar: "ملخص كاشير",
    summary_en: "POS summary",
    body_ar: "تفاصيل كاشير",
    body_en: "POS details",
    project_type: "pos",
    version: "v2.4.0",
    package_size: "48 MB",
    platforms_json: ["windows", "android", "pos_terminals"],
    download_url: "https://example.com/anpos-setup.exe",
    enable_live_preview: true,
    gallery_json: [],
    tech_json: ["React", "Fastify"],
    cover_image: "/uploads/cover.webp",
    live_url: "https://anposwebsite.vercel.app",
    repo_url: "",
    featured: true,
    published: true,
    sort_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  it("renders version, package size, type, and download button", () => {
    render(<ProjectSpecsStrip project={mockProject} />);
    expect(screen.getByText(/v2.4.0/i)).toBeDefined();
    expect(screen.getByText(/48 MB/i)).toBeDefined();
    expect(screen.getByTestId("platform-icon-windows")).toBeDefined();
    expect(screen.getByTestId("platform-icon-android")).toBeDefined();
    expect(screen.getByTestId("platform-icon-pos_terminals")).toBeDefined();
    const downloadLink = screen.getByRole("link", { name: /تحميل|Download/i });
    expect(downloadLink.getAttribute("href")).toBe("https://example.com/anpos-setup.exe");
  });
});
