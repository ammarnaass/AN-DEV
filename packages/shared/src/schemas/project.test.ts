import { describe, it, expect } from "vitest";
import { ProjectSchema } from "./project";

describe("Extended ProjectSchema", () => {
  it("validates project with technical specifications and platforms", () => {
    const input = {
      slug: "test-app",
      title_ar: "تطبيق تجريبي",
      summary_ar: "ملخص تجريبي لتطبيق متكامل",
      body_ar: "تفاصيل وحلول معمارية دقيقة للمشروع...",
      project_type: "mobile",
      version: "v2.1.0",
      package_size: "32.4 MB",
      platforms_json: ["android", "ios"],
      download_url: "https://example.com/download.apk",
      enable_live_preview: false,
      gallery_json: [
        { url: "/uploads/screen1.webp", caption_ar: "شاشة الدخول", device_frame: "mobile" }
      ],
      cover_image: "/uploads/cover.webp"
    };

    const parsed = ProjectSchema.safeParse(input);
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.project_type).toBe("mobile");
      expect(parsed.data.version).toBe("v2.1.0");
      expect(parsed.data.package_size).toBe("32.4 MB");
      expect(parsed.data.platforms_json).toEqual(["android", "ios"]);
      expect(parsed.data.download_url).toBe("https://example.com/download.apk");
      expect(parsed.data.enable_live_preview).toBe(false);
      expect(parsed.data.gallery_json.length).toBe(1);
      expect(parsed.data.gallery_json[0].device_frame).toBe("mobile");
    }
  });

  it("provides sensible defaults for new fields if omitted", () => {
    const input = {
      slug: "minimal-app",
      title_ar: "تطبيق تجريبي أدنى",
      summary_ar: "ملخص تجريبي مصغر",
      body_ar: "تفاصيل وحلول معمارية دقيقة للمشروع...",
      cover_image: "/uploads/cover.webp"
    };

    const parsed = ProjectSchema.safeParse(input);
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.project_type).toBe("web");
      expect(parsed.data.version).toBe("v1.0.0");
      expect(parsed.data.package_size).toBe("");
      expect(parsed.data.platforms_json).toEqual(["web"]);
      expect(parsed.data.download_url).toBe("");
      expect(parsed.data.enable_live_preview).toBe(true);
      expect(parsed.data.gallery_json).toEqual([]);
      expect(parsed.data.type_specs_json).toEqual({});
    }
  });

  it("validates specialized type specifications for POS and ERP", () => {
    const posInput = {
      slug: "anpos-retail",
      title_ar: "نظام كاشير",
      summary_ar: "نقاط بيع ومحاسبة",
      body_ar: "تفاصيل النظام المحاسبي المتكامل والتوافق الجبائي الجزائري",
      project_type: "pos",
      type_specs_json: {
        printer_sizes: ["80mm", "58mm"],
        peripherals: ["barcode_scanner", "cash_drawer"],
        fiscal_compliant: true,
        offline_engine: "SQLite Local Engine",
        cloud_sync: true
      },
      cover_image: "/uploads/cover.webp"
    };

    const parsedPos = ProjectSchema.safeParse(posInput);
    expect(parsedPos.success).toBe(true);
    if (parsedPos.success) {
      expect((parsedPos.data.type_specs_json as any).fiscal_compliant).toBe(true);
      expect((parsedPos.data.type_specs_json as any).printer_sizes).toContain("80mm");
    }
  });
});

