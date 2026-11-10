import React from "react";
import { ProjectInput } from "@andev/shared";

interface ProjectLocalizedFieldsProps {
  activeTab: "ar" | "en";
  form: ProjectInput;
  onChange: (field: keyof ProjectInput, value: string) => void;
}

export const ProjectLocalizedFields: React.FC<ProjectLocalizedFieldsProps> = ({
  activeTab,
  form,
  onChange,
}) => {
  if (activeTab === "ar") {
    return (
      <div className="space-y-4 animate-fadeIn">
        <div className="space-y-1">
          <label className="text-xs font-mono text-text-muted font-semibold">عنوان المشروع (عربي) *</label>
          <input
            type="text"
            required
            value={form.title_ar}
            onChange={e => onChange("title_ar", e.target.value)}
            placeholder="مثال: برنامج نقاط البيع AN POS"
            className="w-full h-10 px-3 rounded-lg border border-line bg-surface-container text-text-primary text-sm focus:outline-none focus:border-secondary"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-mono text-text-muted font-semibold">الملخص القصير (عربي) *</label>
          <textarea
            rows={2}
            required
            value={form.summary_ar}
            onChange={e => onChange("summary_ar", e.target.value)}
            placeholder="سطرين يصفان القيمة الأساسية للمشروع..."
            className="w-full p-2.5 rounded-lg border border-line bg-surface-container text-text-primary text-sm focus:outline-none focus:border-secondary leading-relaxed resize-y"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-mono text-text-muted font-semibold">التفاصيل والتحدي والحل (Markdown) *</label>
          <textarea
            rows={6}
            required
            value={form.body_ar}
            onChange={e => onChange("body_ar", e.target.value)}
            placeholder="### التحدي&#10;شرح المشكلة...&#10;&#10;### الحل&#10;كيف قمنا بهندسة الحل..."
            className="w-full p-2.5 rounded-lg border border-line bg-surface-container text-text-primary text-xs font-mono focus:outline-none focus:border-secondary leading-relaxed resize-y"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-fadeIn" dir="ltr">
      <div className="space-y-1 text-start">
        <div className="flex items-center justify-between">
          <label className="text-xs font-mono text-text-muted font-semibold">Project Title (EN)</label>
          <span className="text-[10px] text-text-muted font-mono">(Optional - auto-filled from Arabic if empty)</span>
        </div>
        <input
          type="text"
          value={form.title_en || ""}
          onChange={e => onChange("title_en", e.target.value)}
          placeholder="e.g. AN POS - Point of Sale & Inventory System"
          className="w-full h-10 px-3 rounded-lg border border-line bg-surface-container text-text-primary text-sm focus:outline-none focus:border-secondary"
        />
      </div>

      <div className="space-y-1 text-start">
        <label className="text-xs font-mono text-text-muted font-semibold">Summary (EN)</label>
        <textarea
          rows={2}
          value={form.summary_en || ""}
          onChange={e => onChange("summary_en", e.target.value)}
          placeholder="Short summary highlighting the core value of the project..."
          className="w-full p-2.5 rounded-lg border border-line bg-surface-container text-text-primary text-sm focus:outline-none focus:border-secondary leading-relaxed resize-y"
        />
      </div>

      <div className="space-y-1 text-start">
        <label className="text-xs font-mono text-text-muted font-semibold">Case Study Body (Markdown EN)</label>
        <textarea
          rows={6}
          value={form.body_en || ""}
          onChange={e => onChange("body_en", e.target.value)}
          placeholder="### The Challenge&#10;Details...&#10;&#10;### The Solution&#10;Architecture and tech details..."
          className="w-full p-2.5 rounded-lg border border-line bg-surface-container text-text-primary text-xs font-mono focus:outline-none focus:border-secondary leading-relaxed resize-y"
        />
      </div>
    </div>
  );
};
