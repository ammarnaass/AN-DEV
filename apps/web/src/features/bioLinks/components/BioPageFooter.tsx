import React from "react";
import { Link } from "react-router-dom";

export const BioPageFooter: React.FC = () => {
  return (
    <footer className="pt-8 pb-4 text-center select-none">
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface/60 backdrop-blur-md border border-line text-xs font-mono text-text-muted hover:text-text-primary transition-all shadow-sm hover:border-secondary/40"
      >
        <div className="w-4 h-4 rounded-md overflow-hidden bg-background">
          <img
            src="/brand/logo-squircle.webp"
            alt="AN DEV"
            className="w-full h-full object-cover"
          />
        </div>
        <span>
          طُوّر بواسطة <span className="text-secondary font-bold">AN DEV</span>
        </span>
      </Link>
    </footer>
  );
};
