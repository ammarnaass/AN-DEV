import React from "react";
import { ErpSpecs } from "@andev/shared";
import { Layers, Package, ShoppingCart, Receipt, Calculator, Users, Building, Shield, FileCheck, Check } from "lucide-react";

interface ErpSpecsEditorProps {
  specs: Partial<ErpSpecs>;
  onChange: (specs: Partial<ErpSpecs>) => void;
}

const ERP_MODULES = [
  { id: "inventory", label: "إدارة المخزون والمستودعات المتعددة", icon: Package },
  { id: "sales", label: "المبيعات وإدارة مسؤولي التوزيع", icon: ShoppingCart },
  { id: "invoicing", label: "الفوترة الجبائية وحسابات الزبائن", icon: Receipt },
  { id: "accounting", label: "المحاسبة المالية العامة ودفتر الأستاذ", icon: Calculator },
  { id: "hr", label: "الموارد البشرية، الحضور وجداول الرواتب", icon: Users },
  { id: "crm", label: "إدارة علاقات العملاء وفرص البيع", icon: Building },
  { id: "manufacturing", label: "أوامر الإنتاج والتصنيع وحساب التكلفة", icon: Layers }
];

export const ErpSpecsEditor: React.FC<ErpSpecsEditorProps> = ({ specs, onChange }) => {
  const updateSpec = <K extends keyof ErpSpecs>(key: K, val: ErpSpecs[K]) => {
    onChange({ ...specs, [key]: val });
  };

  const toggleModule = (modId: string) => {
    const current = specs.modules || [];
    if (current.includes(modId)) {
      updateSpec("modules", current.filter(x => x !== modId));
    } else {
      updateSpec("modules", [...current, modId]);
    }
  };

  return (
    <div className="space-y-5 p-4 rounded-xl border border-line bg-surface-container/30 animate-fadeIn text-start">
      <div className="flex items-center gap-2 pb-2 border-b border-line text-xs font-mono font-bold text-secondary uppercase">
        <Layers className="w-4 h-4" />
        <span>تخصيص نظام مؤسسي وإداري متكامل (Enterprise ERP System)</span>
      </div>

      {/* 1. Integrated Modules Checklist */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-mono text-text-muted font-semibold">
            الوحدات الإدارية المدمجة في النظام (Integrated Modules)
          </label>
          <span className="text-[11px] font-mono text-secondary">
            {(specs.modules || []).length} موديولات نشطة
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {ERP_MODULES.map(m => {
            const Icon = m.icon;
            const isSelected = (specs.modules || []).includes(m.id);
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => toggleModule(m.id)}
                className={`flex items-center justify-between gap-2 p-2.5 rounded-lg border text-xs font-medium cursor-pointer transition-all ${
                  isSelected
                    ? "bg-secondary/15 border-secondary text-text-primary shadow-sm"
                    : "bg-surface border-line text-text-muted hover:border-secondary/40"
                }`}
              >
                <div className="flex items-center gap-2 min-w-0 pointer-events-none">
                  <Icon className="w-4 h-4 text-secondary shrink-0" />
                  <span className="truncate">{m.label}</span>
                </div>
                <div className={`w-3.5 h-3.5 rounded flex items-center justify-center border text-[9px] font-bold shrink-0 pointer-events-none ${
                  isSelected ? "bg-secondary text-white border-secondary" : "border-line bg-surface-container"
                }`}>
                  {isSelected && <Check className="w-3 h-3" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Architecture & Deployment Mode */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-line">
        {/* Deployment Mode */}
        <div className="space-y-1">
          <label className="text-xs font-mono text-text-muted font-semibold">طريقة النشر والتثبيت</label>
          <select
            value={specs.deployment_mode || "cloud"}
            onChange={e => updateSpec("deployment_mode", e.target.value as any)}
            className="w-full h-10 px-3 rounded-lg border border-line bg-surface text-text-primary text-xs font-semibold focus:outline-none focus:border-secondary"
          >
            <option value="cloud">سحابي مدار بالكامل (Cloud SaaS)</option>
            <option value="on_premise">خادم داخلي محلي للمؤسسة (On-Premise Server)</option>
            <option value="hybrid">هجين سحابي ومحلي (Hybrid Cloud + Local Mirror)</option>
          </select>
        </div>

        {/* Multi-Branch Support */}
        <div className="flex items-end">
          <button
            type="button"
            onClick={() => updateSpec("multi_branch", !specs.multi_branch)}
            className={`w-full h-10 flex items-center justify-between px-3 rounded-lg border text-xs font-semibold cursor-pointer transition-all ${
              specs.multi_branch
                ? "bg-secondary/15 border-secondary text-text-primary"
                : "bg-surface border-line text-text-muted hover:border-secondary/40"
            }`}
          >
            <div className="flex items-center gap-1.5">
              <Building className="w-4 h-4 text-secondary" />
              <span>دعم تعدد الفروع والمستودعات والشركات التابعة</span>
            </div>
            <div className={`w-3.5 h-3.5 rounded flex items-center justify-center border text-[9px] font-bold ${
              specs.multi_branch ? "bg-secondary text-white border-secondary" : "border-line bg-surface-container"
            }`}>
              {specs.multi_branch && <Check className="w-3 h-3" />}
            </div>
          </button>
        </div>
      </div>

      {/* 3. Security & Governance */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-line">
        <button
          type="button"
          onClick={() => updateSpec("rbac_security", !specs.rbac_security)}
          className={`flex items-center justify-between p-3 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
            specs.rbac_security
              ? "bg-secondary/15 border-secondary text-text-primary ring-1 ring-secondary/30"
              : "bg-surface border-line text-text-muted hover:border-secondary/40"
          }`}
        >
          <div className="flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-secondary shrink-0" />
            <div className="flex flex-col text-start">
              <span>نظام صلاحيات متقدم (RBAC)</span>
              <span className="text-[10px] text-text-muted font-normal">أدوار دقيقة للمدراء، المحاسبين والموظفين</span>
            </div>
          </div>
          <div className={`w-3.5 h-3.5 rounded flex items-center justify-center border text-[9px] font-bold ${
            specs.rbac_security ? "bg-secondary text-white border-secondary" : "border-line bg-surface-container"
          }`}>
            {specs.rbac_security && <Check className="w-3 h-3" />}
          </div>
        </button>

        <button
          type="button"
          onClick={() => updateSpec("audit_trail", !specs.audit_trail)}
          className={`flex items-center justify-between p-3 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
            specs.audit_trail
              ? "bg-secondary/15 border-secondary text-text-primary ring-1 ring-secondary/30"
              : "bg-surface border-line text-text-muted hover:border-secondary/40"
          }`}
        >
          <div className="flex items-center gap-1.5">
            <FileCheck className="w-4 h-4 text-secondary shrink-0" />
            <div className="flex flex-col text-start">
              <span>سجل التدقيق والتتبع الأمني (Audit Log)</span>
              <span className="text-[10px] text-text-muted font-normal">تسجيل كل عملية بيع وتعديل وحذف بالمستخدم والتوقيت</span>
            </div>
          </div>
          <div className={`w-3.5 h-3.5 rounded flex items-center justify-center border text-[9px] font-bold ${
            specs.audit_trail ? "bg-secondary text-white border-secondary" : "border-line bg-surface-container"
          }`}>
            {specs.audit_trail && <Check className="w-3 h-3" />}
          </div>
        </button>
      </div>
    </div>
  );
};

