import React from "react";
import { ExternalLink } from "lucide-react";
import { Button } from "../../../components/ui/Button";
import { INQUIRY_STATUS_OPTIONS } from "../constants/inquiries.constants";

interface InquiryStatusNotesEditorProps {
  trackingCode?: string;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
  noteText: string;
  onNoteChange: (note: string) => void;
  isSaving: boolean;
  onClose: () => void;
  onSave: () => void;
}

export const InquiryStatusNotesEditor: React.FC<InquiryStatusNotesEditorProps> = ({
  trackingCode,
  selectedStatus,
  onStatusChange,
  noteText,
  onNoteChange,
  isSaving,
  onClose,
  onSave,
}) => {
  return (
    <div className="space-y-4 pt-2 border-t border-line text-start">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="block text-xs font-mono text-text-muted font-semibold">
            حالة الطلب التشغيلية:
          </label>
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full h-10 px-3 rounded-lg border border-line bg-surface-container text-text-primary text-sm font-mono focus:outline-none focus:border-secondary"
          >
            {INQUIRY_STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {trackingCode && (
          <div className="space-y-1.5">
            <label className="block text-xs font-mono text-text-muted font-semibold">
              رابط تتبع العميل المباشر:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={`${window.location.origin}/track/${trackingCode}`}
                className="w-full h-10 px-3 rounded-lg border border-line bg-surface-container text-text-muted text-xs font-mono select-all"
              />
              <a
                href={`/track/${trackingCode}`}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-surface-container border border-line text-text-muted hover:text-text-primary flex items-center justify-center"
                title="فتح صفحة التتبع"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-1.5">
        <label className="block text-xs font-mono text-text-muted font-semibold">
          ملاحظات الإدارة الداخلية:
        </label>
        <textarea
          rows={3}
          value={noteText}
          onChange={(e) => onNoteChange(e.target.value)}
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
        <Button variant="primary" isLoading={isSaving} onClick={onSave}>
          حفظ وتحديث السجل
        </Button>
      </div>
    </div>
  );
};
