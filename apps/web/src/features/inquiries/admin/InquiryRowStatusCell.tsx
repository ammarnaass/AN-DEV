import React from "react";
import { CheckCircle2, Clock, XCircle } from "lucide-react";
import { Inquiry } from "@andev/shared";

interface InquiryRowStatusCellProps {
  status: Inquiry["status"];
}

export const InquiryRowStatusCell: React.FC<InquiryRowStatusCellProps> = ({
  status,
}) => {
  return (
    <div className="flex justify-center">
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-bold border ${
          status === "approved" || status === "completed"
            ? "bg-status-ok/15 text-status-ok border-status-ok/30"
            : status === "in_progress"
            ? "bg-secondary/15 text-secondary border-secondary/30"
            : status === "cancelled" || status === "rejected"
            ? "bg-status-err/15 text-status-err border-status-err/30"
            : "bg-surface-container text-text-primary border-line"
        }`}
      >
        {status === "approved" ? (
          <>
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>موافقة / مؤكد</span>
          </>
        ) : status === "in_progress" ? (
          <>
            <Clock className="w-3.5 h-3.5" />
            <span>قيد المتابعة</span>
          </>
        ) : status === "completed" ? (
          <>
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>مكتمل ومسلّم</span>
          </>
        ) : status === "cancelled" ? (
          <>
            <XCircle className="w-3.5 h-3.5" />
            <span>ملغى من العميل</span>
          </>
        ) : status === "rejected" ? (
          <>
            <XCircle className="w-3.5 h-3.5" />
            <span>معتذر عنه</span>
          </>
        ) : (
          <>
            <Clock className="w-3.5 h-3.5 text-secondary" />
            <span>جديد / قيد المراجعة</span>
          </>
        )}
      </span>
    </div>
  );
};
