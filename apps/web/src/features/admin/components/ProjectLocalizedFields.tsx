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
      <div className="space-y-4">
        <div className="space-y-1">
          <label className="text-xs font-mono text-mute">عنوان المشروع (عربي)</label>
          <input
            type="text"
            required
            value={form.title_ar}
            onChange={e => onChange("title_ar", e.target.value)}
            className="w-full h-10 px-3 rounded border border-line bg-bg/50 text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-mono text-mute">الملخص القصير (عربي)</label>
          <textarea
            rows={2}
            required
            value={form.summary_ar}
            onChange={e => onChange("summary_ar", e.target.value)}
            className="w-full p-2.5 rounded border border-line bg-bg/50 text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-mono text-mute">التفاصيل والتحدي والحل (Markdown)</label>
          <textarea
            rows={5}
            required
            value={form.body_ar}
            onChange={e => onChange("body_ar", e.target.value)}
            className="w-full p-2.5 rounded border border-line bg-bg/50 text-sm font-mono text-xs"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4" dir="ltr">
      <div className="space-y-1 text-start">
        <label className="text-xs font-mono text-mute">Project Title (EN)</label>
        <input
          type="text"
          required
          value={form.title_en}
          onChange={e => onChange("title_en", e.target.value)}
          className="w-full h-10 px-3 rounded border border-line bg-bg/50 text-sm"
        />
      </div>

      <div className="space-y-1 text-start">
        <label className="text-xs font-mono text-mute">Summary (EN)</label>
        <textarea
          rows={2}
          required
          value={form.summary_en}
          onChange={e => onChange("summary_en", e.target.value)}
          className="w-full p-2.5 rounded border border-line bg-bg/50 text-sm"
        />
      </div>

      <div className="space-y-1 text-start">
        <label className="text-xs font-mono text-mute">Case Study Body (Markdown)</label>
        <textarea
          rows={5}
          required
          value={form.body_en}
          onChange={e => onChange("body_en", e.target.value)}
          className="w-full p-2.5 rounded border border-line bg-bg/50 text-sm font-mono text-xs"
        />
      </div>
    </div>
  );
};

