import React, { useState } from "react";
import { Inquiry } from "@andev/shared";
import { Calendar, Video, X } from "lucide-react";
import { Button } from "../../../components/ui/Button";

interface ScheduleConsultationModalProps {
  inquiry: Inquiry | null;
  onClose: () => void;
  onSchedule: (
    id: number,
    confirmed_datetime: string,
    meeting_mode: string,
    meeting_link?: string,
    admin_note?: string
  ) => Promise<any>;
  isScheduling: boolean;
}

export const ScheduleConsultationModal: React.FC<ScheduleConsultationModalProps> = ({
  inquiry,
  onClose,
  onSchedule,
  isScheduling,
}) => {
  const [dateTime, setDateTime] = useState(
    inquiry?.preferred_date ? `${inquiry.preferred_date}T10:00` : ""
  );
  const [meetingMode, setMeetingMode] = useState(inquiry?.meeting_mode || "google_meet");
  const [meetingLink, setMeetingLink] = useState(
    inquiry?.meeting_link || "https://meet.google.com/and-cons-live"
  );
  const [adminNote, setAdminNote] = useState("");

  if (!inquiry) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dateTime.trim()) return;
    onSchedule(inquiry.id, dateTime, meetingMode, meetingLink, adminNote);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-fade-in text-start">
      <div className="w-full max-w-lg rounded-2xl border border-line bg-surface p-6 sm:p-8 space-y-6 shadow-modal relative">
        <div className="flex items-center justify-between pb-4 border-b border-line">
          <div className="flex items-center gap-2 text-secondary">
            <Calendar className="w-5 h-5" />
            <h3 className="text-lg font-bold text-text-primary">
              تأكيد وحجز موعد الاستشارة #{inquiry.id}
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-text-muted hover:text-text-primary">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-3 rounded-xl bg-surface-container border border-line text-xs font-mono space-y-1">
          <div className="flex justify-between">
            <span className="text-text-muted">العميل: <strong className="text-text-primary">{inquiry.name}</strong></span>
            <span className="text-secondary font-bold">{inquiry.tracking_code}</span>
          </div>
          <div className="text-text-muted">
            الموعد المفضل من العميل: {inquiry.preferred_date || "غير محدد"} ({inquiry.preferred_time_slot || "صباحاً"})
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
          <div className="space-y-1.5 text-start">
            <label className="block text-text-muted font-semibold">
              تاريخ وتوقيت الجلسة المؤكد <span className="text-err">*</span>
            </label>
            <input
              type="datetime-local"
              required
              value={dateTime}
              onChange={e => setDateTime(e.target.value)}
              className="w-full h-10 px-3 rounded-lg border border-line bg-bg text-text-primary text-sm focus:outline-none focus:border-secondary"
            />
          </div>

          <div className="space-y-1.5 text-start">
            <label className="block text-text-muted font-semibold">
              وسيلة عقد الاستشارة
            </label>
            <select
              value={meetingMode}
              onChange={e => setMeetingMode(e.target.value as any)}
              className="w-full h-10 px-3 rounded-lg border border-line bg-bg text-text-primary text-sm focus:outline-none focus:border-secondary"
            >
              <option value="google_meet">مكالمة فيديو عبر Google Meet</option>
              <option value="phone">مكالمة هاتفية مباشرة</option>
              <option value="in_person">جلسة حضورية في المقر</option>
            </select>
          </div>

          <div className="space-y-1.5 text-start">
            <label className="block text-text-muted font-semibold">
              رابط الاجتماع أو العنوان (Meeting Link)
            </label>
            <div className="relative">
              <input
                type="text"
                value={meetingLink}
                onChange={e => setMeetingLink(e.target.value)}
                placeholder="https://meet.google.com/..."
                className="w-full h-10 px-3 rounded-lg border border-line bg-bg text-text-primary text-sm focus:outline-none focus:border-secondary"
              />
              <Video className="w-4 h-4 text-mute absolute end-3 top-3 pointer-events-none" />
            </div>
          </div>

          <div className="space-y-1.5 text-start">
            <label className="block text-text-muted font-semibold">
              ملاحظات وتعليمات الحضور للعميل:
            </label>
            <textarea
              rows={3}
              value={adminNote}
              onChange={e => setAdminNote(e.target.value)}
              placeholder="نقاط الأجندة، الملفات المطلوب تجهيزها، أو تعليمات الدخول..."
              className="w-full p-3 rounded-lg border border-line bg-bg text-text-primary text-sm focus:outline-none focus:border-secondary font-sans"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-line">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-surface-container border border-line text-xs font-semibold text-text-muted hover:text-text-primary"
            >
              إلغاء
            </button>
            <Button type="submit" variant="primary" isLoading={isScheduling}>
              تأكيد الموعد وإرسال الرابط للعميل
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

