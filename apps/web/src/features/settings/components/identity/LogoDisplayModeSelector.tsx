import React from "react";
import { Check } from "lucide-react";

export interface LogoDisplayModeSelectorProps {
  displayMode: string;
  onChange: (key: string, val: string) => void;
}

const DISPLAY_MODES = [
  { id: "full", label: "كامل متكامل", desc: "أيقونة + اسم + شعار" },
  { id: "icon_text", label: "اسم وأيقونة", desc: "بدون الشعار اللفظي" },
  { id: "image_only", label: "صورة فقط", desc: "شعار أفقي كامل" },
  { id: "icon_only", label: "أيقونة فقط", desc: "الرمز المربع" },
] as const;

export const LogoDisplayModeSelector: React.FC<LogoDisplayModeSelectorProps> = ({
  displayMode,
  onChange,
}) => {
  return (
    <div className="space-y-2 pt-2 text-start">
      <label className="block text-xs font-mono text-text-muted font-semibold">
        نمط عرض الشعار عبر الموقع (Display Mode)
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {DISPLAY_MODES.map((mode) => {
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
  );
};

