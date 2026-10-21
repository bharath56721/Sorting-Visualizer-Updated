import React from 'react';
import { AnimationStep } from '../types';

interface VisualizerStageProps {
  currentStep: AnimationStep | null;
  array: number[];
  maxValue: number;
}

export const VisualizerStage: React.FC<VisualizerStageProps> = ({
  currentStep,
  array,
  maxValue,
}) => {
  const displayArray = currentStep ? currentStep.array : array;
  const n = displayArray.length;

  const comparingSet = new Set(currentStep?.comparingIndices ?? []);
  const swappingSet = new Set(currentStep?.swappingIndices ?? []);
  const pivotSet = new Set(currentStep?.pivotIndices ?? []);
  const sortedSet = new Set(currentStep?.sortedIndices ?? []);
  const activeRange = currentStep?.activeRange;

  const showValues = n <= 32;

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 sm:p-6 shadow-xl relative flex flex-col justify-between overflow-hidden">
      {/* Visual Canvas Area */}
      <div
        className="w-full h-72 sm:h-96 flex items-end justify-center gap-[2px] sm:gap-1 px-2 pt-6 pb-2"
        role="region"
        aria-label="Sorting bars visualizer"
      >
        {displayArray.map((value, idx) => {
          const heightPercent = Math.max(8, (value / maxValue) * 100);

          let barColor = 'bg-sky-500/80 border-sky-400/50';
          let textColor = 'text-sky-200';
          let statusLabel = 'Unsorted';

          if (swappingSet.has(idx)) {
            barColor = 'bg-rose-500 border-rose-400 shadow-md shadow-rose-500/30 animate-pulse';
            textColor = 'text-rose-200 font-bold';
            statusLabel = 'Swapping';
          } else if (comparingSet.has(idx)) {
            barColor = 'bg-amber-400 border-amber-300 shadow-md shadow-amber-400/30';
            textColor = 'text-amber-200 font-bold';
            statusLabel = 'Comparing';
          } else if (pivotSet.has(idx)) {
            barColor = 'bg-purple-500 border-purple-400 shadow-md shadow-purple-500/30';
            textColor = 'text-purple-200 font-bold';
            statusLabel = 'Pivot / Key';
          } else if (sortedSet.has(idx)) {
            barColor = 'bg-emerald-500/90 border-emerald-400';
            textColor = 'text-emerald-200';
            statusLabel = 'Sorted';
          } else if (activeRange && (idx < activeRange[0] || idx > activeRange[1])) {
            barColor = 'bg-slate-700/50 border-slate-600/30 opacity-40';
            textColor = 'text-slate-500';
            statusLabel = 'Outside Partition';
          }

          return (
            <div
              key={idx}
              className="flex-1 max-w-[36px] flex flex-col items-center justify-end h-full group relative transition-all duration-75"
              style={{ minWidth: n > 80 ? '2px' : '4px' }}
            >
              {/* Optional top value label */}
              {showValues && (
                <span
                  className={`text-[10px] sm:text-xs font-mono font-medium mb-1 select-none tabular-nums ${textColor}`}
                >
                  {value}
                </span>
              )}

              {/* Bar Element */}
              <div
                className={`w-full rounded-t-sm sm:rounded-t border-t border-x transition-[height] duration-75 ${barColor}`}
                style={{ height: `${heightPercent}%` }}
              />

              {/* Tooltip on hover */}
              <div className="absolute bottom-full mb-2 hidden group-hover:flex flex-col items-center z-20 pointer-events-none">
                <div className="bg-slate-800 text-slate-100 text-[11px] px-2 py-1 rounded shadow-lg border border-slate-700 whitespace-nowrap font-mono">
                  <span>Index {idx}: <strong className="text-white">{value}</strong></span>
                  <span className="block text-[10px] text-slate-400">{statusLabel}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Step Narration Bar */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
          <div className="w-2 h-2 rounded-full bg-sky-400" />
          <span className="font-medium text-slate-400">Action:</span>
          <span className="text-slate-200 font-mono text-xs sm:text-sm">
            {currentStep?.description || 'Ready to sort. Choose an algorithm or adjust array parameters below.'}
          </span>
        </div>

        {/* Legend */}
        <div className="flex items-center flex-wrap gap-3 text-[11px] font-medium text-slate-400 shrink-0">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-sky-500/80 inline-block" /> Default
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-amber-400 inline-block" /> Comparing
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-rose-500 inline-block" /> Swapping / Shift
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-purple-500 inline-block" /> Pivot / Min
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500 inline-block" /> Sorted
          </span>
        </div>
      </div>
    </div>
  );
};
