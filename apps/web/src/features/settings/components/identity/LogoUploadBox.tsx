import React from "react";
import { Upload } from "lucide-react";

export interface LogoUploadBoxProps {
  customImage: string;
  onChange: (key: string, val: string) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  setUploadError: (err: string | null) => void;
}

export const LogoUploadBox: React.FC<LogoUploadBoxProps> = ({
  customImage,
  onChange,
  fileInputRef,
  setUploadError,
}) => {
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

  return (
    <div className="space-y-2 text-start">
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
  );
};
