import React, { useState } from "react";
import { X } from "lucide-react";
import { PRESET_TAGS } from "./postEditor.constants";

interface PostTagsManagerProps {
  tags: string[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
}

export const PostTagsManager: React.FC<PostTagsManagerProps> = ({
  tags,
  onAddTag,
  onRemoveTag,
}) => {
  const [tagInput, setTagInput] = useState("");

  const handleAdd = (tagToAdd?: string) => {
    const text = (tagToAdd || tagInput).trim();
    if (!text) return;
    onAddTag(text);
    setTagInput("");
  };

  return (
    <div className="space-y-2">
      <label className="text-xs font-bold text-text-primary">
        الوسوم والتقنيات (Tags & Technologies)
      </label>
      <div className="flex gap-2">
        <input
          type="text"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAdd();
            }
          }}
          placeholder="اكتب الوسم واضغط Enter (مثال: SQLite, Docker, React 19)"
          className="flex-1 px-3.5 py-2 rounded-lg bg-surface-container border border-line text-xs text-text-primary outline-none focus:border-secondary"
        />
        <button
          type="button"
          onClick={() => handleAdd()}
          className="px-4 py-2 rounded-lg bg-secondary/15 border border-secondary/30 text-secondary text-xs font-semibold hover:bg-secondary/25 transition-all"
        >
          إضافة وسم
        </button>
      </div>

      {/* Active Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-secondary/10 border border-secondary/25 text-secondary text-xs font-mono"
            >
              <span>#{tag}</span>
              <button
                type="button"
                onClick={() => onRemoveTag(tag)}
                className="hover:text-err transition-colors"
                aria-label={`Remove tag ${tag}`}
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Preset Suggestions */}
      <div className="pt-2">
        <span className="text-[10px] text-text-muted block mb-1 font-mono">
          وسوم مقترحة شائعة:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {PRESET_TAGS.map((pt) => (
            <button
              key={pt}
              type="button"
              onClick={() => handleAdd(pt)}
              disabled={tags.includes(pt)}
              className={`text-[10px] font-mono px-2 py-0.5 rounded border transition-all ${
                tags.includes(pt)
                  ? "bg-surface-container text-text-muted/50 border-line cursor-not-allowed"
                  : "bg-surface hover:bg-surface-container text-text-muted hover:text-text-primary border-line"
              }`}
            >
              + {pt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
