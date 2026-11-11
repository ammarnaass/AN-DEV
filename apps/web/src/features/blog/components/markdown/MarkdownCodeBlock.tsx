import React, { useState } from "react";
import { Check, Copy } from "lucide-react";

export interface MarkdownCodeBlockProps {
  code: string;
  language: string;
}

export const MarkdownCodeBlock: React.FC<MarkdownCodeBlockProps> = ({
  code,
  language,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div
      className="my-5 rounded-xl border border-line bg-surface-container overflow-hidden shadow-sm text-start"
      dir="ltr"
    >
      {/* Code block header */}
      <div className="px-4 py-2 bg-surface border-b border-line flex items-center justify-between text-xs font-mono text-text-muted">
        <span className="uppercase text-[11px] font-bold text-secondary">
          {language}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-2 py-1 rounded hover:bg-surface-elevated text-text-muted hover:text-text-primary transition-all text-[11px]"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-status-ok" />
              <span className="text-status-ok">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Code</span>
            </>
          )}
        </button>
      </div>

      {/* Code content */}
      <pre className="p-4 overflow-x-auto font-mono text-xs sm:text-sm text-text-primary leading-relaxed bg-[#0d1117] text-white">
        <code>{code}</code>
      </pre>
    </div>
  );
};

