import React, { useState } from "react";
import { CheckCircle2, Clock, XCircle, Copy, Check } from "lucide-react";
import { useI18n } from "../../../lib/i18n";
import { TrackInquiryResponse } from "../services/inquiries.service";

interface TrackingHeaderBadgeProps {
  data: TrackInquiryResponse;
}

export const TrackingHeaderBadge: React.FC<TrackingHeaderBadgeProps> = ({ data }) => {
  const { locale } = useI18n();
  const [copied, setCopied] = useState(false);

  const handleCopyCode = () => {
    if (!data.tracking_code) return;
    navigator.clipboard.writeText(data.tracking_code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-line text-start">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded bg-secondary/15 text-secondary border border-secondary/30 text-xs font-mono font-bold">
            {data.request_type === "consultation"
              ? locale === "ar"
                ? "استشارة تقنية"
                : "Technical Consultation"
              : locale === "ar"
              ? "مشروع برمجيات"
              : "Software Project"}
          </span>
          <div className="flex items-center gap-1.5 font-mono text-sm font-bold text-ink bg-surface-container px-3 py-1 rounded-lg border border-line">
            <span>{data.tracking_code}</span>
            <button
              onClick={handleCopyCode}
              className="text-mute hover:text-ink transition-colors p-0.5"
              title={locale === "ar" ? "نسخ" : "Copy"}
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-ok" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>
        <div className="text-xs text-mute font-mono pt-1">
          {locale === "ar" ? "تاريخ التقديم:" : "Submitted on:"}{" "}
          {new Date(data.created_at).toLocaleString("ar-DZ")}
        </div>
      </div>

      {/* Status Badge */}
      <div>
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-bold border ${
            data.status === "approved" || data.status === "completed"
              ? "bg-ok/15 text-ok border-ok/30"
              : data.status === "in_progress"
              ? "bg-secondary/15 text-secondary border-secondary/30"
              : data.status === "cancelled" || data.status === "rejected"
              ? "bg-err/15 text-err border-err/30"
              : "bg-surface-container text-ink border-line"
          }`}
        >
          {data.status === "approved" ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>
                {locale === "ar" ? "تمت الموافقة / الموعد مؤكد" : "Approved / Confirmed"}
              </span>
            </>
          ) : data.status === "in_progress" ? (
            <>
              <Clock className="w-3.5 h-3.5" />
              <span>{locale === "ar" ? "قيد التنفيذ والمتابعة" : "In Progress"}</span>
            </>
          ) : data.status === "completed" ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{locale === "ar" ? "مكتمل بنجاح" : "Completed"}</span>
            </>
          ) : data.status === "cancelled" ? (
            <>
              <XCircle className="w-3.5 h-3.5" />
              <span>{locale === "ar" ? "ملغى من العميل" : "Cancelled by Client"}</span>
            </>
          ) : data.status === "rejected" ? (
            <>
              <XCircle className="w-3.5 h-3.5" />
              <span>{locale === "ar" ? "تم الاعتذار عن الطلب" : "Declined by Agency"}</span>
            </>
          ) : (
            <>
              <Clock className="w-3.5 h-3.5 text-secondary" />
              <span>{locale === "ar" ? "قيد المراجعة الأولية" : "Under Review"}</span>
            </>
          )}
        </span>
      </div>
    </div>
  );
};
