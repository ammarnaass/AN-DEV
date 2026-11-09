import React from "react";
import { useI18n } from "../../../lib/i18n";
import { Button } from "../../../components/ui/Button";
import { CheckCircle2, MessageSquare, Send } from "lucide-react";
import { useSubmitInquiry } from "../hooks/useSubmitInquiry";

export const InquiryForm: React.FC = () => {
  const { t, locale } = useI18n();
  const {
    formData,
    errors,
    isSubmitting,
    isSubmitted,
    serverError,
    updateField,
    resetForm,
    submit,
  } = useSubmitInquiry();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    updateField(e.target.name as any, e.target.value);
  };

  if (isSubmitted) {
    return (
      <div className="rounded-card border border-ok/40 bg-surface p-8 text-center space-y-4 shadow-sm animate-fade-in">
        <div className="w-16 h-16 rounded-full bg-ok/10 text-ok mx-auto flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-ink">{t("contact.success_title")}</h3>
        <p className="text-mute text-sm max-w-md mx-auto leading-relaxed">
          {t("contact.success_desc")}
        </p>
        <div className="pt-4">
          <Button variant="secondary" onClick={resetForm}>
            {locale === "ar" ? "إرسال طلب آخر" : "Submit Another Inquiry"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-card border border-line bg-surface p-6 sm:p-8 space-y-5 shadow-sm">
      {serverError && (
        <div className="p-3.5 rounded-lg bg-err/10 border border-err/30 text-err text-sm">
          {serverError}
        </div>
      )}

      {/* Honeypot field */}
      <div className="hidden" aria-hidden="true">
        <input
          type="text"
          name="honeypot"
          value={formData.honeypot}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

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
          onChange={handleChange}
          placeholder={locale === "ar" ? "محمد بن علي" : "John Doe"}
          className={`w-full h-12 px-4 rounded border bg-bg/50 text-ink text-sm transition-colors focus:outline-none focus:ring-1 focus:ring-accent ${
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
          onChange={handleChange}
          placeholder="contact@business.dz"
          className={`w-full h-12 px-4 rounded border bg-bg/50 text-ink text-sm transition-colors focus:outline-none focus:ring-1 focus:ring-accent ${
            errors.email ? "border-err" : "border-line"
          }`}
        />
        {errors.email && <p className="text-err text-xs mt-1">{errors.email}</p>}
      </div>

      {/* Project Type */}
      <div className="space-y-1.5 text-start">
        <label htmlFor="project_type" className="block text-xs font-mono text-mute font-semibold">
          {t("contact.type")} <span className="text-accent">*</span>
        </label>
        <select
          id="project_type"
          name="project_type"
          value={formData.project_type}
          onChange={handleChange}
          className="w-full h-12 px-4 rounded border border-line bg-surface text-ink text-sm transition-colors focus:outline-none focus:ring-1 focus:ring-accent"
        >
          <option value="web" className="bg-surface text-ink">{locale === "ar" ? "تطبيق ويب / منصة سحابية" : "Web App / Cloud Platform"}</option>
          <option value="mobile" className="bg-surface text-ink">{locale === "ar" ? "تطبيق موبايل (iOS / Android)" : "Mobile Application"}</option>
          <option value="system" className="bg-surface text-ink">{locale === "ar" ? "نظام مخصص / قواعد بيانات وAPI" : "Custom Backend / Database & API"}</option>
          <option value="other" className="bg-surface text-ink">{locale === "ar" ? "مشروع مخصص آخر" : "Other Custom Project"}</option>
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
          value={formData.budget_range}
          onChange={handleChange}
          placeholder={locale === "ar" ? "مثال: 150,000 دج أو مرنة" : "e.g. 150k DZD or Flexible"}
          className="w-full h-12 px-4 rounded border border-line bg-bg/50 text-ink text-sm transition-colors focus:outline-none focus:ring-1 focus:ring-accent"
        />
      </div>

      {/* Message */}
      <div className="space-y-1.5 text-start">
        <label htmlFor="message" className="block text-xs font-mono text-mute font-semibold">
          {t("contact.message")} <span className="text-accent">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          placeholder={locale === "ar" ? "اشرح فكرة مشروعك، أهدافه، وأي ميزات رئيسية ترغب بها..." : "Describe your idea, project scope, and key requirements..."}
          className={`w-full p-4 rounded border bg-bg/50 text-ink text-sm transition-colors focus:outline-none focus:ring-1 focus:ring-accent ${
            errors.message ? "border-err" : "border-line"
          }`}
        />
        {errors.message && <p className="text-err text-xs mt-1">{errors.message}</p>}
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
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 h-12 rounded border border-line text-sm text-mute hover:text-[#25D366] hover:border-[#25D366]/40 transition-colors"
        >
          <MessageSquare className="w-4 h-4" />
          <span>{locale === "ar" ? "واتساب مباشر" : "Direct WhatsApp"}</span>
        </a>
      </div>
    </form>
  );
};

