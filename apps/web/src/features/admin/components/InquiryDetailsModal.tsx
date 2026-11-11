import React, { useState, useEffect } from "react";
import { Inquiry } from "@andev/shared";
import {
  X,
  Copy,
  Check,
  Calendar,
  DollarSign,
  Clock,
  MessageSquare,
  ExternalLink
} from "lucide-react";
import { Button } from "../../../components/ui/Button";

interface InquiryDetailsModalProps {
  inquiry: Inquiry | null;
  onClose: () => void;
  onSave: (id: number, status: string, admin_note: string) => Promise<any>;
  isSaving: boolean;
  onOpenApprove?: (inquiry: Inquiry) => void;
  onOpenSchedule?: (inquiry: Inquiry) => void;
  onOpenReject?: (inquiry: Inquiry) => void;
  onOpenDelete?: (inquiry: Inquiry) => void;
}

export const InquiryDetailsModal: React.FC<InquiryDetailsModalProps> = ({
  inquiry,
  onClose,
  onSave,
  isSaving,
  onOpenApprove,
  onOpenSchedule,
  onOpenReject,
  onOpenDelete,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<string>("pending");
  const [noteText, setNoteText] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (inquiry) {
      setSelectedStatus(inquiry.status);
      setNoteText(inquiry.admin_note || "");
    }
  }, [inquiry]);

  if (!inquiry) return null;

  const handleCopyCode = () => {
    if (!inquiry.tracking_code) return;
    navigator.clipboard.writeText(inquiry.tracking_code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    onSave(inquiry.id, selectedStatus, noteText);
  };

  const cleanPhone = inquiry.phone ? inquiry.phone.replace(/[^0-9]/g, "") : "";
  const formattedPhone = cleanPhone.startsWith("0") ? `213${cleanPhone.slice(1)}` : cleanPhone;
  const whatsappUrl = cleanPhone
    ? `https://wa.me/${formattedPhone}?text=${encodeURIComponent(`مرحباً ${inquiry.name}، بخصوص طلبك رقم ${inquiry.tracking_code || inquiry.id} في AN DEV:`)}`
    : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-fade-in text-start">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-line bg-surface p-6 sm:p-8 space-y-6 shadow-modal relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-line">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-secondary/15 text-secondary border border-secondary/30">
                {inquiry.request_type === "consultation" ? "طلب استشارة تقنية" : "طلب مشروع برمجيات"}
              </span>
              <h3 className="text-lg font-bold text-text-primary">
                تفاصيل الطلب #{inquiry.id}
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-text-muted">
              <span>تاريخ الإرسال: {new Date(inquiry.created_at).toLocaleString("ar-DZ")}</span>
              {inquiry.tracking_code && (
                <div className="flex items-center gap-1 bg-surface-container px-2 py-0.5 rounded border border-line">
                  <span className="text-secondary font-bold">{inquiry.tracking_code}</span>
                  <button onClick={handleCopyCode} className="p-0.5 hover:text-text-primary">
                    {copied ? <Check className="w-3 h-3 text-ok" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-text-muted hover:text-text-primary"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Client Coordinates */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-surface-container border border-line text-xs font-mono">
          <div>
            <span className="text-text-muted">الاسم:</span>
            <p className="text-text-primary font-bold pt-0.5">{inquiry.name}</p>
          </div>
          <div>
            <span className="text-text-muted">البريد:</span>
            <p className="text-text-primary font-bold pt-0.5 truncate" title={inquiry.email}>
              {inquiry.email}
            </p>
          </div>
          <div>
            <span className="text-text-muted">الهاتف:</span>
            <div className="flex items-center gap-1.5 pt-0.5">
              <span className="text-text-primary font-bold">{inquiry.phone || "غير محدد"}</span>
              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1 rounded bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20"
                  title="محادثة واتساب مباشرة"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
          <div>
            <span className="text-text-muted">المؤسسة / الشركة:</span>
            <p className="text-text-primary font-bold pt-0.5 truncate">
              {inquiry.company || "عميل فردي"}
            </p>
          </div>
        </div>

        {/* Domain / Type Specific Details */}
        {inquiry.request_type === "consultation" ? (
          <div className="p-4 rounded-xl bg-secondary/5 border border-secondary/20 space-y-2 text-xs font-mono">
            <div className="font-bold text-secondary text-sm flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>مواصفات الاستشارة التقنية:</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1 text-text-muted">
              <div>مجال الاستشارة: <strong className="text-text-primary">{inquiry.consultation_domain || "عام"}</strong></div>
              <div>الموعد المفضل: <strong className="text-text-primary">{inquiry.preferred_date || "غير محدد"} ({inquiry.preferred_time_slot || "صباحاً"})</strong></div>
              <div>وسيلة اللقاء: <strong className="text-text-primary">{inquiry.meeting_mode || "Google Meet"}</strong></div>
            </div>
            {inquiry.confirmed_datetime && (
              <div className="pt-2 text-ok font-bold">
                الموعد المؤكد: {new Date(inquiry.confirmed_datetime).toLocaleString("ar-DZ")}
                {inquiry.meeting_link && (
                  <span className="ms-2">
                    (<a href={inquiry.meeting_link} target="_blank" rel="noreferrer" className="underline text-secondary">رابط الاجتماع</a>)
                  </span>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-surface-container border border-line space-y-2 text-xs font-mono">
            <div className="font-bold text-text-primary text-sm flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-ok" />
              <span>مواصفات المشروع والميزانية:</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1 text-text-muted">
              <div>نوع التطبيق: <strong className="text-secondary">{inquiry.project_type}</strong></div>
              <div>ميزانية العميل: <strong className="text-text-primary">{inquiry.budget_range || "غير محددة"}</strong></div>
              {inquiry.quote_amount && (
                <div>عرض السعر المعتمد: <strong className="text-ok font-bold">{inquiry.quote_amount}</strong></div>
              )}
            </div>
            {inquiry.estimated_timeline && (
              <div className="text-text-muted pt-1">
                المدة التقديرية للتسليم: <strong className="text-text-primary">{inquiry.estimated_timeline}</strong>
              </div>
            )}
          </div>
        )}

        {/* Message Body */}
        <div className="space-y-1.5 text-start">
          <span className="text-xs font-mono text-text-muted font-semibold">نص الرسالة والمتطلبات:</span>
          <div className="p-4 rounded-xl bg-surface-container border border-line text-sm text-text-primary leading-relaxed whitespace-pre-wrap">
            {inquiry.message}
          </div>
        </div>

        {/* Rejection / Cancellation Reason if any */}
        {inquiry.cancellation_reason && (
          <div className="p-3.5 rounded-xl bg-err/10 border border-err/30 text-err text-xs space-y-1">
            <span className="font-bold block">سبب الإلغاء أو الاعتذار:</span>
            <p className="text-text-primary">{inquiry.cancellation_reason}</p>
          </div>
        )}

        {/* Timeline / Activity History */}
        {inquiry.activity_log && inquiry.activity_log.length > 0 && (
          <div className="space-y-3 pt-2 border-t border-line">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-text-primary">
              <Clock className="w-4 h-4 text-secondary" />
              <span>سجل التفاعلات والأحداث (Activity Log):</span>
            </div>
            <div className="space-y-2 max-h-48 overflow-y-auto p-3 rounded-xl bg-surface-container border border-line text-xs font-mono">
              {inquiry.activity_log.map((event, idx) => (
                <div key={event.id || idx} className="pb-2 border-b border-line/50 last:border-0 last:pb-0">
                  <div className="flex justify-between items-center text-text-muted text-[11px]">
                    <span className="font-bold text-secondary">[{event.author}] {event.title}</span>
                    <span>{new Date(event.created_at).toLocaleString("ar-DZ")}</span>
                  </div>
                  {event.body && <p className="text-text-primary text-xs pt-1 font-sans leading-relaxed">{event.body}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Lifecycle Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-line">
          {inquiry.request_type === "project" && onOpenApprove && (
            <button
              type="button"
              onClick={() => onOpenApprove(inquiry)}
              className="px-3 py-1.5 rounded-lg bg-ok/15 text-ok border border-ok/30 text-xs font-mono font-bold hover:bg-ok/25 transition-all"
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
              className="px-3 py-1.5 rounded-lg bg-err/10 text-err border border-err/30 text-xs font-mono font-bold hover:bg-err/20 transition-all"
            >
              الاعتذار عن الطلب
            </button>
          )}

          {onOpenDelete && (
            <button
              type="button"
              onClick={() => onOpenDelete(inquiry)}
              className="px-3 py-1.5 rounded-lg bg-err/10 text-err border border-err/30 text-xs font-mono font-bold hover:bg-err text-white transition-all ms-auto"
            >
              حذف نهائي
            </button>
          )}
        </div>

        {/* Status & Admin Notes */}
        <div className="space-y-4 pt-2 border-t border-line">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-mono text-text-muted font-semibold">
                حالة الطلب التشغيلية:
              </label>
              <select
                value={selectedStatus}
                onChange={e => setSelectedStatus(e.target.value)}
                className="w-full h-10 px-3 rounded-lg border border-line bg-surface-container text-text-primary text-sm font-mono focus:outline-none focus:border-secondary"
              >
                <option value="pending">معلق / قيد المراجعة (Pending)</option>
                <option value="approved">تمت الموافقة / الموعد مؤكد (Approved)</option>
                <option value="in_progress">قيد المتابعة والتنفيذ (In Progress)</option>
                <option value="completed">مكتمل ومسلّم (Completed)</option>
                <option value="cancelled">ملغى من العميل (Cancelled)</option>
                <option value="rejected">مرفوض / معتذر عنه (Rejected)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-mono text-text-muted font-semibold">
                رابط تتبع العميل المباشر:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={`${window.location.origin}/track/${inquiry.tracking_code}`}
                  className="w-full h-10 px-3 rounded-lg border border-line bg-surface-container text-text-muted text-xs font-mono select-all"
                />
                <a
                  href={`/track/${inquiry.tracking_code}`}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-surface-container border border-line text-text-muted hover:text-text-primary flex items-center justify-center"
                  title="فتح صفحة التتبع"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-mono text-text-muted font-semibold">
              ملاحظات الإدارة الداخلية:
            </label>
            <textarea
              rows={3}
              value={noteText}
              onChange={e => setNoteText(e.target.value)}
              placeholder="أدخل ملاحظات التقييم المعماري، أو نتائج الاتصال بالعميل..."
              className="w-full p-3 rounded-lg border border-line bg-surface-container text-text-primary text-sm focus:outline-none focus:border-secondary"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-surface-container border border-line text-xs font-semibold text-text-muted hover:text-text-primary"
            >
              إغلاق
            </button>
            <Button variant="primary" isLoading={isSaving} onClick={handleSave}>
              حفظ وتحديث السجل
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
