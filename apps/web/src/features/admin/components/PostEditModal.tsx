import React, { useState, useEffect } from "react";
import { Post } from "@andev/shared";
import { Button } from "../../../components/ui/Button";
import { X, Clock } from "lucide-react";
import {
  PostArabicTab,
  PostEnglishTab,
  PostMediaTab,
  PostSeoTab,
  PostEditModalHeader,
  PostEditModalNav,
  usePostEditorForm,
  type TabType
} from "./posts";

interface PostEditModalProps {
  post?: Post | null;
  onClose: () => void;
  onSaved: () => void;
}

export const PostEditModal: React.FC<PostEditModalProps> = ({
  post,
  onClose,
  onSaved,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>("arabic");

  const {
    form,
    setForm,
    isUploading,
    isSaving,
    error,
    setError,
    handleFileUpload,
    handleAddTag,
    handleRemoveTag,
    handleSave,
  } = usePostEditorForm(post, onSaved);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-background/80 backdrop-blur-md animate-fade-in text-start overflow-y-auto">
      <div className="w-full max-w-5xl my-auto rounded-2xl border border-line bg-surface shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        {/* Modal Header */}
        <PostEditModalHeader
          isEditing={Boolean(post)}
          titleAr={post?.title_ar}
          onClose={onClose}
        />

        {/* Tab Navigation */}
        <PostEditModalNav
          activeTab={activeTab}
          hasTitleAr={Boolean(form.title_ar)}
          hasTitleEn={Boolean(form.title_en)}
          tagsCount={form.tags.length}
          published={form.published}
          onSelectTab={setActiveTab}
        />

        {/* Modal Form Body */}
        <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6">
          {error && (
            <div className="p-4 rounded-xl bg-err/10 border border-err/30 text-err text-xs sm:text-sm font-medium flex items-center gap-2">
              <X className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* TAB 1: Arabic Content */}
          {activeTab === "arabic" && (
            <PostArabicTab
              title={form.title_ar}
              summary={form.summary_ar}
              bodyMd={form.body_md_ar}
              onChangeTitle={(title_ar) => setForm({ ...form, title_ar })}
              onChangeSummary={(summary_ar) => setForm({ ...form, summary_ar })}
              onChangeBodyMd={(body_md_ar) => setForm({ ...form, body_md_ar })}
            />
          )}

          {/* TAB 2: English Content */}
          {activeTab === "english" && (
            <PostEnglishTab
              title={form.title_en}
              summary={form.summary_en}
              bodyMd={form.body_md_en}
              onChangeTitle={(title_en) => setForm({ ...form, title_en })}
              onChangeSummary={(summary_en) => setForm({ ...form, summary_en })}
              onChangeBodyMd={(body_md_en) => setForm({ ...form, body_md_en })}
            />
          )}

          {/* TAB 3: Media & Tech Attributes */}
          {activeTab === "media" && (
            <PostMediaTab
              coverImage={form.cover_image}
              category={form.category}
              tags={form.tags}
              readingTimeMinutes={form.reading_time_minutes}
              authorName={form.author_name}
              authorRole={form.author_role}
              authorAvatar={form.author_avatar}
              bodyMdAr={form.body_md_ar}
              bodyMdEn={form.body_md_en}
              isUploading={isUploading}
              onFileUpload={handleFileUpload}
              onChangeCoverImage={(cover_image) => setForm({ ...form, cover_image })}
              onChangeCategory={(category) => setForm({ ...form, category })}
              onAddTag={handleAddTag}
              onRemoveTag={handleRemoveTag}
              onChangeReadingTime={(reading_time_minutes) =>
                setForm({ ...form, reading_time_minutes })
              }
              onChangeAuthorName={(author_name) => setForm({ ...form, author_name })}
              onChangeAuthorRole={(author_role) => setForm({ ...form, author_role })}
              onChangeAuthorAvatar={(author_avatar) => setForm({ ...form, author_avatar })}
            />
          )}

          {/* TAB 4: SEO & Publishing */}
          {activeTab === "seo" && (
            <PostSeoTab
              slug={form.slug}
              titleAr={form.title_ar}
              titleEn={form.title_en}
              summaryAr={form.summary_ar}
              summaryEn={form.summary_en}
              published={form.published}
              featured={form.featured}
              seoTitleAr={form.seo_title_ar}
              seoTitleEn={form.seo_title_en}
              seoDescAr={form.seo_desc_ar}
              seoDescEn={form.seo_desc_en}
              onChangeSlug={(slug) => setForm({ ...form, slug })}
              onChangePublished={(published) => setForm({ ...form, published })}
              onChangeFeatured={(featured) => setForm({ ...form, featured })}
              onChangeSeoTitleAr={(seo_title_ar) => setForm({ ...form, seo_title_ar })}
              onChangeSeoTitleEn={(seo_title_en) => setForm({ ...form, seo_title_en })}
              onChangeSeoDescAr={(seo_desc_ar) => setForm({ ...form, seo_desc_ar })}
              onChangeSeoDescEn={(seo_desc_en) => setForm({ ...form, seo_desc_en })}
              onError={(msg) => setError(msg)}
            />
          )}

          {/* Modal Footer Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-line">
            <div className="flex items-center gap-2 text-xs font-mono text-text-muted">
              <Clock className="w-3.5 h-3.5 text-secondary" />
              <span>{form.reading_time_minutes} دقيقة قراءة</span>
              <span>•</span>
              <span>{form.tags.length} وسوم تقنية</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-surface-container border border-line text-xs font-semibold text-text-muted hover:text-text-primary transition-all"
              >
                إلغاء
              </button>
              <Button type="submit" variant="primary" isLoading={isSaving}>
                {post ? "حفظ التعديلات" : "نشر المقال التقني"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
