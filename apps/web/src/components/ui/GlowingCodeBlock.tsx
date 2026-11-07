import React from "react";

export const GlowingCodeBlock: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div
      dir="ltr"
      className={`relative rounded-card border border-primary/40 bg-[#0B1430] p-5 shadow-glow font-mono text-xs sm:text-sm text-ink/90 overflow-hidden select-none ${className}`}
    >
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-line/60">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#EF4444]/80" />
          <div className="w-3 h-3 rounded-full bg-[#F59E0B]/80" />
          <div className="w-3 h-3 rounded-full bg-[#10B981]/80" />
        </div>
        <span className="text-mute/80 text-xs tracking-wider">andev.engine.ts</span>
        <div className="w-8" />
      </div>

      {/* Code Content */}
      <div className="space-y-1.5 text-left font-mono">
        <div>
          <span className="text-accent">import</span> &#123; <span className="text-[#93C5FD]">build</span>, <span className="text-[#93C5FD]">scale</span> &#125; <span className="text-accent">from</span> <span className="text-[#86EFAC]">"@andev/core"</span>;
        </div>
        <div className="text-mute pt-1">// Converting complex business challenges into resilient apps</div>
        <div>
          <span className="text-accent">const</span> project = <span className="text-accent">await</span> <span className="text-[#60A5FA]">build</span>(&#123;
        </div>
        <div className="pl-4">
          client: <span className="text-[#86EFAC]">"Algeria Enterprise"</span>,
        </div>
        <div className="pl-4">
          architecture: [<span className="text-[#86EFAC]">"React"</span>, <span className="text-[#86EFAC]">"Fastify"</span>, <span className="text-[#86EFAC]">"SQLite"</span>],
        </div>
        <div className="pl-4">
          status: <span className="text-[#86EFAC]">"production_ready"</span>,
        </div>
        <div className="pl-4">
          performanceScore: <span className="text-[#FBBF24]">99</span>
        </div>
        <div>&#125;);</div>
        <div className="pt-2 text-primary flex items-center gap-1">
          <span>&gt; deployed successfully to edge</span>
          <span className="inline-block w-2 h-4 bg-accent animate-pulse" />
        </div>
      </div>
    </div>
  );
};
