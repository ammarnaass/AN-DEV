import React from "react";
import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  Code,
  Quote,
  List
} from "lucide-react";

interface MarkdownToolbarProps {
  onInsert: (syntax: string) => void;
}

export const MarkdownToolbar: React.FC<MarkdownToolbarProps> = ({ onInsert }) => {
  return (
    <div className="flex flex-wrap items-center gap-1 p-2 bg-surface-container/60 border-b border-line text-text-muted">
      <button
        type="button"
        onClick={() => onInsert("## عنوان فرعي (H2)")}
        className="p-1.5 rounded hover:bg-surface hover:text-text-primary transition-colors"
        title="Heading 2"
      >
        <Heading2 className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={() => onInsert("### عنوان فرعي 3 (H3)")}
        className="p-1.5 rounded hover:bg-surface hover:text-text-primary transition-colors"
        title="Heading 3"
      >
        <Heading3 className="w-4 h-4" />
      </button>

      <span className="w-[1px] h-4 bg-line mx-1" />

      <button
        type="button"
        onClick={() => onInsert("**نص عريض**")}
        className="p-1.5 rounded hover:bg-surface hover:text-text-primary transition-colors"
        title="Bold"
      >
        <Bold className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={() => onInsert("*نص مائل*")}
        className="p-1.5 rounded hover:bg-surface hover:text-text-primary transition-colors"
        title="Italic"
      >
        <Italic className="w-4 h-4" />
      </button>

      <span className="w-[1px] h-4 bg-line mx-1" />

      <button
        type="button"
        onClick={() =>
          onInsert("```typescript\n// Example Code\nconst benchmark = 24.5;\n```")
        }
        className="p-1.5 rounded hover:bg-surface hover:text-text-primary transition-colors"
        title="Code Block"
      >
        <Code className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={() => onInsert("> اقتباس هندسي أو ملاحظة معمارية")}
        className="p-1.5 rounded hover:bg-surface hover:text-text-primary transition-colors"
        title="Blockquote"
      >
        <Quote className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={() => onInsert("- نقطة أولى\n- نقطة ثانية")}
        className="p-1.5 rounded hover:bg-surface hover:text-text-primary transition-colors"
        title="Bullet List"
      >
        <List className="w-4 h-4" />
      </button>
    </div>
  );
};

