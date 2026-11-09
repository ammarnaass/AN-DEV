import React from "react";
import { Terminal } from "lucide-react";

export const GlowingCodeBlock: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div
      dir="ltr"
      className={`w-full max-w-xl bg-[#0b1329] border border-slate-700/60 rounded-xl shadow-[0_20px_50px_-15px_rgba(15,23,42,0.25)] overflow-hidden select-none text-left ${className}`}
    >
      {/* Terminal Titlebar */}
      <div className="h-10 px-4 bg-[#080d1e] border-b border-slate-800 flex items-center justify-between">
        {/* Traffic Light Controls */}
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#ef4444] inline-block opacity-90" />
          <span className="w-3 h-3 rounded-full bg-[#f59e0b] inline-block opacity-90" />
          <span className="w-3 h-3 rounded-full bg-[#10b981] inline-block opacity-90" />
        </div>

        <div className="flex items-center gap-1.5 font-mono text-[12px] text-slate-400">
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          <span>apps/core/src/architecture.ts</span>
        </div>

        <div className="flex items-center">
          <span className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 font-semibold border border-slate-700">
            TS
          </span>
        </div>
      </div>

      {/* Code Canvas */}
      <div className="p-5 font-mono text-xs sm:text-[13px] leading-relaxed overflow-x-auto text-left text-slate-300">
        <pre className="font-mono leading-[22px]">
          <code>
            <span className="text-slate-500">// AN DEV: Code · Create · Solve</span>
            {"\n"}
            <span className="text-sky-400 font-semibold">import</span> &#123;{" "}
            <span className="text-indigo-300 font-medium">Microservices</span>,{" "}
            <span className="text-indigo-300 font-medium">CloudEdge</span> &#125;{" "}
            <span className="text-sky-400 font-semibold">from</span>{" "}
            <span className="text-emerald-400">'@andev/core'</span>;
            {"\n"}
            <span className="text-sky-400 font-semibold">import</span> &#123;{" "}
            <span className="text-indigo-300 font-medium">FastifyEngine</span> &#125;{" "}
            <span className="text-sky-400 font-semibold">from</span>{" "}
            <span className="text-emerald-400">'@andev/backend'</span>;
            {"\n\n"}
            <span className="text-sky-400 font-semibold">export async function</span>{" "}
            <span className="text-cyan-300 font-bold">deployEnterpriseStack</span>() &#123;
            {"\n"}  <span className="text-sky-400 font-semibold">const</span> engine ={" "}
            <span className="text-sky-400 font-semibold">new</span>{" "}
            <span className="text-indigo-300 font-medium">FastifyEngine</span>(&#123;
            {"\n"}    region: <span className="text-emerald-400">'dz-algiers'</span>,
            {"\n"}    latency: <span className="text-amber-300">'&lt; 25ms'</span>,
            {"\n"}    db: <span className="text-emerald-400">'SQLite WAL + Drizzle'</span>,
            {"\n"}    security: <span className="text-emerald-400">'Argon2 + CSRF'</span>,
            {"\n"}    motto: <span className="text-emerald-400">'Code · Create · Solve'</span>
            {"\n"}  &#125;);
            {"\n\n"}  <span className="text-sky-400 font-semibold">await</span> engine.
            <span className="text-cyan-300 font-bold">bootstrap</span>();
            {"\n"}  <span className="text-slate-500">// We build the future one line of code at a time. /&gt;</span>
            {"\n"}  <span className="text-sky-400 font-semibold">return</span> &#123; status: <span className="text-emerald-400">'OPERATIONAL'</span> &#125;;
            {"\n"}&#125;
          </code>
        </pre>
      </div>

      {/* Terminal Live Status Bar */}
      <div className="px-4 py-2 bg-[#080d1e] border-t border-slate-800 flex items-center justify-between font-mono text-[11px] text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-emerald-400 font-semibold">HTTP/2 200 OK</span>
          <span className="hidden sm:inline text-slate-600">•</span>
          <span className="hidden sm:inline">RTT: 18ms</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sky-400">dz-algiers-01</span>
          <span className="text-slate-400">Node.js 22 LTS</span>
        </div>
      </div>
    </div>
  );
};
