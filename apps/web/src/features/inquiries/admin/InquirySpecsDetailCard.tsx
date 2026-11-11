import React from "react";
import { Calendar, DollarSign } from "lucide-react";
import { Inquiry } from "@andev/shared";

interface InquirySpecsDetailCardProps {
  inquiry: Inquiry;
}

export const InquirySpecsDetailCard: React.FC<InquirySpecsDetailCardProps> = ({
  inquiry,
}) => {
  return (
    <div className="space-y-4 text-start">
      {/* Domain / Type Specific Details */}
      {inquiry.request_type === "consultation" ? (
        <div className="p-4 rounded-xl bg-secondary/5 border border-secondary/20 space-y-2 text-xs font-mono">
          <div className="font-bold text-secondary text-sm flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            <span>مواصفات الاستشارة التقنية:</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1 text-text-muted">
            <div>
              مجال الاستشارة:{" "}
              <strong className="text-text-primary">
                {inquiry.consultation_domain || "عام"}
              </strong>
            </div>
            <div>
              الموعد المفضل:{" "}
              <strong className="text-text-primary">
                {inquiry.preferred_date || "غير محدد"} (
                {inquiry.preferred_time_slot || "صباحاً"})
              </strong>
            </div>
            <div>
              وسيلة اللقاء:{" "}
              <strong className="text-text-primary">
                {inquiry.meeting_mode || "Google Meet"}
              </strong>
            </div>
          </div>
          {inquiry.confirmed_datetime && (
            <div className="pt-2 text-status-ok font-bold">
              الموعد المؤكد:{" "}
              {new Date(inquiry.confirmed_datetime).toLocaleString("ar-DZ")}
              {inquiry.meeting_link && (
                <span className="ms-2">
                  (
                  <a
                    href={inquiry.meeting_link}
                    target="_blank"
                    rel="noreferrer"
                    className="underline text-secondary"
                  >
                    رابط الاجتماع
                  </a>
                  )
                </span>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-surface-container border border-line space-y-2 text-xs font-mono">
          <div className="font-bold text-text-primary text-sm flex items-center gap-1.5">
            <DollarSign className="w-4 h-4 text-status-ok" />
            <span>مواصفات المشروع والميزانية:</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1 text-text-muted">
            <div>
              نوع التطبيق:{" "}
              <strong className="text-secondary">{inquiry.project_type}</strong>
            </div>
            <div>
              ميزانية العميل:{" "}
              <strong className="text-text-primary">
                {inquiry.budget_range || "غير محددة"}
              </strong>
            </div>
            {inquiry.quote_amount && (
              <div>
                عرض السعر المعتمد:{" "}
                <strong className="text-status-ok font-bold">
                  {inquiry.quote_amount}
                </strong>
              </div>
            )}
          </div>
          {inquiry.estimated_timeline && (
            <div className="text-text-muted pt-1">
              المدة التقديرية للتسليم:{" "}
              <strong className="text-text-primary">
                {inquiry.estimated_timeline}
              </strong>
            </div>
          )}
        </div>
      )}

      {/* Message Body */}
      <div className="space-y-1.5 text-start">
        <span className="text-xs font-mono text-text-muted font-semibold">
          نص الرسالة والمتطلبات:
        </span>
        <div className="p-4 rounded-xl bg-surface-container border border-line text-sm text-text-primary leading-relaxed whitespace-pre-wrap">
          {inquiry.message}
        </div>
      </div>

      {/* Cancellation / Rejection Note */}
      {inquiry.cancellation_reason && (
        <div className="p-3.5 rounded-xl bg-status-err/10 border border-status-err/30 text-status-err text-xs space-y-1">
          <span className="font-bold block">سبب الإلغاء أو الاعتذار:</span>
          <p className="text-text-primary">{inquiry.cancellation_reason}</p>
        </div>
      )}
    </div>
  );
};
