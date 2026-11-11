import React from "react";
import { Send, MessageSquare } from "lucide-react";
import { useI18n } from "../../../lib/i18n";
import { Button } from "../../../components/ui/Button";
import { InquiryRequestType } from "../types/inquiries.types";

interface InquirySubmitSectionProps {
  requestType: InquiryRequestType;
  message: string;
  error?: string;
  isSubmitting: boolean;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
}

export const InquirySubmitSection: React.FC<InquirySubmitSectionProps> = ({
  requestType,
  message,
  error,
  isSubmitting,
  onChange,
}) => {
  const { t, locale } = useI18n();

  return (
    <>
      {/* Message */}
      <div className="space-y-1.5 text-start">
        <label htmlFor="message" className="block text-xs font-mono text-mute font-semibold">
          {t("contact.message")} <span className="text-accent">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={message}
          onChange={onChange}
          placeholder={
            requestType === "consultation"
              ? locale === "ar"
                ? "اشرح المشكلة المعمارية أو التقنية التي ترغب بمناقشتها، وأهداف الجلسة..."
                : "Describe the architectural challenge or technical questions you wish to consult on..."
              : locale === "ar"
              ? "اشرح فكرة مشروعك، أهدافه، وأي ميزات رئيسية ترغب بها..."
              : "Describe your idea, project scope, and key requirements..."
          }
          className={`w-full p-4 rounded-lg border bg-bg/50 text-ink text-sm transition-colors focus:outline-none focus:ring-1 focus:ring-accent ${
            error ? "border-err" : "border-line"
          }`}
        />
        {error && <p className="text-err text-xs mt-1">{error}</p>}
      </div>

      {/* Submit Button & Direct WhatsApp */}
      <div className="pt-2 flex flex-col sm:flex-row gap-3 items-center">
        <Button
          type="submit"
          variant="primary"
          isLoading={isSubmitting}
          className="w-full sm:flex-1"
        >
          <span className="flex items-center gap-2">
            <Send className="w-4 h-4 rtl:rotate-180" />
            <span>{t("contact.submit")}</span>
          </span>
        </Button>
        <a
          href="https://wa.me/213550123456?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20AN%20DEV%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D9%85%D9%86%D8%A7%D9%82%D8%B4%D8%A9%20%D9%85%D8%B4%D8%B1%D9%88%D8%B9%20%D8%AC%D8%AF%D9%8A%D8%AF"
          target="_blank"
          rel="noreferrer"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 h-12 rounded-lg border border-line text-sm text-mute hover:text-[#25D366] hover:border-[#25D366]/40 transition-colors"
        >
          <MessageSquare className="w-4 h-4" />
          <span>{locale === "ar" ? "واتساب مباشر" : "Direct WhatsApp"}</span>
        </a>
      </div>
    </>
  );
};
