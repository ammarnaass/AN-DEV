import React from "react";

export const BenchmarkBanner: React.FC = () => {
  return (
    <div className="p-6 rounded-2xl bg-surface border border-line grid grid-cols-1 sm:grid-cols-3 gap-4 text-start">
      <div className="space-y-1">
        <span className="text-xs font-mono text-text-muted">PostgreSQL API Latency</span>
        <div className="text-2xl font-black text-status-err font-mono">140ms</div>
        <span className="text-[11px] text-text-muted">Overhead on mobile networks</span>
      </div>
      <div className="space-y-1">
        <span className="text-xs font-mono text-secondary">SQLite WAL Mode Latency</span>
        <div className="text-2xl font-black text-status-ok font-mono">&lt; 22ms</div>
        <span className="text-[11px] text-status-ok">84% latency reduction</span>
      </div>
      <div className="space-y-1">
        <span className="text-xs font-mono text-text-muted">Replication Method</span>
        <div className="text-2xl font-black text-secondary font-mono">Litestream</div>
        <span className="text-[11px] text-text-muted">Continuous real-time S3 sync</span>
      </div>
    </div>
  );
};

