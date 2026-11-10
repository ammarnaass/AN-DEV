import React from "react";
import { useParams, Link } from "react-router-dom";
import { useI18n } from "../../../lib/i18n";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  Terminal,
  ShieldCheck,
  MessageSquare
} from "lucide-react";
import { useBlogPostDetail } from "../hooks/useBlog";
import { BenchmarkBanner } from "../components/BenchmarkBanner";
import { MetaTags } from "../../../components/seo/MetaTags";

export const PostDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { locale, isRtl } = useI18n();
  const { data: post, isLoading, error } = useBlogPostDetail(slug);

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
  const body = locale === "ar" ? post.body_md_ar : post.body_md_en;
  const plainSnippet = body.replace(/[#*`\n]/g, " ").slice(0, 160).trim();

  return (
    <article className="pt-24 sm:pt-28 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-start">
      <MetaTags
        title={title}
        description={plainSnippet}
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
          <span className="text-text-primary font-medium truncate max-w-[200px] sm:max-w-none">
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

      {/* Post Header */}
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-text-muted">
          <span className="flex items-center gap-1.5 text-secondary font-bold">
            <Terminal className="w-3.5 h-3.5" />
            <span>ARCHITECTURE // DATABASE</span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-secondary" />
            <span>
              {post.published_at
                ? new Date(post.published_at).toLocaleDateString(locale === "ar" ? "ar-DZ" : "en-US")
                : "2026-11-07"}
            </span>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-secondary" />
            <span>8 min read</span>
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-text-primary tracking-tight leading-tight">
          {title}
        </h1>
      </header>

      {/* Architecture Benchmark Metrics Banner */}
      <BenchmarkBanner />

      {/* Markdown Content Container */}
      <div className="p-6 sm:p-10 rounded-2xl bg-surface border border-line text-text-primary space-y-6 leading-relaxed text-sm sm:text-base font-sans">
        <div className="whitespace-pre-line prose dark:prose-invert max-w-none text-text-primary">
          {body}
        </div>
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

