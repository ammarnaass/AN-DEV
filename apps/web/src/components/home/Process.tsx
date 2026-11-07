import React from "react";
import { useI18n } from "../../lib/i18n";

export const Process: React.FC = () => {
  const { t } = useI18n();

  const steps = [
    {
      num: t("process.1.num"),
      title: t("process.1.title"),
      desc: t("process.1.desc")
    },
    {
      num: t("process.2.num"),
      title: t("process.2.title"),
      desc: t("process.2.desc")
    },
    {
      num: t("process.3.num"),
      title: t("process.3.title"),
      desc: t("process.3.desc")
    }
  ];

  return (
    <section className="py-20 border-t border-line">
      <div className="max-w-6xl mx-auto p-inline-safe">
        <div className="space-y-2 mb-12 text-start">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-ink">
            {t("process.title")}
          </h2>
          <p className="text-mute text-sm">
            تسلسل هندسي واضح ومحدد من الفكرة إلى الإنتاج
          </p>
        </div>

        {/* 3 Process Cells */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-card border border-line bg-surface/40 hover:border-accent/40 transition-all text-start relative group"
            >
              <div className="text-4xl sm:text-5xl font-extrabold text-primary/30 font-mono group-hover:text-primary/60 transition-colors mb-4">
                {step.num}
              </div>
              <h3 className="text-lg font-bold text-ink mb-2">
                {step.title}
              </h3>
              <p className="text-mute text-sm leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
