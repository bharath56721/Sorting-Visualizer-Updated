import React from 'react';
import { GitCompare, ArrowLeftRight, Database, Timer } from 'lucide-react';

interface StatsCounterProps {
  comparisons: number;
  swaps: number;
  arrayAccesses: number;
  elapsedTimeMs: number;
}

export const StatsCounter: React.FC<StatsCounterProps> = ({
  comparisons,
  swaps,
  arrayAccesses,
  elapsedTimeMs,
}) => {
  const formatTime = (ms: number) => {
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 flex items-center gap-3">
        <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
          <GitCompare className="w-4 h-4" />
        </div>
        <div>
          <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-medium">
            Comparisons
          </span>
          <span className="text-lg font-bold text-slate-100 font-mono tabular-nums">
            {comparisons.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 flex items-center gap-3">
        <div className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400">
          <ArrowLeftRight className="w-4 h-4" />
        </div>
        <div>
          <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-medium">
            Swaps / Shifts
          </span>
          <span className="text-lg font-bold text-slate-100 font-mono tabular-nums">
            {swaps.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 flex items-center gap-3">
        <div className="p-2 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400">
          <Database className="w-4 h-4" />
        </div>
        <div>
          <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-medium">
            Array Accesses
          </span>
          <span className="text-lg font-bold text-slate-100 font-mono tabular-nums">
            {arrayAccesses.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3.5 flex items-center gap-3">
        <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
          <Timer className="w-4 h-4" />
        </div>
        <div>
          <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-medium">
            Elapsed Time
          </span>
          <span className="text-lg font-bold text-slate-100 font-mono tabular-nums">
            {formatTime(elapsedTimeMs)}
          </span>
        </div>
      </div>
    </div>
  );
};
