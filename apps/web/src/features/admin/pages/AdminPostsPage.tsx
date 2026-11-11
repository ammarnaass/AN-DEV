import React, { useState, useMemo } from "react";
import { Post } from "@andev/shared";
import {
  BookOpen,
  Plus,
  Search,
  Eye,
  CheckCircle2,
  FileEdit,
  Star,
  Layers
} from "lucide-react";
import { useAdminPosts } from "../hooks/useAdminPosts";
import { PostListTable } from "../components/PostListTable";
import { PostEditModal } from "../components/PostEditModal";
import { ConfirmDeleteModal } from "../components/ConfirmDeleteModal";

export const AdminPostsPage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [deletingPost, setDeletingPost] = useState<Post | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Filters
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const {
    posts,
    isLoading,
    refetch,
    deletePost,
    togglePublish,
    toggleFeatured,
  } = useAdminPosts();

  // Metrics computation
  const stats = useMemo(() => {
    const total = posts.length;
    const published = posts.filter((p) => p.published).length;
    const drafts = total - published;
    const featured = posts.filter((p) => p.featured).length;
    const totalViews = posts.reduce((sum, p) => sum + (p.views_count || 0), 0);
    return { total, published, drafts, featured, totalViews };
  }, [posts]);

  // Client-side filtering
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      // Status filter
      if (statusFilter === "published" && !post.published) return false;
      if (statusFilter === "draft" && post.published) return false;
      if (statusFilter === "featured" && !post.featured) return false;

      // Category filter
      if (categoryFilter !== "all" && post.category !== categoryFilter) return false;

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle =
          post.title_ar.toLowerCase().includes(query) ||
          post.title_en.toLowerCase().includes(query);
        const matchesSlug = post.slug.toLowerCase().includes(query);
        const matchesTags =
          Array.isArray(post.tags) &&
          post.tags.some((t) => t.toLowerCase().includes(query));
        const matchesCategory = (post.category || "").toLowerCase().includes(query);
        if (!matchesTitle && !matchesSlug && !matchesTags && !matchesCategory) {
          return false;
        }
      }

      return true;
    });
  }, [posts, statusFilter, categoryFilter, searchQuery]);

  const handleCreate = () => {
    setEditingPost(null);
    setModalOpen(true);
  };

  const handleEdit = (p: Post) => {
    setEditingPost(p);
    setModalOpen(true);
  };

  const handleDeleteClick = (p: Post) => {
    setDeletingPost(p);
  };

  const handleConfirmDelete = async () => {
    if (!deletingPost?.id) return;
    try {
      setIsDeleting(true);
      await deletePost(deletingPost.id);
      setDeletingPost(null);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSaved = () => {
    setModalOpen(false);
    setEditingPost(null);
    refetch();
  };

  return (
    <div className="space-y-6 text-start max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-line">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container border border-line text-secondary text-xs font-mono">
            <BookOpen className="w-3.5 h-3.5" />
            <span>TECH_JOURNAL // CONTENT_STUDIO</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
            إدارة المدونة الهندسية والتقنية
          </h1>
          <p className="text-text-muted text-xs sm:text-sm">
            نشر المقالات المعمارية، تحليلات الأداء، إدارة وسوم التقنيات والتحكم في إعدادات محركات البحث.
          </p>
        </div>

        <button
          onClick={handleCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary-container text-white text-xs sm:text-sm font-semibold hover:bg-primary/90 transition-all shadow-[0_0_16px_rgba(13,110,253,0.35)] active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" />
          <span>مقال تقني جديد</span>
        </button>
      </div>

      {/* Metric Cards Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
        <div className="p-4 rounded-xl bg-surface border border-line space-y-1">
          <span className="text-[11px] font-mono text-text-muted flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-secondary" />
            <span>إجمالي المقالات</span>
          </span>
          <div className="text-2xl font-black text-text-primary">{stats.total}</div>
        </div>

        <div className="p-4 rounded-xl bg-surface border border-line space-y-1">
          <span className="text-[11px] font-mono text-text-muted flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-status-ok" />
            <span>المقالات المنشورة</span>
          </span>
          <div className="text-2xl font-black text-status-ok">{stats.published}</div>
        </div>

        <div className="p-4 rounded-xl bg-surface border border-line space-y-1">
          <span className="text-[11px] font-mono text-text-muted flex items-center gap-1.5">
            <FileEdit className="w-3.5 h-3.5 text-text-muted" />
            <span>المسودات</span>
          </span>
          <div className="text-2xl font-black text-text-muted">{stats.drafts}</div>
        </div>

        <div className="p-4 rounded-xl bg-surface border border-line space-y-1">
          <span className="text-[11px] font-mono text-text-muted flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 text-warn fill-warn" />
            <span>مقالات مميزة</span>
          </span>
          <div className="text-2xl font-black text-warn">{stats.featured}</div>
        </div>

        <div className="p-4 rounded-xl bg-surface border border-line space-y-1 col-span-2 sm:col-span-1">
          <span className="text-[11px] font-mono text-text-muted flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-secondary" />
            <span>إجمالي المشاهدات</span>
          </span>
          <div className="text-2xl font-black text-secondary font-mono">
            {stats.totalViews.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Filters & Search Bar */}
      <div className="p-4 rounded-xl bg-surface border border-line space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Status Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: "all", label: "الكل", count: stats.total },
              { id: "published", label: "المنشورة", count: stats.published },
              { id: "draft", label: "المسودات", count: stats.drafts },
              { id: "featured", label: "المميزة", count: stats.featured },
            ].map((st) => (
              <button
                key={st.id}
                onClick={() => setStatusFilter(st.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  statusFilter === st.id
                    ? "bg-primary-container text-white shadow-sm"
                    : "bg-surface-container border border-line text-text-muted hover:text-text-primary"
                }`}
              >
                <span>{st.label}</span>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-background/50">
                  {st.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative flex-1 sm:max-w-xs">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="بحث بالعنوان، الرابط، أو الوسم..."
              className="w-full px-3.5 py-1.5 pr-8 rounded-lg bg-surface-container border border-line text-xs text-text-primary outline-none focus:border-secondary transition-all"
            />
            <Search className="w-3.5 h-3.5 text-text-muted absolute right-2.5 top-2.5" />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-line">
          <span className="text-[11px] font-mono text-text-muted ml-2">التصنيف:</span>
          {[
            { id: "all", label: "جميع التصنيفات" },
            { id: "architecture", label: "معمارية الأنظمة" },
            { id: "performance", label: "قواعد البيانات والأداء" },
            { id: "security", label: "الأمان والامتثال" },
            { id: "pos_erp", label: "نقاط البيع والمؤسسات" },
            { id: "ai_llm", label: "الذكاء الاصطناعي" },
            { id: "frontend", label: "هندسة الواجهات" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-all ${
                categoryFilter === cat.id
                  ? "bg-secondary text-background font-bold"
                  : "bg-surface-container text-text-muted hover:text-text-primary"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Post List Table */}
      <PostListTable
        posts={filteredPosts}
        isLoading={isLoading}
        onEditPost={handleEdit}
        onDeletePost={handleDeleteClick}
        onTogglePublish={togglePublish}
        onToggleFeatured={toggleFeatured}
      />

      {/* Edit / Create Modal */}
      {modalOpen && (
        <PostEditModal
          post={editingPost}
          onClose={() => {
            setModalOpen(false);
            setEditingPost(null);
          }}
          onSaved={handleSaved}
        />
      )}

      {/* Confirm Delete Modal */}
      {deletingPost && (
        <ConfirmDeleteModal
          isOpen={true}
          title={`حذف المقال: "${deletingPost.title_ar}"`}
          message={`هل أنت متأكد من رغبتك في حذف هذا المقال نهائياً من قاعدة البيانات؟\nلن يمكن استعادة المقال بعد الحذف وسيتوقف رابطه العام (/blog/${deletingPost.slug}) عن العمل.`}
          onClose={() => setDeletingPost(null)}
          onConfirm={handleConfirmDelete}
          isDeleting={isDeleting}
        />
      )}
    </div>
  );
};
