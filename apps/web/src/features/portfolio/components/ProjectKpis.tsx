import React from "react";
import { Zap, Activity, Layers } from "lucide-react";
import { useI18n } from "../../../lib/i18n";

export const ProjectKpis: React.FC = () => {
  const { locale } = useI18n();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="p-5 rounded-xl bg-surface border border-line flex flex-col gap-1">
        <div className="flex items-center gap-2 text-secondary font-mono text-xs">
          <Zap className="w-4 h-4" />
          <span>{locale === "ar" ? "تحسين الأداء" : "Throughput Gain"}</span>
        </div>
        <span className="text-2xl sm:text-3xl font-extrabold text-text-primary">+140%</span>
        <span className="text-xs text-text-muted">
          {locale === "ar" ? "تسريع معالجة الطلبات" : "Order processing latency drop"}
        </span>
      </div>

      <div className="p-5 rounded-xl bg-surface border border-line flex flex-col gap-1">
        <div className="flex items-center gap-2 text-status-ok font-mono text-xs">
          <Activity className="w-4 h-4" />
          <span>{locale === "ar" ? "توافر النظام" : "High Availability"}</span>
        </div>
        <span className="text-2xl sm:text-3xl font-extrabold text-status-ok">99.98%</span>
        <span className="text-xs text-text-muted">
          {locale === "ar" ? "جاهزية دون توقف" : "Zero-downtime cluster SLA"}
        </span>
      </div>

      <div className="p-5 rounded-xl bg-surface border border-line flex flex-col gap-1">
        <div className="flex items-center gap-2 text-secondary font-mono text-xs">
          <Layers className="w-4 h-4" />
          <span>{locale === "ar" ? "زمن استجابة الـ API" : "Average API Latency"}</span>
        </div>
        <span className="text-2xl sm:text-3xl font-extrabold text-secondary">24ms</span>
        <span className="text-xs text-text-muted">
          {locale === "ar" ? "في شبكة الجيل الرابع الجزائرية" : "Measured on 4G in Algeria"}
        </span>
      </div>
    </div>
  );
};
