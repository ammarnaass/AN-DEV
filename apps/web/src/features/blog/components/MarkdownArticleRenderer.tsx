import React from "react";
import { MarkdownCodeBlock } from "./markdown/MarkdownCodeBlock";
import { MarkdownAlertBlock } from "./markdown/MarkdownAlertBlock";

export interface MarkdownArticleRendererProps {
  content: string;
  onHeadingsExtracted?: (headings: Array<{ id: string; text: string; level: number }>) => void;
}

export const MarkdownArticleRenderer: React.FC<MarkdownArticleRendererProps> = ({
  content,
  onHeadingsExtracted,
}) => {
  const { renderedElements, headings } = React.useMemo(() => {
    const lines = content.split("\n");
    const extractedHeadings: Array<{ id: string; text: string; level: number }> = [];
    const elements: React.ReactNode[] = [];

    let inCodeBlock = false;
    let codeLanguage = "";
    let codeBuffer: string[] = [];

    let inBlockquote = false;
    let quoteBuffer: string[] = [];

    const flushBlockquote = (key: string) => {
      if (quoteBuffer.length === 0) return;
      const rawText = quoteBuffer.join("\n").trim();
      quoteBuffer = [];
      elements.push(<MarkdownAlertBlock key={key} rawText={rawText} />);
    };

    lines.forEach((line, lineIdx) => {
      if (line.trim().startsWith("```")) {
        if (!inCodeBlock) {
          flushBlockquote(`quote-before-code-${lineIdx}`);
          inCodeBlock = true;
          codeLanguage = line.trim().slice(3).trim() || "bash";
          codeBuffer = [];
        } else {
          const codeString = codeBuffer.join("\n");
          elements.push(
            <MarkdownCodeBlock
              key={`code-${lineIdx}`}
              code={codeString}
              language={codeLanguage}
            />
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

      if (line.trim().startsWith(">")) {
        inBlockquote = true;
        quoteBuffer.push(line.trim().slice(1).trim());
        return;
      } else if (inBlockquote) {
        flushBlockquote(`quote-${lineIdx}`);
        inBlockquote = false;
      }

      if (line.startsWith("### ")) {
        const text = line.replace("### ", "").trim();
        const id = `heading-${extractedHeadings.length}-${text.toLowerCase().replace(/[^\w\u0621-\u064A]+/g, "-")}`;
        extractedHeadings.push({ id, text, level: 3 });
        elements.push(
          <h3
            key={`h3-${lineIdx}`}
            id={id}
            className="text-lg sm:text-xl font-bold text-text-primary pt-6 pb-2 scroll-mt-24 border-b border-line/40 flex items-center gap-2 group text-start"
          >
            <span className="text-secondary font-mono text-xs select-none">###</span>
            <span>{text}</span>
          </h3>
        );
        return;
      }

      if (line.startsWith("## ")) {
        const text = line.replace("## ", "").trim();
        const id = `heading-${extractedHeadings.length}-${text.toLowerCase().replace(/[^\w\u0621-\u064A]+/g, "-")}`;
        extractedHeadings.push({ id, text, level: 2 });
        elements.push(
          <h2
            key={`h2-${lineIdx}`}
            id={id}
            className="text-xl sm:text-2xl font-black text-text-primary pt-8 pb-3 scroll-mt-24 border-b border-line flex items-center gap-2.5 group text-start"
          >
            <span className="text-secondary font-mono text-sm select-none">##</span>
            <span>{text}</span>
          </h2>
        );
        return;
      }

      if (line.startsWith("# ")) {
        const text = line.replace("# ", "").trim();
        const id = `heading-${extractedHeadings.length}-${text.toLowerCase().replace(/[^\w\u0621-\u064A]+/g, "-")}`;
        extractedHeadings.push({ id, text, level: 1 });
        elements.push(
          <h1
            key={`h1-${lineIdx}`}
            id={id}
            className="text-2xl sm:text-3xl font-black text-text-primary pt-6 pb-2 scroll-mt-24 text-start"
          >
            {text}
          </h1>
        );
        return;
      }

      if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
        const itemText = line.trim().slice(2);
        elements.push(
          <li
            key={`li-${lineIdx}`}
            className="ms-6 list-disc text-xs sm:text-sm text-text-muted leading-relaxed my-1 text-start"
          >
            {itemText}
          </li>
        );
        return;
      }

      if (!line.trim()) {
        return;
      }

      elements.push(
        <p
          key={`p-${lineIdx}`}
          className="text-xs sm:text-sm text-text-muted leading-relaxed my-3 text-start"
        >
          {line}
        </p>
      );
    });

    if (inBlockquote) {
      flushBlockquote("quote-end");
    }

    return { renderedElements: elements, headings: extractedHeadings };
  }, [content]);

  React.useEffect(() => {
    if (onHeadingsExtracted) {
      onHeadingsExtracted(headings);
    }
  }, [headings, onHeadingsExtracted]);

  return <div className="space-y-1">{renderedElements}</div>;
};
