import React from "react";
import { Sparkles } from "lucide-react";
import { ALGERIA_KEYWORD_SUGGESTIONS } from "../../constants/seo.constants";

interface SeoKeywordsFormProps {
  keywordsAr: string;
  keywordsEn: string;
  onChange: (key: string, val: string) => void;
}

export const SeoKeywordsForm: React.FC<SeoKeywordsFormProps> = ({
  keywordsAr,
  keywordsEn,
  onChange,
}) => {
  const handleAddKeyword = (kw: string) => {
    const current = keywordsAr.trim();
    if (current.includes(kw)) return;
    const updated = current ? `${current}, ${kw}` : kw;
    onChange("seo_keywords_ar", updated);
  };

  return (
    <div className="space-y-2.5 pt-2 border-t border-line">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <label className="block text-xs font-mono text-text-muted font-semibold">
          الكلمات المفتاحية للبحث المستهدف في الجزائر والمنطقة (Search Keywords)
        </label>
        <span className="text-[10px] text-secondary font-mono">
          مفصولة بفواصل (، أو ,)
        </span>
      </div>
      <textarea
        rows={2}
        value={keywordsAr}
        onChange={(e) => onChange("seo_keywords_ar", e.target.value)}
        placeholder="تطوير برمجيات الجزائر, برمجة مواقع, تصميم تطبيقات, تطبيقات موبايل الجزائر..."
        className="w-full p-3 rounded-lg border border-line bg-surface-container text-text-primary text-sm focus:outline-none focus:border-secondary leading-relaxed resize-y"
      />

      {/* Keyword Pills for Quick Addition */}
      <div className="flex flex-wrap items-center gap-1.5 pt-1">
        <span className="text-[11px] text-text-muted font-mono flex items-center gap-1 me-1">
          <Sparkles className="w-3 h-3 text-secondary" />
          <span>اقتراحات الأكثر بحثاً:</span>
        </span>
        {ALGERIA_KEYWORD_SUGGESTIONS.map((kw) => {
          const isSelected = keywordsAr.includes(kw);
          return (
            <button
              key={kw}
              type="button"
              onClick={() => handleAddKeyword(kw)}
              className={`px-2 py-0.5 rounded-md text-[11px] transition-colors border ${
                isSelected
                  ? "bg-secondary/15 text-secondary border-secondary/30 font-semibold"
                  : "bg-surface-container border-line text-text-muted hover:text-text-primary hover:border-secondary/40"
              }`}
            >
              {isSelected ? `✓ ${kw}` : `+ ${kw}`}
            </button>
          );
        })}
      </div>

      <div className="space-y-1.5 pt-2">
        <label className="block text-xs font-mono text-text-muted font-semibold">
          الكلمات المفتاحية بالإنجليزية (English Keywords)
        </label>
        <textarea
          rows={2}
          dir="ltr"
          value={keywordsEn}
          onChange={(e) => onChange("seo_keywords_en", e.target.value)}
          placeholder="software agency algeria, web development algeria, mobile apps algeria..."
          className="w-full p-3 rounded-lg border border-line bg-surface-container text-text-primary text-sm font-mono focus:outline-none focus:border-secondary leading-relaxed resize-y"
        />
      </div>
    </div>
  );
};

