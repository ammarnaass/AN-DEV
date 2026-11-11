import React from "react";
import { Button } from "../../../../components/ui/Button";
import { ProjectModalSection } from "./ProjectModalNavPills";

export interface ProjectModalFooterActionsProps {
  activeSection: ProjectModalSection;
  currentSectionIdx: number;
  totalSections: number;
  isSaving: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export const ProjectModalFooterActions: React.FC<ProjectModalFooterActionsProps> = ({
  activeSection,
  currentSectionIdx,
  totalSections,
  isSaving,
  onClose,
  onPrev,
  onNext,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-line text-start">
      <span className="text-xs font-mono text-text-muted">
        {activeSection === "content" && "الخطوة 1 من 4: المحتوى والترجمة"}
        {activeSection === "specs" && "الخطوة 2 من 4: المواصفات والمنصات"}
        {activeSection === "gallery" && "الخطوة 3 من 4: المعرض والمعاينة"}
        {activeSection === "links" && "الخطوة 4 من 4: الروابط والنشر"}
      </span>

      <div className="flex flex-wrap items-center gap-2.5">
        <Button type="button" variant="ghost" size="sm" onClick={onClose}>
          إلغاء
        </Button>

        {currentSectionIdx > 0 && (
          <button
            type="button"
            onClick={onPrev}
            className="px-3.5 py-1.5 rounded-lg border border-line bg-surface-container hover:bg-surface text-xs font-semibold text-text-primary transition-colors cursor-pointer"
          >
            ← السابق
          </button>
        )}

        {currentSectionIdx < totalSections - 1 && (
          <button
            type="button"
            onClick={onNext}
            className="px-4 py-1.5 rounded-lg bg-secondary/15 border border-secondary/40 text-secondary hover:bg-secondary/25 text-xs font-bold transition-all shadow-sm cursor-pointer"
          >
            التالي →
          </button>
        )}

        <Button type="submit" variant="primary" size="sm" isLoading={isSaving}>
          حفظ المشروع
        </Button>
      </div>
    </div>
  );
};

