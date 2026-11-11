import React from "react";
import { PosSpecs } from "@andev/shared";
import { Store, Printer, ScanLine, ShieldCheck, Database, Cloud, Check } from "lucide-react";

interface PosSpecsEditorProps {
  specs: Partial<PosSpecs>;
  onChange: (specs: Partial<PosSpecs>) => void;
}

const THERMAL_PRINTERS = [
  { id: "80mm", label: "طابعات حرارية قياسية 80mm (ESC/POS)" },
  { id: "58mm", label: "طابعات حرارية مصغرة 58mm" },
  { id: "A4_A5", label: "فواتير ومستندات A4 / A5 رسمية" }
];

const PERIPHERALS = [
  { id: "barcode_scanner", label: "قارئ الباركود (Barcode / QR Scanner)" },
  { id: "cash_drawer", label: "درج النقود الآلي (Auto Cash Drawer)" },
  { id: "customer_screen", label: "شاشة الزبون المزدوجة (Customer Display)" },
  { id: "weight_scale", label: "الميزان الإلكتروني لمتاجر الخضر والأجبان" },
  { id: "mobile_pos", label: "أجهزة كاشير محمولة بنظام أندرويد" }
];

export const PosSpecsEditor: React.FC<PosSpecsEditorProps> = ({ specs, onChange }) => {
  const updateSpec = <K extends keyof PosSpecs>(key: K, val: PosSpecs[K]) => {
    onChange({ ...specs, [key]: val });
  };

  const togglePrinter = (sizeId: string) => {
    const current = specs.printer_sizes || [];
    if (current.includes(sizeId)) {
      updateSpec("printer_sizes", current.filter(x => x !== sizeId));
    } else {
      updateSpec("printer_sizes", [...current, sizeId]);
    }
  };

  const togglePeripheral = (perId: string) => {
    const current = specs.peripherals || [];
    if (current.includes(perId)) {
      updateSpec("peripherals", current.filter(x => x !== perId));
    } else {
      updateSpec("peripherals", [...current, perId]);
    }
  };

  return (
    <div className="space-y-5 p-4 rounded-xl border border-line bg-surface-container/30 animate-fadeIn text-start">
      <div className="flex items-center gap-2 pb-2 border-b border-line text-xs font-mono font-bold text-secondary uppercase">
        <Store className="w-4 h-4" />
        <span>تخصيص نظام نقاط البيع والكاشير (POS & Retail Hardware Engine)</span>
      </div>

      {/* 1. Thermal Printers Compatibility */}
      <div className="space-y-2">
        <label className="flex items-center gap-1.5 text-xs font-mono text-text-muted font-semibold">
          <Printer className="w-3.5 h-3.5 text-secondary" />
          <span>الطابعات الحرارية والفواتير المدعومة</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {THERMAL_PRINTERS.map(tp => {
            const isSelected = (specs.printer_sizes || []).includes(tp.id);
            return (
              <button
                key={tp.id}
                type="button"
                onClick={() => togglePrinter(tp.id)}
                className={`flex items-center justify-between gap-2 p-2.5 rounded-lg border text-xs font-medium cursor-pointer transition-all ${
                  isSelected
                    ? "bg-secondary/15 border-secondary text-text-primary shadow-sm"
                    : "bg-surface border-line text-text-muted hover:border-secondary/40"
                }`}
              >
                <span className="truncate">{tp.label}</span>
                <div className={`w-3.5 h-3.5 rounded flex items-center justify-center border text-[9px] font-bold shrink-0 ${
                  isSelected ? "bg-secondary text-white border-secondary" : "border-line bg-surface-container"
                }`}>
                  {isSelected && <Check className="w-3 h-3" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Hardware Peripherals */}
      <div className="space-y-2 pt-2 border-t border-line">
        <label className="flex items-center gap-1.5 text-xs font-mono text-text-muted font-semibold">
          <ScanLine className="w-3.5 h-3.5 text-secondary" />
          <span>ملحقات وعتاد الكاشير المتوافقة (Peripherals)</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {PERIPHERALS.map(per => {
            const isSelected = (specs.peripherals || []).includes(per.id);
            return (
              <button
                key={per.id}
                type="button"
                onClick={() => togglePeripheral(per.id)}
                className={`flex items-center justify-between gap-2 p-2.5 rounded-lg border text-xs font-medium cursor-pointer transition-all ${
                  isSelected
                    ? "bg-secondary/15 border-secondary text-text-primary shadow-sm"
                    : "bg-surface border-line text-text-muted hover:border-secondary/40"
                }`}
              >
                <span className="truncate">{per.label}</span>
                <div className={`w-3.5 h-3.5 rounded flex items-center justify-center border text-[9px] font-bold shrink-0 ${
                  isSelected ? "bg-secondary text-white border-secondary" : "border-line bg-surface-container"
                }`}>
                  {isSelected && <Check className="w-3 h-3" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Toggles: Fiscal compliance & Offline & Cloud */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-line">
        {/* Fiscal Compliance */}
        <button
          type="button"
          onClick={() => updateSpec("fiscal_compliant", !specs.fiscal_compliant)}
          className={`flex items-center justify-between p-3 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
            specs.fiscal_compliant
              ? "bg-secondary/15 border-secondary text-text-primary ring-1 ring-secondary/30"
              : "bg-surface border-line text-text-muted hover:border-secondary/40"
          }`}
        >
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-secondary shrink-0" />
            <div className="flex flex-col text-start">
              <span>مطابقة القوانين الجبائية</span>
              <span className="text-[10px] text-text-muted font-normal">NIF, RC, NIS, TVA</span>
            </div>
          </div>
          <div className={`w-3.5 h-3.5 rounded flex items-center justify-center border text-[9px] font-bold ${
            specs.fiscal_compliant ? "bg-secondary text-white border-secondary" : "border-line bg-surface-container"
          }`}>
            {specs.fiscal_compliant && <Check className="w-3 h-3" />}
          </div>
        </button>

        {/* Offline Engine */}
        <div className="space-y-1">
          <label className="flex items-center gap-1 text-[11px] font-mono text-text-muted font-semibold">
            <Database className="w-3 h-3 text-secondary" />
            <span>محرك العمل دون إنترنت</span>
          </label>
          <input
            type="text"
            value={specs.offline_engine || "SQLite Local Engine"}
            onChange={e => updateSpec("offline_engine", e.target.value)}
            className="w-full h-10 px-2.5 rounded-lg border border-line bg-surface text-xs font-mono text-text-primary focus:outline-none focus:border-secondary"
          />
        </div>

        {/* Cloud Sync */}
        <button
          type="button"
          onClick={() => updateSpec("cloud_sync", !specs.cloud_sync)}
          className={`flex items-center justify-between p-3 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
            specs.cloud_sync
              ? "bg-secondary/15 border-secondary text-text-primary"
              : "bg-surface border-line text-text-muted hover:border-secondary/40"
          }`}
        >
          <div className="flex items-center gap-1.5">
            <Cloud className="w-4 h-4 text-secondary shrink-0" />
            <div className="flex flex-col text-start">
              <span>مزامنة سحابية مدمجة</span>
              <span className="text-[10px] text-text-muted font-normal">نسخ احتياطي فوري</span>
            </div>
          </div>
          <div className={`w-3.5 h-3.5 rounded flex items-center justify-center border text-[9px] font-bold ${
            specs.cloud_sync ? "bg-secondary text-white border-secondary" : "border-line bg-surface-container"
          }`}>
            {specs.cloud_sync && <Check className="w-3 h-3" />}
          </div>
        </button>
      </div>
    </div>
  );
};

