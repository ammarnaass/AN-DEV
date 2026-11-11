import React from "react";
import { BioLink } from "@andev/shared";
import {
  ArrowUp,
  ArrowDown,
  Pencil,
  Trash2,
  Star,
  Eye,
  ExternalLink,
  Sparkles
} from "lucide-react";
import { ICON_MAP } from "../constants/bioIcons.constants";

interface BioLinksTableProps {
  links: BioLink[];
  isLoading: boolean;
  onEdit: (link: BioLink) => void;
  onDelete: (id: number, title: string) => void;
  onToggleActive: (link: BioLink) => void;
  onToggleFeatured: (link: BioLink) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
}

export const BioLinksTable: React.FC<BioLinksTableProps> = ({
  links,
  isLoading,
  onEdit,
  onDelete,
  onToggleActive,
  onToggleFeatured,
  onMoveUp,
  onMoveDown,
}) => {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((n) => (
          <div key={n} className="h-16 rounded-xl bg-surface border border-line animate-pulse" />
        ))}
      </div>
    );
  }

  if (links.length === 0) {
    return (
      <div className="p-12 text-center border border-line rounded-2xl bg-surface/40 space-y-2">
        <p className="text-sm text-text-muted">لا توجد روابط مُضافة حتى الآن.</p>
        <p className="text-xs text-text-muted/70">اضغط على زر "إضافة رابط جديد" للبدء.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2.5">
      {links.map((link, index) => {
        const isCustomImg =
          link.icon_or_image?.startsWith("http") ||
          link.icon_or_image?.startsWith("data:");

        return (
          <div
            key={link.id}
            className={`p-3.5 sm:p-4 rounded-xl border bg-surface flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition-all ${
              link.is_active ? "border-line" : "border-line/40 opacity-60 bg-surface/40"
            }`}
          >
            {/* Left Info */}
            <div className="flex items-center gap-3 min-w-0 flex-1">
              {/* Reorder Buttons */}
              <div className="flex flex-col gap-0.5 shrink-0">
                <button
                  type="button"
                  disabled={index === 0}
                  onClick={() => onMoveUp(index)}
                  className="p-1 rounded hover:bg-surface-container disabled:opacity-30 disabled:hover:bg-transparent text-text-muted"
                  title="تحريك لأعلى"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  disabled={index === links.length - 1}
                  onClick={() => onMoveDown(index)}
                  className="p-1 rounded hover:bg-surface-container disabled:opacity-30 disabled:hover:bg-transparent text-text-muted"
                  title="تحريك لأسفل"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Icon / Image Thumbnail */}
              {isCustomImg ? (
                <img
                  src={link.icon_or_image}
                  alt=""
                  className="w-9 h-9 rounded-lg object-cover border border-line shrink-0"
                />
              ) : (
                <div className="w-9 h-9 rounded-lg bg-surface-container border border-line flex items-center justify-center shrink-0 text-secondary">
                  {ICON_MAP[link.icon_or_image] || <Sparkles className="w-4 h-4" />}
                </div>
              )}

              {/* Title & URL */}
              <div className="min-w-0 space-y-0.5 text-start">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-text-primary truncate">
                    {link.title}
                  </span>
                  {link.is_featured && (
                    <span className="px-1.5 py-0.2 rounded bg-amber-400/10 text-amber-500 border border-amber-400/20 text-[10px] font-mono flex items-center gap-0.5">
                      <Star className="w-2.5 h-2.5 fill-current" />
                      <span>مثبت</span>
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-text-muted font-mono truncate">
                  <span className="truncate max-w-[200px] sm:max-w-xs">{link.url}</span>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-secondary"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Actions & Metrics */}
            <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
              {/* Click Count Badge */}
              <div className="px-2.5 py-1 rounded-lg bg-surface-container border border-line text-xs font-mono text-text-muted flex items-center gap-1">
                <Eye className="w-3 h-3 text-secondary" />
                <span>{link.click_count || 0}</span>
              </div>

              {/* Toggle Star */}
              <button
                type="button"
                onClick={() => onToggleFeatured(link)}
                className={`p-2 rounded-lg border transition-colors ${
                  link.is_featured
                    ? "bg-amber-400/10 border-amber-400/30 text-amber-500"
                    : "border-line bg-surface-container text-text-muted hover:text-text-primary"
                }`}
                title={link.is_featured ? "إلغاء التثبيت" : "تثبيت الرابط في الأعلى"}
              >
                <Star className={`w-3.5 h-3.5 ${link.is_featured ? "fill-current" : ""}`} />
              </button>

              {/* Toggle Active */}
              <button
                type="button"
                onClick={() => onToggleActive(link)}
                className={`px-2.5 py-1 rounded-lg border text-xs font-mono font-bold transition-colors ${
                  link.is_active
                    ? "bg-status-ok/10 border-status-ok/30 text-status-ok"
                    : "bg-surface-container border-line text-text-muted"
                }`}
              >
                {link.is_active ? "نشط" : "معطل"}
              </button>

              {/* Edit */}
              <button
                type="button"
                onClick={() => onEdit(link)}
                className="p-2 rounded-lg bg-surface-container border border-line text-text-muted hover:text-secondary transition-colors"
                title="تعديل الرابط"
              >
                <Pencil className="w-3.5 h-3.5" />
              </button>

              {/* Delete */}
              <button
                type="button"
                onClick={() => onDelete(link.id, link.title)}
                className="p-2 rounded-lg bg-surface-container border border-line text-text-muted hover:text-err transition-colors"
                title="حذف الرابط"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
