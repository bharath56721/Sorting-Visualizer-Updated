import React from 'react';
import { ArrayDistribution } from '../types';
import {
  Play,
  Pause,
  RotateCcw,
  SkipBack,
  SkipForward,
  Shuffle,
  SlidersHorizontal,
  PenTool,
} from 'lucide-react';

interface ControlDeckProps {
  isPlaying: boolean;
  isPaused: boolean;
  isCompleted: boolean;
  currentStepIndex: number;
  totalSteps: number;
  arraySize: number;
  speed: number;
  distribution: ArrayDistribution;
  onPlay: () => void;
  onPause: () => void;
  onStepBack: () => void;
  onStepForward: () => void;
  onReset: () => void;
  onGenerateNew: () => void;
  onArraySizeChange: (size: number) => void;
  onSpeedChange: (speed: number) => void;
  onDistributionChange: (dist: ArrayDistribution) => void;
  onSeek: (stepIndex: number) => void;
  onOpenCustomArray: () => void;
}

export const ControlDeck: React.FC<ControlDeckProps> = ({
  isPlaying,
  isPaused,
  isCompleted,
  currentStepIndex,
  totalSteps,
  arraySize,
  speed,
  distribution,
  onPlay,
  onPause,
  onStepBack,
  onStepForward,
  onReset,
  onGenerateNew,
  onArraySizeChange,
  onSpeedChange,
  onDistributionChange,
  onSeek,
  onOpenCustomArray,
}) => {
  const distributions: { id: ArrayDistribution; label: string }[] = [
    { id: 'random', label: 'Random' },
    { id: 'nearly_sorted', label: 'Nearly Sorted' },
    { id: 'reversed', label: 'Reversed' },
    { id: 'few_unique', label: 'Few Unique' },
  ];

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 sm:p-5 shadow-xl space-y-4">
      {/* Top Row: Playback Buttons & Scrubber */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Playback Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {isPlaying ? (
            <button
              onClick={onPause}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm rounded-lg flex items-center gap-2 transition-all shadow-md shadow-amber-500/20 active:scale-95"
            >
              <Pause className="w-4 h-4 fill-current" />
              <span>Pause</span>
            </button>
          ) : (
            <button
              onClick={onPlay}
              className="px-5 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs sm:text-sm rounded-lg flex items-center gap-2 transition-all shadow-md shadow-sky-500/20 active:scale-95"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{isPaused ? 'Resume' : isCompleted ? 'Re-run' : 'Start Sort'}</span>
            </button>
          )}

          <button
            onClick={onStepBack}
            disabled={isPlaying || currentStepIndex <= 0}
            className="p-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-200 border border-slate-700 rounded-lg transition-colors"
            title="Step backward"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          <button
            onClick={onStepForward}
            disabled={isPlaying || currentStepIndex >= totalSteps - 1}
            className="p-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-200 border border-slate-700 rounded-lg transition-colors"
            title="Step forward"
          >
            <SkipForward className="w-4 h-4" />
          </button>

          <button
            onClick={onReset}
            className="px-3 py-2 bg-rose-950/60 hover:bg-rose-900/60 text-rose-300 border border-rose-800/60 text-xs sm:text-sm font-medium rounded-lg flex items-center gap-1.5 transition-colors"
            title="Reset to original array"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          <div className="h-6 w-px bg-slate-800 hidden sm:block mx-1" />

          <button
            onClick={onGenerateNew}
            disabled={isPlaying}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-200 border border-slate-700 text-xs sm:text-sm font-medium rounded-lg flex items-center gap-1.5 transition-colors"
          >
            <Shuffle className="w-3.5 h-3.5 text-sky-400" />
            <span>New Array</span>
          </button>

          <button
            onClick={onOpenCustomArray}
            disabled={isPlaying}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-300 border border-slate-700 text-xs sm:text-sm font-medium rounded-lg flex items-center gap-1.5 transition-colors"
          >
            <PenTool className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">Custom Input</span>
          </button>
        </div>

        {/* Step Scrubber / Progress Bar */}
        <div className="flex-1 max-w-xl flex items-center gap-3">
          <span className="text-xs text-slate-400 whitespace-nowrap font-mono tabular-nums">
            Step {Math.max(0, currentStepIndex)}/{Math.max(0, totalSteps - 1)}
          </span>
          <input
            type="range"
            min={0}
            max={Math.max(0, totalSteps - 1)}
            value={currentStepIndex}
            onChange={(e) => onSeek(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-400"
          />
        </div>
      </div>

      {/* Bottom Row: Parameter Sliders & Presets */}
      <div className="pt-3 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        {/* Array Size */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-slate-300">
            <span className="flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-sky-400" />
              <span>Array Size</span>
            </span>
            <span className="font-mono text-sky-400 font-semibold">{arraySize} elements</span>
          </div>
          <input
            type="range"
            min={10}
            max={100}
            step={5}
            value={arraySize}
            disabled={isPlaying}
            onChange={(e) => onArraySizeChange(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-400 disabled:opacity-40"
          />
        </div>

        {/* Animation Speed */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-slate-300">
            <span>Playback Speed</span>
            <span className="font-mono text-emerald-400 font-semibold">{speed}x</span>
          </div>
          <input
            type="range"
            min={1}
            max={50}
            step={1}
            value={speed}
            onChange={(e) => onSpeedChange(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-400"
          />
        </div>

        {/* Initial Distribution Presets */}
        <div className="space-y-1.5">
          <div className="text-slate-300">Initial Distribution</div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1">
            {distributions.map((d) => (
              <button
                key={d.id}
                disabled={isPlaying}
                onClick={() => onDistributionChange(d.id)}
                className={`px-2 py-1 text-[11px] font-medium rounded transition-colors whitespace-nowrap disabled:opacity-40 ${
                  distribution === d.id
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700/60'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
