import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Sun, Moon, Share2, Check } from "lucide-react";

interface BioPageNavbarProps {
  title: string;
  bio: string;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const BioPageNavbar: React.FC<BioPageNavbarProps> = ({
  title,
  bio,
  isDark,
  onToggleTheme,
}) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const currentUrl = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: bio,
          url: currentUrl,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }
    await navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="max-w-md mx-auto w-full flex items-center justify-between pb-6 select-none">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface/80 backdrop-blur-md border border-line text-xs font-mono text-text-muted hover:text-text-primary hover:border-secondary/40 transition-colors shadow-sm"
        title="العودة للموقع الرئيسي"
      >
        <ArrowUpRight className="w-3.5 h-3.5 rotate-180 text-secondary" />
        <span>الموقع الرسمي</span>
      </Link>

      <div className="flex items-center gap-2">
        {/* Dual-Theme Switcher Button */}
        <button
          type="button"
          onClick={onToggleTheme}
          className="w-8 h-8 rounded-full bg-surface/80 backdrop-blur-md border border-line flex items-center justify-center text-text-muted hover:text-secondary hover:border-secondary/40 transition-colors shadow-sm cursor-pointer"
          title={isDark ? "تفعيل الوضع المشرق (Light Mode)" : "تفعيل الوضع المظلم (Dark Mode)"}
          aria-label="Toggle Theme Mode"
        >
          {isDark ? (
            <Sun className="w-3.5 h-3.5 text-amber-400" />
          ) : (
            <Moon className="w-3.5 h-3.5 text-sky-600" />
          )}
        </button>

        {/* Share Button */}
        <button
          type="button"
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface/80 backdrop-blur-md border border-line text-xs font-mono text-text-muted hover:text-secondary hover:border-secondary/40 transition-colors cursor-pointer shadow-sm"
          title="مشاركة الصفحة"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-status-ok" />
              <span className="text-status-ok font-semibold">تم النسخ!</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5" />
              <span>مشاركة</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
