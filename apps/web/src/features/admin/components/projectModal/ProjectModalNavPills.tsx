import React from "react";
import { FileText, Layers, Images, Link as LinkIcon } from "lucide-react";

export type ProjectModalSection = "content" | "specs" | "gallery" | "links";

export interface ProjectModalNavPillsProps {
  activeSection: ProjectModalSection;
  onSelectSection: (section: ProjectModalSection) => void;
}

export const ProjectModalNavPills: React.FC<ProjectModalNavPillsProps> = ({
  activeSection,
  onSelectSection,
}) => {
  return (
    <div className="flex flex-wrap border-b border-line gap-2 pb-2 text-start">
      <button
        type="button"
        onClick={() => onSelectSection("content")}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
          activeSection === "content"
            ? "bg-primary-container text-white shadow-sm"
            : "bg-surface-container border border-line text-text-muted hover:text-text-primary"
        }`}
      >
        <FileText className="w-3.5 h-3.5" />
        <span>1. المحتوى والترجمة</span>
      </button>

      <button
        type="button"
        onClick={() => onSelectSection("specs")}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
          activeSection === "specs"
            ? "bg-primary-container text-white shadow-sm"
            : "bg-surface-container border border-line text-text-muted hover:text-text-primary"
        }`}
      >
        <Layers className="w-3.5 h-3.5" />
        <span>2. المواصفات والمنصات</span>
      </button>

      <button
        type="button"
        onClick={() => onSelectSection("gallery")}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
          activeSection === "gallery"
            ? "bg-primary-container text-white shadow-sm"
            : "bg-surface-container border border-line text-text-muted hover:text-text-primary"
        }`}
      >
        <Images className="w-3.5 h-3.5" />
        <span>3. الصور والمعرض</span>
      </button>

      <button
        type="button"
        onClick={() => onSelectSection("links")}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
          activeSection === "links"
            ? "bg-primary-container text-white shadow-sm"
            : "bg-surface-container border border-line text-text-muted hover:text-text-primary"
        }`}
      >
        <LinkIcon className="w-3.5 h-3.5" />
        <span>4. الروابط والنشر</span>
      </button>
    </div>
  );
};

