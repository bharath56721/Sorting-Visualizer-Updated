import React from 'react';
import { ComplexityInfo } from '../types';
import { Clock, HardDrive, ShieldCheck, Cpu } from 'lucide-react';

interface ComplexityPanelProps {
  complexity: ComplexityInfo;
  algorithmName: string;
}

export const ComplexityPanel: React.FC<ComplexityPanelProps> = ({
  complexity,
  algorithmName,
}) => {
  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-xl space-y-5">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
          <Clock className="w-4 h-4 text-sky-400" />
          <span>Complexity & Algorithmic Properties</span>
        </h3>
        <span className="text-xs text-slate-400 font-mono">{algorithmName}</span>
      </div>

      {/* Grid of Complexities */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-3">
          <span className="text-[11px] text-slate-400 block font-medium">Worst Time</span>
          <span className="text-base font-bold font-mono text-rose-400 mt-1 block">
            {complexity.timeWorst}
          </span>
          <span className="text-[10px] text-slate-500 mt-0.5 block leading-tight">
            Maximum steps
          </span>
        </div>

        <div className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-3">
          <span className="text-[11px] text-slate-400 block font-medium">Average Time</span>
          <span className="text-base font-bold font-mono text-amber-400 mt-1 block">
            {complexity.timeAverage}
          </span>
          <span className="text-[10px] text-slate-500 mt-0.5 block leading-tight">
            Expected case
          </span>
        </div>

        <div className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-3">
          <span className="text-[11px] text-slate-400 block font-medium">Best Time</span>
          <span className="text-base font-bold font-mono text-emerald-400 mt-1 block">
            {complexity.timeBest}
          </span>
          <span className="text-[10px] text-slate-500 mt-0.5 block leading-tight">
            Optimal input
          </span>
        </div>

        <div className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-3">
          <span className="text-[11px] text-slate-400 block font-medium">Worst Space</span>
          <span className="text-base font-bold font-mono text-indigo-400 mt-1 block">
            {complexity.spaceWorst}
          </span>
          <span className="text-[10px] text-slate-500 mt-0.5 block leading-tight">
            Auxiliary memory
          </span>
        </div>
      </div>

      {/* Properties: Stability & In-place */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        <div className="flex items-start gap-2.5 p-2.5 bg-slate-950/40 border border-slate-800/60 rounded-lg text-xs">
          <ShieldCheck className={`w-4 h-4 mt-0.5 shrink-0 ${complexity.stable ? 'text-emerald-400' : 'text-slate-500'}`} />
          <div>
            <span className="font-semibold text-slate-200">
              {complexity.stable ? 'Stable Sort' : 'Unstable Sort'}
            </span>
            <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
              {complexity.stable
                ? 'Preserves the relative order of duplicate elements.'
                : 'May rearrange the relative order of equal key elements.'}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2.5 p-2.5 bg-slate-950/40 border border-slate-800/60 rounded-lg text-xs">
          <Cpu className={`w-4 h-4 mt-0.5 shrink-0 ${complexity.inPlace ? 'text-sky-400' : 'text-amber-400'}`} />
          <div>
            <span className="font-semibold text-slate-200">
              {complexity.inPlace ? 'In-Place Algorithm' : 'Out-of-Place (Auxiliary Buffer)'}
            </span>
            <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
              {complexity.inPlace
                ? 'Sorts the array using O(1) or O(log N) extra memory without allocating separate arrays.'
                : 'Allocates auxiliary buffers (e.g. O(N) array in merge stage) for sorting.'}
            </p>
          </div>
        </div>
      </div>

      {/* Case Explanations */}
      <div className="text-xs text-slate-400 space-y-2 border-t border-slate-800 pt-3">
        <p className="leading-relaxed">
          <strong className="text-slate-300">How it works: </strong>
          {complexity.description}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
          <div className="p-2 bg-emerald-950/20 border border-emerald-900/30 rounded text-emerald-300/90">
            <strong>Best Case: </strong> {complexity.bestCaseDescription}
          </div>
          <div className="p-2 bg-rose-950/20 border border-rose-900/30 rounded text-rose-300/90">
            <strong>Worst Case: </strong> {complexity.worstCaseDescription}
          </div>
        </div>
      </div>
    </div>
  );
};
