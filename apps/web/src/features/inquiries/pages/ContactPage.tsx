import React from "react";
import { useI18n } from "../../../lib/i18n";
import { Terminal } from "lucide-react";
import { InquiryForm } from "../components/InquiryForm";
import { ContactChannels } from "../components/ContactChannels";
import { ContactFaq } from "../components/ContactFaq";

export const ContactPage: React.FC = () => {
  const { locale } = useI18n();

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
          <div className="lg:col-span-5 flex flex-col gap-6">
            <ContactChannels />
            <ContactFaq />
          </div>
        </div>
      </div>
    </div>
  );
};
