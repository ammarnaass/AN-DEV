import React from "react";

interface LogoProps {
  className?: string;
  size?: number;
  iconOnly?: boolean;
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = "",
  size = 36,
  iconOnly = false,
  showTagline = true
}) => {
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Exact Vector AN DEV Mark with Speed Lines, Fold, and Code Badge */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 320 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0 transition-transform duration-200 hover:scale-105"
      >
        <defs>
          {/* Main Brand Gradient (Royal Blue to Electric Cyan) */}
          <linearGradient id="logoGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0D6EFD" />
            <stop offset="60%" stopColor="#0099FF" />
            <stop offset="100%" stopColor="#00C3FF" />
          </linearGradient>

          {/* 3D Fold Ribbon Gradient */}
          <linearGradient id="logoFold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0047BA" />
            <stop offset="100%" stopColor="#002B73" />
          </linearGradient>
        </defs>

        {/* Speed Data Traces (Motion lines & dots on left) */}
        <g fill="url(#logoGrad)">
          {/* Top circle */}
          <circle cx="28" cy="46" r="4.5" />
          {/* Bar 1 */}
          <rect x="36" y="42" width="34" height="8" rx="4" />
          {/* Bar 2 */}
          <rect x="6" y="66" width="60" height="9" rx="4.5" />
          {/* Bar 3 / Crossbar extension */}
          <rect x="0" y="90" width="70" height="10" rx="5" />
          {/* Bottom dot */}
          <circle cx="16" cy="116" r="5" />
        </g>

        {/* Monogram A + N Shape */}
        <g>
          {/* Left angled stem of A */}
          <path
            d="M65 116 L108 14 L140 14 L94 116 Z"
            fill="url(#logoGrad)"
          />

          {/* Crossbar of A */}
          <rect x="52" y="90" width="88" height="10" rx="2" fill="url(#logoGrad)" />

          {/* 3D Fold on the apex of A */}
          <path
            d="M108 14 L140 14 L190 108 L166 108 Z"
            fill="url(#logoFold)"
            opacity="0.9"
          />

          {/* Diagonal stem of N */}
          <path
            d="M132 14 L202 134 L232 134 L164 14 Z"
            fill="url(#logoGrad)"
          />

          {/* Right vertical stem of N */}
          <rect
            x="236"
            y="14"
            width="32"
            height="120"
            rx="3"
            fill="url(#logoGrad)"
          />

          {/* Inset Code Badge: Dark Shield with white </> */}
          <g transform="translate(186, 68)">
            <polygon
              points="10,0 48,0 64,26 56,66 16,66 0,30"
              fill="#101524"
              stroke="#1E293B"
              strokeWidth="2"
            />
            {/* < */}
            <path
              d="M19 33 L12 39 L19 45"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* / */}
            <path
              d="M28 29 L23 49"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            {/* > */}
            <path
              d="M32 33 L39 39 L32 45"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </g>
      </svg>

      {/* Typography: AN DEV & Tagline */}
      {!iconOnly && (
        <div className="flex flex-col text-start">
          <div className="flex items-center gap-1.5 font-sans font-black tracking-tight leading-none">
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
