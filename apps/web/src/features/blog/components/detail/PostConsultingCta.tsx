import React from "react";
import { Link } from "react-router-dom";
import { useI18n } from "../../../../lib/i18n";
import { MessageSquare } from "lucide-react";

export const PostConsultingCta: React.FC = () => {
  const { locale } = useI18n();

  return (
    <div className="p-8 rounded-2xl bg-gradient-to-r from-surface via-surface-elevated to-surface border border-secondary/40 shadow-card flex flex-col sm:flex-row items-center justify-between gap-6 text-start">
      <div className="space-y-2">
        <h3 className="text-lg sm:text-xl font-bold text-text-primary">
          {locale === "ar"
            ? "هل تواجه بطئاً أو اختناقات معمارية في نظامك الحالي؟"
            : "Facing performance bottlenecks in your existing architecture?"}
        </h3>
        <p className="text-text-muted text-xs sm:text-sm">
          {locale === "ar"
            ? "فريق AN DEV جاهز لمراجعة الكود، تدقيق قواعد البيانات، وتقديم استشارة هندسية ملموسة."
            : "Our senior engineers conduct comprehensive code reviews and performance audits."}
        </p>
      </div>
      <Link to="/contact" className="shrink-0">
        <button className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-primary-container text-white font-semibold text-sm hover:bg-primary/90 transition-all shadow-[0_0_16px_rgba(13,110,253,0.35)] active:scale-[0.98]">
          <MessageSquare className="w-4 h-4" />
          <span>{locale === "ar" ? "طلب استشارة معمارية" : "Request Technical Audit"}</span>
        </button>
      </Link>
    </div>
  );
};

