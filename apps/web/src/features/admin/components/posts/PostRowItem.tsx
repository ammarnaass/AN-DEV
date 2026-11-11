import React from "react";
import { Post } from "@andev/shared";
import {
  Eye,
  Clock,
  Star,
  Edit2,
  Trash2,
  ExternalLink,
  CheckCircle2,
  XCircle,
} from "lucide-react";

export const POST_CATEGORY_NAMES: Record<string, { ar: string; en: string }> = {
  architecture: { ar: "معمارية الأنظمة", en: "Architecture" },
  performance: { ar: "الأداء وقواعد البيانات", en: "Databases & Performance" },
  security: { ar: "الأمان والامتثال", en: "Security & Compliance" },
  pos_erp: { ar: "نقاط البيع والمؤسسات", en: "POS & ERP Systems" },
  ai_llm: { ar: "الذكاء الاصطناعي", en: "AI & Automation" },
  frontend: { ar: "هندسة الواجهات", en: "Modern UI/UX" },
  general: { ar: "مقالات عامة", en: "General" }
};

export interface PostRowItemProps {
  post: Post;
  onEdit: (post: Post) => void;
  onDelete: (post: Post) => void;
  onTogglePublish: (id: number) => void;
  onToggleFeatured: (id: number) => void;
}

export const PostRowItem: React.FC<PostRowItemProps> = ({
  post,
  onEdit,
  onDelete,
  onTogglePublish,
  onToggleFeatured,
}) => {
  const cat = POST_CATEGORY_NAMES[post.category] || { ar: post.category, en: post.category };
  const tags = Array.isArray(post.tags) ? post.tags : [];

  return (
    <tr
      onClick={() => onEdit(post)}
      className="hover:bg-surface-elevated/50 transition-colors cursor-pointer text-start"
    >
      {/* Title & Cover */}
      <td className="p-4">
        <div className="flex items-center gap-3">
          <img
            src={post.cover_image || "/uploads/blog/default.webp"}
            alt={post.title_ar}
            className="w-14 h-14 rounded-lg object-cover border border-line bg-surface-container shrink-0"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&q=80";
            }}
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-text-primary text-sm line-clamp-1">
                {post.title_ar}
              </span>
              {post.featured && (
                <span className="px-1.5 py-0.2 rounded bg-secondary/15 text-secondary border border-secondary/30 text-[10px] font-bold shrink-0">
                  مميز
                </span>
              )}
            </div>
            <div className="text-xs text-text-muted font-mono line-clamp-1">
              {post.title_en}
            </div>
            <div className="text-[11px] font-mono text-secondary">
              /{post.slug}
            </div>
          </div>
        </div>
      </td>

      {/* Category & Tags */}
      <td className="p-4">
        <div className="space-y-1.5 text-xs font-mono">
          <span className="px-2 py-0.5 rounded bg-surface-container border border-line text-text-primary font-bold inline-block">
            {cat.ar}
          </span>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1 max-w-xs">
              {tags.slice(0, 3).map((tag, idx) => (
                <span
                  key={idx}
                  className="px-1.5 py-0.2 rounded bg-surface-elevated text-text-muted text-[10px]"
                >
                  #{tag}
                </span>
              ))}
              {tags.length > 3 && (
                <span className="text-[10px] text-text-muted">
                  +{tags.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </td>

      {/* Metrics */}
      <td className="p-4 text-center">
        <div className="space-y-1 text-xs font-mono text-text-muted">
          <div className="flex items-center justify-center gap-1.5 text-text-primary font-bold">
            <Eye className="w-3.5 h-3.5 text-secondary" />
            <span>{post.views_count || 0}</span>
          </div>
          <div className="flex items-center justify-center gap-1 text-[11px]">
            <Clock className="w-3 h-3" />
            <span>{post.reading_time_minutes || 5} دقائق</span>
          </div>
        </div>
      </td>

      {/* Status Toggle Switches */}
      <td className="p-4 text-center">
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={e => {
              e.stopPropagation();
              onTogglePublish(post.id);
            }}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-mono font-semibold border transition-all ${
              post.published
                ? "bg-ok/15 text-ok border-ok/30"
                : "bg-surface-container text-text-muted border-line hover:text-text-primary"
            }`}
            title={post.published ? "منشور (انقر لتحويله لمسودة)" : "مسودة (انقر للنشر)"}
          >
            {post.published ? (
              <>
                <CheckCircle2 className="w-3 h-3 text-ok" />
                <span>منشور</span>
              </>
            ) : (
              <>
                <XCircle className="w-3 h-3 text-text-muted" />
                <span>مسودة</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={e => {
              e.stopPropagation();
              onToggleFeatured(post.id);
            }}
            className={`p-1.5 rounded-lg border transition-all ${
              post.featured
                ? "bg-secondary/20 text-secondary border-secondary/40 shadow-sm"
                : "bg-surface-container text-text-muted border-line hover:text-secondary"
            }`}
            title={post.featured ? "مقال مميز (انقر لإلغاء التمييز)" : "تمييز المقال"}
          >
            <Star className={`w-3.5 h-3.5 ${post.featured ? "fill-secondary" : ""}`} />
          </button>
        </div>
      </td>

      {/* Actions */}
      <td className="p-4 text-center">
        <div className="flex items-center justify-center gap-1.5">
          <a
            href={`/blog/${post.slug}`}
            target="_blank"
            rel="noreferrer"
            onClick={e => e.stopPropagation()}
            className="p-1.5 rounded-lg bg-surface-container border border-line text-text-muted hover:text-text-primary hover:border-secondary/40 transition-colors"
            title="فتح المقال في الموقع العام"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            type="button"
            onClick={e => {
              e.stopPropagation();
              onEdit(post);
            }}
            className="px-2.5 py-1 rounded-lg bg-surface-container border border-line text-xs font-semibold text-secondary hover:bg-surface-elevated transition-colors inline-flex items-center gap-1"
          >
            <Edit2 className="w-3 h-3" />
            <span>تعديل</span>
          </button>

          <button
            type="button"
            onClick={e => {
              e.stopPropagation();
              onDelete(post);
            }}
            className="p-1.5 rounded-lg text-text-muted hover:text-err hover:bg-err/10 transition-colors"
            title="حذف المقال"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </td>
    </tr>
  );
};

