import React from "react";
import { Search } from "lucide-react";
import { PostStats } from "./AdminPostsMetrics";

export interface AdminPostsFiltersProps {
  statusFilter: string;
  setStatusFilter: (val: string) => void;
  categoryFilter: string;
  setCategoryFilter: (val: string) => void;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  stats: PostStats;
}

const CATEGORIES = [
  { id: "all", label: "جميع التصنيفات" },
  { id: "architecture", label: "معمارية الأنظمة" },
  { id: "performance", label: "الأداء وقواعد البيانات" },
  { id: "security", label: "الأمان والامتثال" },
  { id: "pos_erp", label: "نقاط البيع والمؤسسات" },
  { id: "ai_llm", label: "الذكاء الاصطناعي" },
  { id: "frontend", label: "هندسة الواجهات" },
] as const;

export const AdminPostsFilters: React.FC<AdminPostsFiltersProps> = ({
  statusFilter,
  setStatusFilter,
  categoryFilter,
  setCategoryFilter,
  searchQuery,
  setSearchQuery,
  stats,
}) => {
  return (
    <div className="space-y-3.5 p-4 rounded-xl border border-line bg-surface/60 text-start">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Status Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-lg bg-surface-container border border-line overflow-x-auto">
          <button
            type="button"
            onClick={() => setStatusFilter("all")}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all whitespace-nowrap ${
              statusFilter === "all"
                ? "bg-primary-container text-white shadow-sm"
                : "text-text-muted hover:text-text-primary"
            }`}
          >
            الكل ({stats.total})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter("published")}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all whitespace-nowrap ${
              statusFilter === "published"
                ? "bg-primary-container text-white shadow-sm"
                : "text-text-muted hover:text-text-primary"
            }`}
          >
            المنشورة ({stats.published})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter("draft")}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all whitespace-nowrap ${
              statusFilter === "draft"
                ? "bg-primary-container text-white shadow-sm"
                : "text-text-muted hover:text-text-primary"
            }`}
          >
            المسودات ({stats.drafts})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter("featured")}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all whitespace-nowrap ${
              statusFilter === "featured"
                ? "bg-primary-container text-white shadow-sm"
                : "text-text-muted hover:text-text-primary"
            }`}
          >
            المميزة ({stats.featured})
          </button>
        </div>

        {/* Search Input Bar */}
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="w-4 h-4 text-text-muted absolute start-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="بحث بالعنوان، الوسوم، أو الرابط..."
            className="w-full h-9 ps-9 pe-3 rounded-lg border border-line bg-surface text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:border-secondary transition-all"
          />
        </div>
      </div>

      {/* Category Horizontal Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 border-t border-line/60">
        <span className="text-[11px] font-mono text-text-muted whitespace-nowrap me-1">
          التصنيف:
        </span>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setCategoryFilter(cat.id)}
            className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all whitespace-nowrap border ${
              categoryFilter === cat.id
                ? "bg-secondary/15 text-secondary border-secondary/40 font-bold"
                : "bg-surface-container border-line text-text-muted hover:text-text-primary hover:border-line-hover"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
};

