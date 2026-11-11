import React from "react";
import { Search, AlertTriangle, CheckCircle2 } from "lucide-react";
import { useI18n } from "../../../lib/i18n";
import { Button } from "../../../components/ui/Button";

interface TrackingSearchBarProps {
  searchInput: string;
  onSearchChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  error: string | null;
  actionSuccess: string | null;
}

export const TrackingSearchBar: React.FC<TrackingSearchBarProps> = ({
  searchInput,
  onSearchChange,
  onSubmit,
  isLoading,
  error,
  actionSuccess,
}) => {
  const { locale } = useI18n();

  return (
    <div className="p-6 sm:p-8 rounded-2xl border border-line bg-surface space-y-4 shadow-sm text-start">
      <div className="space-y-1">
        <span className="text-xs font-mono text-secondary font-semibold">
          {locale === "ar" ? "بوابة تتبع الطلبات والاستشارات" : "REQUEST & CONSULTATION TRACKER"}
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
          {locale === "ar" ? "متابعة حالة طلبك في الوقت الفعلي" : "Live Request Status Tracking"}
        </h1>
        <p className="text-mute text-xs sm:text-sm">
          {locale === "ar"
            ? "أدخل كود التتبع الذي استلمته عند تقديم الطلب (مثال: AND-2026-XXXX) للاطلاع على العرض والمواعيد."
            : "Enter the tracking code received after submitting your request (e.g. AND-2026-XXXX)."}
        </p>
      </div>

      <form onSubmit={onSubmit} className="flex gap-2 max-w-lg pt-2">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => onSearchChange(e.target.value.toUpperCase())}
          placeholder="AND-2026-XXXX"
          className="flex-1 h-12 px-4 rounded-lg border border-line bg-bg font-mono font-bold text-sm tracking-wider text-ink focus:outline-none focus:border-secondary uppercase"
        />
        <Button type="submit" variant="primary" isLoading={isLoading} className="px-6 h-12">
          <Search className="w-4 h-4" />
          <span className="ms-1.5">{locale === "ar" ? "استعلام" : "Track"}</span>
        </Button>
      </form>

      {error && (
        <div className="p-3.5 rounded-lg bg-err/10 border border-err/30 text-err text-xs flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {actionSuccess && (
        <div className="p-3.5 rounded-lg bg-ok/10 border border-ok/30 text-ok text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>{actionSuccess}</span>
        </div>
      )}
    </div>
  );
};
