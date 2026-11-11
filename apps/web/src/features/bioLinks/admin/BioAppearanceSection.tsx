import React, { useRef } from "react";
import { Upload, Save, CheckCircle2 } from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { BG_COLOR_PRESETS } from "../constants/bioTheme.constants";
import { SOCIAL_DEFS } from "../constants/bioSocials.constants";

interface BioAppearanceSectionProps {
  settings: Record<string, string>;
  isUpdating: boolean;
  success: boolean;
  onChangeSetting: (key: string, value: string) => void;
  onSave: () => void;
}

export const BioAppearanceSection: React.FC<BioAppearanceSectionProps> = ({
  settings,
  isUpdating,
  success,
  onChangeSetting,
  onSave,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const base64Url = uploadEvent.target?.result as string;
      if (base64Url) {
        onChangeSetting("bio_page_avatar", base64Url);
      }
    };
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/admin/uploads", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        if (data.path) onChangeSetting("bio_page_avatar", data.path);
      }
    } catch {
      // Base64 already assigned
    }
  };

  return (
    <div className="space-y-6 text-start" dir="rtl">
      {/* Identity Card */}
      <div className="p-5 rounded-2xl bg-surface border border-line space-y-4">
        <h3 className="text-sm font-bold text-text-primary">
          الهيدر والصورة الشخصية (Hero Header)
        </h3>

        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl overflow-hidden border border-line bg-surface-container shrink-0">
            <img
              src={settings.bio_page_avatar || "/brand/logo-squircle.webp"}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-1.5 flex-1">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 rounded-lg bg-surface-container border border-line text-xs font-semibold text-secondary hover:bg-surface-elevated transition-colors inline-flex items-center gap-1.5"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>تغيير الصورة الرمزية</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarUpload}
            />
            <p className="text-[11px] text-text-muted">
              يُفضل استخدام صورة مربعة بنسبة 1:1 بجودة عالية (WebP/PNG).
            </p>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-text-primary">
            عنوان الصفحة / الاسم المعروض *
          </label>
          <input
            type="text"
            value={settings.bio_page_title || ""}
            onChange={(e) => onChangeSetting("bio_page_title", e.target.value)}
            placeholder="AN DEV | وكالة البرمجيات"
            className="w-full px-3.5 py-2 rounded-xl bg-surface-container border border-line text-xs sm:text-sm text-text-primary outline-none focus:border-secondary"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-text-primary">
            الوصف المختصر (Bio Description)
          </label>
          <textarea
            rows={2}
            value={settings.bio_page_bio || ""}
            onChange={(e) => onChangeSetting("bio_page_bio", e.target.value)}
            placeholder="نبني حلولاً رقمية وتطبيقات قابلة للتوسع..."
            className="w-full px-3.5 py-2 rounded-xl bg-surface-container border border-line text-xs text-text-primary outline-none focus:border-secondary resize-none"
          />
        </div>
      </div>

      {/* Background Styling */}
      <div className="p-5 rounded-2xl bg-surface border border-line space-y-4">
        <h3 className="text-sm font-bold text-text-primary">
          نمط وخلفية الصفحة (Background Style)
        </h3>

        <div className="grid grid-cols-3 gap-2">
          {[
            { id: "mesh", label: "شبكة ضوئية (Mesh)" },
            { id: "color", label: "لون مصمت (Solid)" },
            { id: "gradient", label: "تدرج عميق (Gradient)" },
          ].map((type) => (
            <button
              key={type.id}
              type="button"
              onClick={() => onChangeSetting("bio_page_bg_type", type.id)}
              className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                (settings.bio_page_bg_type || "mesh") === type.id
                  ? "border-secondary bg-secondary/15 text-secondary shadow-sm font-bold"
                  : "border-line bg-surface-container text-text-muted hover:text-text-primary"
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>

        <div className="space-y-2 pt-1">
          <label className="text-xs font-bold text-text-primary block">
            اللون الأساسي للخلفية
          </label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={settings.bio_page_bg_value || "#090d16"}
              onChange={(e) => onChangeSetting("bio_page_bg_value", e.target.value)}
              className="w-9 h-9 rounded-lg border border-line cursor-pointer bg-transparent"
            />
            <input
              type="text"
              value={settings.bio_page_bg_value || "#090d16"}
              onChange={(e) => onChangeSetting("bio_page_bg_value", e.target.value)}
              className="flex-1 px-3 py-1.5 rounded-lg bg-surface-container border border-line text-xs font-mono text-text-primary outline-none focus:border-secondary"
            />
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {BG_COLOR_PRESETS.map((preset) => (
              <button
                key={preset.value}
                type="button"
                onClick={() => onChangeSetting("bio_page_bg_value", preset.value)}
                className="px-2.5 py-1 rounded-lg border border-line bg-surface text-[11px] font-mono text-text-muted hover:text-text-primary flex items-center gap-1.5"
              >
                <span
                  className="w-2.5 h-2.5 rounded-full border border-white/20"
                  style={{ backgroundColor: preset.value }}
                />
                <span>{preset.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Social Accounts */}
      <div className="p-5 rounded-2xl bg-surface border border-line space-y-4">
        <h3 className="text-sm font-bold text-text-primary">
          روابط شبكات التواصل الاجتماعي (Social Ribbon)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SOCIAL_DEFS.map((social) => (
            <div key={social.key} className="space-y-1">
              <label className="text-xs text-text-muted flex items-center gap-1.5 font-medium">
                <span style={{ color: social.color }}>{social.icon}</span>
                <span>{social.name}</span>
              </label>
              <input
                type="text"
                value={settings[social.key] || ""}
                onChange={(e) => onChangeSetting(social.key, e.target.value)}
                placeholder={`رابط أو معرّف ${social.name}`}
                className="w-full px-3 py-1.5 rounded-lg bg-surface-container border border-line text-xs font-mono text-text-primary outline-none focus:border-secondary"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-2">
        {success ? (
          <span className="text-xs text-status-ok flex items-center gap-1.5 font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>تم حفظ إعدادات المظهر بنجاح!</span>
          </span>
        ) : (
          <span />
        )}
        <Button
          type="button"
          variant="primary"
          isLoading={isUpdating}
          onClick={onSave}
          className="inline-flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>حفظ التعديلات</span>
        </Button>
      </div>
    </div>
  );
};
