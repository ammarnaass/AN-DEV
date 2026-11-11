import React from "react";
import { ProjectGalleryItem } from "@andev/shared";
import { Upload, Trash2, ArrowUp, ArrowDown } from "lucide-react";

export interface ProjectGalleryItemCardProps {
  item: ProjectGalleryItem;
  index: number;
  totalItems: number;
  isUploading: boolean;
  onUpdate: (updates: Partial<ProjectGalleryItem>) => void;
  onMove: (direction: "up" | "down") => void;
  onRemove: () => void;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ProjectGalleryItemCard: React.FC<ProjectGalleryItemCardProps> = ({
  item,
  index,
  totalItems,
  isUploading,
  onUpdate,
  onMove,
  onRemove,
  onFileUpload,
}) => {
  return (
    <div className="p-4 rounded-xl border border-line bg-surface-container/50 space-y-3 relative group text-start">
      {/* Header with frame selector and actions */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-line">
        <span className="text-xs font-mono font-bold text-secondary">
          #{index + 1}
        </span>

        <div className="flex items-center gap-2">
          {/* Device Frame Dropdown */}
          <div className="flex items-center gap-1">
            <span className="text-[11px] font-mono text-text-muted">إطار الجهاز:</span>
            <select
              value={item.device_frame}
              onChange={e => onUpdate({ device_frame: e.target.value as any })}
              className="h-8 px-2 rounded border border-line bg-surface text-xs font-semibold text-text-primary focus:outline-none focus:border-secondary"
            >
              <option value="browser">متصفح ويب (Browser)</option>
              <option value="mobile">هاتف ذكي (Mobile Phone)</option>
              <option value="desktop">شاشة حاسوب (Desktop Monitor)</option>
            </select>
          </div>

          {/* Move Up */}
          <button
            type="button"
            disabled={index === 0}
            onClick={() => onMove("up")}
            className="p-1.5 rounded bg-surface border border-line text-text-muted hover:text-text-primary disabled:opacity-30"
            title="تحريك لأعلى"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>

          {/* Move Down */}
          <button
            type="button"
            disabled={index === totalItems - 1}
            onClick={() => onMove("down")}
            className="p-1.5 rounded bg-surface border border-line text-text-muted hover:text-text-primary disabled:opacity-30"
            title="تحريك لأسفل"
          >
            <ArrowDown className="w-3.5 h-3.5" />
          </button>

          {/* Remove */}
          <button
            type="button"
            onClick={onRemove}
            className="p-1.5 rounded bg-err/10 border border-err/20 text-err hover:bg-err/20 transition-colors"
            title="حذف لقطة الشاشة"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Image & URL Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {/* Thumbnail */}
        <div className="w-24 h-16 rounded-lg overflow-hidden border border-line bg-surface flex-shrink-0 relative">
          <img
            src={item.url}
            alt=""
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = "/uploads/projects/default.webp";
            }}
          />
        </div>

        <div className="flex-1 w-full space-y-2">
          <div className="flex items-center gap-3">
            <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-line bg-surface hover:border-accent text-xs font-semibold transition-colors">
              <Upload className="w-3.5 h-3.5 text-accent" />
              <span>{isUploading ? "جاري الرفع..." : "اختر صورة"}</span>
              <input
                type="file"
                accept="image/*"
                onChange={onFileUpload}
                className="hidden"
              />
            </label>
            <span className="text-[11px] text-text-muted font-mono truncate flex-1">
              {item.url}
            </span>
          </div>

          <input
            type="text"
            value={item.url}
            onChange={e => onUpdate({ url: e.target.value })}
            placeholder="/uploads/... أو رابط صورة خارجي"
            className="w-full h-8 px-2.5 rounded border border-line bg-surface text-xs font-mono text-text-primary focus:outline-none focus:border-secondary"
          />
        </div>
      </div>

      {/* Captions in AR & EN */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-line">
        <div className="space-y-1">
          <label className="text-[11px] font-mono text-text-muted">الوصف التوضيحي (عربي)</label>
          <input
            type="text"
            value={item.caption_ar || ""}
            onChange={e => onUpdate({ caption_ar: e.target.value })}
            placeholder="مثال: شاشة نقطة البيع السريعة"
            className="w-full h-8 px-2.5 rounded border border-line bg-surface text-xs text-text-primary focus:outline-none focus:border-secondary"
          />
        </div>

        <div className="space-y-1" dir="ltr">
          <label className="text-[11px] font-mono text-text-muted text-start block">Caption (English)</label>
          <input
            type="text"
            value={item.caption_en || ""}
            onChange={e => onUpdate({ caption_en: e.target.value })}
            placeholder="e.g. POS Checkout Dashboard"
            className="w-full h-8 px-2.5 rounded border border-line bg-surface text-xs text-text-primary focus:outline-none focus:border-secondary"
          />
        </div>
      </div>
    </div>
  );
};

