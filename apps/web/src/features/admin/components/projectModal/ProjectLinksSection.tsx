import React from "react";
import { ProjectInput } from "@andev/shared";

export interface ProjectLinksSectionProps {
  form: ProjectInput;
  techInput: string;
  onTechInputChange: (val: string) => void;
  onFormChange: (field: keyof ProjectInput, val: any) => void;
}

export const ProjectLinksSection: React.FC<ProjectLinksSectionProps> = ({
  form,
  techInput,
  onTechInputChange,
  onFormChange,
}) => {
  return (
    <div className="space-y-4 text-start">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-mono text-mute">معرّف الرابط (Slug) *</label>
          <input
            type="text"
            required
            value={form.slug}
            onChange={e => onFormChange("slug", e.target.value)}
            placeholder="project-slug-name"
            className="w-full h-10 px-3 rounded border border-line bg-bg/50 text-sm font-mono"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-mono text-mute">الترسانة التقنية (مفصولة بفاصلة)</label>
          <input
            type="text"
            value={techInput}
            onChange={e => onTechInputChange(e.target.value)}
            placeholder="React, Flutter, Fastify"
            className="w-full h-10 px-3 rounded border border-line bg-bg/50 text-sm font-mono"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-mono text-mute">رابط المعاينة المباشر (Live URL)</label>
          <input
            type="text"
            value={form.live_url || ""}
            onChange={e => onFormChange("live_url", e.target.value)}
            placeholder="https://anposwebsite.vercel.app"
            className="w-full h-10 px-3 rounded border border-line bg-bg/50 text-sm font-mono"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-mono text-mute">رابط الكود (Repo URL)</label>
          <input
            type="text"
            value={form.repo_url || ""}
            onChange={e => onFormChange("repo_url", e.target.value)}
            placeholder="https://github.com/..."
            className="w-full h-10 px-3 rounded border border-line bg-bg/50 text-sm font-mono"
          />
        </div>
      </div>

      <div className="flex items-center gap-6 pt-4 border-t border-line">
        <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer select-none">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={e => onFormChange("featured", e.target.checked)}
            className="rounded border-line"
          />
          <span>مشروع مميز بالرئيسية</span>
        </label>

        <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer select-none">
          <input
            type="checkbox"
            checked={form.published}
            onChange={e => onFormChange("published", e.target.checked)}
            className="rounded border-line"
          />
          <span>منشور للعامة</span>
        </label>
      </div>
    </div>
  );
};

