import React from "react";
import { Inquiry } from "@andev/shared";
import {
  CheckCircle2,
  Clock,
  XCircle,
  Trash2,
  MessageSquare,
  Briefcase,
  Brain
} from "lucide-react";

interface InquiryListTableProps {
  inquiries: Inquiry[];
  isLoading: boolean;
  onSelectInquiry: (inquiry: Inquiry) => void;
  onApproveInquiry?: (inquiry: Inquiry) => void;
  onScheduleConsultation?: (inquiry: Inquiry) => void;
  onRejectInquiry?: (inquiry: Inquiry) => void;
  onDeleteInquiry?: (inquiry: Inquiry) => void;
}

export const InquiryListTable: React.FC<InquiryListTableProps> = ({
  inquiries,
  isLoading,
  onSelectInquiry,
  onApproveInquiry,
  onScheduleConsultation,
  onRejectInquiry,
  onDeleteInquiry,
}) => {
  if (isLoading) {
    return (
      <div className="space-y-3 animate-pulse">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-20 rounded-xl bg-surface border border-line" />
        ))}
      </div>
    );
  }

  if (inquiries.length === 0) {
    return (
      <div className="py-16 text-center text-text-muted text-sm border border-line rounded-xl bg-surface/30">
        لا توجد طلبات مشاريع أو استشارات تطابق الفلتر المحدد.
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-line bg-surface overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-start text-sm">
          <thead className="bg-surface-container border-b border-line text-xs font-mono text-text-muted">
            <tr>
              <th className="p-4 text-start">العميل وكود التتبع</th>
              <th className="p-4 text-start">نوع الطلب والمواصفات</th>
              <th className="p-4 text-center">الحالة</th>
              <th className="p-4 text-start">تاريخ الورود</th>
              <th className="p-4 text-center">إجراءات سريعة</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {inquiries.map(inq => {
              const cleanPhone = inq.phone ? inq.phone.replace(/[^0-9]/g, "") : "";
              const formattedPhone = cleanPhone.startsWith("0") ? `213${cleanPhone.slice(1)}` : cleanPhone;
              const whatsappUrl = cleanPhone ? `https://wa.me/${formattedPhone}` : null;

              return (
                <tr
                  key={inq.id}
                  onClick={() => onSelectInquiry(inq)}
                  className="hover:bg-surface-elevated/50 transition-colors cursor-pointer"
                >
                  {/* Client & Tracking */}
                  <td className="p-4">
                    <div className="space-y-1">
                      <div className="font-bold text-text-primary text-sm flex items-center gap-2">
                        <span>{inq.name}</span>
                        {(inq.status === "pending" || inq.status === "new") && (
                          <span className="w-2 h-2 rounded-full bg-status-ok animate-pulse" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs font-mono text-text-muted">
                        <span>{inq.email}</span>
                        {inq.phone && (
                          <div className="flex items-center gap-1 text-[11px] text-text-primary">
                            <span>· {inq.phone}</span>
                            {whatsappUrl && (
                              <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noreferrer"
                                onClick={e => e.stopPropagation()}
                                className="text-[#25D366] hover:opacity-80"
                                title="مراسلة عبر واتساب"
                              >
                                <MessageSquare className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                      {inq.tracking_code && (
                        <div className="inline-block px-2 py-0.5 rounded bg-surface-container border border-line text-[11px] font-mono text-secondary font-bold">
                          {inq.tracking_code}
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Type & Specs */}
                  <td className="p-4">
                    <div className="space-y-1 text-xs font-mono">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`px-2 py-0.5 rounded border inline-flex items-center gap-1 font-bold ${
                            inq.request_type === "consultation"
                              ? "bg-secondary/10 border-secondary/30 text-secondary"
                              : "bg-primary-container/20 border-primary-container/40 text-primary-light"
                          }`}
                        >
                          {inq.request_type === "consultation" ? (
                            <>
                              <Brain className="w-3 h-3" />
                              <span>استشارة</span>
                            </>
                          ) : (
                            <>
                              <Briefcase className="w-3 h-3" />
                              <span>مشروع</span>
                            </>
                          )}
                        </span>
                        <span className="text-text-muted">
                          {inq.request_type === "consultation"
                            ? inq.consultation_domain || "عام"
                            : inq.project_type}
                        </span>
                      </div>

                      <div className="text-text-muted text-[11px]">
                        {inq.request_type === "consultation"
                          ? `الموعد: ${inq.preferred_date || "غير محدد"}`
                          : `الميزانية: ${inq.budget_range || "غير محددة"}`}
                      </div>
                    </div>
                  </td>

                  {/* Status Badge */}
                  <td className="p-4 text-center">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono font-semibold border ${
                        inq.status === "approved" || inq.status === "completed"
                          ? "bg-ok/15 text-ok border-ok/30"
                          : inq.status === "in_progress"
                          ? "bg-secondary/15 text-secondary border-secondary/30"
                          : inq.status === "cancelled" || inq.status === "rejected"
                          ? "bg-err/15 text-err border-err/30"
                          : "bg-status-warn/15 text-status-warn border-status-warn/30"
                      }`}
                    >
                      {inq.status === "approved" ? (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-ok" />
                          <span>موافق عليه</span>
                        </>
                      ) : inq.status === "in_progress" ? (
                        <>
                          <Clock className="w-3 h-3 text-secondary" />
                          <span>قيد المتابعة</span>
                        </>
                      ) : inq.status === "completed" ? (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-ok" />
                          <span>مكتمل</span>
                        </>
                      ) : inq.status === "cancelled" ? (
                        <>
                          <XCircle className="w-3 h-3 text-err" />
                          <span>ملغى</span>
                        </>
                      ) : inq.status === "rejected" ? (
                        <>
                          <XCircle className="w-3 h-3 text-err" />
                          <span>مرفوض</span>
                        </>
                      ) : (
                        <>
                          <Clock className="w-3 h-3 text-status-warn" />
                          <span>قيد المراجعة</span>
                        </>
                      )}
                    </span>
                  </td>

                  {/* Created At */}
                  <td className="p-4 text-xs font-mono text-text-muted">
                    {new Date(inq.created_at).toLocaleDateString("ar-DZ", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>

                  {/* Actions */}
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      {/* Quick Approve or Schedule */}
                      {(inq.status === "pending" || inq.status === "new") && (
                        <>
                          {inq.request_type === "project" && onApproveInquiry && (
                            <button
                              onClick={e => {
                                e.stopPropagation();
                                onApproveInquiry(inq);
                              }}
                              className="px-2.5 py-1 rounded bg-ok/15 text-ok hover:bg-ok/25 border border-ok/30 text-xs font-bold transition-all"
                              title="الموافقة وتقديم عرض السعر"
                            >
                              موافقة
                            </button>
                          )}

                          {inq.request_type === "consultation" && onScheduleConsultation && (
                            <button
                              onClick={e => {
                                e.stopPropagation();
                                onScheduleConsultation(inq);
                              }}
                              className="px-2.5 py-1 rounded bg-secondary/15 text-secondary hover:bg-secondary/25 border border-secondary/30 text-xs font-bold transition-all"
                              title="تأكيد وحجز موعد الاستشارة"
                            >
                              حجز موعد
                            </button>
                          )}

                          {onRejectInquiry && (
                            <button
                              onClick={e => {
                                e.stopPropagation();
                                onRejectInquiry(inq);
                              }}
                              className="px-2 py-1 rounded bg-err/10 text-err hover:bg-err/20 border border-err/30 text-xs font-bold transition-all"
                              title="الاعتذار عن الطلب"
                            >
                              رفض
                            </button>
                          )}
                        </>
                      )}

                      {/* Details Button */}
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          onSelectInquiry(inq);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-surface-container border border-line text-xs font-semibold text-secondary hover:bg-surface-elevated transition-colors"
                      >
                        معاينة
                      </button>

                      {/* Hard Delete Button */}
                      {onDeleteInquiry && (
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            onDeleteInquiry(inq);
                          }}
                          className="p-1.5 rounded-lg text-text-muted hover:text-err hover:bg-err/10 transition-colors"
                          title="حذف نهائي من قاعدة البيانات"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
