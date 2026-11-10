import React from "react";

export interface DeviceFrameProps {
  frame: "mobile" | "browser" | "desktop";
  children: React.ReactNode;
  caption?: string;
  className?: string;
  onClick?: () => void;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({
  frame,
  children,
  caption,
  className = "",
  onClick
}) => {
  if (frame === "mobile") {
    return (
      <div
        data-testid="device-frame-mobile"
        onClick={onClick}
        className={`group relative flex flex-col items-center cursor-pointer select-none transition-all duration-300 hover:-translate-y-1 ${className}`}
      >
        {/* Smartphone Shell */}
        <div className="w-full max-w-[280px] sm:max-w-[320px] rounded-[36px] border-[5px] border-line bg-surface-container overflow-hidden shadow-card group-hover:border-secondary/60 group-hover:shadow-[0_0_20px_rgba(0,195,255,0.2)]">
          {/* Top Speaker / Dynamic Island */}
          <div className="w-full pt-2 pb-1 bg-surface flex justify-center items-center shrink-0">
            <div className="w-20 h-3.5 rounded-full bg-black/70 flex items-center justify-end px-2">
              <span className="w-1.5 h-1.5 rounded-full bg-surface-container" />
            </div>
          </div>

          {/* Screen Content */}
          <div className="w-full aspect-[9/19] overflow-hidden bg-background relative">
            {children}
          </div>

          {/* Bottom Bar Indicator */}
          <div className="w-full py-1.5 bg-surface flex justify-center">
            <div className="w-24 h-1 rounded-full bg-line" />
          </div>
        </div>

        {caption && (
          <p className="mt-2.5 text-xs font-mono text-text-muted text-center max-w-[280px] line-clamp-2">
            {caption}
          </p>
        )}
      </div>
    );
  }

  if (frame === "desktop") {
    return (
      <div
        data-testid="device-frame-desktop"
        onClick={onClick}
        className={`group relative flex flex-col items-center cursor-pointer select-none transition-all duration-300 hover:-translate-y-1 ${className}`}
      >
        {/* Workstation Display Frame */}
        <div className="w-full rounded-xl border-[4px] border-line bg-surface-container overflow-hidden shadow-card group-hover:border-secondary/60 group-hover:shadow-[0_0_20px_rgba(0,195,255,0.2)]">
          {/* Top Bezel */}
          <div className="w-full h-3 bg-surface flex justify-center items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-black/60" />
          </div>

          {/* Screen */}
          <div className="w-full aspect-[16/10] overflow-hidden bg-background relative">
            {children}
          </div>
        </div>

        {/* Display Stand */}
        <div className="w-12 h-3 bg-line -mt-0.5 rounded-b-sm" />
        <div className="w-24 h-1.5 bg-line/80 rounded-full" />

        {caption && (
          <p className="mt-2 text-xs font-mono text-text-muted text-center max-w-sm line-clamp-2">
            {caption}
          </p>
        )}
      </div>
    );
  }

  // Default: Browser Window Shell
  return (
    <div
      data-testid="device-frame-browser"
      onClick={onClick}
      className={`group relative flex flex-col cursor-pointer select-none transition-all duration-300 hover:-translate-y-1 ${className}`}
    >
      <div className="w-full rounded-xl border border-line bg-surface-container overflow-hidden shadow-card group-hover:border-secondary/60 group-hover:shadow-[0_0_20px_rgba(0,195,255,0.2)]">
        {/* Browser Top Chrome */}
        <div className="w-full px-3 py-2 bg-surface border-b border-line flex items-center justify-between shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
          </div>
          <div className="px-3 py-0.5 rounded bg-surface-container border border-line text-[10px] font-mono text-text-muted truncate max-w-xs">
            https://andev.dz/app/showcase
          </div>
          <div className="w-6" />
        </div>

        {/* Screen Content */}
        <div className="w-full aspect-[16/10] overflow-hidden bg-background relative">
          {children}
        </div>
      </div>

      {caption && (
        <p className="mt-2 text-xs font-mono text-text-muted text-start line-clamp-2">
          {caption}
        </p>
      )}
    </div>
  );
};

