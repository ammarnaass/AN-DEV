import React from "react";
import { useI18n } from "../../../lib/i18n";
import { InquiryInput } from "@andev/shared";
import {
  CONSULTATION_DOMAINS,
  MEETING_MODES,
  TIME_SLOTS,
} from "../constants/inquiries.constants";

interface InquiryConsultationFieldsProps {
  formData: InquiryInput;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
}

export const InquiryConsultationFields: React.FC<InquiryConsultationFieldsProps> = ({
  formData,
  onChange,
}) => {
  const { t, locale } = useI18n();

  return (
    <div className="space-y-4 p-4 rounded-xl bg-surface-container border border-line animate-fade-in">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Consultation Domain */}
        <div className="space-y-1.5 text-start">
          <label htmlFor="consultation_domain" className="block text-xs font-mono text-secondary font-semibold">
            {t("contact.consultation_domain")} <span className="text-accent">*</span>
          </label>
          <select
            id="consultation_domain"
            name="consultation_domain"
            value={formData.consultation_domain}
            onChange={onChange}
            className="w-full h-12 px-4 rounded-lg border border-line bg-surface text-ink text-sm transition-colors focus:outline-none focus:ring-1 focus:ring-secondary"
          >
            {CONSULTATION_DOMAINS.map((dom) => (
              <option key={dom.value} value={dom.value}>
                {locale === "ar" ? dom.ar : dom.en}
              </option>
            ))}
          </select>
        </div>

        {/* Meeting Mode */}
        <div className="space-y-1.5 text-start">
          <label htmlFor="meeting_mode" className="block text-xs font-mono text-secondary font-semibold">
            {t("contact.meeting_mode")}
          </label>
          <select
            id="meeting_mode"
            name="meeting_mode"
            value={formData.meeting_mode}
            onChange={onChange}
            className="w-full h-12 px-4 rounded-lg border border-line bg-surface text-ink text-sm transition-colors focus:outline-none focus:ring-1 focus:ring-secondary"
          >
            {MEETING_MODES.map((mode) => (
              <option key={mode.value} value={mode.value}>
                {locale === "ar" ? mode.ar : mode.en}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Preferred Date */}
        <div className="space-y-1.5 text-start">
          <label htmlFor="preferred_date" className="block text-xs font-mono text-mute font-semibold">
            {t("contact.preferred_date")}
          </label>
          <div className="relative">
            <input
              id="preferred_date"
              name="preferred_date"
              type="date"
              value={formData.preferred_date || ""}
              onChange={onChange}
              className="w-full h-12 px-4 rounded-lg border border-line bg-surface text-ink text-sm transition-colors focus:outline-none focus:ring-1 focus:ring-secondary"
            />
          </div>
        </div>

        {/* Preferred Time Slot */}
        <div className="space-y-1.5 text-start">
          <label htmlFor="preferred_time_slot" className="block text-xs font-mono text-mute font-semibold">
            {t("contact.preferred_time_slot")}
          </label>
          <select
            id="preferred_time_slot"
            name="preferred_time_slot"
            value={formData.preferred_time_slot}
            onChange={onChange}
            className="w-full h-12 px-4 rounded-lg border border-line bg-surface text-ink text-sm transition-colors focus:outline-none focus:ring-1 focus:ring-secondary"
          >
            {TIME_SLOTS.map((slot) => (
              <option key={slot.value} value={slot.value}>
                {locale === "ar" ? slot.ar : slot.en}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
