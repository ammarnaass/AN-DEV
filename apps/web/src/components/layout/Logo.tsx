import React from "react";

interface LogoProps {
  className?: string;
  size?: number;
  iconOnly?: boolean;
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = "",
  size = 38,
  iconOnly = false,
  showTagline = true
}) => {
  return (
    <div
      dir="ltr"
      className={`inline-flex items-center gap-3 select-none text-start ${className}`}
    >
      {/* Official Squircle Brand Icon */}
      <div
        style={{ width: size, height: size }}
        className="relative flex-shrink-0 rounded-xl overflow-hidden shadow-glow border border-line bg-surface flex items-center justify-center transition-transform duration-200 hover:scale-105"
      >
        <img
          src="/brand/logo-squircle.webp"
          alt="AN DEV Monogram"
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback to SVG if webp is not loaded
            (e.target as HTMLImageElement).src = "/logo.svg";
          }}
        />
      </div>

      {/* Typography Lockup: AN DEV & Tagline */}
      {!iconOnly && (
        <div className="flex flex-col text-left leading-none">
          <div className="flex items-center gap-1.5 font-sans font-black tracking-tight">
            <span className="text-ink text-xl sm:text-2xl font-black">AN</span>
            <span className="text-accent text-xl sm:text-2xl font-black">DEV</span>
          </div>
          {showTagline && (
            <div className="flex items-center gap-1 text-[9px] sm:text-[10px] text-mute uppercase tracking-[0.2em] font-sans font-semibold pt-1">
              <span>CODE</span>
              <span className="text-accent font-bold">•</span>
              <span>CREATE</span>
              <span className="text-accent font-bold">•</span>
              <span>SOLVE</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
