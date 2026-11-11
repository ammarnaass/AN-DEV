import React from "react";
import { useI18n } from "../../../../lib/i18n";
import { ListTree } from "lucide-react";

export interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

export interface PostTableOfContentsProps {
  headings: HeadingItem[];
}

export const PostTableOfContents: React.FC<PostTableOfContentsProps> = ({
  headings,
}) => {
  const { locale } = useI18n();

  if (headings.length === 0) return null;

  return (
    <div className="p-5 rounded-2xl bg-surface border border-line space-y-3 shadow-sm text-start">
      <div className="flex items-center gap-2 text-xs font-mono text-secondary font-bold pb-2 border-b border-line">
        <ListTree className="w-4 h-4" />
        <span>{locale === "ar" ? "فهرس المحتوى (TOC)" : "TABLE OF CONTENTS"}</span>
      </div>
      <nav className="space-y-1.5 max-h-[360px] overflow-y-auto pr-1">
        {headings.map((h) => (
          <a
            key={h.id}
            href={`#${h.id}`}
            onClick={(e) => {
              e.preventDefault();
              const el = document.getElementById(h.id);
              if (el) {
                el.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className={`block text-xs py-1 transition-colors hover:text-secondary ${
              h.level === 3
                ? "ps-4 text-text-muted text-[11px]"
                : "font-semibold text-text-primary"
            }`}
          >
            {h.text}
          </a>
        ))}
      </nav>
    </div>
  );
};

