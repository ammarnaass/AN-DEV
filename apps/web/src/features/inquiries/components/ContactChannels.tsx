import React from "react";
import { useI18n } from "../../../lib/i18n";
import { Mail, MapPin, MessageSquare, Clock, ShieldCheck } from "lucide-react";

export const ContactChannels: React.FC = () => {
  const { locale } = useI18n();

  return (
    <div className="flex flex-col gap-6 text-start">
      {/* Direct Contact Card */}
      <div className="rounded-2xl border border-line bg-surface p-6 sm:p-8 space-y-6 shadow-sm">
        <h3 className="text-base font-bold text-text-primary">
          {locale === "ar" ? "بيانات التواصل المباشر" : "Direct Channels & Office"}
        </h3>

        <ul className="space-y-4 text-sm text-text-muted">
          <li className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-surface-container border border-line text-secondary shrink-0 mt-0.5">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-mono text-text-muted">
                {locale === "ar" ? "البريد المباشر" : "Direct Email"}
              </div>
              <a
                href="mailto:contact@andev.dz"
                className="text-text-primary font-semibold hover:text-secondary transition-colors"
              >
                contact@andev.dz
              </a>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-surface-container border border-line text-status-ok shrink-0 mt-0.5">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-mono text-text-muted">
                {locale === "ar" ? "واتساب للأعمال" : "WhatsApp Priority"}
              </div>
              <a
                href="https://wa.me/213550123456"
                target="_blank"
                rel="noreferrer"
                className="text-text-primary font-semibold hover:text-secondary transition-colors"
                dir="ltr"
              >
                +213 550 12 34 56
              </a>
            </div>
          </li>

          <li className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-surface-container border border-line text-secondary shrink-0 mt-0.5">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-mono text-text-muted">
                {locale === "ar" ? "المقر والموقع" : "HQ Location"}
              </div>
              <span className="text-text-primary font-semibold">
                {locale === "ar" ? "الجزائر العاصمة، الجمهورية الجزائرية" : "Algiers, Algeria"}
              </span>
            </div>
          </li>
        </ul>

        <a
          href="https://wa.me/213550123456"
          target="_blank"
          rel="noreferrer"
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-surface-container border border-line hover:border-secondary/50 text-secondary text-sm font-semibold transition-all"
        >
          <MessageSquare className="w-4 h-4" />
          <span>{locale === "ar" ? "محادثة فورية عبر واتساب" : "Instant WhatsApp Message"}</span>
        </a>
      </div>

      {/* Commitments Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-surface border border-line space-y-1">
          <div className="flex items-center gap-2 text-secondary text-xs font-bold font-mono">
            <Clock className="w-3.5 h-3.5" />
            <span>{locale === "ar" ? "استجابة في 48 ساعة" : "48-hr Discovery"}</span>
          </div>
          <p className="text-xs text-text-muted">
            {locale === "ar" ? "مراجعة المتطلبات وإعداد تقدير مبدئي" : "Fast initial technical triage"}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-surface border border-line space-y-1">
          <div className="flex items-center gap-2 text-status-ok text-xs font-bold font-mono">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{locale === "ar" ? "سرية تامة (NDA)" : "Strict NDA"}</span>
          </div>
          <p className="text-xs text-text-muted">
            {locale === "ar" ? "حماية كاملة لأفكار وبيانات مشروعك" : "Absolute confidentiality guaranteed"}
          </p>
        </div>
      </div>
    </div>
  );
};

