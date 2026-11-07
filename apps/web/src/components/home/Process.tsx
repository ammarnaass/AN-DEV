import React from "react";
import { useI18n } from "../../lib/i18n";
import { Compass, Cpu, Rocket } from "lucide-react";

export const Process: React.FC = () => {
  const { t, locale } = useI18n();

  const steps = [
    {
      icon: <Compass className="w-5 h-5 text-accent" />,
      tag_ar: "تخطيط واستكشاف",
      tag_en: "Discovery & Architecture",
      title: t("process.1.title"),
      desc: t("process.1.desc")
    },
    {
      icon: <Cpu className="w-5 h-5 text-primary" />,
      tag_ar: "تطوير واختبار مستمر",
      tag_en: "Agile Engineering & QA",
      title: t("process.2.title"),
      desc: t("process.2.desc")
    },
    {
      icon: <Rocket className="w-5 h-5 text-accent" />,
      tag_ar: "إطلاق وتوسّع",
      tag_en: "Deployment & Scale",
      title: t("process.3.title"),
      desc: t("process.3.desc")
    }
  ];

  return (
    <section className="py-20 border-t border-line">
      <div className="max-w-6xl mx-auto p-inline-safe">
        {/* Section Header */}
        <div className="space-y-2 mb-12 text-start">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-ink">
            {t("process.title")}
          </h2>
          <p className="text-mute text-sm">
            {locale === "ar"
              ? "تسلسل هندسي واضح ومحدد من الفكرة إلى الإنتاج والمتابعة"
              : "A transparent, structured engineering lifecycle from vision to production"}
          </p>
        </div>

        {/* Process Flow with Progressive Pipeline Rhythm */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-card border border-line bg-surface/40 hover:border-accent/40 hover:bg-surface/60 transition-all text-start relative group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-lg border border-line bg-surface group-hover:border-accent/40 transition-colors">
                    {step.icon}
                  </div>
                  <span className="text-[11px] font-mono font-medium text-mute uppercase tracking-wider">
                    {locale === "ar" ? step.tag_ar : step.tag_en}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-ink group-hover:text-primary transition-colors">
                  {step.title}
                </h3>

                <p className="text-mute text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {/* Progress indicator bar on card bottom */}
              <div className="pt-6">
                <div className="h-0.5 w-full bg-line rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
                    style={{ width: `${(idx + 1) * 33.33}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
