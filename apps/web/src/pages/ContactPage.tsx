import React from "react";
import { useI18n } from "../lib/i18n";
import { InquiryForm } from "../components/contact/InquiryForm";
import { Mail, MapPin, MessageSquare, Clock, ShieldCheck } from "lucide-react";

export const ContactPage: React.FC = () => {
  const { t, locale } = useI18n();

  return (
    <div className="pt-20 sm:pt-24 pb-20 max-w-6xl mx-auto p-inline-safe space-y-12">
      {/* Title */}
      <div className="space-y-4 text-start max-w-2xl">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-ink tracking-tight">
          {t("contact.title")}
        </h1>
        <p className="text-mute text-base sm:text-lg leading-relaxed">
          {t("contact.subtitle")}
        </p>
      </div>

      {/* Two columns layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Coordinates & Guarantees */}
        <div className="lg:col-span-5 space-y-6 text-start">
          {/* Direct channels */}
          <div className="rounded-card border border-line bg-surface/50 p-6 space-y-4">
            <h3 className="text-base font-bold text-ink">
              {locale === "ar" ? "قنوات التواصل المباشر" : "Direct Channels"}
            </h3>
            <ul className="space-y-3.5 text-sm text-mute">
              <li className="flex items-center gap-3">
                <div className="p-2 rounded bg-surface border border-line text-primary">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-mute font-mono">{locale === "ar" ? "البريد الإلكتروني" : "Email"}</div>
                  <a href="mailto:contact@andev.dz" className="text-ink font-semibold hover:text-accent">
                    contact@andev.dz
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="p-2 rounded bg-surface border border-line text-[#25D366]">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-mute font-mono">{locale === "ar" ? "واتساب للأعمال" : "WhatsApp"}</div>
                  <a
                    href="https://wa.me/213550123456"
                    target="_blank"
                    rel="noreferrer"
                    className="text-ink font-semibold hover:text-accent"
                    dir="ltr"
                  >
                    +213 550 12 34 56
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="p-2 rounded bg-surface border border-line text-accent">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs text-mute font-mono">{locale === "ar" ? "الموقع الجغرافي" : "Location"}</div>
                  <span className="text-ink font-semibold">
                    {locale === "ar" ? "الجزائر العاصمة، الجزائر" : "Algiers, Algeria"}
                  </span>
                </div>
              </li>
            </ul>
          </div>

          {/* SLA / Commitments */}
          <div className="rounded-card border border-line bg-surface/30 p-6 space-y-3">
            <div className="flex items-center gap-2.5 text-accent font-semibold text-sm">
              <Clock className="w-4 h-4" />
              <span>{locale === "ar" ? "استجابة سريعة في يومي عمل" : "Response in 2 business days"}</span>
            </div>
            <p className="text-mute text-xs leading-relaxed">
              {locale === "ar"
                ? "نقوم بدراسة متطلبات مشروعك بدقة وإعداد تقدير مبدئي للمدة والتكلفة قبل أول اتصال هاتفي."
                : "We review your requirements thoroughly to prepare an initial timeline and budget estimation."}
            </p>
          </div>

          <div className="rounded-card border border-line bg-surface/30 p-6 space-y-3">
            <div className="flex items-center gap-2.5 text-ok font-semibold text-sm">
              <ShieldCheck className="w-4 h-4" />
              <span>{locale === "ar" ? "سرية تامة لبيانات مشروعك" : "Strict Confidentiality"}</span>
            </div>
            <p className="text-mute text-xs leading-relaxed">
              {locale === "ar"
                ? "جميع الأفكار والوثائق التقنية المرسلة تخضع لالتزام السرية المهنية."
                : "All proprietary project concepts and documents are treated with absolute confidentiality."}
            </p>
          </div>
        </div>

        {/* Right Column: Inquiry Form */}
        <div className="lg:col-span-7">
          <InquiryForm />
        </div>
      </div>
    </div>
  );
};
