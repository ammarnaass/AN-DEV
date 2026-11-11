import React from "react";
import { Smartphone, Building2 } from "lucide-react";
import { useI18n } from "../../../lib/i18n";
import { InquiryInput } from "@andev/shared";

interface InquiryClientFieldsProps {
  formData: InquiryInput;
  errors: Record<string, string>;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
}

export const InquiryClientFields: React.FC<InquiryClientFieldsProps> = ({
  formData,
  errors,
  onChange,
}) => {
  const { t, locale } = useI18n();

  return (
    <>
      {/* Grid: Name & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Name */}
        <div className="space-y-1.5 text-start">
          <label htmlFor="name" className="block text-xs font-mono text-mute font-semibold">
            {t("contact.name")} <span className="text-accent">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={onChange}
            placeholder={locale === "ar" ? "أحمد بن علي" : "Ahmed Benali"}
            className={`w-full h-12 px-4 rounded-lg border bg-bg/50 text-ink text-sm transition-colors focus:outline-none focus:ring-1 focus:ring-accent ${
              errors.name ? "border-err" : "border-line"
            }`}
          />
          {errors.name && <p className="text-err text-xs mt-1">{errors.name}</p>}
        </div>

        {/* Email */}
        <div className="space-y-1.5 text-start">
          <label htmlFor="email" className="block text-xs font-mono text-mute font-semibold">
            {t("contact.email")} <span className="text-accent">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={onChange}
            placeholder="contact@enterprise.dz"
            className={`w-full h-12 px-4 rounded-lg border bg-bg/50 text-ink text-sm transition-colors focus:outline-none focus:ring-1 focus:ring-accent ${
              errors.email ? "border-err" : "border-line"
            }`}
          />
          {errors.email && <p className="text-err text-xs mt-1">{errors.email}</p>}
        </div>
      </div>

      {/* Grid: Phone & Company */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Phone */}
        <div className="space-y-1.5 text-start">
          <label htmlFor="phone" className="block text-xs font-mono text-mute font-semibold">
            {t("contact.phone")}
          </label>
          <div className="relative">
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone || ""}
              onChange={onChange}
              placeholder="05 / 06 / 07 XX XX XX"
              className="w-full h-12 px-4 rounded-lg border border-line bg-bg/50 text-ink text-sm transition-colors focus:outline-none focus:ring-1 focus:ring-accent"
            />
            <Smartphone className="w-4 h-4 text-mute absolute end-3.5 top-4 pointer-events-none" />
          </div>
        </div>

        {/* Company */}
        <div className="space-y-1.5 text-start">
          <label htmlFor="company" className="block text-xs font-mono text-mute font-semibold">
            {t("contact.company")}
          </label>
          <div className="relative">
            <input
              id="company"
              name="company"
              type="text"
              value={formData.company || ""}
              onChange={onChange}
              placeholder={locale === "ar" ? "مثال: مؤسسة الأمل للتجارة" : "e.g. Hope Logistics Sarl"}
              className="w-full h-12 px-4 rounded-lg border border-line bg-bg/50 text-ink text-sm transition-colors focus:outline-none focus:ring-1 focus:ring-accent"
            />
            <Building2 className="w-4 h-4 text-mute absolute end-3.5 top-4 pointer-events-none" />
          </div>
        </div>
      </div>
    </>
  );
};
