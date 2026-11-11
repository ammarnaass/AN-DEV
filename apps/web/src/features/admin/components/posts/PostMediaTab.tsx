import React from "react";
import { PostCategory } from "@andev/shared";
import {
  Upload,
  Image as ImageIcon,
  Sparkles,
  Clock,
  User
} from "lucide-react";
import { CATEGORIES } from "./postEditor.constants";
import { calculateReadingTime } from "./postEditor.utils";
import { PostTagsManager } from "./PostTagsManager";

interface PostMediaTabProps {
  coverImage: string;
  category: PostCategory;
  tags: string[];
  readingTimeMinutes: number;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  bodyMdAr: string;
  bodyMdEn: string;
  isUploading: boolean;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeCoverImage: (val: string) => void;
  onChangeCategory: (val: PostCategory) => void;
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
  onChangeReadingTime: (val: number) => void;
  onChangeAuthorName: (val: string) => void;
  onChangeAuthorRole: (val: string) => void;
  onChangeAuthorAvatar: (val: string) => void;
}

export const PostMediaTab: React.FC<PostMediaTabProps> = ({
  coverImage,
  category,
  tags,
  readingTimeMinutes,
  authorName,
  authorRole,
  authorAvatar,
  bodyMdAr,
  bodyMdEn,
  isUploading,
  onFileUpload,
  onChangeCoverImage,
  onChangeCategory,
  onAddTag,
  onRemoveTag,
  onChangeReadingTime,
  onChangeAuthorName,
  onChangeAuthorRole,
  onChangeAuthorAvatar,
}) => {
  const handleAutoReadingTime = () => {
    const combined = `${bodyMdAr} ${bodyMdEn}`;
    const calculated = calculateReadingTime(combined);
    onChangeReadingTime(calculated);
  };

  return (
    <div className="space-y-6">
      {/* Cover Image & Upload */}
      <div className="p-5 rounded-xl border border-line bg-surface-container/40 space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h4 className="text-sm font-bold text-text-primary flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-secondary" />
              <span>صورة الغلاف التقنية (Cover Image)</span>
            </h4>
            <p className="text-xs text-text-muted">
              يُفضل استخدام صور WebP خفيفة بنسبة أبعاد 16:9 لعرض المقال بشكل احترافي.
            </p>
          </div>

          <label className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-secondary/15 hover:bg-secondary/25 border border-secondary/30 text-secondary text-xs font-semibold cursor-pointer transition-all">
            <Upload className="w-3.5 h-3.5" />
            <span>{isUploading ? "جارٍ الرفع..." : "رفع صورة جديدة"}</span>
            <input
              type="file"
              accept="image/webp,image/png,image/jpeg"
              className="hidden"
              onChange={onFileUpload}
              disabled={isUploading}
            />
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
          <div className="sm:col-span-2 space-y-1.5">
            <label className="text-xs text-text-muted">رابط الصورة (URL أو مسار محلي)</label>
            <input
              type="text"
              value={coverImage}
              onChange={(e) => onChangeCoverImage(e.target.value)}
              placeholder="/uploads/blog/architecture-wal.webp"
              className="w-full px-3.5 py-2 rounded-lg bg-surface border border-line text-xs font-mono text-text-primary outline-none focus:border-secondary"
            />
          </div>

          {/* Thumbnail Preview */}
          <div className="relative h-24 rounded-lg border border-line overflow-hidden bg-background flex items-center justify-center">
            {coverImage ? (
              <img
                src={coverImage}
                alt="Cover preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
            ) : (
              <span className="text-[10px] text-text-muted font-mono">لا توجد صورة</span>
            )}
            <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-background/80 text-[9px] font-mono text-secondary border border-line">
              16:9
            </span>
          </div>
        </div>
      </div>

      {/* Category & Reading Time */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-text-primary">
            التصنيف الهندسي (Category) *
          </label>
          <select
            value={category}
            onChange={(e) => onChangeCategory(e.target.value as PostCategory)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container border border-line text-xs sm:text-sm text-text-primary outline-none focus:border-secondary"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label_ar}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-text-primary">
              وقت القراءة التقديري (بالدقائق)
            </label>
            <button
              type="button"
              onClick={handleAutoReadingTime}
              className="text-[11px] text-secondary hover:underline flex items-center gap-1 font-mono"
            >
              <Sparkles className="w-3 h-3" />
              <span>حساب تلقائي (~200 wpm)</span>
            </button>
          </div>
          <div className="relative">
            <input
              type="number"
              min={1}
              max={120}
              value={readingTimeMinutes}
              onChange={(e) =>
                onChangeReadingTime(parseInt(e.target.value) || 5)
              }
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container border border-line text-xs sm:text-sm text-text-primary outline-none focus:border-secondary"
            />
            <Clock className="w-4 h-4 text-text-muted absolute left-3 top-3" />
          </div>
        </div>
      </div>

      {/* Tags Chip Input Component */}
      <PostTagsManager
        tags={tags}
        onAddTag={onAddTag}
        onRemoveTag={onRemoveTag}
      />

      {/* Author Information */}
      <div className="p-4 rounded-xl border border-line bg-surface-container/30 space-y-3">
        <h4 className="text-xs font-bold text-text-primary flex items-center gap-2">
          <User className="w-3.5 h-3.5 text-secondary" />
          <span>بطاقة الكاتب / المهندس (Author Profile)</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="space-y-1">
            <label className="text-[11px] text-text-muted">اسم الكاتب</label>
            <input
              type="text"
              value={authorName}
              onChange={(e) => onChangeAuthorName(e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg bg-surface border border-line text-xs text-text-primary outline-none focus:border-secondary"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] text-text-muted">المسمى الوظيفي</label>
            <input
              type="text"
              value={authorRole}
              onChange={(e) => onChangeAuthorRole(e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg bg-surface border border-line text-xs text-text-primary outline-none focus:border-secondary"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] text-text-muted">صورة الكاتب (Avatar)</label>
            <input
              type="text"
              value={authorAvatar}
              onChange={(e) => onChangeAuthorAvatar(e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg bg-surface border border-line text-xs font-mono text-text-primary outline-none focus:border-secondary"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
