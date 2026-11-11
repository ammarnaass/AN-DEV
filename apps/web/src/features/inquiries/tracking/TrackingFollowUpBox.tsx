import React, { useState } from "react";
import { MessageSquare, Send } from "lucide-react";
import { useI18n } from "../../../lib/i18n";
import { Button } from "../../../components/ui/Button";

interface TrackingFollowUpBoxProps {
  onSendMessage: (message: string) => Promise<void>;
  isSending: boolean;
}

export const TrackingFollowUpBox: React.FC<TrackingFollowUpBoxProps> = ({
  onSendMessage,
  isSending,
}) => {
  const { locale } = useI18n();
  const [newMessage, setNewMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    await onSendMessage(newMessage);
    setNewMessage("");
  };

  return (
    <div className="p-6 rounded-2xl border border-line bg-surface space-y-4 shadow-sm text-start">
      <div className="flex items-center gap-2 text-ink font-bold text-sm">
        <MessageSquare className="w-4 h-4 text-secondary" />
        <span>
          {locale === "ar"
            ? "إرسال رسالة أو تحديث إضافي لفريق AN DEV"
            : "Send Follow-up Message to Team"}
        </span>
      </div>
      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          rows={3}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder={
            locale === "ar"
              ? "أضف أي تفاصيل جديدة، استفسار حول الموعد، أو ملفات ترغب بمشاركتها..."
              : "Type your follow-up note or question here..."
          }
          className="w-full p-3 rounded-lg border border-line bg-bg text-ink text-sm focus:outline-none focus:border-secondary"
        />
        <div className="flex justify-end">
          <Button
            type="submit"
            variant="secondary"
            isLoading={isSending}
            disabled={!newMessage.trim()}
          >
            <Send className="w-3.5 h-3.5 me-1.5" />
            <span>{locale === "ar" ? "إرسال التحديث" : "Send Note"}</span>
          </Button>
        </div>
      </form>
    </div>
  );
};
