import React from "react";
import { BioLinkInput } from "@andev/shared";
import { PRESET_COLORS, PRESET_FONTS } from "../constants/bioTheme.constants";

interface BioLinkStyleTabProps {
  form: BioLinkInput;
  onChangeField: <K extends keyof BioLinkInput>(field: K, value: BioLinkInput[K]) => void;
}

export const BioLinkStyleTab: React.FC<BioLinkStyleTabProps> = ({
  form,
  onChangeField,
}) => {
  return (
    <div className="space-y-5 text-start" dir="rtl">
      {/* Variant Selector */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-text-primary">
          نمط التصميم (Style Variant)
        </label>
        <div className="grid grid-cols-3 gap-2">
          {(["solid", "outline", "gradient"] as const).map((variant) => (
            <button
              key={variant}
              type="button"
              onClick={() => onChangeField("style_variant", variant)}
              className={`py-2 px-3 rounded-xl border text-xs font-semibold capitalize transition-all ${
                form.style_variant === variant
                  ? "border-secondary bg-secondary/15 text-secondary shadow-sm font-bold"
                  : "border-line bg-surface text-text-muted hover:text-text-primary"
              }`}
            >
              {variant === "solid" && "مصمت (Solid)"}
              {variant === "outline" && "محدد (Outline)"}
              {variant === "gradient" && "تدرج (Gradient)"}
            </button>
          ))}
        </div>
      </div>

      {/* Font Family */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-text-primary">
          نوع الخط (Typography)
        </label>
        <select
          value={form.font_family || "cairo"}
          onChange={(e) => onChangeField("font_family", e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container border border-line text-xs sm:text-sm text-text-primary outline-none focus:border-secondary"
        >
          {PRESET_FONTS.map((font) => (
            <option key={font.id} value={font.id}>
              {font.label}
            </option>
          ))}
        </select>
      </div>

      {/* Solid & Outline Colors */}
      {form.style_variant !== "gradient" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-surface-container/40 border border-line">
          <div className="space-y-2">
            <label className="text-xs font-bold text-text-primary block">
              لون الخلفية (Background)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={form.bg_color || "#1e293b"}
                onChange={(e) => onChangeField("bg_color", e.target.value)}
                className="w-9 h-9 rounded-lg border border-line cursor-pointer bg-transparent"
              />
              <input
                type="text"
                value={form.bg_color || "#1e293b"}
                onChange={(e) => onChangeField("bg_color", e.target.value)}
                className="flex-1 px-3 py-1.5 rounded-lg bg-surface border border-line text-xs font-mono text-text-primary outline-none focus:border-secondary"
              />
            </div>
            <div className="flex flex-wrap gap-1 pt-1">
              {PRESET_COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => onChangeField("bg_color", c)}
                  style={{ backgroundColor: c }}
                  className="w-5 h-5 rounded-md border border-white/20 hover:scale-110 transition-transform"
                />
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-text-primary block">
              لون النص (Text Color)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={form.text_color || "#ffffff"}
                onChange={(e) => onChangeField("text_color", e.target.value)}
                className="w-9 h-9 rounded-lg border border-line cursor-pointer bg-transparent"
              />
              <input
                type="text"
                value={form.text_color || "#ffffff"}
                onChange={(e) => onChangeField("text_color", e.target.value)}
                className="flex-1 px-3 py-1.5 rounded-lg bg-surface border border-line text-xs font-mono text-text-primary outline-none focus:border-secondary"
              />
            </div>
          </div>
        </div>
      )}

      {/* Gradient Colors */}
      {form.style_variant === "gradient" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-surface-container/40 border border-line">
          <div className="space-y-2">
            <label className="text-xs font-bold text-text-primary block">
              بداية التدرج (Gradient From)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={form.gradient_from || "#0d6efd"}
                onChange={(e) => onChangeField("gradient_from", e.target.value)}
                className="w-9 h-9 rounded-lg border border-line cursor-pointer bg-transparent"
              />
              <input
                type="text"
                value={form.gradient_from || "#0d6efd"}
                onChange={(e) => onChangeField("gradient_from", e.target.value)}
                className="flex-1 px-3 py-1.5 rounded-lg bg-surface border border-line text-xs font-mono text-text-primary outline-none focus:border-secondary"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-text-primary block">
              نهاية التدرج (Gradient To)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={form.gradient_to || "#00d2ff"}
                onChange={(e) => onChangeField("gradient_to", e.target.value)}
                className="w-9 h-9 rounded-lg border border-line cursor-pointer bg-transparent"
              />
              <input
                type="text"
                value={form.gradient_to || "#00d2ff"}
                onChange={(e) => onChangeField("gradient_to", e.target.value)}
                className="flex-1 px-3 py-1.5 rounded-lg bg-surface border border-line text-xs font-mono text-text-primary outline-none focus:border-secondary"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
