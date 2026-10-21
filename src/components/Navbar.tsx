import React from 'react';
import { AlgorithmId } from '../types';
import { ALGORITHMS } from '../algorithms';
import { Volume2, VolumeX, Bug, Sparkles } from 'lucide-react';

interface NavbarProps {
  currentAlgorithm: AlgorithmId;
  onSelectAlgorithm: (id: AlgorithmId) => void;
  isSorting: boolean;
  isMuted: boolean;
  onToggleMute: () => void;
  onOpenBugModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentAlgorithm,
  onSelectAlgorithm,
  isSorting,
  isMuted,
  onToggleMute,
  onOpenBugModal,
}) => {
  const algoList: AlgorithmId[] = ['bubble', 'selection', 'insertion', 'merge', 'quick', 'heap'];

  return (
    <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4 md:gap-8">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-sky-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-white whitespace-nowrap block">
              Sorting Visualizer
            </span>
            <span className="text-xs text-slate-400 hidden sm:block">
              Interactive Algorithm Lab
            </span>
          </div>
        </div>

        {/* Zone 2: Algorithm Tabs */}
        <nav className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto py-2 scrollbar-none text-sm font-medium">
          {algoList.map((id) => {
            const isSelected = currentAlgorithm === id;
            return (
              <button
                key={id}
                disabled={isSorting}
                onClick={() => onSelectAlgorithm(id)}
                className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-all whitespace-nowrap shrink-0 disabled:opacity-40 disabled:cursor-not-allowed ${
                  isSelected
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {ALGORITHMS[id].shortName}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={onToggleMute}
            className={`p-2 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1.5 ${
              isMuted
                ? 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
                : 'bg-indigo-950/60 border-indigo-700/60 text-indigo-300 hover:bg-indigo-900/60'
            }`}
            title={isMuted ? 'Turn Sound On' : 'Mute Sound'}
            aria-label={isMuted ? 'Sound muted' : 'Sound active'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span className="hidden lg:inline text-xs">{isMuted ? 'Muted' : 'Audio ON'}</span>
          </button>

          <button
            onClick={onOpenBugModal}
            className="px-3 py-2 text-xs font-semibold text-rose-300 bg-rose-950/50 hover:bg-rose-900/60 border border-rose-800/60 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 shadow-sm"
          >
            <Bug className="w-4 h-4 text-rose-400" />
            <span className="hidden sm:inline">Identified & Fixed Bugs</span>
            <span className="bg-rose-500/30 text-rose-200 px-1.5 py-0.2 rounded text-[11px] font-mono">6</span>
          </button>
        </div>
      </div>
    </header>
  );
};
