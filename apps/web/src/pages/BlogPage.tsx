import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useI18n } from "../lib/i18n";
import { apiFetch } from "../lib/api";
import { Post } from "@andev/shared";
import { BookOpen, Calendar, ArrowLeft, ArrowRight } from "lucide-react";

export const BlogPage: React.FC = () => {
  const { locale, isRtl } = useI18n();

  const { data: posts = [], isLoading } = useQuery<Post[]>({
    queryKey: ["public-posts"],
    queryFn: () => apiFetch<Post[]>("/api/posts")
  });

  return (
    <div className="pt-20 sm:pt-24 pb-20 max-w-4xl mx-auto p-inline-safe space-y-12 text-start">
      {/* Header */}
      <div className="space-y-4 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-line bg-surface text-xs font-mono text-accent">
          <BookOpen className="w-3.5 h-3.5" />
          <span>{locale === "ar" ? "مدونة AN DEV التقنية" : "AN DEV Engineering Blog"}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-ink tracking-tight">
          {locale === "ar" ? "رؤى وتجارب في هندسة البرمجيات" : "Insights & Software Engineering Craft"}
        </h1>
        <p className="text-mute text-base leading-relaxed">
          {locale === "ar"
            ? "مقالات تقنية وتجارب عملية في بناء تطبيقات سريعة، حلول المعمارية، وتطوير المنتجات الرقمية."
            : "Practical architectural patterns, performance optimization tips, and engineering lessons."}
        </p>
      </div>

      {/* Posts List */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2].map(i => (
            <div key={i} className="h-32 rounded-card border border-line bg-surface/40 animate-pulse" />
          ))}
        </div>
      ) : posts.length > 0 ? (
        <div className="divide-y divide-line">
          {posts.map(p => {
            const title = locale === "ar" ? p.title_ar : p.title_en;
            return (
              <article key={p.id} className="py-8 group">
                <Link to={`/blog/${p.slug}`} className="block space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-mute">
                    <Calendar className="w-3.5 h-3.5 text-primary" />
                    <span>{p.published_at ? new Date(p.published_at).toLocaleDateString(locale === "ar" ? "ar-DZ" : "en-US") : "2026-11-07"}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-ink group-hover:text-accent transition-colors">
                    {title}
                  </h2>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-primary group-hover:text-accent pt-1">
                    <span>{locale === "ar" ? "قراءة المقال كاملاً" : "Read full article"}</span>
                    {isRtl ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="py-16 text-center text-mute border border-line rounded-card bg-surface/30">
          {locale === "ar" ? "لا توجد مقالات منشورة حالياً" : "No articles published yet."}
        </div>
      )}
    </div>
  );
};

