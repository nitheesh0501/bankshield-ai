import React from 'react';
import { ShieldCheck, Cpu } from 'lucide-react';

interface StatusBadgeProps {
  compact?: boolean;
}

export function StatusBadge({ compact = false }: StatusBadgeProps) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-medium shadow-sm shadow-emerald-500/10">
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
      </span>
      <div className="flex items-center gap-1.5">
        <ShieldCheck className="w-4 h-4 text-emerald-400" />
        <span className="font-semibold tracking-wide">BANKSHIELD AI Edge Active</span>
      </div>
      {!compact && (
        <span className="hidden md:inline-flex items-center gap-1 pl-2 border-l border-emerald-500/20 text-xs text-emerald-300/80 font-mono">
          <Cpu className="w-3 h-3" /> &lt;50ms
        </span>
      )}
    </div>
  );
}
