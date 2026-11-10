import React, { useRef, useState } from "react";
import { Upload, RotateCcw, Sparkles, LayoutGrid, Check, AlertCircle } from "lucide-react";
import { Logo } from "../../../components/layout/Logo";

interface SettingsLogoSectionProps {
  settings: Record<string, string>;
  onChange: (key: string, val: string) => void;
}

export const SettingsLogoSection: React.FC<SettingsLogoSectionProps> = ({
  settings,
  onChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const customImage = settings.logo_image || "";
  const namePrefix = settings.logo_name_prefix !== undefined ? settings.logo_name_prefix : "AN";
  const nameSuffix = settings.logo_name_suffix !== undefined ? settings.logo_name_suffix : "DEV";
  const tagline = settings.logo_tagline !== undefined ? settings.logo_tagline : "CODE · CREATE · SOLVE";
  const displayMode = (settings.logo_display_mode as any) || "full";

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError(null);

    // Limit to 1.5MB for fast database sync
    if (file.size > 1.5 * 1024 * 1024) {
      setUploadError("حجم الملف يجب ألا يتجاوز 1.5 ميغابايت لضمان سرعة تحميل الموقع");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        onChange("logo_image", result);
      }
    };
    reader.onerror = () => {
      setUploadError("حدث خطأ أثناء قراءة ملف الصورة");
    };
    reader.readAsDataURL(file);
  };

  const handleResetToDefault = () => {
    onChange("logo_image", "");
    onChange("logo_name_prefix", "AN");
    onChange("logo_name_suffix", "DEV");
    onChange("logo_tagline", "CODE · CREATE · SOLVE");
    onChange("logo_display_mode", "full");
    setUploadError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-surface border border-line space-y-6 shadow-sm text-start">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-line gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-primary-container/15 text-primary border border-primary/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-text-primary">
              تخصيص الشعار وهوية العلامة التجارية
            </h2>
            <p className="text-xs text-text-muted mt-0.5">
              تعديل رمز الشعار، الاسم المعروض، الشعار اللفظي، ونمط الظهور عبر الشريط العلوي والتذييل.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleResetToDefault}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-line bg-surface-container text-text-muted hover:text-text-primary text-xs font-semibold transition-colors self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>استعادة الشعار الأصلي</span>
        </button>
      </div>

      {uploadError && (
        <div className="p-3 rounded-lg bg-status-danger/10 border border-status-danger/30 text-status-danger text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{uploadError}</span>
        </div>
      )}

      {/* Main Grid: Controls + Live Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Upload & Text Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* File Upload Box */}
          <div className="space-y-2">
            <label className="block text-xs font-mono text-text-muted font-semibold">
              صورة الشعار (PNG, WebP, SVG, JPG)
            </label>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp,image/svg+xml"
                onChange={handleFileUpload}
                className="hidden"
                id="logo-file-input"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-line bg-surface-container hover:bg-surface-elevated text-text-primary text-xs font-semibold transition-all hover:border-secondary cursor-pointer shadow-sm"
              >
                <Upload className="w-4 h-4 text-secondary" />
                <span>رفع صورة من الجهاز...</span>
              </button>

              <div className="flex-1">
                <input
                  type="text"
                  dir="ltr"
                  placeholder="أو أدخل رابط صورة مباشر (https://...)"
                  value={customImage}
                  onChange={(e) => onChange("logo_image", e.target.value)}
                  className="w-full h-10 px-3.5 rounded-lg border border-line bg-surface-container text-text-primary text-xs font-mono focus:outline-none focus:border-secondary"
                />
              </div>
            </div>
            <p className="text-[11px] text-text-muted">
              يُفضل استخدام صورة مربعة بدقة عالية مع خلفية شفافة (أبعاد موصى بها: 512×512 أو SVG ناقل).
            </p>
          </div>

          {/* Typography Lockup Customization */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="space-y-1.5">
              <label className="block text-xs font-mono text-text-muted font-semibold">
                بادئة اسم العلامة (Prefix)
              </label>
              <input
                type="text"
                dir="ltr"
                placeholder="AN"
                value={namePrefix}
                onChange={(e) => onChange("logo_name_prefix", e.target.value)}
                className="w-full h-10 px-3.5 rounded-lg border border-line bg-surface-container text-text-primary text-sm font-bold font-sans focus:outline-none focus:border-secondary"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-mono text-text-muted font-semibold">
                لاحقة اسم العلامة (Suffix)
              </label>
              <input
                type="text"
                dir="ltr"
                placeholder="DEV"
                value={nameSuffix}
                onChange={(e) => onChange("logo_name_suffix", e.target.value)}
                className="w-full h-10 px-3.5 rounded-lg border border-line bg-surface-container text-text-primary text-sm font-bold font-sans focus:outline-none focus:border-secondary"
              />
            </div>
          </div>

          {/* Tagline */}
          <div className="space-y-1.5">
            <label className="block text-xs font-mono text-text-muted font-semibold">
              الشعار اللفظي المصاحب (Tagline / Slogan)
            </label>
            <input
              type="text"
              dir="ltr"
              placeholder="CODE · CREATE · SOLVE"
              value={tagline}
              onChange={(e) => onChange("logo_tagline", e.target.value)}
              className="w-full h-10 px-3.5 rounded-lg border border-line bg-surface-container text-text-primary text-xs font-mono tracking-wider focus:outline-none focus:border-secondary"
            />
          </div>

          {/* Display Mode Selector */}
          <div className="space-y-2 pt-2">
            <label className="block text-xs font-mono text-text-muted font-semibold">
              نمط عرض الشعار عبر الموقع (Display Mode)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: "full", label: "كامل متكامل", desc: "أيقونة + اسم + شعار" },
                { id: "icon_text", label: "اسم وأيقونة", desc: "بدون الشعار اللفظي" },
                { id: "image_only", label: "صورة فقط", desc: "شعار أفقي كامل" },
                { id: "icon_only", label: "أيقونة فقط", desc: "الرمز المربع" },
              ].map((mode) => {
                const isSelected = displayMode === mode.id;
                return (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => onChange("logo_display_mode", mode.id)}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      isSelected
                        ? "bg-primary-container/15 border-primary text-primary font-bold shadow-sm"
                        : "bg-surface-container border-line text-text-muted hover:text-text-primary hover:border-line-hover"
                    }`}
                  >
                    <div className="text-xs font-semibold flex items-center justify-center gap-1">
                      {isSelected && <Check className="w-3 h-3 text-primary" />}
                      <span>{mode.label}</span>
                    </div>
                    <div className="text-[10px] opacity-75 mt-0.5">{mode.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: Live Interactive Previews (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4 rounded-xl bg-surface-container/60 border border-line p-5">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-line mb-4">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-secondary flex items-center gap-1.5">
                <LayoutGrid className="w-3.5 h-3.5" />
                معاينة حية فورية (Live Preview)
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface border border-line text-text-muted">
                {displayMode}
              </span>
            </div>

            {/* Dark Mode Header Preview */}
            <div className="space-y-1.5 mb-4">
              <span className="text-[11px] font-mono text-text-muted block">
                1. المظهر في الشريط العلوي (الوضع الداكن):
              </span>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <Logo
                  size={36}
                  customImage={customImage}
                  namePrefix={namePrefix}
                  nameSuffix={nameSuffix}
                  tagline={tagline}
                  displayMode={displayMode}
                />
                <span className="text-[10px] font-mono text-slate-500">36px</span>
              </div>
            </div>

            {/* Light Mode Header Preview */}
            <div className="space-y-1.5 mb-4">
              <span className="text-[11px] font-mono text-text-muted block">
                2. المظهر في الخلفيات الفاتحة:
              </span>
              <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-center justify-between shadow-sm">
                <Logo
                  size={36}
                  customImage={customImage}
                  namePrefix={namePrefix}
                  nameSuffix={nameSuffix}
                  tagline={tagline}
                  displayMode={displayMode}
                />
                <span className="text-[10px] font-mono text-slate-400">36px</span>
              </div>
            </div>

            {/* Large Footer Size Preview */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-mono text-text-muted block">
                3. المظهر في تذييل الموقع (حجم كبير):
              </span>
              <div className="p-4 rounded-xl bg-surface border border-line flex items-center justify-between">
                <Logo
                  size={42}
                  customImage={customImage}
                  namePrefix={namePrefix}
                  nameSuffix={nameSuffix}
                  tagline={tagline}
                  displayMode={displayMode}
                />
                <span className="text-[10px] font-mono text-text-muted">42px</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-line text-[11px] text-text-muted flex items-center justify-between">
            <span>الحالة: {customImage ? "شعار مخصص نشط" : "الشعار الرسمي الافتراضي"}</span>
            <span className="text-secondary font-mono text-[10px]">AUTO_RENDER</span>
          </div>
        </div>
      </div>
    </div>
  );
};
