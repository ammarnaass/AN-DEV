import React from "react";

export const TechChip: React.FC<{ label: string; className?: string }> = ({ label, className = "" }) => {
  return (
    <span
      dir="ltr"
      className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-mono font-medium bg-surface-container border border-line text-text-primary hover:text-primary hover:border-primary/40 transition-colors select-none ${className}`}
    >
      {label}
    </span>
  );
};

