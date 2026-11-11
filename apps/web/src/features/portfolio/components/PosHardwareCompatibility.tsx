import React from "react";
import { PosSpecs } from "@andev/shared";
import { useI18n } from "../../../lib/i18n";
import { Printer, ScanLine, ShieldCheck, Database, HardDrive, CheckCircle2 } from "lucide-react";

interface PosHardwareCompatibilityProps {
  specs?: Partial<PosSpecs>;
  className?: string;
}

export const PosHardwareCompatibility: React.FC<PosHardwareCompatibilityProps> = ({
  specs = {},
  className = ""
}) => {
  const { locale } = useI18n();
  const printerSizes = specs.printer_sizes || ["80mm", "58mm"];
  const peripherals = specs.peripherals || ["barcode_scanner", "cash_drawer"];
  const isFiscal = specs.fiscal_compliant ?? true;
  const offlineEngine = specs.offline_engine || "SQLite Local Engine";

  return (
    <div className={`p-6 rounded-2xl border border-line bg-surface-container/40 space-y-6 text-start shadow-card ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-line">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-secondary/15 text-secondary text-[11px] font-mono font-bold">
            <ScanLine className="w-3.5 h-3.5" />
            <span>HARDWARE_INTEROP // POS_SYSTEM</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-text-primary">
            {locale === "ar" ? "توافقية العتاد والطابعات الحرارية والمعايير الجبائية" : "Hardware Interoperability & Thermal Printing Architecture"}
          </h3>
        </div>

        {isFiscal && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold shrink-0">
            <ShieldCheck className="w-4 h-4" />
            <span>{locale === "ar" ? "مطابق للقوانين الجبائية الجزائرية" : "Algerian Fiscal Compliance (NIF/RC)"}</span>
          </div>
        )}
      </div>

      {/* Grid of 3 Hardware Capabilities */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 1. Thermal Printing */}
        <div className="p-4 rounded-xl border border-line bg-surface space-y-2.5">
          <div className="flex items-center gap-2 text-secondary font-semibold text-xs font-mono">
            <Printer className="w-4 h-4" />
            <span>{locale === "ar" ? "طابعات الوصولات والفواتير" : "Thermal Receipt Printing"}</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {printerSizes.map(size => (
              <span
                key={size}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-secondary/10 border border-secondary/20 text-text-primary text-xs font-mono font-bold"
              >
                <CheckCircle2 className="w-3 h-3 text-secondary" />
                {size}
              </span>
            ))}
          </div>
          <p className="text-[11px] text-text-muted leading-relaxed font-mono">
            {locale === "ar"
              ? "توافق مباشر مع طابعات ESC/POS عبر USB أو الشبكة مع دعم أوامر قطع الورق وفتح الدرج آلياً."
              : "Native ESC/POS command integration over USB or Ethernet with auto-cutter triggering."}
          </p>
        </div>

        {/* 2. Connected Peripherals */}
        <div className="p-4 rounded-xl border border-line bg-surface space-y-2.5">
          <div className="flex items-center gap-2 text-secondary font-semibold text-xs font-mono">
            <ScanLine className="w-4 h-4" />
            <span>{locale === "ar" ? "ملحقات نقطة البيع" : "POS Peripherals"}</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {peripherals.map(per => {
              const label =
                per === "barcode_scanner"
                  ? (locale === "ar" ? "قارئ باركود" : "Barcode Scanner")
                  : per === "cash_drawer"
                  ? (locale === "ar" ? "درج نقود آلي" : "Auto Cash Drawer")
                  : per === "customer_screen"
                  ? (locale === "ar" ? "شاشة زبون" : "Customer Display")
                  : per;
              return (
                <span
                  key={per}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-surface-container border border-line text-text-primary text-xs font-medium"
                >
                  <CheckCircle2 className="w-3 h-3 text-secondary" />
                  {label}
                </span>
              );
            })}
          </div>
          <p className="text-[11px] text-text-muted leading-relaxed font-mono">
            {locale === "ar"
              ? "استجابة فورية لأجهزة المسح الضوئي وقارئات البطاقات البنكية CIB / Dahabia."
              : "Zero-latency input capture for barcode scanners and payment terminal devices."}
          </p>
        </div>

        {/* 3. Offline Engine & Security */}
        <div className="p-4 rounded-xl border border-line bg-surface space-y-2.5">
          <div className="flex items-center gap-2 text-secondary font-semibold text-xs font-mono">
            <Database className="w-4 h-4" />
            <span>{locale === "ar" ? "محرك العمل بدون إنترنت" : "Zero-Downtime Offline Engine"}</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-secondary/10 border border-secondary/20 text-secondary text-xs font-mono font-bold">
            <HardDrive className="w-3.5 h-3.5" />
            <span>{offlineEngine}</span>
          </div>
          <p className="text-[11px] text-text-muted leading-relaxed font-mono">
            {locale === "ar"
              ? "قواعد بيانات محلية فائقة الأمان والسرعة تضمن استمرار البيع والطباعة والجرد حتى عند انقطاع شبكة الإنترنت."
              : "Resilient local embedded database preventing revenue loss during network outages."}
          </p>
        </div>
      </div>
    </div>
  );
};

