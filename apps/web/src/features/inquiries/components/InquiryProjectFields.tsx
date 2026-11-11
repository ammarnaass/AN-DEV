import React from "react";
import { useI18n } from "../../../lib/i18n";
import { InquiryInput } from "@andev/shared";
import { PROJECT_TYPES } from "../constants/inquiries.constants";

interface InquiryProjectFieldsProps {
  formData: InquiryInput;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
}

export const InquiryProjectFields: React.FC<InquiryProjectFieldsProps> = ({
  formData,
  onChange,
}) => {
  const { t, locale } = useI18n();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in">
      {/* Project Type */}
      <div className="space-y-1.5 text-start">
        <label htmlFor="project_type" className="block text-xs font-mono text-mute font-semibold">
          {t("contact.type")} <span className="text-accent">*</span>
        </label>
        <select
          id="project_type"
          name="project_type"
          value={formData.project_type}
          onChange={onChange}
          className="w-full h-12 px-4 rounded-lg border border-line bg-surface text-ink text-sm transition-colors focus:outline-none focus:ring-1 focus:ring-accent"
        >
          {PROJECT_TYPES.map((pt) => (
            <option key={pt.value} value={pt.value} className="bg-surface text-ink">
              {locale === "ar" ? pt.ar : pt.en}
            </option>
          ))}
        </select>
      </div>

      {/* Budget Range */}
      <div className="space-y-1.5 text-start">
        <label htmlFor="budget_range" className="block text-xs font-mono text-mute font-semibold">
          {t("contact.budget")}
        </label>
        <input
          id="budget_range"
          name="budget_range"
          type="text"
          value={formData.budget_range || ""}
          onChange={onChange}
          placeholder={locale === "ar" ? "مثال: 250,000 دج أو مرنة" : "e.g. 250k DZD or Flexible"}
          className="w-full h-12 px-4 rounded-lg border border-line bg-bg/50 text-ink text-sm transition-colors focus:outline-none focus:ring-1 focus:ring-accent"
        />
      </div>
    </div>
  );
};
