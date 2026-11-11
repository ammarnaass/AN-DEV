import React from "react";
import { FileText, X } from "lucide-react";

interface PostEditModalHeaderProps {
  isEditing: boolean;
  titleAr?: string;
  onClose: () => void;
}

export const PostEditModalHeader: React.FC<PostEditModalHeaderProps> = ({
  isEditing,
  titleAr,
  onClose,
}) => {
  return (
    <div className="p-5 sm:px-8 border-b border-line flex items-center justify-between bg-surface-container/40">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-primary-container text-white">
            <FileText className="w-4 h-4" />
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-text-primary">
            {isEditing ? `تحرير المقال: ${titleAr}` : "إضافة مقال تقني جديد للمدونة"}
          </h2>
        </div>
        <p className="text-xs text-text-muted">
          نظام إدارة المقالات التقنية، الأكواد، مقاييس الأداء وإعدادات محركات البحث.
        </p>
      </div>

      <button
        onClick={onClose}
        className="p-2 rounded-xl text-text-muted hover:text-text-primary hover:bg-surface border border-transparent hover:border-line transition-all"
        aria-label="Close modal"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
};

