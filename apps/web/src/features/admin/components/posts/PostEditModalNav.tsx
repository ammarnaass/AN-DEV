import React from "react";
import { Globe, Image as ImageIcon, Search } from "lucide-react";

export type TabType = "arabic" | "english" | "media" | "seo";

interface PostEditModalNavProps {
  activeTab: TabType;
  hasTitleAr: boolean;
  hasTitleEn: boolean;
  tagsCount: number;
  published: boolean;
  onSelectTab: (tab: TabType) => void;
}

export const PostEditModalNav: React.FC<PostEditModalNavProps> = ({
  activeTab,
  hasTitleAr,
  hasTitleEn,
  tagsCount,
  published,
  onSelectTab,
}) => {
  return (
    <div className="flex border-b border-line bg-surface px-4 sm:px-8 overflow-x-auto gap-2">
      <button
        type="button"
        onClick={() => onSelectTab("arabic")}
        className={`py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
          activeTab === "arabic"
            ? "border-secondary text-secondary"
            : "border-transparent text-text-muted hover:text-text-primary"
        }`}
      >
        <Globe className="w-4 h-4" />
        <span>المحتوى العربي (RTL)</span>
        {hasTitleAr && <span className="w-1.5 h-1.5 rounded-full bg-status-ok" />}
      </button>

      <button
        type="button"
        onClick={() => onSelectTab("english")}
        className={`py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
          activeTab === "english"
            ? "border-secondary text-secondary"
            : "border-transparent text-text-muted hover:text-text-primary"
        }`}
      >
        <Globe className="w-4 h-4" />
        <span>English Content (LTR)</span>
        {hasTitleEn && <span className="w-1.5 h-1.5 rounded-full bg-status-ok" />}
      </button>

      <button
        type="button"
        onClick={() => onSelectTab("media")}
        className={`py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
          activeTab === "media"
            ? "border-secondary text-secondary"
            : "border-transparent text-text-muted hover:text-text-primary"
        }`}
      >
        <ImageIcon className="w-4 h-4" />
        <span>الوسائط والتصنيف</span>
        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-surface-container text-text-muted">
          {tagsCount} وسوم
        </span>
      </button>

      <button
        type="button"
        onClick={() => onSelectTab("seo")}
        className={`py-3 px-4 text-xs sm:text-sm font-semibold border-b-2 flex items-center gap-2 transition-all whitespace-nowrap ${
          activeTab === "seo"
            ? "border-secondary text-secondary"
            : "border-transparent text-text-muted hover:text-text-primary"
        }`}
      >
        <Search className="w-4 h-4" />
        <span>السيو وحالة النشر</span>
        {published ? (
          <span className="px-1.5 py-0.5 rounded text-[10px] bg-status-ok/15 text-status-ok font-mono">
            منشور
          </span>
        ) : (
          <span className="px-1.5 py-0.5 rounded text-[10px] bg-surface-container text-text-muted font-mono">
            مسودة
          </span>
        )}
      </button>
    </div>
  );
};

