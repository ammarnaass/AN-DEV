import React from "react";
import { Link } from "react-router-dom";
import { useI18n } from "../../lib/i18n";
import { GlowingCodeBlock } from "../ui/GlowingCodeBlock";
import { ArrowLeft, ArrowRight, Terminal } from "lucide-react";

export const Hero: React.FC = () => {
  const { locale, isRtl } = useI18n();

  return (
    <section className="relative w-full pt-24 sm:pt-28 pb-16 overflow-hidden">
      {/* Atmospheric Ambient Glows */}
      <div className="absolute top-1/4 start-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 end-10 w-[450px] h-[450px] bg-secondary/15 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Typographic Anchor */}
          <div className="lg:col-span-6 flex flex-col gap-5 items-start text-start">
            {/* Live System Metric Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container border border-line text-xs font-mono text-secondary shadow-sm backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-status-ok animate-pulse" />
              <span className="text-text-muted font-mono tracking-wider">
                ENGINEERING_HUB // ALGIERS · GLOBAL
              </span>
            </div>

            {/* Hero Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[52px] lg:leading-[1.2] font-black tracking-tight text-text-primary">
              {locale === "ar" ? (
                <>
                  أفكار نُحوّلها إلى <br className="hidden sm:inline" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-l from-secondary via-primary to-text-primary">
                    تطبيقات تُحدث فرقاً
                  </span>
                </>
              ) : (
                <>
                  Ideas Engineered Into <br className="hidden sm:inline" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-text-primary">
                    High-Impact Software
                  </span>
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-text-muted text-base sm:text-lg leading-relaxed max-w-xl">
              {locale === "ar"
                ? "نطور تطبيقات ويب ومنصات سحابية وأنظمة مخصصة تجمع بين كفاءة الأداء والأناقة الهندسية للشركات ورواد الأعمال برؤية معمارية حديثة."
                : "We build web applications, cloud platforms, and bespoke systems combining extreme performance with architectural elegance for businesses in Algeria and worldwide."}
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap gap-4 items-center w-full sm:w-auto">
              <Link to="/contact">
                <button className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-primary-container text-white font-semibold text-base hover:bg-secondary-container hover:text-surface transition-all shadow-[0_0_24px_rgba(13,110,253,0.4)] group active:scale-[0.98]">
                  <span>{locale === "ar" ? "ابدأ مشروعك" : "Start Project"}</span>
                  {isRtl ? (
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                  ) : (
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  )}
                </button>
              </Link>
              <Link to="/projects">
                <button className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-surface-container border border-line text-text-primary font-semibold text-base hover:bg-surface-elevated hover:text-secondary hover:border-secondary/40 transition-all active:scale-[0.98]">
                  <Terminal className="w-4 h-4 text-secondary" />
                  <span>{locale === "ar" ? "تصفح أعمالنا" : "Browse Portfolio"}</span>
                </button>
              </Link>
            </div>
          </div>

          {/* Right Column: Interactive Architecture Terminal */}
          <div className="lg:col-span-6 w-full flex justify-center">
            <GlowingCodeBlock />
          </div>
        </div>
      </div>
    </section>
  );
};
