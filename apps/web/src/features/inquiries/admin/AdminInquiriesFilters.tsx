import React from "react";
import { Search } from "lucide-react";
import { Inquiry } from "@andev/shared";

interface AdminInquiriesFiltersProps {
  inquiries: Inquiry[];
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
  typeFilter: string;
  onTypeFilterChange: (type: string) => void;
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
}

export const AdminInquiriesFilters: React.FC<AdminInquiriesFiltersProps> = ({
  inquiries,
  statusFilter,
  onStatusFilterChange,
  typeFilter,
  onTypeFilterChange,
  searchQuery,
  onSearchQueryChange,
}) => {
  const countPending = inquiries.filter(
    (i) => i.status === "pending" || i.status === "new"
  ).length;
  const countApproved = inquiries.filter((i) => i.status === "approved").length;
  const countInProgress = inquiries.filter((i) => i.status === "in_progress").length;
  const countCompleted = inquiries.filter((i) => i.status === "completed").length;
  const countCancelled = inquiries.filter(
    (i) => i.status === "cancelled" || i.status === "rejected" || i.status === "closed"
  ).length;

  const filters = [
    { id: "all", label: "جميع الطلبات", count: inquiries.length },
    { id: "pending", label: "جديد / قيد المراجعة", count: countPending },
    { id: "in_progress", label: "قيد المتابعة", count: countInProgress },
    { id: "approved", label: "معتمد ومؤكد", count: countApproved },
    { id: "completed", label: "مكتمل", count: countCompleted },
    { id: "cancelled", label: "ملغى / معتذر عنه", count: countCancelled },
  ];

  const typeFilters = [
    { id: "all", label: "كافة الأنواع" },
    { id: "project", label: "مشاريع فقط" },
    { id: "consultation", label: "استشارات فقط" },
  ];

  return (
    <div className="space-y-4 text-start">
      {/* Search & Type Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-text-muted absolute start-3 top-3 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
            placeholder="بحث بالاسم، البريد، كود التتبع، أو الهاتف..."
            className="w-full h-10 ps-9 pe-4 rounded-lg border border-line bg-surface text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-secondary"
          />
        </div>

        {/* Type Filter Buttons */}
        <div className="flex items-center gap-1.5 p-1 rounded-lg bg-surface border border-line">
          {typeFilters.map((t) => (
            <button
              key={t.id}
              onClick={() => onTypeFilterChange(t.id)}
              className={`px-3 py-1.5 rounded-md text-xs font-mono font-bold transition-all ${
                typeFilter === t.id
                  ? "bg-secondary text-primary shadow-sm"
                  : "text-text-muted hover:text-text-primary"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Status Filter Buttons */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => onStatusFilterChange(f.id)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold whitespace-nowrap transition-all border ${
              statusFilter === f.id
                ? "bg-primary-container text-white border-primary-container shadow-sm"
                : "bg-surface border-line text-text-muted hover:text-text-primary hover:border-line-hover"
            }`}
          >
            <span>{f.label}</span>
            <span className="ms-1.5 text-[11px] opacity-75">({f.count})</span>
          </button>
        ))}
      </div>
    </div>
  );
};
