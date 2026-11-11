import React from "react";
import { BookOpen, Plus } from "lucide-react";

export interface AdminPostsHeaderProps {
  onCreate: () => void;
}

export const AdminPostsHeader: React.FC<AdminPostsHeaderProps> = ({ onCreate }) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-line text-start">
      <div className="space-y-1.5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container border border-line text-secondary text-xs font-mono">
          <BookOpen className="w-3.5 h-3.5" />
          <span>TECH_JOURNAL // CONTENT_STUDIO</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
          إدارة المدونة الهندسية والتقنية
        </h1>
        <p className="text-text-muted text-xs sm:text-sm">
          نشر المقالات المعمارية، تحليلات الأداء، إدارة وسوم التقنيات والتحكم في إعدادات محركات البحث.
        </p>
      </div>

      <button
        type="button"
        onClick={onCreate}
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary-container text-white text-xs sm:text-sm font-semibold hover:bg-primary/90 transition-all shadow-[0_0_16px_rgba(13,110,253,0.35)] active:scale-[0.98]"
      >
        <Plus className="w-4 h-4" />
        <span>مقال تقني جديد</span>
      </button>
    </div>
  );
};

