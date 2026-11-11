import React from "react";
import { Layers, CheckCircle2, FileEdit, Star, Eye } from "lucide-react";

export interface PostStats {
  total: number;
  published: number;
  drafts: number;
  featured: number;
  totalViews: number;
}

export interface AdminPostsMetricsProps {
  stats: PostStats;
}

export const AdminPostsMetrics: React.FC<AdminPostsMetricsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4 text-start">
      <div className="p-4 rounded-xl bg-surface border border-line space-y-1">
        <span className="text-[11px] font-mono text-text-muted flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-secondary" />
          <span>إجمالي المقالات</span>
        </span>
        <div className="text-xl sm:text-2xl font-black text-text-primary font-mono">
          {stats.total}
        </div>
      </div>

      <div className="p-4 rounded-xl bg-surface border border-line space-y-1">
        <span className="text-[11px] font-mono text-text-muted flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-status-ok" />
          <span>المقالات المنشورة</span>
        </span>
        <div className="text-xl sm:text-2xl font-black text-status-ok font-mono">
          {stats.published}
        </div>
      </div>

      <div className="p-4 rounded-xl bg-surface border border-line space-y-1">
        <span className="text-[11px] font-mono text-text-muted flex items-center gap-1.5">
          <FileEdit className="w-3.5 h-3.5 text-amber-400" />
          <span>المسودات</span>
        </span>
        <div className="text-xl sm:text-2xl font-black text-amber-400 font-mono">
          {stats.drafts}
        </div>
      </div>

      <div className="p-4 rounded-xl bg-surface border border-line space-y-1">
        <span className="text-[11px] font-mono text-text-muted flex items-center gap-1.5">
          <Star className="w-3.5 h-3.5 text-secondary" />
          <span>مقالات مميزة</span>
        </span>
        <div className="text-xl sm:text-2xl font-black text-secondary font-mono">
          {stats.featured}
        </div>
      </div>

      <div className="p-4 rounded-xl bg-surface border border-line space-y-1 col-span-2 sm:col-span-1">
        <span className="text-[11px] font-mono text-text-muted flex items-center gap-1.5">
          <Eye className="w-3.5 h-3.5 text-secondary" />
          <span>إجمالي القراءات</span>
        </span>
        <div className="text-xl sm:text-2xl font-black text-text-primary font-mono">
          {stats.totalViews.toLocaleString()}
        </div>
      </div>
    </div>
  );
};

