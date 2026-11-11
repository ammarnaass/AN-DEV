import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useI18n } from "../../../lib/i18n";
import { ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import { useBlogPostDetail } from "../hooks/useBlog";
import { BenchmarkBanner } from "../components/BenchmarkBanner";
import { MarkdownArticleRenderer } from "../components/MarkdownArticleRenderer";
import { MetaTags } from "../../../components/seo/MetaTags";
import { PostDetailHero } from "../components/detail/PostDetailHero";
import { PostTableOfContents, HeadingItem } from "../components/detail/PostTableOfContents";
import { PostShareCard } from "../components/detail/PostShareCard";
import { PostTagsChips } from "../components/detail/PostTagsChips";
import { PostConsultingCta } from "../components/detail/PostConsultingCta";

const CATEGORY_LABELS: Record<string, { ar: string; en: string }> = {
  architecture: { ar: "معمارية الأنظمة", en: "System Architecture" },
  performance: { ar: "الأداء وقواعد البيانات", en: "Databases & Performance" },
  security: { ar: "الأمان والامتثال", en: "Security & Compliance" },
  pos_erp: { ar: "نقاط البيع والمؤسسات", en: "POS & ERP Systems" },
  ai_llm: { ar: "الذكاء الاصطناعي والأتمتة", en: "AI & Automation" },
  frontend: { ar: "هندسة الواجهات", en: "Modern UI/UX" },
  general: { ar: "مقالات عامة", en: "General" }
};

export const PostDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { locale, isRtl } = useI18n();
  const { data: post, isLoading, error } = useBlogPostDetail(slug);

  const [headings, setHeadings] = useState<HeadingItem[]>([]);

  if (isLoading) {
    return (
      <div className="pt-32 pb-24 max-w-4xl mx-auto px-4 space-y-6 animate-pulse">
        <div className="h-6 w-32 bg-surface rounded" />
        <div className="h-12 w-3/4 bg-surface rounded" />
        <div className="h-96 bg-surface rounded-xl" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="pt-40 pb-24 max-w-md mx-auto px-4 text-center space-y-4">
        <h2 className="text-xl font-bold text-text-primary">
          {locale === "ar" ? "المقال غير موجود" : "Article Not Found"}
        </h2>
        <Link to="/blog" className="text-secondary hover:underline text-sm font-semibold">
          {locale === "ar" ? "العودة إلى المدونة" : "Back to Blog"}
        </Link>
      </div>
    );
  }

  const title = locale === "ar" ? post.title_ar : post.title_en;
  const summary = locale === "ar" ? post.summary_ar : post.summary_en;
  const body = locale === "ar" ? post.body_md_ar : post.body_md_en;
  const plainSnippet = (summary || body.replace(/[#*`\n]/g, " ")).slice(0, 160).trim();

  const categoryLabel =
    CATEGORY_LABELS[post.category || "architecture"]?.[locale as "ar" | "en"] ||
    post.category ||
    "Architecture";

  const tagsList: string[] = (() => {
    if (Array.isArray(post.tags)) return post.tags;
    if (typeof post.tags_json === "string") {
      try {
        const parsed = JSON.parse(post.tags_json);
        if (Array.isArray(parsed)) return parsed;
      } catch {}
    }
    return [];
  })();

  const shareUrl = typeof window !== "undefined" ? window.location.href : `https://andev.dz/blog/${post.slug}`;
  const shareText = encodeURIComponent(`${title} | AN DEV Engineering Journal`);

  return (
    <article className="pt-24 sm:pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-start">
      <MetaTags
        title={post.seo_title_ar && locale === "ar" ? post.seo_title_ar : title}
        description={post.seo_desc_ar && locale === "ar" ? post.seo_desc_ar : plainSnippet}
        url={`/blog/${post.slug}`}
        type="article"
        publishedTime={post.published_at}
      />

      {/* Top Breadcrumbs & Badges Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-line">
        <div className="flex items-center gap-2 font-mono text-xs text-text-muted">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-secondary hover:text-text-primary transition-colors font-semibold"
          >
            {isRtl ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            <span>{locale === "ar" ? "المدونة الهندسية" : "Engineering Journal"}</span>
          </Link>
          <span>/</span>
          <span className="text-secondary font-bold">{categoryLabel}</span>
          <span>/</span>
          <span className="text-text-primary font-medium truncate max-w-[180px] sm:max-w-none">
            {title}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-surface-container border border-line text-secondary font-mono text-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-status-ok" />
            <span>PRODUCTION VERIFIED</span>
          </span>
        </div>
      </div>

      {/* Post Header Hero */}
      <PostDetailHero
        post={post}
        title={title}
        summary={summary}
        categoryLabel={categoryLabel}
      />

      {/* Architecture Benchmark Metrics Banner */}
      <BenchmarkBanner />

      {/* Main Content & TOC Sidebar Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Article Body Container */}
        <div className="lg:col-span-8 p-6 sm:p-10 rounded-2xl bg-surface border border-line text-text-primary space-y-6 leading-relaxed text-sm sm:text-base font-sans shadow-sm">
          <MarkdownArticleRenderer
            content={body}
            onHeadingsExtracted={setHeadings}
          />

          <PostTagsChips tags={tagsList} />
        </div>

        {/* Right Sticky Sidebar */}
        <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
          <PostTableOfContents headings={headings} />
          <PostShareCard shareUrl={shareUrl} shareText={shareText} />
        </aside>
      </div>

      {/* Bottom Architectural Consulting CTA */}
      <PostConsultingCta />
    </article>
  );
};
