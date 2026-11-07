import React from "react";

export const GlowingCodeBlock: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div
      dir="ltr"
      className={`relative rounded-card border border-primary/40 bg-[#0B1430] p-5 sm:p-6 shadow-glow font-mono text-xs sm:text-sm text-ink/90 overflow-hidden select-none ${className}`}
    >
      {/* Background Radial Glow */}
      <div className="absolute -top-20 -right-20 w-48 h-48 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-line/60">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#EF4444]/80" />
          <div className="w-3 h-3 rounded-full bg-[#F59E0B]/80" />
          <div className="w-3 h-3 rounded-full bg-[#10B981]/80" />
        </div>
        <div className="flex items-center gap-2 text-mute/80 text-xs tracking-wider">
          <span className="text-accent font-bold">&lt;/&gt;</span>
          <span>andev.engine.ts</span>
        </div>
        <span className="text-[10px] text-accent/80 font-mono border border-accent/30 px-2 py-0.5 rounded-full">
          v1.0
        </span>
      </div>

      {/* Code Content */}
      <div className="space-y-1.5 text-left font-mono">
        <div>
          <span className="text-accent">import</span> &#123; <span className="text-[#93C5FD]">build</span>, <span className="text-[#93C5FD]">scale</span> &#125; <span className="text-accent">from</span> <span className="text-[#86EFAC]">"@andev/core"</span>;
        </div>

        {/* Official Slogan from Brand Identity */}
        <div className="pt-2 text-mute/90 italic">
          <span className="text-[#00C3FF]">// We build the future</span>
          <br />
          <span className="text-[#00C3FF]">// one line of code at a time. /&gt;</span>
        </div>

        <div className="pt-2">
          <span className="text-accent">const</span> project = <span className="text-accent">await</span> <span className="text-[#60A5FA]">build</span>(&#123;
        </div>
        <div className="pl-4">
          motto: <span className="text-[#86EFAC]">"Code · Create · Solve"</span>,
        </div>
        <div className="pl-4">
          client: <span className="text-[#86EFAC]">"Algeria Enterprise"</span>,
        </div>
        <div className="pl-4">
          stack: [<span className="text-[#86EFAC]">"React"</span>, <span className="text-[#86EFAC]">"Fastify"</span>, <span className="text-[#86EFAC]">"SQLite"</span>],
        </div>
        <div className="pl-4">
          status: <span className="text-[#86EFAC]">"production_ready"</span>,
        </div>
        <div className="pl-4">
          performanceScore: <span className="text-[#FBBF24]">99</span>
        </div>
        <div>&#125;);</div>

        <div className="pt-2 text-primary flex items-center gap-1 font-semibold">
          <span>&gt; deployed successfully to edge</span>
          <span className="inline-block w-2 h-4 bg-accent animate-pulse" />
        </div>
      </div>
    </div>
  );
};
