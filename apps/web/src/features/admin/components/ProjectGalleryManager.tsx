import React, { useState } from "react";
import { ProjectGalleryItem } from "@andev/shared";
import { Plus, Images } from "lucide-react";
import { ProjectGalleryEmptyState } from "./gallery/ProjectGalleryEmptyState";
import { ProjectGalleryItemCard } from "./gallery/ProjectGalleryItemCard";

export interface ProjectGalleryManagerProps {
  items: ProjectGalleryItem[];
  onChange: (items: ProjectGalleryItem[]) => void;
}

export const ProjectGalleryManager: React.FC<ProjectGalleryManagerProps> = ({
  items,
  onChange,
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
        <ProjectGalleryEmptyState onAddItem={handleAddItem} />
      ) : (
        <div className="space-y-4">
          {items.map((item, index) => (
            <ProjectGalleryItemCard
              key={index}
              item={item}
              index={index}
              totalItems={items.length}
              isUploading={isUploadingIdx === index}
              onUpdate={updates => handleUpdateItem(index, updates)}
              onMove={dir => handleMove(index, dir)}
              onRemove={() => handleRemoveItem(index)}
              onFileUpload={e => handleFileUpload(index, e)}
            />
          ))}
        </div>
      )}
    </div>
  );
};
