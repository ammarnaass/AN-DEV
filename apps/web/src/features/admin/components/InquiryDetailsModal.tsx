import React, { useState, useEffect } from "react";
import { Inquiry } from "@andev/shared";
import { UserCheck, X } from "lucide-react";

interface InquiryDetailsModalProps {
  inquiry: Inquiry | null;
  onClose: () => void;
  onSave: (id: number, status: string, admin_note: string) => Promise<any>;
  isSaving: boolean;
}

export const InquiryDetailsModal: React.FC<InquiryDetailsModalProps> = ({
  inquiry,
  onClose,
  onSave,
  isSaving,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<"new" | "in_progress" | "closed">("new");
  const [noteText, setNoteText] = useState("");

  useEffect(() => {
    if (inquiry) {
      setSelectedStatus(inquiry.status);
      setNoteText(inquiry.admin_note || "");
    }
  }, [inquiry]);

  if (!inquiry) return null;

  const handleSave = () => {
    onSave(inquiry.id, selectedStatus, noteText);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-xl rounded-2xl border border-line bg-surface p-6 sm:p-8 space-y-6 shadow-modal relative text-start">
        <div className="flex items-center justify-between pb-4 border-b border-line">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-secondary" />
              <h3 className="text-lg font-bold text-text-primary">
                تفاصيل طلب العميل #{inquiry.id}
              </h3>
            </div>
            <div className="text-xs font-mono text-text-muted">
              تاريخ الإرسال: {new Date(inquiry.created_at).toLocaleString("ar-DZ")}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-text-muted hover:text-text-primary"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Client Info Grid */}
        <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-surface-container border border-line text-xs font-mono">
          <div>
            <span className="text-text-muted">الاسم:</span>
            <p className="text-text-primary font-bold pt-0.5">{inquiry.name}</p>
          </div>
          <div>
            <span className="text-text-muted">البريد:</span>
            <p className="text-text-primary font-bold pt-0.5">{inquiry.email}</p>
          </div>
          <div>
            <span className="text-text-muted">نوع المشروع:</span>
            <p className="text-secondary font-bold pt-0.5">{inquiry.project_type}</p>
          </div>
          <div>
            <span className="text-text-muted">الميزانية:</span>
            <p className="text-text-primary font-bold pt-0.5">{inquiry.budget_range || "غير محدد"}</p>
          </div>
        </div>

        {/* Message Body */}
        <div className="space-y-1.5">
          <span className="text-xs font-mono text-text-muted font-semibold">نص الرسالة والمتطلبات:</span>
          <div className="p-4 rounded-xl bg-surface-container border border-line text-sm text-text-primary leading-relaxed whitespace-pre-wrap">
            {inquiry.message}
          </div>
        </div>

        {/* Status & Admin Notes */}
        <div className="space-y-4 pt-2 border-t border-line">
          <div className="space-y-1.5">
            <label className="block text-xs font-mono text-text-muted font-semibold">
              حالة الطلب التشغيلية:
            </label>
            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value as any)}
              className="w-full h-10 px-3 rounded-lg border border-line bg-surface-container text-text-primary text-sm font-mono focus:outline-none focus:border-secondary"
            >
              <option value="new">جديد (New)</option>
              <option value="in_progress">قيد المتابعة (In Progress)</option>
              <option value="closed">مغلق (Closed)</option>
            </select>
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
              إلغاء
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="px-5 py-2 rounded-lg bg-primary-container text-white text-xs font-semibold hover:bg-primary/90 transition-all shadow-[0_0_12px_rgba(13,110,253,0.35)] disabled:opacity-50"
            >
              {isSaving ? "جاري الحفظ..." : "حفظ التغييرات"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

