import React, { useState, useMemo } from "react";
import { Post } from "@andev/shared";
import { useAdminPosts } from "../hooks/useAdminPosts";
import { PostListTable } from "../components/PostListTable";
import { PostEditModal } from "../components/PostEditModal";
import { ConfirmDeleteModal } from "../components/ConfirmDeleteModal";
import { AdminPostsHeader } from "../components/posts/AdminPostsHeader";
import { AdminPostsMetrics } from "../components/posts/AdminPostsMetrics";
import { AdminPostsFilters } from "../components/posts/AdminPostsFilters";

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
      if (statusFilter === "published" && !post.published) return false;
      if (statusFilter === "draft" && post.published) return false;
      if (statusFilter === "featured" && !post.featured) return false;

      if (categoryFilter !== "all" && post.category !== categoryFilter) return false;

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
      <AdminPostsHeader onCreate={handleCreate} />

      <AdminPostsMetrics stats={stats} />

      <AdminPostsFilters
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        stats={stats}
      />

      <PostListTable
        posts={filteredPosts}
        isLoading={isLoading}
        onEditPost={handleEdit}
        onDeletePost={setDeletingPost}
        onTogglePublish={togglePublish}
        onToggleFeatured={toggleFeatured}
      />

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

      {deletingPost && (
        <ConfirmDeleteModal
          isOpen={true}
          title="حذف المقال التقني"
          message={`هل أنت متأكد من حذف المقال "${deletingPost.title_ar}"؟ لا يمكن التراجع عن هذا الإجراء.`}
          onConfirm={handleConfirmDelete}
          onClose={() => setDeletingPost(null)}
          isDeleting={isDeleting}
        />
      )}
    </div>
  );
};
