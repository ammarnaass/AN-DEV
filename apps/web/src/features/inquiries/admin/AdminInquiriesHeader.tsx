import React from "react";
import { MessageSquare, RefreshCw, Download } from "lucide-react";

interface AdminInquiriesHeaderProps {
  onRefresh: () => void;
  isLoading: boolean;
  onExportCsv: () => void;
  hasInquiries: boolean;
}

export const AdminInquiriesHeader: React.FC<AdminInquiriesHeaderProps> = ({
  onRefresh,
  isLoading,
  onExportCsv,
  hasInquiries,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-line text-start">
      <div className="space-y-1.5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container border border-line text-secondary text-xs font-mono">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>INQUIRIES_ENGINE // WORKFLOW</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
          إدارة طلبات المشاريع والاستشارات
        </h1>
        <p className="text-text-muted text-xs sm:text-sm">
          متابعة الطلبات الواردة، جدولة مواعيد الاستشارات، وتقديم عروض الأسعار مع تتبع العميل المباشر.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onRefresh}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface border border-line text-xs font-semibold text-text-muted hover:text-text-primary transition-colors"
          title="تحديث البيانات"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin text-secondary" : ""}`} />
          <span>تحديث</span>
        </button>

        <button
          onClick={onExportCsv}
          disabled={!hasInquiries}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface border border-line text-xs font-semibold text-text-muted hover:text-text-primary transition-colors disabled:opacity-40"
        >
          <Download className="w-3.5 h-3.5" />
          <span>تصدير CSV</span>
        </button>
      </div>
    </div>
  );
};
