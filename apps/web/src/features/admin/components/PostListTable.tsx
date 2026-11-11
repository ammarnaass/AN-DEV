import React from "react";
import { Post } from "@andev/shared";
import { FileText } from "lucide-react";
import { PostRowItem } from "./posts/PostRowItem";

export interface PostListTableProps {
  posts: Post[];
  isLoading: boolean;
  onEditPost: (post: Post) => void;
  onDeletePost: (post: Post) => void;
  onTogglePublish: (id: number) => void;
  onToggleFeatured: (id: number) => void;
}

export const PostListTable: React.FC<PostListTableProps> = ({
  posts,
  isLoading,
  onEditPost,
  onDeletePost,
  onTogglePublish,
  onToggleFeatured,
}) => {
  if (isLoading) {
    return (
      <div className="space-y-3 animate-pulse">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-20 rounded-xl bg-surface border border-line" />
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="py-16 text-center text-text-muted text-sm border border-line rounded-xl bg-surface/30 space-y-2">
        <FileText className="w-8 h-8 mx-auto text-text-muted/60" />
        <p>لا توجد مقالات تقنية تطابق الفلتر المحدد.</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-line bg-surface overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-start text-sm">
          <thead className="bg-surface-container border-b border-line text-xs font-mono text-text-muted">
            <tr>
              <th className="p-4 text-start">المقال والغلاف</th>
              <th className="p-4 text-start">التصنيف والوسوم</th>
              <th className="p-4 text-center">المشاهدات ووقت القراءة</th>
              <th className="p-4 text-center">حالة النشر والتمييز</th>
              <th className="p-4 text-center">إجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {posts.map(post => (
              <PostRowItem
                key={post.id}
                post={post}
                onEdit={onEditPost}
                onDelete={onDeletePost}
                onTogglePublish={onTogglePublish}
                onToggleFeatured={onToggleFeatured}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
