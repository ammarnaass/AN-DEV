import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useI18n } from "../../../lib/i18n";
import { Button } from "../../../components/ui/Button";
import {
  CheckCircle2,
  MessageSquare,
  Send,
  Briefcase,
  Brain,
  Copy,
  Check,
  ExternalLink,
  Building2,
  Smartphone
} from "lucide-react";
import { useSubmitInquiry } from "../hooks/useSubmitInquiry";

export const InquiryForm: React.FC = () => {
  const { t, locale } = useI18n();
  const {
    formData,
    errors,
    isSubmitting,
    isSubmitted,
    trackingCode,
    serverError,
    updateField,
    resetForm,
    submit,
  } = useSubmitInquiry();

  const [copied, setCopied] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    updateField(e.target.name as any, e.target.value);
  };

  const handleCopyCode = () => {
    if (!trackingCode) return;
    navigator.clipboard.writeText(trackingCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isSubmitted) {
    return (
      <div className="rounded-2xl border border-ok/40 bg-surface p-6 sm:p-10 text-center space-y-6 shadow-sm animate-fade-in text-start">
        <div className="w-16 h-16 rounded-full bg-ok/10 text-ok mx-auto flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="text-center space-y-2">
          <h3 className="text-xl sm:text-2xl font-bold text-ink">{t("contact.success_title")}</h3>
          <p className="text-mute text-sm max-w-md mx-auto leading-relaxed">
            {t("contact.success_desc")}
          </p>
        </div>

        {/* Tracking Code Card */}
        {trackingCode && (
          <div className="p-5 rounded-xl border border-secondary/30 bg-surface-container max-w-md mx-auto space-y-3">
            <span className="text-xs font-mono text-secondary font-semibold block text-center">
              {t("contact.tracking_title")}
            </span>
            <div className="flex items-center justify-between gap-3 p-3 rounded-lg bg-bg border border-line font-mono text-base font-bold text-ink">
              <span className="tracking-wider">{trackingCode}</span>
              <button
                type="button"
                onClick={handleCopyCode}
                className="p-1.5 rounded hover:bg-surface text-mute hover:text-ink transition-colors flex items-center gap-1 text-xs"
                title={locale === "ar" ? "نسخ الكود" : "Copy Code"}
              >
                {copied ? <Check className="w-4 h-4 text-ok" /> : <Copy className="w-4 h-4" />}
                <span className="text-[11px]">{copied ? (locale === "ar" ? "تم النسخ" : "Copied") : (locale === "ar" ? "نسخ" : "Copy")}</span>
              </button>
            </div>
            <div className="pt-2">
              <Link
                to={`/track/${trackingCode}`}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-secondary text-primary font-bold text-xs hover:bg-secondary/90 transition-all shadow-sm"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>{t("contact.track_btn")}</span>
              </Link>
            </div>
          </div>
        )}

        <div className="pt-2 text-center">
          <Button variant="secondary" onClick={resetForm}>
            {locale === "ar" ? "إرسال طلب آخر" : "Submit Another Request"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-2xl border border-line bg-surface p-6 sm:p-8 space-y-6 shadow-sm">
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

      {/* Stream Selector: Project vs Consultation */}
      <div className="grid grid-cols-2 gap-2 p-1.5 rounded-xl bg-surface-container border border-line">
        <button
          type="button"
          onClick={() => updateField("request_type", "project")}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-bold transition-all ${
            formData.request_type === "project"
              ? "bg-primary-container text-white shadow-sm"
              : "text-mute hover:text-ink hover:bg-surface/50"
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>{t("contact.tab_project")}</span>
        </button>

        <button
          type="button"
          onClick={() => updateField("request_type", "consultation")}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-bold transition-all ${
            formData.request_type === "consultation"
              ? "bg-secondary text-primary shadow-sm"
              : "text-mute hover:text-ink hover:bg-surface/50"
          }`}
        >
          <Brain className="w-4 h-4" />
          <span>{t("contact.tab_consultation")}</span>
        </button>
      </div>

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
            onChange={handleChange}
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
            onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
              placeholder={locale === "ar" ? "مثال: مؤسسة الأمل للتجارة" : "e.g. Hope Logistics Sarl"}
              className="w-full h-12 px-4 rounded-lg border border-line bg-bg/50 text-ink text-sm transition-colors focus:outline-none focus:ring-1 focus:ring-accent"
            />
            <Building2 className="w-4 h-4 text-mute absolute end-3.5 top-4 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Stream Specific Fields */}
      {formData.request_type === "project" ? (
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
              onChange={handleChange}
              className="w-full h-12 px-4 rounded-lg border border-line bg-surface text-ink text-sm transition-colors focus:outline-none focus:ring-1 focus:ring-accent"
            >
              <option value="web" className="bg-surface text-ink">{locale === "ar" ? "منصة ويب سحابية / SaaS" : "Web Platform / SaaS"}</option>
              <option value="mobile" className="bg-surface text-ink">{locale === "ar" ? "تطبيق هواتف ذكية (iOS & Android)" : "Mobile App (iOS & Android)"}</option>
              <option value="pos" className="bg-surface text-ink">{locale === "ar" ? "كاشير ونقاط بيع POS" : "POS Point of Sale System"}</option>
              <option value="system" className="bg-surface text-ink">{locale === "ar" ? "نظام مؤسسي متكامل ERP / قواعد بيانات" : "Enterprise ERP / Custom Backend"}</option>
              <option value="desktop" className="bg-surface text-ink">{locale === "ar" ? "برنامج مكتبي Desktop" : "Desktop Application"}</option>
              <option value="other" className="bg-surface text-ink">{locale === "ar" ? "مشروع برمجي مخصص آخر" : "Other Custom Project"}</option>
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
              onChange={handleChange}
              placeholder={locale === "ar" ? "مثال: 250,000 دج أو مرنة" : "e.g. 250k DZD or Flexible"}
              className="w-full h-12 px-4 rounded-lg border border-line bg-bg/50 text-ink text-sm transition-colors focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>
        </div>
      ) : (
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
                onChange={handleChange}
                className="w-full h-12 px-4 rounded-lg border border-line bg-surface text-ink text-sm transition-colors focus:outline-none focus:ring-1 focus:ring-secondary"
              >
                <option value="general">{locale === "ar" ? "استشارة تقنية عامة وهندسة متطلبات" : "General Technical & Requirements"}</option>
                <option value="cloud_devops">{locale === "ar" ? "معمارية سحابية وبنية تحتية DevOps" : "Cloud Architecture & DevOps"}</option>
                <option value="security_audit">{locale === "ar" ? "تدقيق أمني واختبار اختراق وامتثال" : "Security Audit & Compliance"}</option>
                <option value="pos_erp">{locale === "ar" ? "أنظمة نقاط البيع وحلول الـ ERP المؤسسية" : "POS & Enterprise ERP Solutions"}</option>
                <option value="ai_agent">{locale === "ar" ? "حلول الذكاء الاصطناعي وتطبيقات LLM" : "AI & LLM Integration"}</option>
                <option value="performance_troubleshooting">{locale === "ar" ? "تحسين الأداء وفحص الاختناقات البرمجية" : "Performance & Optimization"}</option>
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
                onChange={handleChange}
                className="w-full h-12 px-4 rounded-lg border border-line bg-surface text-ink text-sm transition-colors focus:outline-none focus:ring-1 focus:ring-secondary"
              >
                <option value="google_meet">{locale === "ar" ? "مكالمة فيديو عبر Google Meet" : "Google Meet Video Call"}</option>
                <option value="phone">{locale === "ar" ? "مكالمة هاتفية مباشرة" : "Direct Phone Call"}</option>
                <option value="in_person">{locale === "ar" ? "جلسة حضورية في المقر (الجزائر العاصمة)" : "In-Person Session (Algiers HQ)"}</option>
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
                  onChange={handleChange}
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
                onChange={handleChange}
                className="w-full h-12 px-4 rounded-lg border border-line bg-surface text-ink text-sm transition-colors focus:outline-none focus:ring-1 focus:ring-secondary"
              >
                <option value="morning">{locale === "ar" ? "صباحية (09:00 - 12:00)" : "Morning (09:00 - 12:00)"}</option>
                <option value="afternoon">{locale === "ar" ? "مسائية (13:00 - 17:00)" : "Afternoon (13:00 - 17:00)"}</option>
                <option value="any">{locale === "ar" ? "أي وقت متاح" : "Any Available Time"}</option>
              </select>
            </div>
          </div>
        </div>
      )}

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
          placeholder={
            formData.request_type === "consultation"
              ? (locale === "ar"
                  ? "اشرح المشكلة المعمارية أو التقنية التي ترغب بمناقشتها، وأهداف الجلسة..."
                  : "Describe the architectural challenge or technical questions you wish to consult on...")
              : (locale === "ar"
                  ? "اشرح فكرة مشروعك، أهدافه، وأي ميزات رئيسية ترغب بها..."
                  : "Describe your idea, project scope, and key requirements...")
          }
          className={`w-full p-4 rounded-lg border bg-bg/50 text-ink text-sm transition-colors focus:outline-none focus:ring-1 focus:ring-accent ${
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
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 h-12 rounded-lg border border-line text-sm text-mute hover:text-[#25D366] hover:border-[#25D366]/40 transition-colors"
        >
          <MessageSquare className="w-4 h-4" />
          <span>{locale === "ar" ? "واتساب مباشر" : "Direct WhatsApp"}</span>
        </a>
      </div>
    </form>
  );
};
