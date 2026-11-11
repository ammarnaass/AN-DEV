import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useI18n } from "../../../lib/i18n";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  Terminal,
  ShieldCheck,
  MessageSquare,
  Eye,
  Share2,
  Check,
  Copy,
  ListTree,
  User
} from "lucide-react";
import { useBlogPostDetail } from "../hooks/useBlog";
import { BenchmarkBanner } from "../components/BenchmarkBanner";
import { MarkdownArticleRenderer } from "../components/MarkdownArticleRenderer";
import { MetaTags } from "../../../components/seo/MetaTags";

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

  const [headings, setHeadings] = useState<Array<{ id: string; text: string; level: number }>>([]);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch {
      // ignore
    }
  };

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

  // Parse tags list
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
      <header className="space-y-6">
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-text-muted">
          <span className="flex items-center gap-1.5 text-secondary font-bold">
            <Terminal className="w-3.5 h-3.5" />
            <span>{categoryLabel.toUpperCase()}</span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-secondary" />
            <span>
              {post.published_at
                ? new Date(post.published_at).toLocaleDateString(locale === "ar" ? "ar-DZ" : "en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "2026-11-07"}
            </span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-secondary" />
            <span>
              {post.reading_time_minutes || 5} {locale === "ar" ? "دقائق قراءة" : "min read"}
            </span>
          </span>
          {post.views_count > 0 && (
            <>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-text-muted" />
                <span>
                  {post.views_count.toLocaleString()} {locale === "ar" ? "مشاهدة" : "views"}
                </span>
              </span>
            </>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-text-primary tracking-tight leading-tight">
          {title}
        </h1>

        {/* Executive Summary */}
        {summary && (
          <div className="p-4 sm:p-5 rounded-xl bg-surface-container/60 border border-secondary/30 text-text-primary text-sm sm:text-base leading-relaxed">
            <span className="font-mono text-xs text-secondary font-bold block mb-1">
              {locale === "ar" ? "الموجز المعماري // EXECUTIVE SUMMARY" : "EXECUTIVE SUMMARY"}
            </span>
            <p className="text-text-muted">{summary}</p>
          </div>
        )}

        {/* Author Profile Card */}
        <div className="flex items-center gap-3.5 pt-2">
          {post.author_avatar ? (
            <img
              src={post.author_avatar}
              alt={post.author_name || "Author"}
              className="w-11 h-11 rounded-full object-cover border-2 border-secondary/40 shadow-sm"
              onError={(e) => {
                (e.target as HTMLElement).style.display = "none";
              }}
            />
          ) : (
            <div className="w-11 h-11 rounded-full bg-surface-container border border-line flex items-center justify-center text-text-muted">
              <User className="w-5 h-5" />
            </div>
          )}
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-text-primary">
                {post.author_name || (locale === "ar" ? "عمار ناعس" : "Ammar Naas")}
              </span>
              <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-secondary/15 text-secondary border border-secondary/30 font-semibold">
                AUTHOR
              </span>
            </div>
            <span className="text-xs text-text-muted block">
              {post.author_role || "Senior Systems Architect · AN DEV Core Team"}
            </span>
          </div>
        </div>

        {/* Cover Image Banner */}
        {post.cover_image && (
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-line shadow-card">
            <img
              src={post.cover_image}
              alt={title}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLElement).style.display = "none";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent pointer-events-none" />
          </div>
        )}
      </header>

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

          {/* Tags Chips in Bottom */}
          {tagsList.length > 0 && (
            <div className="pt-8 mt-8 border-t border-line space-y-2">
              <span className="text-xs font-mono text-text-muted block">
                {locale === "ar" ? "التقنيات والمفاهيم المعمارية المشروحة:" : "Referenced Technologies & Concepts:"}
              </span>
              <div className="flex flex-wrap gap-2">
                {tagsList.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-lg bg-surface-container border border-line text-secondary text-xs font-mono"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Sticky Sidebar */}
        <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
          {/* Table of Contents (TOC) Card */}
          {headings.length > 0 && (
            <div className="p-5 rounded-2xl bg-surface border border-line space-y-3 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-mono text-secondary font-bold pb-2 border-b border-line">
                <ListTree className="w-4 h-4" />
                <span>{locale === "ar" ? "فهرس المحتوى (TOC)" : "TABLE OF CONTENTS"}</span>
              </div>
              <nav className="space-y-1.5 max-h-[360px] overflow-y-auto pr-1">
                {headings.map((h) => (
                  <a
                    key={h.id}
                    href={`#${h.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const el = document.getElementById(h.id);
                      if (el) {
                        el.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className={`block text-xs py-1 transition-colors hover:text-secondary ${
                      h.level === 3
                        ? "ps-4 text-text-muted text-[11px]"
                        : "font-semibold text-text-primary"
                    }`}
                  >
                    {h.text}
                  </a>
                ))}
              </nav>
            </div>
          )}

          {/* Share Article Card */}
          <div className="p-5 rounded-2xl bg-surface border border-line space-y-3 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-mono text-secondary font-bold pb-2 border-b border-line">
              <Share2 className="w-4 h-4" />
              <span>{locale === "ar" ? "مشاركة المقال التقني" : "SHARE ARTICLE"}</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <a
                href={`https://wa.me/?text=${shareText}%20${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-surface-container hover:bg-surface-elevated border border-line text-xs font-medium text-center text-text-primary hover:text-secondary transition-all"
              >
                واتساب (WhatsApp)
              </a>

              <a
                href={`https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-surface-container hover:bg-surface-elevated border border-line text-xs font-medium text-center text-text-primary hover:text-secondary transition-all"
              >
                منصة X (Twitter)
              </a>

              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-surface-container hover:bg-surface-elevated border border-line text-xs font-medium text-center text-text-primary hover:text-secondary transition-all col-span-2"
              >
                LinkedIn لينكد إن
              </a>
            </div>

            <button
              type="button"
              onClick={handleCopyLink}
              className="w-full py-2.5 px-3 rounded-lg bg-secondary/15 hover:bg-secondary/25 border border-secondary/30 text-secondary text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-status-ok" />
                  <span className="text-status-ok">
                    {locale === "ar" ? "تم نسخ الرابط للحافظة!" : "Link Copied!"}
                  </span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{locale === "ar" ? "نسخ رابط المقال" : "Copy Article Link"}</span>
                </>
              )}
            </button>
          </div>
        </aside>
      </div>

      {/* Bottom Architectural Consulting CTA */}
      <div className="p-8 rounded-2xl bg-gradient-to-r from-surface via-surface-elevated to-surface border border-secondary/40 shadow-card flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-start">
          <h3 className="text-lg sm:text-xl font-bold text-text-primary">
            {locale === "ar"
              ? "هل تواجه بطئاً أو اختناقات معمارية في نظامك الحالي؟"
              : "Facing performance bottlenecks in your existing architecture?"}
          </h3>
          <p className="text-text-muted text-xs sm:text-sm">
            {locale === "ar"
              ? "فريق AN DEV جاهز لمراجعة الكود، تدقيق قواعد البيانات، وتقديم استشارة هندسية ملموسة."
              : "Our senior engineers conduct comprehensive code reviews and performance audits."}
          </p>
        </div>
        <Link to="/contact" className="shrink-0">
          <button className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-primary-container text-white font-semibold text-sm hover:bg-primary/90 transition-all shadow-[0_0_16px_rgba(13,110,253,0.35)] active:scale-[0.98]">
            <MessageSquare className="w-4 h-4" />
            <span>{locale === "ar" ? "طلب استشارة معمارية" : "Request Technical Audit"}</span>
          </button>
        </Link>
      </div>
    </article>
  );
};
