import React, { useState } from "react";
import { ProjectGalleryItem } from "@andev/shared";
import {
  Upload,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Images
} from "lucide-react";

export interface ProjectGalleryManagerProps {
  items: ProjectGalleryItem[];
  onChange: (items: ProjectGalleryItem[]) => void;
}

export const ProjectGalleryManager: React.FC<ProjectGalleryManagerProps> = ({
  items,
  onChange
}) => {
  const [isUploadingIdx, setIsUploadingIdx] = useState<number | null>(null);

  const handleAddItem = () => {
    const newItem: ProjectGalleryItem = {
      url: "/uploads/projects/default.webp",
      caption_ar: "",
      caption_en: "",
      device_frame: "browser"
    };
    onChange([...items, newItem]);
  };

  const handleRemoveItem = (index: number) => {
    onChange(items.filter((_, idx) => idx !== index));
  };

  const handleUpdateItem = (index: number, updates: Partial<ProjectGalleryItem>) => {
    const updated = items.map((it, idx) => {
      if (idx === index) {
        return { ...it, ...updates };
      }
      return it;
    });
    onChange(updated);
  };

  const handleMove = (index: number, direction: "up" | "down") => {
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= items.length) return;

    const copy = [...items];
    const [moved] = copy.splice(index, 1);
    copy.splice(targetIdx, 0, moved);
    onChange(copy);
  };

  const handleFileUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Instant base64 preview
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Url = event.target?.result as string;
      if (base64Url) {
        handleUpdateItem(index, { url: base64Url });
      }
    };
    reader.readAsDataURL(file);

    setIsUploadingIdx(index);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/uploads", {
        method: "POST",
        body: formData,
        credentials: "include"
      });
      if (res.ok) {
        const data = await res.json();
        if (data.path) {
          handleUpdateItem(index, { url: data.path });
        }
      }
    } catch {
      // FileReader already set preview
    } finally {
      setIsUploadingIdx(null);
    }
  };

  return (
    <div className="space-y-4 animate-fadeIn text-start">
      <div className="flex items-center justify-between pb-2 border-b border-line">
        <div>
          <h4 className="text-sm font-bold text-text-primary flex items-center gap-2">
            <Images className="w-4 h-4 text-secondary" />
            <span>معرض لقطات الشاشة بهياكل الأجهزة (Device Mockups Gallery)</span>
          </h4>
          <p className="text-xs font-mono text-text-muted">
            أضف لقطات شاشة للتطبيق وحدد هيكل الجهاز (هاتف، متصفح، حاسوب) مع وصف بالعربية والإنجليزية
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddItem}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary/15 border border-secondary/30 text-secondary hover:bg-secondary/25 text-xs font-semibold transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة لقطة شاشة</span>
        </button>
      </div>

      {items.length === 0 ? (
        <div className="p-8 rounded-xl border border-dashed border-line text-center space-y-3 bg-surface-container/30">
          <Images className="w-8 h-8 text-text-muted mx-auto opacity-50" />
          <p className="text-xs text-text-muted font-mono">
            لم تتم إضافة أي لقطات شاشة بعد. يمكنك إضافة صور للتطبيق لعرضها داخل إطارات أجهزة تفاعلية.
          </p>
          <button
            type="button"
            onClick={handleAddItem}
            className="px-4 py-2 rounded-lg bg-surface border border-line hover:border-secondary text-xs font-semibold text-secondary"
          >
            + إضافة الصورة الأولى
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="p-4 rounded-xl border border-line bg-surface-container/50 space-y-3 relative group"
            >
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
                      onChange={e => handleUpdateItem(index, { device_frame: e.target.value as any })}
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
                    onClick={() => handleMove(index, "up")}
                    className="p-1.5 rounded bg-surface border border-line text-text-muted hover:text-text-primary disabled:opacity-30"
                    title="تحريك لأعلى"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>

                  {/* Move Down */}
                  <button
                    type="button"
                    disabled={index === items.length - 1}
                    onClick={() => handleMove(index, "down")}
                    className="p-1.5 rounded bg-surface border border-line text-text-muted hover:text-text-primary disabled:opacity-30"
                    title="تحريك لأسفل"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>

                  {/* Remove */}
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(index)}
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
                      <span>{isUploadingIdx === index ? "جاري الرفع..." : "اختر صورة"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={e => handleFileUpload(index, e)}
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
                    onChange={e => handleUpdateItem(index, { url: e.target.value })}
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
                    onChange={e => handleUpdateItem(index, { caption_ar: e.target.value })}
                    placeholder="مثال: شاشة نقطة البيع السريعة"
                    className="w-full h-8 px-2.5 rounded border border-line bg-surface text-xs text-text-primary focus:outline-none focus:border-secondary"
                  />
                </div>

                <div className="space-y-1" dir="ltr">
                  <label className="text-[11px] font-mono text-text-muted text-start block">Caption (English)</label>
                  <input
                    type="text"
                    value={item.caption_en || ""}
                    onChange={e => handleUpdateItem(index, { caption_en: e.target.value })}
                    placeholder="e.g. POS Checkout Dashboard"
                    className="w-full h-8 px-2.5 rounded border border-line bg-surface text-xs text-text-primary focus:outline-none focus:border-secondary"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

