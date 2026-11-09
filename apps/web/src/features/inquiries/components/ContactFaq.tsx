import React, { useState } from "react";
import { useI18n } from "../../../lib/i18n";
import { HelpCircle, ChevronDown } from "lucide-react";

export const ContactFaq: React.FC = () => {
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
    <div className="rounded-2xl border border-line bg-surface p-6 space-y-4 shadow-sm text-start">
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
                type="button"
                onClick={() => setOpenFaq(isOpen ? null : idx)}
                className="w-full px-4 py-3 flex items-center justify-between text-start text-xs sm:text-sm font-semibold text-text-primary hover:text-secondary transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-text-muted transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-secondary" : ""
                  }`}
                />
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
  );
};

