import React from "react";
import { useI18n } from "../../../../lib/i18n";
import { Terminal, Calendar, Clock, Eye, User } from "lucide-react";
import { Post } from "@andev/shared";

export interface PostDetailHeroProps {
  post: Post;
  title: string;
  summary?: string;
  categoryLabel: string;
}

export const PostDetailHero: React.FC<PostDetailHeroProps> = ({
  post,
  title,
  summary,
  categoryLabel,
}) => {
  const { locale } = useI18n();

  return (
    <header className="space-y-6 text-start">
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
  );
};

