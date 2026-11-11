import React from "react";
import { Upload } from "lucide-react";

export interface ProjectCoverUploaderProps {
  coverImage: string;
  isUploading: boolean;
  onCoverChange: (val: string) => void;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ProjectCoverUploader: React.FC<ProjectCoverUploaderProps> = ({
  coverImage,
  isUploading,
  onCoverChange,
  onFileUpload,
}) => {
  return (
    <div className="space-y-3 p-4 rounded-xl border border-line bg-surface-container/30 text-start">
      <div className="flex items-center justify-between">
        <label className="text-xs font-mono text-mute font-semibold">
          صورة الغلاف الرئيسية (Cover Image)
        </label>
        {coverImage && coverImage !== "/uploads/projects/default.webp" && (
          <button
            type="button"
            onClick={() => onCoverChange("/uploads/projects/default.webp")}
            className="text-[11px] text-accent hover:underline"
          >
            استعادة الصورة الافتراضية
          </button>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {coverImage && (
          <div className="w-24 h-16 rounded-lg overflow-hidden border border-line bg-surface flex-shrink-0 relative group shadow-sm">
            <img
              src={coverImage}
              alt="Cover preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "/uploads/projects/default.webp";
              }}
            />
          </div>
        )}

        <div className="flex-1 w-full space-y-2">
          <div className="flex items-center gap-3">
            <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-1.5 rounded border border-line bg-surface hover:border-accent text-xs font-semibold transition-colors">
              <Upload className="w-4 h-4 text-accent" />
              <span>{isUploading ? "جاري الرفع..." : "اختر صورة الغلاف"}</span>
              <input
                type="file"
                accept="image/*"
                onChange={onFileUpload}
                className="hidden"
              />
            </label>
            <span className="text-[11px] text-mute font-mono truncate flex-1">
              {coverImage}
            </span>
          </div>

          <input
            type="text"
            value={coverImage}
            onChange={e => onCoverChange(e.target.value)}
            placeholder="/uploads/... أو رابط صورة خارجي"
            className="w-full h-8 px-2.5 rounded border border-line bg-bg/50 text-xs font-mono"
          />
        </div>
      </div>
    </div>
  );
};

