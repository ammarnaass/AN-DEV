import { describe, it, expect } from "vitest";
import { PostSchema } from "./post";

describe("Enhanced PostSchema", () => {
  it("validates a professional technical article with full metadata", () => {
    const postData = {
      slug: "fastify-postgres-high-throughput-architecture",
      title_ar: "معمارية معالجة التدفقات العالية باستخدام Fastify و PostgreSQL",
      title_en: "High-Throughput Streaming Architecture with Fastify & PostgreSQL",
      summary_ar: "دليل عملي لتصميم وبناء واجهات برمجية تدعم أكثر من 10,000 طلب بالثانية مع معالجة غير متزامنة.",
      summary_en: "Practical guide to designing APIs handling 10k+ req/sec with non-blocking I/O and pooling.",
      body_md_ar: "## المقدمة المعمارية\n\nتعتبر معمارية Fastify من أسرع أطر العمل المبنية على Node.js...",
      body_md_en: "## Architectural Introduction\n\nFastify provides extreme throughput with schema-based serialization...",
      cover_image: "/uploads/blog/fastify-architecture.webp",
      category: "architecture",
      tags: ["Fastify", "PostgreSQL", "High Throughput", "Node.js"],
      author_name: "عمار ناعس",
      author_role: "Senior Systems Architect",
      author_avatar: "/uploads/author.webp",
      reading_time_minutes: 7,
      featured: true,
      published: true
    };

    const result = PostSchema.safeParse(postData);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.category).toBe("architecture");
      expect(result.data.reading_time_minutes).toBe(7);
      expect(result.data.featured).toBe(true);
      expect(result.data.tags.length).toBe(4);
    }
  });

  it("applies sensible defaults when optional fields are omitted", () => {
    const minimalPost = {
      slug: "clean-architecture-guide",
      title_ar: "دليل المعمارية النظيفة",
      title_en: "Clean Architecture Guide",
      body_md_ar: "تفاصيل المعمارية النظيفة وشرح الطبقات الثلاث...",
      body_md_en: "Clean architecture details explaining the three domain layers..."
    };

    const result = PostSchema.safeParse(minimalPost);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.category).toBe("architecture");
      expect(result.data.reading_time_minutes).toBe(5);
      expect(result.data.featured).toBe(false);
      expect(result.data.published).toBe(true);
      expect(result.data.cover_image).toBe("/uploads/blog/default.webp");
    }
  });

  it("rejects invalid slugs containing spaces or uppercase characters", () => {
    const invalidPost = {
      slug: "Invalid Slug With Spaces",
      title_ar: "عنوان تجريبي",
      title_en: "Test Title",
      body_md_ar: "محتوى المقال التجريبي باللغة العربية...",
      body_md_en: "Test content in English for the article..."
    };

    const result = PostSchema.safeParse(invalidPost);
    expect(result.success).toBe(false);
  });
});
