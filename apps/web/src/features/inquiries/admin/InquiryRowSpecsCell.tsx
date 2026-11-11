import React from "react";
import { Brain, Briefcase } from "lucide-react";
import { Inquiry } from "@andev/shared";

interface InquiryRowSpecsCellProps {
  inquiry: Inquiry;
}

export const InquiryRowSpecsCell: React.FC<InquiryRowSpecsCellProps> = ({
  inquiry,
}) => {
  return (
    <div className="space-y-1 text-xs font-mono text-start">
      <div className="flex items-center gap-1.5">
        <span
          className={`px-2 py-0.5 rounded border inline-flex items-center gap-1 font-bold ${
            inquiry.request_type === "consultation"
              ? "bg-secondary/10 border-secondary/30 text-secondary"
              : "bg-primary-container/20 border-primary-container/40 text-primary-light"
          }`}
        >
          {inquiry.request_type === "consultation" ? (
            <>
              <Brain className="w-3 h-3" />
              <span>استشارة تقنية</span>
            </>
          ) : (
            <>
              <Briefcase className="w-3 h-3" />
              <span>مشروع برمجيات</span>
            </>
          )}
        </span>
        <span className="text-text-muted">
          {inquiry.request_type === "consultation"
            ? inquiry.consultation_domain || "عام"
            : inquiry.project_type}
        </span>
      </div>

      <div className="text-[11px] text-text-muted">
        {inquiry.request_type === "consultation" ? (
          <span>الموعد: {inquiry.preferred_date || "غير محدد"}</span>
        ) : (
          <span>الميزانية: {inquiry.budget_range || "مرنة"}</span>
        )}
        {inquiry.quote_amount && (
          <span className="text-status-ok font-bold ms-2">
            · عرض السعر: {inquiry.quote_amount}
          </span>
        )}
      </div>
    </div>
  );
};
