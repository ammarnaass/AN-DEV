import React, { useRef } from "react";
import { Upload } from "lucide-react";
import { AVAILABLE_ICONS } from "../constants/bioIcons.constants";

interface BioLinkIconPickerProps {
  currentIconOrImage: string;
  onSelectIcon: (iconName: string) => void;
  onCustomImageUpload: (base64OrPath: string) => void;
}

export const BioLinkIconPicker: React.FC<BioLinkIconPickerProps> = ({
  currentIconOrImage,
  onSelectIcon,
  onCustomImageUpload,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isCustom =
    currentIconOrImage?.startsWith("http") ||
    currentIconOrImage?.startsWith("data:");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      if (base64) {
        onCustomImageUpload(base64);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-text-primary">
          الأيقونة أو الصورة المرفقة
        </label>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="text-xs text-secondary hover:underline flex items-center gap-1 font-semibold"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>رفع صورة مخصصة</span>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* Preset Icons Grid */}
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
        {AVAILABLE_ICONS.map((item) => {
          const isSelected = !isCustom && currentIconOrImage === item.name;
          return (
            <button
              key={item.name}
              type="button"
              onClick={() => onSelectIcon(item.name)}
              className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 text-xs transition-all ${
                isSelected
                  ? "border-secondary bg-secondary/15 text-secondary shadow-sm font-bold"
                  : "border-line bg-surface hover:bg-surface-container text-text-muted hover:text-text-primary"
              }`}
            >
              {item.icon}
              <span className="text-[10px] font-mono truncate max-w-full">
                {item.name}
              </span>
            </button>
          );
        })}
      </div>

      {isCustom && (
        <div className="flex items-center gap-3 p-2.5 rounded-xl bg-surface-container border border-secondary/40">
          <img
            src={currentIconOrImage}
            alt="Custom"
            className="w-10 h-10 rounded-lg object-cover border border-line"
          />
          <div className="text-xs min-w-0">
            <span className="font-bold text-secondary block">صورة مخصصة نشطة</span>
            <span className="text-text-muted text-[10px] truncate block">
              سيتم استخدام الصورة بدلاً من الأيقونات الثابتة.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
