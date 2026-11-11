import React from "react";
import { Info, Lightbulb, AlertTriangle, AlertCircle } from "lucide-react";

export interface MarkdownAlertBlockProps {
  rawText: string;
}

export const MarkdownAlertBlock: React.FC<MarkdownAlertBlockProps> = ({
  rawText,
}) => {
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

    return (
      <div
        className={`p-4 rounded-xl border-l-4 rtl:border-l-0 rtl:border-r-4 ${borderColor} space-y-1.5 my-4 text-start`}
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
  }

  return (
    <blockquote className="p-4 rounded-xl border-l-4 rtl:border-l-0 rtl:border-r-4 border-secondary/50 bg-surface-container/40 text-text-muted italic text-xs sm:text-sm my-4 leading-relaxed text-start">
      {rawText}
    </blockquote>
  );
};

