import React from "react";
import { Link } from "react-router-dom";
import { useI18n } from "../../../lib/i18n";
import { Post } from "@andev/shared";
import { Clock, Calendar, ArrowLeft, ArrowRight } from "lucide-react";

interface FeaturedPostCardProps {
  post: Post;
}

export const FeaturedPostCard: React.FC<FeaturedPostCardProps> = ({ post }) => {
  const { locale, isRtl } = useI18n();

  return (
    <div className="p-6 sm:p-10 rounded-2xl bg-surface border border-secondary/40 shadow-card relative overflow-hidden text-start group">
      <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-secondary via-primary to-transparent" />
      <div className="space-y-4 max-w-4xl">
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-1 rounded bg-secondary/15 border border-secondary/30 text-secondary font-mono text-xs font-bold uppercase">
            {locale === "ar" ? "دراسة حالة معمارية مميزة // FEATURED" : "Featured Case Study"}
          </span>
          <span className="text-xs font-mono text-text-muted flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-secondary" />
            <span>8 min read</span>
          </span>
        </div>

        <Link to={`/blog/${post.slug}`}>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary group-hover:text-secondary transition-colors leading-snug">
            {locale === "ar" ? post.title_ar : post.title_en}
          </h2>
        </Link>

        <p className="text-text-muted text-sm sm:text-base leading-relaxed line-clamp-3">
          {locale === "ar"
            ? "كيف نجحنا في استبدال خادم قواعد البيانات الخارجي بقاعدة بيانات SQLite مدمجة بنمط Write-Ahead Log ومزامنة Litestream، مما خفض زمن استجابة الـ API من 140ms إلى أقل من 25ms مع توفير 80% من تكاليف الخوادم."
            : "How we replaced external database overhead with embedded SQLite WAL mode and Litestream live replication, slashing latency to under 25ms while trimming 80% infrastructure overhead."}
        </p>

        <div className="pt-2 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-text-muted">
            <Calendar className="w-3.5 h-3.5 text-secondary" />
            <span>
              {post.published_at
                ? new Date(post.published_at).toLocaleDateString(locale === "ar" ? "ar-DZ" : "en-US")
                : "2026-11-07"}
            </span>
          </div>
          <Link
            to={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-secondary group-hover:underline"
          >
            <span>{locale === "ar" ? "قراءة التحليل المعماري كاملاً" : "Read Full Analysis"}</span>
            {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </Link>
        </div>
      </div>
    </div>
  );
};

