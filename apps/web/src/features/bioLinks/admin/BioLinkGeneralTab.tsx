import React from "react";
import { BioLinkInput } from "@andev/shared";
import { Star } from "lucide-react";
import { BioLinkIconPicker } from "./BioLinkIconPicker";

interface BioLinkGeneralTabProps {
  form: BioLinkInput;
  onChangeField: <K extends keyof BioLinkInput>(field: K, value: BioLinkInput[K]) => void;
}

export const BioLinkGeneralTab: React.FC<BioLinkGeneralTabProps> = ({
  form,
  onChangeField,
}) => {
  const isCustomImg =
    form.icon_or_image?.startsWith("http") ||
    form.icon_or_image?.startsWith("data:");

  return (
    <div className="space-y-5 text-start" dir="rtl">
      {/* Title */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-text-primary">
          عنوان الرابط (Title) *
        </label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => onChangeField("title", e.target.value)}
          placeholder="مثال: حجز استشارة برمجية مجانية"
          className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container border border-line text-sm text-text-primary outline-none focus:border-secondary transition-all"
          required
        />
      </div>

      {/* URL */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-text-primary">
          الرابط المستهدف (Destination URL) *
        </label>
        <input
          type="text"
          value={form.url}
          onChange={(e) => onChangeField("url", e.target.value)}
          placeholder="https://example.com أو /contact"
          className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container border border-line text-sm font-mono text-text-primary outline-none focus:border-secondary transition-all"
          required
        />
      </div>

      {/* Subtitle */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-text-primary">
          الوصف الفرعي (Subtitle)
        </label>
        <input
          type="text"
          value={form.subtitle || ""}
          onChange={(e) => onChangeField("subtitle", e.target.value)}
          placeholder="مثال: رد مخصص خلال 48 ساعة مع دراسة تقنية كاملة"
          className="w-full px-3.5 py-2 rounded-xl bg-surface-container border border-line text-xs text-text-primary outline-none focus:border-secondary transition-all"
        />
      </div>

      {/* Icon or Image Picker */}
      <BioLinkIconPicker
        currentIconOrImage={form.icon_or_image || "Sparkles"}
        onSelectIcon={(iconName) => onChangeField("icon_or_image", iconName)}
        onCustomImageUpload={(base64) => onChangeField("icon_or_image", base64)}
      />

      {/* Image Size & Radius (when custom image) */}
      {isCustomImg && (
        <div className="grid grid-cols-2 gap-4 p-3 rounded-xl bg-surface-container/60 border border-line">
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-text-muted">حجم الصورة</label>
            <select
              value={form.image_size || "md"}
              onChange={(e) => onChangeField("image_size", e.target.value as any)}
              className="w-full px-2.5 py-1.5 rounded-lg bg-surface border border-line text-xs text-text-primary outline-none focus:border-secondary"
            >
              <option value="sm">صغير (28px)</option>
              <option value="md">متوسط (36px)</option>
              <option value="lg">كبير (48px)</option>
              <option value="banner">بانر عريض (Banner Header)</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-text-muted">استدارة الحواف</label>
            <select
              value={form.image_radius || "md"}
              onChange={(e) => onChangeField("image_radius", e.target.value as any)}
              className="w-full px-2.5 py-1.5 rounded-lg bg-surface border border-line text-xs text-text-primary outline-none focus:border-secondary"
            >
              <option value="sm">حواف ناعمة (Rounded)</option>
              <option value="md">مستطيل مدور (Squircle)</option>
              <option value="full">دائري كامل (Circle)</option>
            </select>
          </div>
        </div>
      )}

      {/* Switches: Active & Featured */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-line">
        <label className="p-3 rounded-xl border border-line bg-surface flex items-center justify-between cursor-pointer">
          <span className="text-xs font-bold text-text-primary">رابط نشط (Active)</span>
          <input
            type="checkbox"
            checked={form.is_active}
            onChange={(e) => onChangeField("is_active", e.target.checked)}
            className="w-4 h-4 text-secondary rounded focus:ring-secondary"
          />
        </label>

        <label className="p-3 rounded-xl border border-line bg-surface flex items-center justify-between cursor-pointer">
          <span className="text-xs font-bold text-text-primary flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 text-warn fill-warn" />
            <span>رابط مميز (Featured Pin)</span>
          </span>
          <input
            type="checkbox"
            checked={form.is_featured}
            onChange={(e) => onChangeField("is_featured", e.target.checked)}
            className="w-4 h-4 text-secondary rounded focus:ring-secondary"
          />
        </label>
      </div>
    </div>
  );
};
