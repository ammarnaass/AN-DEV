import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useI18n } from "../lib/i18n";
import { apiFetch } from "../lib/api";
import { Post } from "@andev/shared";
import { ArrowLeft, ArrowRight, Calendar } from "lucide-react";

export const PostDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { locale, isRtl } = useI18n();

  const { data: post, isLoading, error } = useQuery<Post>({
    queryKey: ["post-detail", slug],
    queryFn: () => apiFetch<Post>(`/api/posts/${slug}`),
    enabled: !!slug
  });

  if (isLoading) {
    return (
      <div className="pt-36 pb-24 max-w-2xl mx-auto p-inline-safe space-y-6 animate-pulse">
        <div className="h-6 w-32 bg-surface rounded" />
        <div className="h-10 w-full bg-surface rounded" />
        <div className="h-60 bg-surface rounded-card" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="pt-40 pb-24 max-w-md mx-auto p-inline-safe text-center space-y-4">
        <h2 className="text-xl font-bold text-ink">
          {locale === "ar" ? "المقال غير موجود" : "Article Not Found"}
        </h2>
        <Link to="/blog" className="text-primary hover:underline text-sm">
          {locale === "ar" ? "العودة إلى المدونة" : "Back to Blog"}
        </Link>
      </div>
    );
  }

  const title = locale === "ar" ? post.title_ar : post.title_en;
  const body = locale === "ar" ? post.body_md_ar : post.body_md_en;

  return (
    <article className="pt-20 sm:pt-24 pb-20 max-w-2xl mx-auto p-inline-safe space-y-8 text-start">
      {/* Back to Blog */}
      <div>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-mute hover:text-accent transition-colors"
        >
          {isRtl ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
          <span>{locale === "ar" ? "العودة إلى المدونة" : "Back to Blog"}</span>
        </Link>
      </div>

      {/* Post Header */}
      <header className="space-y-4 border-b border-line pb-8">
        <div className="flex items-center gap-2 text-xs font-mono text-accent">
          <Calendar className="w-3.5 h-3.5" />
          <span>{post.published_at ? new Date(post.published_at).toLocaleDateString(locale === "ar" ? "ar-DZ" : "en-US") : "2026-11-07"}</span>
          <span>•</span>
          <span>AN DEV Engineering</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight leading-snug">
          {title}
        </h1>
      </header>

      {/* Post Markdown Content (around 70 characters line length per PRD) */}
      <div className="prose prose-invert max-w-none space-y-5 text-ink/90 text-base sm:text-lg leading-[1.8] font-sans">
        <div className="whitespace-pre-line">
          {body}
        </div>
      </div>
    </article>
  );
};
