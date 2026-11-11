import React from "react";
import { Link } from "react-router-dom";
import { useI18n } from "../../../lib/i18n";
import { Post } from "@andev/shared";
import { Clock, Calendar, ArrowLeft, ArrowRight, Eye, Star, User } from "lucide-react";

interface FeaturedPostCardProps {
  post: Post;
}

const CATEGORY_LABELS: Record<string, { ar: string; en: string }> = {
  architecture: { ar: "معمارية الأنظمة", en: "System Architecture" },
  performance: { ar: "الأداء وقواعد البيانات", en: "Databases & Performance" },
  security: { ar: "الأمان والامتثال", en: "Security & Compliance" },
  pos_erp: { ar: "نقاط البيع والمؤسسات", en: "POS & ERP Systems" },
  ai_llm: { ar: "الذكاء الاصطناعي والأتمتة", en: "AI & Automation" },
  frontend: { ar: "هندسة الواجهات", en: "Modern UI/UX" },
  general: { ar: "مقالات عامة", en: "General" }
};

export const FeaturedPostCard: React.FC<FeaturedPostCardProps> = ({ post }) => {
  const { locale, isRtl } = useI18n();
  const title = locale === "ar" ? post.title_ar : post.title_en;
  const summary =
    locale === "ar"
      ? post.summary_ar ||
        post.body_md_ar.replace(/[#*`_]/g, "").slice(0, 220) + "..."
      : post.summary_en ||
        post.body_md_en.replace(/[#*`_]/g, "").slice(0, 220) + "...";

  const categoryLabel =
    CATEGORY_LABELS[post.category || "architecture"]?.[locale as "ar" | "en"] ||
    post.category ||
    "System Architecture";

  const tagsList: string[] = React.useMemo(() => {
    if (Array.isArray(post.tags)) return post.tags;
    if (typeof post.tags_json === "string") {
      try {
        const parsed = JSON.parse(post.tags_json);
        if (Array.isArray(parsed)) return parsed;
      } catch {}
    }
    return [];
  }, [post]);

  return (
    <div className="rounded-2xl bg-surface border border-secondary/40 shadow-card relative overflow-hidden text-start group">
      <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-secondary via-primary to-transparent" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center p-6 sm:p-8 lg:p-10">
        {/* Left Column: Text & Meta */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-secondary/15 border border-secondary/30 text-secondary font-mono text-xs font-bold uppercase">
              <Star className="w-3.5 h-3.5 fill-secondary text-secondary" />
              <span>
                {locale === "ar"
                  ? "دراسة حالة معمارية مميزة // FEATURED"
                  : "Featured Case Study"}
              </span>
            </span>

            <span className="px-2.5 py-1 rounded-md bg-surface-container border border-line text-text-muted font-mono text-xs">
              {categoryLabel}
            </span>

            <span className="text-xs font-mono text-text-muted flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-secondary" />
              <span>
                {post.reading_time_minutes || 8}{" "}
                {locale === "ar" ? "د قراءة" : "min read"}
              </span>
            </span>
          </div>

          <Link to={`/blog/${post.slug}`} className="block">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary group-hover:text-secondary transition-colors leading-snug">
              {title}
            </h2>
          </Link>

          <p className="text-text-muted text-sm sm:text-base leading-relaxed line-clamp-3">
            {summary}
          </p>

          {/* Tags preview */}
          {tagsList.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {tagsList.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded bg-surface-container border border-line text-text-muted text-xs font-mono"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Author & Action footer */}
          <div className="pt-4 border-t border-line flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {post.author_avatar ? (
                <img
                  src={post.author_avatar}
                  alt={post.author_name || "Author"}
                  className="w-9 h-9 rounded-full object-cover border border-secondary/30"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-surface-container border border-line flex items-center justify-center text-text-muted">
                  <User className="w-4 h-4" />
                </div>
              )}
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-text-primary block">
                  {post.author_name || (locale === "ar" ? "عمار ناعس" : "Ammar Naas")}
                </span>
                <div className="flex items-center gap-2 text-[11px] font-mono text-text-muted">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-secondary" />
                    <span>
                      {post.published_at
                        ? new Date(post.published_at).toLocaleDateString(
                            locale === "ar" ? "ar-DZ" : "en-US",
                            { year: "numeric", month: "short", day: "numeric" }
                          )
                        : "2026-11-07"}
                    </span>
                  </span>
                  {post.views_count > 0 && (
                    <>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3 text-text-muted" />
                        <span>{post.views_count.toLocaleString()}</span>
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <Link
              to={`/blog/${post.slug}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-container text-white text-xs sm:text-sm font-semibold hover:bg-primary/90 transition-all shadow-[0_0_12px_rgba(13,110,253,0.3)] active:scale-[0.98]"
            >
              <span>
                {locale === "ar" ? "قراءة التحليل كاملاً" : "Read Full Analysis"}
              </span>
              {isRtl ? (
                <ArrowLeft className="w-4 h-4" />
              ) : (
                <ArrowRight className="w-4 h-4" />
              )}
            </Link>
          </div>
        </div>

        {/* Right Column: Hero Cover Media */}
        <div className="lg:col-span-5">
          <Link
            to={`/blog/${post.slug}`}
            className="block relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-line shadow-md group/img"
          >
            {post.cover_image ? (
              <img
                src={post.cover_image}
                alt={title}
                className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
            ) : (
              <div className="w-full h-full bg-surface-container flex items-center justify-center text-text-muted font-mono text-xs">
                AN DEV ARCHITECTURE
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent pointer-events-none" />
          </Link>
        </div>
      </div>
    </div>
  );
};
