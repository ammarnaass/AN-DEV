import React, { useState, useEffect } from "react";
import { BioLink, BioLinkInput } from "@andev/shared";
import { X, Sparkles, Palette, Type } from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { BioLinkGeneralTab } from "./BioLinkGeneralTab";
import { BioLinkStyleTab } from "./BioLinkStyleTab";

interface BioLinkEditModalProps {
  isOpen: boolean;
  link: BioLink | null;
  onClose: () => void;
  onSave: (data: BioLinkInput) => Promise<void>;
  isSaving: boolean;
}

export const BioLinkEditModal: React.FC<BioLinkEditModalProps> = ({
  isOpen,
  link,
  onClose,
  onSave,
  isSaving,
}) => {
  const [form, setForm] = useState<BioLinkInput>({
    title: "",
    url: "",
    subtitle: "",
    icon_or_image: "Sparkles",
    image_size: "md",
    image_radius: "md",
    image_fit: "cover",
    font_family: "cairo",
    text_color: "#ffffff",
    bg_color: "#1e293b",
    border_color: "#334155",
    style_variant: "solid",
    gradient_from: "#0d6efd",
    gradient_to: "#00d2ff",
    is_active: true,
    is_featured: false,
    sort_order: 0,
  });

  const [activeTab, setActiveTab] = useState<"content" | "style">("content");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (link) {
      setForm({
        title: link.title,
        url: link.url,
        subtitle: link.subtitle || "",
        icon_or_image: link.icon_or_image || "Sparkles",
        image_size: link.image_size || "md",
        image_radius: link.image_radius || "md",
        image_fit: link.image_fit || "cover",
        font_family: link.font_family || "cairo",
        text_color: link.text_color || "#ffffff",
        bg_color: link.bg_color || "#1e293b",
        border_color: link.border_color || "#334155",
        style_variant: link.style_variant || "solid",
        gradient_from: link.gradient_from || "#0d6efd",
        gradient_to: link.gradient_to || "#00d2ff",
        is_active: link.is_active,
        is_featured: link.is_featured,
        sort_order: link.sort_order,
      });
    } else {
      setForm({
        title: "",
        url: "",
        subtitle: "",
        icon_or_image: "Sparkles",
        image_size: "md",
        image_radius: "md",
        image_fit: "cover",
        font_family: "cairo",
        text_color: "#ffffff",
        bg_color: "#1e293b",
        border_color: "#334155",
        style_variant: "solid",
        gradient_from: "#0d6efd",
        gradient_to: "#00d2ff",
        is_active: true,
        is_featured: false,
        sort_order: 0,
      });
    }
    setError(null);
  }, [link, isOpen]);

  if (!isOpen) return null;

  const handleChangeField = <K extends keyof BioLinkInput>(
    field: K,
    value: BioLinkInput[K]
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.url.trim()) {
      setError("يرجى ملء عنوان الرابط والرابط المستهدف كحقول إجبارية");
      return;
    }
    try {
      await onSave(form);
      onClose();
    } catch (err: any) {
      setError(err.message || "حدث خطأ أثناء حفظ الرابط");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-background/80 backdrop-blur-md animate-fade-in text-start">
      <div className="w-full max-w-lg rounded-2xl border border-line bg-surface shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:px-6 border-b border-line flex items-center justify-between bg-surface-container/30">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-secondary/15 text-secondary">
              <Sparkles className="w-4 h-4" />
            </span>
            <h3 className="text-base font-bold text-text-primary">
              {link ? "تعديل الرابط المخصص" : "إضافة رابط مخصص جديد"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface border border-transparent hover:border-line"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-line bg-surface px-6 gap-4">
          <button
            type="button"
            onClick={() => setActiveTab("content")}
            className={`py-2.5 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition-all ${
              activeTab === "content"
                ? "border-secondary text-secondary"
                : "border-transparent text-text-muted hover:text-text-primary"
            }`}
          >
            <Type className="w-3.5 h-3.5" />
            <span>المعلومات الأساسية</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("style")}
            className={`py-2.5 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition-all ${
              activeTab === "style"
                ? "border-secondary text-secondary"
                : "border-transparent text-text-muted hover:text-text-primary"
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            <span>المظهر والتخصيص</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-err/10 border border-err/30 text-err text-xs font-medium">
              {error}
            </div>
          )}

          {activeTab === "content" && (
            <BioLinkGeneralTab form={form} onChangeField={handleChangeField} />
          )}

          {activeTab === "style" && (
            <BioLinkStyleTab form={form} onChangeField={handleChangeField} />
          )}

          {/* Footer Controls */}
          <div className="flex items-center justify-end gap-2 pt-4 border-t border-line">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-surface-container border border-line text-xs font-semibold text-text-muted hover:text-text-primary"
            >
              إلغاء
            </button>
            <Button type="submit" variant="primary" isLoading={isSaving}>
              حفظ الرابط
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
