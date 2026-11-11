import React from "react";
import { useI18n } from "../../../../lib/i18n";

export interface PostTagsChipsProps {
  tags: string[];
}

export const PostTagsChips: React.FC<PostTagsChipsProps> = ({ tags }) => {
  const { locale } = useI18n();

  if (tags.length === 0) return null;

  return (
    <div className="pt-8 mt-8 border-t border-line space-y-2 text-start">
      <span className="text-xs font-mono text-text-muted block">
        {locale === "ar"
          ? "التقنيات والمفاهيم المعمارية المشروحة:"
          : "Referenced Technologies & Concepts:"}
      </span>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 rounded-lg bg-surface-container border border-line text-secondary text-xs font-mono"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};

