import React from "react";
import { Link } from "react-router-dom";
import { useI18n } from "../../../lib/i18n";
import { Post } from "@andev/shared";
import { Calendar, Clock, ArrowLeft, ArrowRight, Eye, User } from "lucide-react";

interface PostCardProps {
  post: Post;
}

const CATEGORY_LABELS: Record<string, { ar: string; en: string }> = {
  architecture: { ar: "معمارية الأنظمة", en: "Architecture" },
  performance: { ar: "الأداء وقواعد البيانات", en: "Databases & Performance" },
  security: { ar: "الأمان والامتثال", en: "Security & Compliance" },
  pos_erp: { ar: "نقاط البيع والمؤسسات", en: "POS & ERP Systems" },
  ai_llm: { ar: "الذكاء الاصطناعي والأتمتة", en: "AI & Automation" },
  frontend: { ar: "هندسة الواجهات", en: "Modern UI/UX" },
  general: { ar: "مقالات عامة", en: "General" }
};

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { locale, isRtl } = useI18n();
  const title = locale === "ar" ? post.title_ar : post.title_en;
  const summary =
    locale === "ar"
      ? post.summary_ar || post.body_md_ar.replace(/[#*`_]/g, "").slice(0, 140)
      : post.summary_en || post.body_md_en.replace(/[#*`_]/g, "").slice(0, 140);

  const categoryLabel =
    CATEGORY_LABELS[post.category || "architecture"]?.[locale as "ar" | "en"] ||
    post.category ||
    "Architecture";

  // Parse tags
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
    <article className="rounded-2xl bg-surface border border-line hover:border-secondary/40 transition-all shadow-sm hover:shadow-card flex flex-col justify-between group text-start overflow-hidden">
      {/* Card Media Header */}
      {post.cover_image && (
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-surface-container">
          <img
            src={post.cover_image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLElement).style.display = "none";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />

          {/* Category Badge Overlay */}
          <div className="absolute top-3 right-3 rtl:right-auto rtl:left-3">
            <span className="px-2.5 py-1 rounded-md bg-background/80 backdrop-blur-md border border-line text-secondary text-[11px] font-mono font-bold shadow-sm">
              {categoryLabel}
            </span>
          </div>

          {/* Reading Time Overlay */}
          <div className="absolute bottom-3 start-3 flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-background/80 backdrop-blur-md border border-line text-text-muted text-[11px] font-mono">
              <Clock className="w-3 h-3 text-secondary" />
              <span>
                {post.reading_time_minutes || 5}{" "}
                {locale === "ar" ? "د قراءة" : "min"}
              </span>
            </span>

            {post.views_count > 0 && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-background/80 backdrop-blur-md border border-line text-text-muted text-[11px] font-mono">
                <Eye className="w-3 h-3 text-text-muted" />
                <span>{post.views_count.toLocaleString()}</span>
              </span>
            )}
          </div>
        </div>
      )}

      {/* Card Content Body */}
      <div className="p-5 sm:p-6 space-y-3 flex-1 flex flex-col justify-between">
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-[11px] font-mono text-text-muted">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-secondary" />
              <span>
                {post.published_at
                  ? new Date(post.published_at).toLocaleDateString(
                      locale === "ar" ? "ar-DZ" : "en-US",
                      { year: "numeric", month: "short", day: "numeric" }
                    )
                  : "2026-11-07"}
              </span>
            </div>

            {tagsList.length > 0 && (
              <span className="text-[10px] text-secondary font-mono">
                #{tagsList[0]}
              </span>
            )}
          </div>

          <Link to={`/blog/${post.slug}`} className="block">
            <h3 className="text-base sm:text-lg font-bold text-text-primary group-hover:text-secondary transition-colors line-clamp-2 leading-snug">
              {title}
            </h3>
          </Link>

          <p className="text-text-muted text-xs sm:text-sm line-clamp-2 leading-relaxed">
            {summary}
          </p>

          {/* Tag Chips Preview */}
          {tagsList.length > 1 && (
            <div className="flex flex-wrap gap-1 pt-1">
              {tagsList.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded bg-surface-container text-text-muted text-[10px] font-mono"
                >
                  #{tag}
                </span>
              ))}
              {tagsList.length > 3 && (
                <span className="text-[10px] text-text-muted font-mono self-center">
                  +{tagsList.length - 3}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Card Footer */}
        <div className="pt-4 mt-4 border-t border-line flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            {post.author_avatar ? (
              <img
                src={post.author_avatar}
                alt={post.author_name || "Author"}
                className="w-5 h-5 rounded-full object-cover border border-line"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
            ) : (
              <User className="w-4 h-4 text-text-muted" />
            )}
            <span className="text-[11px] text-text-muted font-medium truncate max-w-[120px]">
              {post.author_name || (locale === "ar" ? "عمار ناعس" : "Ammar Naas")}
            </span>
          </div>

          <Link
            to={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1 font-semibold text-secondary group-hover:underline"
          >
            <span>{locale === "ar" ? "قراءة المقال" : "Read Article"}</span>
            {isRtl ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
          </Link>
        </div>
      </div>
    </article>
  );
};
