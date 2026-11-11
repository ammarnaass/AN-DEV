import React from "react";

interface BioProfileHeaderProps {
  title: string;
  bio: string;
  avatar: string;
  isDark?: boolean;
}

export const BioProfileHeader: React.FC<BioProfileHeaderProps> = ({
  title,
  bio,
  avatar,
  isDark = true,
}) => {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative group">
        {/* Outer Glow Halo with adaptive opacity */}
        <div
          className={`absolute -inset-1.5 bg-gradient-to-r from-primary via-secondary to-accent rounded-[32px] transition duration-500 animate-pulse ${
            isDark
              ? "opacity-40 blur-lg group-hover:opacity-75"
              : "opacity-25 blur-md group-hover:opacity-50"
          }`}
        />

        {/* Profile Avatar Container */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl overflow-hidden border-2 border-line bg-surface flex items-center justify-center shadow-xl transition-transform duration-300 group-hover:scale-105">
          <img
            src={avatar}
            alt={title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/brand/logo-squircle.webp";
            }}
          />
        </div>

        {/* Online Pulse Indicator */}
        <div
          className="absolute -bottom-1 -start-1 px-2 py-0.5 rounded-full bg-surface-container border border-line flex items-center gap-1.5 shadow-md"
          title="أنظمة الوكالة نشطة"
        >
          <span className="w-2 h-2 rounded-full bg-status-ok animate-pulse" />
          <span className="text-[10px] font-mono font-bold text-text-primary">
            نشط
          </span>
        </div>
      </div>

      {/* Title & Verification Lockup */}
      <div className="space-y-1.5 px-2 text-center">
        <h1 className="text-xl sm:text-2xl font-black text-text-primary tracking-tight flex items-center justify-center gap-1.5">
          <span>{title}</span>
          <span
            className="w-4 h-4 rounded-full bg-secondary text-white flex items-center justify-center text-[10px] font-bold shrink-0 shadow-sm"
            title="حساب رسمي موثق"
          >
            ✓
          </span>
        </h1>
        <p className="text-xs sm:text-sm text-text-muted leading-relaxed max-w-sm">
          {bio}
        </p>
      </div>
    </div>
  );
};
