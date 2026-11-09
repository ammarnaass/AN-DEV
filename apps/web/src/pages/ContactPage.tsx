import React, { useState } from "react";
import { useI18n } from "../lib/i18n";
import { InquiryForm } from "../components/contact/InquiryForm";
import {
  Mail,
  MapPin,
  MessageSquare,
  Clock,
  ShieldCheck,
  ChevronDown,
  Terminal,
  HelpCircle
} from "lucide-react";

export const ContactPage: React.FC = () => {
  const { locale } = useI18n();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: locale === "ar" ? "كم يستغرق تنفيذ المشروع عادة؟" : "What is the typical project delivery timeline?",
      a: locale === "ar"
        ? "تعتمد المدة على نطاق المتطلبات: نماذج الـ MVP وتطبيقات الويب تستغرق عادة من 3 إلى 6 أسابيع، بينما المنصات المعقدة وأنظمة الـ SaaS تتراوح بين شهرين و 4 أشهر مع تسليم تدريجي كل أسبوعين."
        : "MVP projects and targeted web apps typically ship in 3-6 weeks. Large-scale distributed platforms take 2-4 months with bi-weekly milestone deployments."
    },
    {
      q: locale === "ar" ? "كيف يتم تسليم الكود وتدريب الفريق؟" : "How is code handed over and the team onboarded?",
      a: locale === "ar"
        ? "يتم تسليم مستودع Git كامل وموثق مع حاويات Docker واختبارات آلية وتوثيق معمارية الـ API، إضافة إلى جلسة تدريب عملية لفريقك البرمجي أو الإداري."
        : "Full Git repository ownership, automated Docker orchestration, OpenAPI specs, 100% test coverage docs, and hands-on walkthrough sessions."
    },
    {
      q: locale === "ar" ? "هل تقدمون عقود صيانة ودعم فني مستمر؟" : "Do you provide ongoing SLA maintenance contracts?",
      a: locale === "ar"
        ? "نعم، نوفر عقود SLA مرنة تشمل المراقبة الاستباقية للأنظمة، تحديثات الأمان، النسخ الاحتياطي التلقائي مع Litestream، ودعم طوارئ سريع الاستجابة."
        : "Yes, including telemetry monitoring, proactive vulnerability patching, automated backups via Litestream, and SLA response guarantees."
    }
  ];

  return (
    <div className="w-full pt-24 sm:pt-28 pb-20 bg-background overflow-hidden">
      {/* Ambient Glows */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="absolute -top-32 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -left-20 w-80 h-80 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

        {/* Page Header */}
        <div className="flex flex-col gap-3 max-w-3xl text-start pb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container border border-line w-fit">
            <span className="w-2 h-2 rounded-full bg-status-ok animate-pulse" />
            <span className="font-mono text-xs text-secondary font-semibold">
              AN_DEV // INGESTION_GATEWAY_V2.5
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-text-primary tracking-tight">
            {locale === "ar" ? "ابدأ مشروعك الهندسي القادم معنا" : "Initiate Your Next Engineering Engagement"}
          </h1>
          <p className="text-text-muted text-sm sm:text-base leading-relaxed">
            {locale === "ar"
              ? "نحول الرؤى المعقدة إلى برمجيات فائقة الأداء، قابلة للتوسع، ومصممة بأعلى المقاييس العالمية من قلب الجزائر."
              : "Transforming ambitious concepts into resilient, high-throughput software architectures from Algiers to global enterprises."}
          </p>
        </div>

        {/* Two Columns Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Interactive Form */}
          <div className="lg:col-span-7 flex flex-col bg-surface border border-line rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-primary via-secondary to-transparent" />

            <div className="flex items-center justify-between pb-6 mb-6 border-b border-line">
              <div className="text-start">
                <h2 className="text-xl font-bold text-text-primary">
                  {locale === "ar" ? "أخبرنا عن فكرتك ودعنا نبنيها معاً" : "Tell Us About Your Vision"}
                </h2>
                <p className="text-xs sm:text-sm text-text-muted pt-1">
                  {locale === "ar"
                    ? "املأ التفاصيل الفنية وسيقوم مهندسونا بمراجعتها مباشرة"
                    : "Submit technical parameters; our engineers review submissions within 2 business days."}
                </p>
              </div>
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-lg bg-surface-container border border-line text-secondary font-mono text-xs">
                <Terminal className="w-3.5 h-3.5" />
                <span>REQUEST_SESSION</span>
              </div>
            </div>

            <InquiryForm />
          </div>

          {/* Right Column: Direct Channels & Technical FAQ */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-start">
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
                    <div className="text-xs font-mono text-text-muted">{locale === "ar" ? "البريد المباشر" : "Direct Email"}</div>
                    <a href="mailto:contact@andev.dz" className="text-text-primary font-semibold hover:text-secondary transition-colors">
                      contact@andev.dz
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-surface-container border border-line text-status-ok shrink-0 mt-0.5">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-text-muted">{locale === "ar" ? "واتساب للأعمال" : "WhatsApp Priority"}</div>
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
                    <div className="text-xs font-mono text-text-muted">{locale === "ar" ? "المقر والموقع" : "HQ Location"}</div>
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

            {/* Interactive FAQ Accordion */}
            <div className="rounded-2xl border border-line bg-surface p-6 space-y-4 shadow-sm">
              <div className="flex items-center gap-2 text-text-primary font-bold text-base">
                <HelpCircle className="w-4 h-4 text-secondary" />
                <span>{locale === "ar" ? "أسئلة شائعة (FAQ)" : "Technical FAQ"}</span>
              </div>

              <div className="space-y-2">
                {faqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="border border-line rounded-lg overflow-hidden bg-surface-container/40 transition-colors"
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full px-4 py-3 flex items-center justify-between text-start text-xs sm:text-sm font-semibold text-text-primary hover:text-secondary transition-colors"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown className={`w-4 h-4 text-text-muted transition-transform duration-200 ${isOpen ? "rotate-180 text-secondary" : ""}`} />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-3.5 pt-1 text-xs text-text-muted leading-relaxed border-t border-line/40">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
