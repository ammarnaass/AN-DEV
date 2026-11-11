import React, { useState } from "react";
import { Edit3, Eye } from "lucide-react";
import { MarkdownToolbar } from "./MarkdownToolbar";
import { appendMarkdownSyntax } from "./postEditor.utils";

interface PostEnglishTabProps {
  title: string;
  summary: string;
  bodyMd: string;
  onChangeTitle: (val: string) => void;
  onChangeSummary: (val: string) => void;
  onChangeBodyMd: (val: string) => void;
}

export const PostEnglishTab: React.FC<PostEnglishTabProps> = ({
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
    <div className="space-y-5" dir="ltr">
      {/* Title */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-text-primary">
          Article Title (English) *
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => onChangeTitle(e.target.value)}
          placeholder="e.g. Replacing External DB with SQLite WAL and Litestream Replication"
          className="w-full px-4 py-2.5 rounded-xl bg-surface-container border border-line text-sm text-text-primary focus:border-secondary outline-none transition-all"
          required
        />
      </div>

      {/* Summary */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-text-primary">
          Executive Summary
        </label>
        <textarea
          rows={2}
          value={summary}
          onChange={(e) => onChangeSummary(e.target.value)}
          placeholder="Brief synopsis for cards and search snippets..."
          className="w-full px-4 py-2.5 rounded-xl bg-surface-container border border-line text-sm text-text-primary focus:border-secondary outline-none transition-all resize-y"
        />
      </div>

      {/* Markdown Editor / Preview */}
      <div className="space-y-2">
        <div className="flex items-center justify-between pb-1">
          <label className="text-xs font-bold text-text-primary">
            Article Technical Markdown (GFM) *
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
              <span>Editor</span>
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
              <span>Live Preview</span>
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
              placeholder="# Architectural Deep Dive&#10;&#10;Write article content in Markdown..."
              className="w-full p-4 bg-surface-container font-mono text-xs sm:text-sm text-text-primary outline-none resize-y leading-relaxed"
              required
            />
          </div>
        ) : (
          <div className="p-6 rounded-xl bg-surface-container/50 border border-line min-h-[300px] max-h-[450px] overflow-y-auto space-y-4">
            <h3 className="text-xl font-bold text-text-primary pb-2 border-b border-line">
              {title || "Sample Article Title"}
            </h3>
            <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-text-primary whitespace-pre-line leading-relaxed">
              {bodyMd || "No content to preview yet."}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
