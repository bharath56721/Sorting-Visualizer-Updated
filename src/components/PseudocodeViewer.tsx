import React from 'react';
import { PseudocodeLine } from '../types';
import { Code2 } from 'lucide-react';

interface PseudocodeViewerProps {
  lines: PseudocodeLine[];
  activeLineIndex: number;
  algorithmName: string;
}

export const PseudocodeViewer: React.FC<PseudocodeViewerProps> = ({
  lines,
  activeLineIndex,
  algorithmName,
}) => {
  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 shadow-xl flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
          <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <Code2 className="w-4 h-4 text-emerald-400" />
            <span>Algorithm Pseudocode</span>
          </h3>
          <span className="text-[11px] text-slate-400 font-mono">Real-time Execution</span>
        </div>

        <div className="font-mono text-xs overflow-x-auto space-y-1 py-1">
          {lines.map((line, idx) => {
            const isActive = idx === activeLineIndex;

            return (
              <div
                key={idx}
                className={`flex items-center gap-3 px-2.5 py-1 rounded transition-colors ${
                  isActive
                    ? 'bg-sky-500/20 text-sky-200 border-l-2 border-sky-400 font-semibold'
                    : 'text-slate-400 hover:text-slate-300'
                }`}
              >
                <span className="text-[10px] text-slate-600 select-none w-4 text-right tabular-nums">
                  {idx + 1}
                </span>
                <span
                  style={{ paddingLeft: `${line.indent * 12}px` }}
                  className="whitespace-pre"
                >
                  {line.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-500 flex items-center justify-between">
        <span>Active line highlights as sorting progresses</span>
        <span className="font-mono text-slate-400">{algorithmName}</span>
      </div>
    </div>
  );
};
