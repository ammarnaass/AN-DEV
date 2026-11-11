import React from "react";
import { ErpSpecs } from "@andev/shared";
import { useI18n } from "../../../lib/i18n";
import { Layers, Package, ShoppingCart, Receipt, Calculator, Users, Building, Shield, CheckCircle2 } from "lucide-react";

interface ErpModulesMatrixProps {
  specs?: Partial<ErpSpecs>;
  className?: string;
}

const MODULE_META: Record<string, { label_ar: string; label_en: string; desc_ar: string; desc_en: string; icon: any }> = {
  inventory: {
    label_ar: "المخزون والمستودعات",
    label_en: "Inventory & Warehouses",
    desc_ar: "جرد دقيق وتنبيه آلي لحدود الأمان وتحويلات فورية بين المستودعات.",
    desc_en: "Multi-warehouse real-time tracking, lot control, and low stock alarms.",
    icon: Package
  },
  sales: {
    label_ar: "المبيعات والتوزيع",
    label_en: "Sales & Distribution",
    desc_ar: "إدارة مسؤولي التوزيع، عروض الأسعار، وتتبع طلبيات العملاء لحظياً.",
    desc_en: "Field sales automation, commercial dispatch, and order pipelines.",
    icon: ShoppingCart
  },
  invoicing: {
    label_ar: "الفوترة الجبائية",
    label_en: "Fiscal Invoicing",
    desc_ar: "فواتير معتمدة قانونياً متوافقة مع مصلحة الضرائب وقوانين المالية الجزائرية.",
    desc_en: "Official tax invoices with Algerian NIF/RC and VAT compliance.",
    icon: Receipt
  },
  accounting: {
    label_ar: "المحاسبة والمالية",
    label_en: "Financial Accounting",
    desc_ar: "دفتر الأستاذ العام، سندات القبض والدفع، وميزانية الأرباح والخسائر.",
    desc_en: "General ledger, receivables, payables, and P&L financial reporting.",
    icon: Calculator
  },
  hr: {
    label_ar: "الموارد البشرية والرواتب",
    label_en: "HR & Payroll",
    desc_ar: "ملفات الموظفين، تتبع الحضور، واحتساب الرواتب والضمان الاجتماعي CNAS.",
    desc_en: "Employee lifecycle, attendance sync, and CNAS payroll compliance.",
    icon: Users
  },
  crm: {
    label_ar: "علاقات العملاء",
    label_en: "CRM & Client Hub",
    desc_ar: "تتبع التواصل، إدارة فرص الصفقات، ودعم فني مخصص للمؤسسات.",
    desc_en: "Customer communications, deal pipelines, and client service logs.",
    icon: Building
  }
};

export const ErpModulesMatrix: React.FC<ErpModulesMatrixProps> = ({
  specs = {},
  className = ""
}) => {
  const { locale } = useI18n();
  const activeModules = specs.modules && specs.modules.length > 0
    ? specs.modules
    : ["inventory", "sales", "invoicing", "accounting"];

  return (
    <div className={`p-6 rounded-2xl border border-line bg-surface-container/40 space-y-6 text-start shadow-card ${className}`}>
      {/* Header with Enterprise Badges */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-line">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-secondary/15 text-secondary text-[11px] font-mono font-bold">
            <Layers className="w-3.5 h-3.5" />
            <span>ENTERPRISE_SYSTEM // ERP_SUITE</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-text-primary">
            {locale === "ar" ? "الوحدات الإدارية المدمجة ومعمارية النظام" : "Integrated Enterprise Modules & Architecture"}
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {specs.multi_branch !== false && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface border border-line text-xs font-mono text-secondary">
              <Building className="w-3.5 h-3.5" />
              <span>{locale === "ar" ? "متعدد الفروع والمستودعات" : "Multi-Branch Ready"}</span>
            </span>
          )}
          {specs.rbac_security !== false && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface border border-line text-xs font-mono text-secondary">
              <Shield className="w-3.5 h-3.5" />
              <span>{locale === "ar" ? "صلاحيات مشددة RBAC" : "RBAC Audit Security"}</span>
            </span>
          )}
        </div>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {activeModules.map(modKey => {
          const meta = MODULE_META[modKey] || {
            label_ar: modKey,
            label_en: modKey,
            desc_ar: "وحدة برمجية متكاملة ومترابطة مع باقي النظام.",
            desc_en: "Seamlessly integrated core enterprise subsystem.",
            icon: Layers
          };
          const Icon = meta.icon;

          return (
            <div
              key={modKey}
              className="p-4 rounded-xl border border-line bg-surface hover:border-secondary/40 transition-colors space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-text-primary">
                    {locale === "ar" ? meta.label_ar : meta.label_en}
                  </h4>
                </div>
                <CheckCircle2 className="w-3.5 h-3.5 text-secondary" />
              </div>
              <p className="text-[11px] text-text-muted leading-relaxed font-mono">
                {locale === "ar" ? meta.desc_ar : meta.desc_en}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

