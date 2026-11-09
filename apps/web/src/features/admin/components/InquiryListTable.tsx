import React from "react";
import { Inquiry } from "@andev/shared";
import { CheckCircle2, Clock, XCircle } from "lucide-react";

interface InquiryListTableProps {
  inquiries: Inquiry[];
  isLoading: boolean;
  onSelectInquiry: (inquiry: Inquiry) => void;
}

export const InquiryListTable: React.FC<InquiryListTableProps> = ({
  inquiries,
  isLoading,
  onSelectInquiry,
}) => {
  if (isLoading) {
    return (
      <div className="space-y-3 animate-pulse">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-16 rounded-xl bg-surface border border-line" />
        ))}
      </div>
    );
  }

  if (inquiries.length === 0) {
    return (
      <div className="py-12 text-center text-text-muted text-sm border border-line rounded-xl bg-surface/30">
        لا توجد طلبات مشاريع تطابق الفلتر المحدد.
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-line bg-surface overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-start text-sm">
          <thead className="bg-surface-container border-b border-line text-xs font-mono text-text-muted">
            <tr>
              <th className="p-4 text-start">العميل والمشروع</th>
              <th className="p-4 text-start">النوع والميزانية</th>
              <th className="p-4 text-center">الحالة</th>
              <th className="p-4 text-start">تاريخ الورود</th>
              <th className="p-4 text-center">إجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {inquiries.map(inq => (
              <tr
                key={inq.id}
                onClick={() => onSelectInquiry(inq)}
                className="hover:bg-surface-elevated/50 transition-colors cursor-pointer"
              >
                <td className="p-4">
                  <div className="space-y-1">
                    <div className="font-bold text-text-primary text-sm flex items-center gap-2">
                      <span>{inq.name}</span>
                      {inq.status === "new" && (
                        <span className="w-2 h-2 rounded-full bg-status-ok animate-pulse" />
                      )}
                    </div>
                    <div className="text-xs font-mono text-text-muted">{inq.email}</div>
                    <p className="text-xs text-text-muted line-clamp-1 max-w-md pt-0.5">
                      {inq.message}
                    </p>
                  </div>
                </td>

                <td className="p-4">
                  <div className="space-y-1 text-xs font-mono">
                    <div className="px-2 py-0.5 rounded bg-surface-container border border-line text-secondary inline-block">
                      {inq.project_type}
                    </div>
                    <div className="text-text-muted text-[11px]">
                      {inq.budget_range || "غير محدد"}
                    </div>
                  </div>
                </td>

                <td className="p-4 text-center">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono font-semibold border ${
                      inq.status === "new"
                        ? "bg-secondary/15 text-secondary border-secondary/30"
                        : inq.status === "in_progress"
                        ? "bg-status-warn/15 text-status-warn border-status-warn/30"
                        : "bg-surface-container text-text-muted border-line"
                    }`}
                  >
                    {inq.status === "new" ? (
                      <>
                        <CheckCircle2 className="w-3 h-3 text-status-ok" />
                        <span>جديد</span>
                      </>
                    ) : inq.status === "in_progress" ? (
                      <>
                        <Clock className="w-3 h-3 text-status-warn" />
                        <span>قيد المتابعة</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3 h-3 text-text-muted" />
                        <span>مغلق</span>
                      </>
                    )}
                  </span>
                </td>

                <td className="p-4 text-xs font-mono text-text-muted">
                  {new Date(inq.created_at).toLocaleDateString("ar-DZ", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>

                <td className="p-4 text-center">
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      onSelectInquiry(inq);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-surface-container border border-line text-xs font-semibold text-secondary hover:bg-surface-elevated transition-colors"
                  >
                    معاينة وتعديل
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

