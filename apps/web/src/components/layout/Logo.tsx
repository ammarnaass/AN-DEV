import React from "react";

export const Logo: React.FC<{ className?: string; size?: number }> = ({ className = "", size = 36 }) => {
  return (
    <div className={`inline-flex items-center gap-2 select-none ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        <rect width="48" height="48" rx="10" fill="#0B1430" stroke="#1A2850" strokeWidth="1.5" />
        {/* Terminal Brackets < / > */}
        <path
          d="M14 17L8 24L14 31"
          stroke="#0D6EFD"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M34 17L40 24L34 31"
          stroke="#00C3FF"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M27 15L21 33"
          stroke="#E6E6E6"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
      <div className="flex flex-col text-start">
        <span className="font-extrabold text-lg sm:text-xl tracking-tight text-ink flex items-center gap-1 font-sans">
          <span>AN</span>
          <span className="text-primary font-mono">DEV</span>
        </span>
        <span className="text-[10px] text-mute uppercase tracking-widest font-mono -mt-1 hidden sm:block">
          Code · Create · Solve
        </span>
      </div>
    </div>
  );
};
