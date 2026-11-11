import React from "react";
import { Briefcase, Brain } from "lucide-react";
import { useI18n } from "../../../lib/i18n";
import { InquiryRequestType } from "../types/inquiries.types";

interface InquiryTypeSelectorProps {
  requestType: InquiryRequestType;
  onChange: (type: InquiryRequestType) => void;
}

export const InquiryTypeSelector: React.FC<InquiryTypeSelectorProps> = ({
  requestType,
  onChange,
}) => {
  const { t } = useI18n();

  return (
    <div className="grid grid-cols-2 gap-2 p-1.5 rounded-xl bg-surface-container border border-line">
      <button
        type="button"
        onClick={() => onChange("project")}
        className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-bold transition-all ${
          requestType === "project"
            ? "bg-primary-container text-white shadow-sm"
            : "text-mute hover:text-ink hover:bg-surface/50"
        }`}
      >
        <Briefcase className="w-4 h-4" />
        <span>{t("contact.tab_project")}</span>
      </button>

      <button
        type="button"
        onClick={() => onChange("consultation")}
        className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-bold transition-all ${
          requestType === "consultation"
            ? "bg-secondary text-primary shadow-sm"
            : "text-mute hover:text-ink hover:bg-surface/50"
        }`}
      >
        <Brain className="w-4 h-4" />
        <span>{t("contact.tab_consultation")}</span>
      </button>
    </div>
  );
};
