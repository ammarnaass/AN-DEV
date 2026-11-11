import React from "react";
import { Inquiry } from "@andev/shared";

interface InquiryQuickActionsBarProps {
  inquiry: Inquiry;
  onOpenApprove?: (inquiry: Inquiry) => void;
  onOpenSchedule?: (inquiry: Inquiry) => void;
  onOpenReject?: (inquiry: Inquiry) => void;
  onOpenDelete?: (inquiry: Inquiry) => void;
}

export const InquiryQuickActionsBar: React.FC<InquiryQuickActionsBarProps> = ({
  inquiry,
  onOpenApprove,
  onOpenSchedule,
  onOpenReject,
  onOpenDelete,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-line text-start">
      {inquiry.request_type === "project" && onOpenApprove && (
        <button
          type="button"
          onClick={() => onOpenApprove(inquiry)}
          className="px-3 py-1.5 rounded-lg bg-status-ok/15 text-status-ok border border-status-ok/30 text-xs font-mono font-bold hover:bg-status-ok/25 transition-all"
        >
          الموافقة وتقديم عرض السعر
        </button>
      )}

      {inquiry.request_type === "consultation" && onOpenSchedule && (
        <button
          type="button"
          onClick={() => onOpenSchedule(inquiry)}
          className="px-3 py-1.5 rounded-lg bg-secondary/15 text-secondary border border-secondary/30 text-xs font-mono font-bold hover:bg-secondary/25 transition-all"
        >
          تأكيد وحجز موعد الجلسة
        </button>
      )}

      {onOpenReject && (
        <button
          type="button"
          onClick={() => onOpenReject(inquiry)}
          className="px-3 py-1.5 rounded-lg bg-status-err/10 text-status-err border border-status-err/30 text-xs font-mono font-bold hover:bg-status-err/20 transition-all"
        >
          الاعتذار عن الطلب
        </button>
      )}

      {onOpenDelete && (
        <button
          type="button"
          onClick={() => onOpenDelete(inquiry)}
          className="px-3 py-1.5 rounded-lg bg-status-err/10 text-status-err border border-status-err/30 text-xs font-mono font-bold hover:bg-status-err text-white transition-all ms-auto"
        >
          حذف نهائي
        </button>
      )}
    </div>
  );
};
