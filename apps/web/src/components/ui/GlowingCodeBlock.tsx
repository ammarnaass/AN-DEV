import React from "react";
import { Terminal } from "lucide-react";

export const GlowingCodeBlock: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div
      dir="ltr"
      className={`w-full max-w-xl bg-surface-container-lowest border border-line rounded-xl shadow-[0_0_40px_-8px_rgba(13,110,253,0.35)] overflow-hidden select-none text-left ${className}`}
    >
      {/* Terminal Titlebar */}
      <div className="h-10 px-4 bg-surface-container-low border-b border-line flex items-center justify-between">
        {/* Traffic Light Controls */}
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-status-err inline-block opacity-85" />
          <span className="w-3 h-3 rounded-full bg-status-warn inline-block opacity-85" />
          <span className="w-3 h-3 rounded-full bg-status-ok inline-block opacity-85" />
        </div>

        <div className="flex items-center gap-1.5 font-mono text-xs text-text-muted">
          <Terminal className="w-3.5 h-3.5 text-secondary" />
          <span>apps/core/src/architecture.ts</span>
        </div>

        <div className="flex items-center">
          <span className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-surface-container text-secondary border border-line">
            TS
          </span>
        </div>
      </div>

      {/* Code Canvas */}
      <div className="p-5 font-mono text-xs sm:text-[13px] leading-relaxed overflow-x-auto text-on-surface">
        <pre className="font-mono">
          <code>
            <span className="text-text-muted">// AN DEV: Code · Create · Solve</span>
            {"\n"}
            <span className="text-secondary font-semibold">import</span> &#123;{" "}
            <span className="text-primary font-medium">Microservices</span>,{" "}
            <span className="text-primary font-medium">CloudEdge</span> &#125;{" "}
            <span className="text-secondary font-semibold">from</span>{" "}
            <span className="text-status-ok">'@andev/core'</span>;
            {"\n"}
            <span className="text-secondary font-semibold">import</span> &#123;{" "}
            <span className="text-primary font-medium">FastifyEngine</span> &#125;{" "}
            <span className="text-secondary font-semibold">from</span>{" "}
            <span className="text-status-ok">'@andev/backend'</span>;
            {"\n\n"}
            <span className="text-secondary font-semibold">export async function</span>{" "}
            <span className="text-secondary font-bold">deployEnterpriseStack</span>() &#123;
            {"\n"}  <span className="text-secondary font-semibold">const</span> engine ={" "}
            <span className="text-secondary font-semibold">new</span>{" "}
            <span className="text-primary font-medium">FastifyEngine</span>(&#123;
            {"\n"}    region: <span className="text-status-ok">'dz-algiers'</span>,
            {"\n"}    latency: <span className="text-status-warn">'&lt; 25ms'</span>,
            {"\n"}    db: <span className="text-status-ok">'SQLite WAL + Drizzle'</span>,
            {"\n"}    security: <span className="text-status-ok">'Argon2 + CSRF'</span>,
            {"\n"}    motto: <span className="text-status-ok">'Code · Create · Solve'</span>
            {"\n"}  &#125;);
            {"\n\n"}  <span className="text-secondary font-semibold">await</span> engine.
            <span className="text-secondary font-bold">bootstrap</span>();
            {"\n"}  <span className="text-text-muted">// We build the future one line of code at a time. /&gt;</span>
            {"\n"}  <span className="text-secondary font-semibold">return</span> &#123; status: <span className="text-status-ok">'OPERATIONAL'</span> &#125;;
            {"\n"}&#125;
          </code>
        </pre>
      </div>

      {/* Terminal Live Status Bar */}
      <div className="px-4 py-2 bg-surface-container-low border-t border-line flex items-center justify-between font-mono text-[11px] text-text-muted">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-status-ok animate-pulse" />
          <span className="text-status-ok font-semibold">HTTP/2 200 OK</span>
          <span className="hidden sm:inline text-line">•</span>
          <span className="hidden sm:inline">RTT: 18ms</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-secondary">dz-algiers-01</span>
          <span className="text-text-muted">Node.js 22 LTS</span>
        </div>
      </div>
    </div>
  );
};
