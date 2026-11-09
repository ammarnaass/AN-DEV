import React from "react";
import { Link } from "react-router-dom";
import { useI18n } from "../../../lib/i18n";
import { ArrowLeft, ArrowRight, MessageSquareCode } from "lucide-react";

export const HomeConversionCta: React.FC = () => {
  const { locale, isRtl } = useI18n();

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-7xl mx-auto rounded-2xl p-8 sm:p-14 lg:p-16 relative overflow-hidden bg-gradient-to-br from-[#0d6efd] via-[#0284c7] to-[#0057cd] shadow-[0_15px_40px_-10px_rgba(13,110,253,0.4)] text-white border border-white/15">
        {/* Internal Subtle Ambient Blueprint Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />
        <div className="absolute -top-24 -end-24 w-96 h-96 bg-white/20 rounded-full blur-[90px] pointer-events-none" />
        <div className="absolute -bottom-24 -start-24 w-96 h-96 bg-cyan-300/20 rounded-full blur-[90px] pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-start">
          <div className="flex flex-col gap-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-white border border-white/25 text-xs font-mono self-center lg:self-start">
              <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
              <span>{locale === "ar" ? "متاحون الآن للمشاريع الجديدة" : "Available for New Engagements"}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-[40px] lg:leading-tight font-extrabold text-white tracking-tight">
              {locale === "ar"
                ? "جاهز لتحويل فكرتك إلى منتج رقمي متكامل؟"
                : "Ready to Engineer Your Idea Into a Scalable Platform?"}
            </h2>
            <p className="text-blue-50 text-sm sm:text-base leading-relaxed">
              {locale === "ar"
                ? "سواء كنت تطلق شركة ناشئة أو تطور نظاماً قائماً لشركتك، فريق AN DEV مستعد لتقديم الاستشارة والمعمارية البرمجية التي تضمن نجاحك."
                : "Whether launching a high-growth startup or modernizing enterprise legacy systems, our engineers deliver the exact software architecture you need."}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 shrink-0">
            <Link to="/contact">
              <button className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-white text-primary font-bold text-sm sm:text-base hover:bg-slate-50 transition-all shadow-[0_4px_16px_rgba(0,0,0,0.15)] active:scale-[0.98]">
                <span>{locale === "ar" ? "طلب استشارة أو مشروع" : "Start Project Inquiry"}</span>
                {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>
            </Link>
            <a
              href="https://wa.me/213550123456"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg bg-white/15 border border-white/30 text-white text-sm sm:text-base font-semibold hover:bg-white/25 backdrop-blur-sm transition-all active:scale-[0.98]"
            >
              <MessageSquareCode className="w-4 h-4 text-cyan-200" />
              <span>{locale === "ar" ? "تواصل عبر واتساب" : "WhatsApp"}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

