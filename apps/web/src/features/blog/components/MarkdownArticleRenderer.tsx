import React, { useState } from "react";
import { Check, Copy, Info, AlertTriangle, AlertCircle, Lightbulb } from "lucide-react";

interface MarkdownArticleRendererProps {
  content: string;
  onHeadingsExtracted?: (headings: Array<{ id: string; text: string; level: number }>) => void;
}

export const MarkdownArticleRenderer: React.FC<MarkdownArticleRendererProps> = ({
  content,
  onHeadingsExtracted,
}) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopyCode = async (code: string, index: number) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch {
      // ignore
    }
  };

  // Parse lines into tokens
  const { renderedElements, headings } = React.useMemo(() => {
    const lines = content.split("\n");
    const extractedHeadings: Array<{ id: string; text: string; level: number }> = [];
    const elements: React.ReactNode[] = [];

    let inCodeBlock = false;
    let codeLanguage = "";
    let codeBuffer: string[] = [];
    let codeBlockIndex = 0;

    let inBlockquote = false;
    let quoteBuffer: string[] = [];

    const flushBlockquote = (key: string) => {
      if (quoteBuffer.length === 0) return;
      const rawText = quoteBuffer.join("\n").trim();
      quoteBuffer = [];

      // Check for GitHub Alerts: [!NOTE], [!TIP], [!WARNING], [!IMPORTANT]
      const noteMatch = rawText.match(/^\[!(NOTE|TIP|WARNING|IMPORTANT|CAUTION)\]\s*(.*)$/is);
      if (noteMatch) {
        const alertType = noteMatch[1].toUpperCase();
        const alertText = noteMatch[2];

        let borderColor = "border-secondary/40 bg-secondary/5 text-text-primary";
        let icon = <Info className="w-4 h-4 text-secondary shrink-0" />;
        let title = "ملاحظة معمارية // NOTE";

        if (alertType === "TIP") {
          borderColor = "border-status-ok/40 bg-status-ok/5 text-text-primary";
          icon = <Lightbulb className="w-4 h-4 text-status-ok shrink-0" />;
          title = "نصيحة أداء // TIP";
        } else if (alertType === "WARNING" || alertType === "CAUTION") {
          borderColor = "border-warn/40 bg-warn/5 text-text-primary";
          icon = <AlertTriangle className="w-4 h-4 text-warn shrink-0" />;
          title = "تحذير بيئة إنتاج // WARNING";
        } else if (alertType === "IMPORTANT") {
          borderColor = "border-err/40 bg-err/5 text-text-primary";
          icon = <AlertCircle className="w-4 h-4 text-err shrink-0" />;
          title = "شرط أساسي // IMPORTANT";
        }

        elements.push(
          <div
            key={key}
            className={`p-4 rounded-xl border-l-4 rtl:border-l-0 rtl:border-r-4 ${borderColor} space-y-1.5 my-4`}
          >
            <div className="flex items-center gap-2 text-xs font-mono font-bold">
              {icon}
              <span>{title}</span>
            </div>
            <p className="text-xs sm:text-sm text-text-muted leading-relaxed whitespace-pre-line">
              {alertText}
            </p>
          </div>
        );
      } else {
        elements.push(
          <blockquote
            key={key}
            className="p-4 rounded-xl border-l-4 rtl:border-l-0 rtl:border-r-4 border-secondary/50 bg-surface-container/40 text-text-muted italic text-xs sm:text-sm my-4 leading-relaxed"
          >
            {rawText}
          </blockquote>
        );
      }
    };

    lines.forEach((line, lineIdx) => {
      // Code blocks delimiter ```
      if (line.trim().startsWith("```")) {
        if (!inCodeBlock) {
          // Starting code block
          flushBlockquote(`quote-before-code-${lineIdx}`);
          inCodeBlock = true;
          codeLanguage = line.trim().slice(3).trim() || "bash";
          codeBuffer = [];
        } else {
          // Ending code block
          const codeString = codeBuffer.join("\n");
          const currentIndex = codeBlockIndex++;
          elements.push(
            <div
              key={`code-${lineIdx}`}
              className="my-5 rounded-xl border border-line bg-surface-container overflow-hidden shadow-sm"
              dir="ltr"
            >
              {/* Code block header */}
              <div className="px-4 py-2 bg-surface border-b border-line flex items-center justify-between text-xs font-mono text-text-muted">
                <span className="uppercase text-[11px] font-bold text-secondary">
                  {codeLanguage}
                </span>
                <button
                  type="button"
                  onClick={() => handleCopyCode(codeString, currentIndex)}
                  className="inline-flex items-center gap-1.5 px-2 py-1 rounded hover:bg-surface-elevated text-text-muted hover:text-text-primary transition-all text-[11px]"
                >
                  {copiedIndex === currentIndex ? (
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
                <code>{codeString}</code>
              </pre>
            </div>
          );
          inCodeBlock = false;
          codeBuffer = [];
        }
        return;
      }

      if (inCodeBlock) {
        codeBuffer.push(line);
        return;
      }

      // Blockquotes starting with >
      if (line.trim().startsWith(">")) {
        inBlockquote = true;
        quoteBuffer.push(line.trim().slice(1).trim());
        return;
      } else if (inBlockquote) {
        flushBlockquote(`quote-${lineIdx}`);
        inBlockquote = false;
      }

      // Heading 3: ###
      if (line.startsWith("### ")) {
        const text = line.replace("### ", "").trim();
        const id = `heading-${extractedHeadings.length}-${text.toLowerCase().replace(/[^\w\u0621-\u064A]+/g, "-")}`;
        extractedHeadings.push({ id, text, level: 3 });
        elements.push(
          <h3
            key={`h3-${lineIdx}`}
            id={id}
            className="text-lg sm:text-xl font-bold text-text-primary pt-6 pb-2 scroll-mt-24 border-b border-line/40 flex items-center gap-2 group"
          >
            <span className="text-secondary font-mono text-xs select-none">###</span>
            <span>{text}</span>
          </h3>
        );
        return;
      }

      // Heading 2: ##
      if (line.startsWith("## ")) {
        const text = line.replace("## ", "").trim();
        const id = `heading-${extractedHeadings.length}-${text.toLowerCase().replace(/[^\w\u0621-\u064A]+/g, "-")}`;
        extractedHeadings.push({ id, text, level: 2 });
        elements.push(
          <h2
            key={`h2-${lineIdx}`}
            id={id}
            className="text-xl sm:text-2xl font-black text-text-primary pt-8 pb-3 scroll-mt-24 border-b border-line flex items-center gap-2.5 group"
          >
            <span className="text-secondary font-mono text-sm select-none">##</span>
            <span>{text}</span>
          </h2>
        );
        return;
      }

      // Heading 1: #
      if (line.startsWith("# ")) {
        const text = line.replace("# ", "").trim();
        const id = `heading-${extractedHeadings.length}-${text.toLowerCase().replace(/[^\w\u0621-\u064A]+/g, "-")}`;
        extractedHeadings.push({ id, text, level: 1 });
        elements.push(
          <h1
            key={`h1-${lineIdx}`}
            id={id}
            className="text-2xl sm:text-3xl font-black text-text-primary pt-6 pb-2 scroll-mt-24"
          >
            {text}
          </h1>
        );
        return;
      }

      // Bullet lists starting with - or *
      if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
        const itemText = line.trim().slice(2);
        elements.push(
          <li
            key={`li-${lineIdx}`}
            className="ms-6 list-disc text-xs sm:text-sm text-text-muted leading-relaxed my-1"
          >
            {itemText}
          </li>
        );
        return;
      }

      // Empty line / paragraph break
      if (!line.trim()) {
        return;
      }

      // Standard Paragraph
      elements.push(
        <p
          key={`p-${lineIdx}`}
          className="text-xs sm:text-sm text-text-muted leading-relaxed my-3"
        >
          {line}
        </p>
      );
    });

    if (inBlockquote) {
      flushBlockquote("quote-end");
    }

    return { renderedElements: elements, headings: extractedHeadings };
  }, [content, copiedIndex]);

  // Notify parent of extracted headings for TOC
  React.useEffect(() => {
    if (onHeadingsExtracted) {
      onHeadingsExtracted(headings);
    }
  }, [headings, onHeadingsExtracted]);

  return <div className="space-y-1">{renderedElements}</div>;
};
