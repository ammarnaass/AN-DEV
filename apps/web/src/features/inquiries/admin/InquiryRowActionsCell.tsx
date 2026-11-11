import React from "react";
import { CheckCircle2, Calendar, XCircle, Trash2 } from "lucide-react";
import { Inquiry } from "@andev/shared";

interface InquiryRowActionsCellProps {
  inquiry: Inquiry;
  onApproveInquiry?: (inquiry: Inquiry) => void;
  onScheduleConsultation?: (inquiry: Inquiry) => void;
  onRejectInquiry?: (inquiry: Inquiry) => void;
  onDeleteInquiry?: (inquiry: Inquiry) => void;
}

export const InquiryRowActionsCell: React.FC<InquiryRowActionsCellProps> = ({
  inquiry,
  onApproveInquiry,
  onScheduleConsultation,
  onRejectInquiry,
  onDeleteInquiry,
}) => {
  return (
    <div
      className="flex items-center justify-center gap-1.5"
      onClick={(e) => e.stopPropagation()}
    >
      {inquiry.request_type === "project" && onApproveInquiry && (
        <button
          type="button"
          onClick={() => onApproveInquiry(inquiry)}
          className="p-1.5 rounded-lg bg-status-ok/10 text-status-ok hover:bg-status-ok/20 transition-colors"
          title="الموافقة وتقديم عرض السعر"
        >
          <CheckCircle2 className="w-4 h-4" />
        </button>
      )}

      {inquiry.request_type === "consultation" && onScheduleConsultation && (
        <button
          type="button"
          onClick={() => onScheduleConsultation(inquiry)}
          className="p-1.5 rounded-lg bg-secondary/10 text-secondary hover:bg-secondary/20 transition-colors"
          title="حجز موعد الاستشارة"
        >
          <Calendar className="w-4 h-4" />
        </button>
      )}

      {onRejectInquiry && (
        <button
          type="button"
          onClick={() => onRejectInquiry(inquiry)}
          className="p-1.5 rounded-lg bg-status-err/10 text-status-err hover:bg-status-err/20 transition-colors"
          title="الاعتذار عن الطلب"
        >
          <XCircle className="w-4 h-4" />
        </button>
      )}

      {onDeleteInquiry && (
        <button
          type="button"
          onClick={() => onDeleteInquiry(inquiry)}
          className="p-1.5 rounded-lg text-text-muted hover:text-status-err transition-colors"
          title="حذف الطلب"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
