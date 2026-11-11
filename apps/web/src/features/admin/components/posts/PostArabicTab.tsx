import React, { useState } from "react";
import { Edit3, Eye } from "lucide-react";
import { MarkdownToolbar } from "./MarkdownToolbar";
import { appendMarkdownSyntax } from "./postEditor.utils";

interface PostArabicTabProps {
  title: string;
  summary: string;
  bodyMd: string;
  onChangeTitle: (val: string) => void;
  onChangeSummary: (val: string) => void;
  onChangeBodyMd: (val: string) => void;
}

export const PostArabicTab: React.FC<PostArabicTabProps> = ({
  title,
  summary,
  bodyMd,
  onChangeTitle,
  onChangeSummary,
  onChangeBodyMd,
}) => {
  const [previewMode, setPreviewMode] = useState(false);

  const handleInsert = (syntax: string) => {
    onChangeBodyMd(appendMarkdownSyntax(bodyMd, syntax));
  };

  return (
    <div className="space-y-5" dir="rtl">
      {/* Title */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-text-primary">
          عنوان المقال بالعربية *
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => onChangeTitle(e.target.value)}
          placeholder="مثال: استبدال خادم قواعد البيانات بـ SQLite بنمط WAL وLitestream"
          className="w-full px-4 py-2.5 rounded-xl bg-surface-container border border-line text-sm text-text-primary focus:border-secondary outline-none transition-all"
          required
        />
      </div>

      {/* Summary */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-text-primary">
          الموجز التنفيذي (Summary)
        </label>
        <textarea
          rows={2}
          value={summary}
          onChange={(e) => onChangeSummary(e.target.value)}
          placeholder="موجز سريع يظهر في بطاقة المقال وفي نتائج البحث..."
          className="w-full px-4 py-2.5 rounded-xl bg-surface-container border border-line text-sm text-text-primary focus:border-secondary outline-none transition-all resize-y"
        />
      </div>

      {/* Markdown Editor / Preview Switch */}
      <div className="space-y-2">
        <div className="flex items-center justify-between pb-1">
          <label className="text-xs font-bold text-text-primary">
            محتوى المقال التقني (Markdown GFM) *
          </label>
          <div className="flex items-center gap-1 bg-surface-container p-1 rounded-lg border border-line">
            <button
              type="button"
              onClick={() => setPreviewMode(false)}
              className={`px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition-all ${
                !previewMode
                  ? "bg-surface text-secondary shadow-sm"
                  : "text-text-muted hover:text-text-primary"
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>المحرر</span>
            </button>
            <button
              type="button"
              onClick={() => setPreviewMode(true)}
              className={`px-2.5 py-1 rounded text-xs font-medium flex items-center gap-1.5 transition-all ${
                previewMode
                  ? "bg-surface text-secondary shadow-sm"
                  : "text-text-muted hover:text-text-primary"
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>معاينة مباشرة</span>
            </button>
          </div>
        </div>

        {!previewMode ? (
          <div className="border border-line rounded-xl overflow-hidden focus-within:border-secondary transition-all">
            <MarkdownToolbar onInsert={handleInsert} />
            <textarea
              rows={14}
              value={bodyMd}
              onChange={(e) => onChangeBodyMd(e.target.value)}
              placeholder="# مقدمة معمارية&#10;&#10;اكتب المقال التقني هنا باستخدام Markdown..."
              className="w-full p-4 bg-surface-container font-mono text-xs sm:text-sm text-text-primary outline-none resize-y leading-relaxed"
              required
            />
          </div>
        ) : (
          <div className="p-6 rounded-xl bg-surface-container/50 border border-line min-h-[300px] max-h-[450px] overflow-y-auto space-y-4">
            <h3 className="text-xl font-bold text-text-primary pb-2 border-b border-line">
              {title || "عنوان المقال التجريبي"}
            </h3>
            <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-text-primary whitespace-pre-line leading-relaxed">
              {bodyMd || "لا يوجد محتوى لمعاينته حتى الآن."}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
