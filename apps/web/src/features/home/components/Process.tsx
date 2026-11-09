import React from "react";
import { Compass, Code2, Rocket } from "lucide-react";
import { useI18n } from "../../../lib/i18n";

export const Process: React.FC = () => {
  const { locale } = useI18n();

  const steps = [
    {
      num: "01",
      tag: "// ANALYZE & SPECIFY",
      icon: Compass,
      title: locale === "ar" ? "أفكار وتخطيط" : "Analyze & Architecture",
      desc: locale === "ar"
        ? "تحليل المتطلبات وصياغة المعمارية التقنية، اختيار حزم التكنولوجيا المناسبة، وهيكلة واجهات المستخدم والمخططات البيانية بدقة شاملة."
        : "Deep requirements discovery, technical architecture planning, stack selection, and high-fidelity wireframing.",
      accentClass: "text-primary/30"
    },
    {
      num: "02",
      tag: "// IMPLEMENT & VERIFY",
      icon: Code2,
      title: locale === "ar" ? "تطوير واختبار" : "Build & Test Rigorously",
      desc: locale === "ar"
        ? "كتابة كود نظيف وقابل للصيانة، اختبارات آلية للوظائف والأمان، مراجعات معمارية مستمرة، وضمان استجابة وتوافق فائق مع جميع الشاشات."
        : "Maintainable clean code, automated unit & integration testing, strict security audits, and continuous peer review.",
      accentClass: "text-secondary/30"
    },
    {
      num: "03",
      tag: "// SHIP & MAINTAIN",
      icon: Rocket,
      title: locale === "ar" ? "إطلاق ومتابعة" : "Deploy & Monitor Live",
      desc: locale === "ar"
        ? "نشر حتمي على خوادم الإنتاج والـ Edge، مراقبة استباقية لمعدلات الأداء والاستقرار، ودعم فني مستمر لضمان استدامة النظام."
        : "Automated containerized deployment, zero-downtime migrations, live telemetry, and proactive operational support.",
      accentClass: "text-status-ok/30"
    }
  ];

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-20 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col items-center text-center gap-2 mb-12">
        <span className="font-mono text-xs sm:text-sm text-secondary">
          03 // ENGINEERING METHODOLOGY
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
          {locale === "ar" ? "مراحل العمل الهندسية" : "Engineering Methodology"}
        </h2>
        <p className="text-text-muted text-sm sm:text-base max-w-xl">
          {locale === "ar"
            ? "مسار عمل منهجي يضمن تحويل الرؤية المجردة إلى منتج ملموس بأعلى درجات الانضباط والجاهزية."
            : "A disciplined, step-by-step pipeline ensuring transparent execution from blueprint to production readiness."}
        </p>
      </div>

      {/* 3 Sequential Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        {steps.map(s => {
          const IconComp = s.icon;
          return (
            <div
              key={s.num}
              className="p-6 sm:p-8 rounded-xl bg-surface border border-line hover:border-secondary/40 transition-all duration-300 relative flex flex-col gap-4 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className={`font-mono text-3xl sm:text-4xl font-extrabold ${s.accentClass}`}>
                  {s.num}
                </span>
                <div className="w-12 h-12 rounded-lg bg-surface-container border border-line flex items-center justify-center text-secondary">
                  <IconComp className="w-6 h-6" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <h3 className="text-lg sm:text-xl font-bold text-text-primary">
                  {s.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  {s.desc}
                </p>
              </div>

              <div className="mt-auto pt-4 border-t border-line font-mono text-xs text-text-muted">
                <span>{s.tag}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

