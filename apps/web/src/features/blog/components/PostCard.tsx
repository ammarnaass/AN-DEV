import React from "react";
import { Link } from "react-router-dom";
import { useI18n } from "../../../lib/i18n";
import { Post } from "@andev/shared";
import { Calendar, ArrowLeft, ArrowRight } from "lucide-react";

interface PostCardProps {
  post: Post;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { locale, isRtl } = useI18n();
  const title = locale === "ar" ? post.title_ar : post.title_en;

  return (
    <article className="p-6 rounded-xl bg-surface border border-line hover:border-secondary/40 transition-all shadow-sm flex flex-col justify-between group text-start">
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-mono text-text-muted">
          <Calendar className="w-3.5 h-3.5 text-secondary" />
          <span>
            {post.published_at
              ? new Date(post.published_at).toLocaleDateString(locale === "ar" ? "ar-DZ" : "en-US")
              : "2026-11-07"}
          </span>
        </div>

        <Link to={`/blog/${post.slug}`}>
          <h3 className="text-lg sm:text-xl font-bold text-text-primary group-hover:text-secondary transition-colors line-clamp-2">
            {title}
          </h3>
        </Link>

        <p className="text-text-muted text-xs sm:text-sm line-clamp-2 leading-relaxed">
          {post.body_md_ar ? post.body_md_ar.replace(/[#*`_]/g, "").slice(0, 150) : ""}
        </p>
      </div>

      <div className="pt-4 mt-4 border-t border-line flex items-center justify-between text-xs font-semibold text-secondary">
        <span>{locale === "ar" ? "قراءة المقال" : "Read Article"}</span>
        {isRtl ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
      </div>
    </article>
  );
};

