import React from "react";
import { Images } from "lucide-react";

export interface ProjectGalleryEmptyStateProps {
  onAddItem: () => void;
}

export const ProjectGalleryEmptyState: React.FC<ProjectGalleryEmptyStateProps> = ({
  onAddItem,
}) => {
  return (
    <div className="p-8 rounded-xl border border-dashed border-line text-center space-y-3 bg-surface-container/30">
      <Images className="w-8 h-8 text-text-muted mx-auto opacity-50" />
      <p className="text-xs text-text-muted font-mono">
        لم تتم إضافة أي لقطات شاشة بعد. يمكنك إضافة صور للتطبيق لعرضها داخل إطارات أجهزة تفاعلية.
      </p>
      <button
        type="button"
        onClick={onAddItem}
        className="px-4 py-2 rounded-lg bg-surface border border-line hover:border-secondary text-xs font-semibold text-secondary"
      >
        + إضافة الصورة الأولى
      </button>
    </div>
  );
};

