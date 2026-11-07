import React from "react";

export const TechChip: React.FC<{ label: string; className?: string }> = ({ label, className = "" }) => {
  return (
    <span
      dir="ltr"
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-surface border border-line text-mute hover:text-accent hover:border-accent/40 transition-colors select-none ${className}`}
    >
      {label}
    </span>
  );
};

