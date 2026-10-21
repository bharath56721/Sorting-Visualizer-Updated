import React from 'react';
import { IDENTIFIED_BUGS } from '../algorithms';
import { Bug, X, CheckCircle2, AlertTriangle, Code } from 'lucide-react';

interface BugReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BugReportModal: React.FC<BugReportModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400">
              <Bug className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>Mistakes Identified & Corrected</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  6 of 6 Fixed
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Code audit of the provided repository files explaining why the original code failed to render or run.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs sm:text-sm">
          <div className="p-3.5 bg-sky-950/30 border border-sky-800/40 rounded-xl text-sky-200 text-xs leading-relaxed flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-sky-400 mt-0.5 shrink-0" />
            <div>
              <strong className="text-white">Summary of Root Cause:</strong> The application originally didn't appear on the frontend because Vite serves a React application from <code className="text-sky-300 bg-sky-900/50 px-1 py-0.5 rounded">src/App.tsx</code> (which was an empty div), while the uploaded sorting scripts were disconnected vanilla HTML/JS. In addition, when executing the vanilla code directly, multiple runtime TypeErrors crashed the event handlers. All issues have been identified, corrected, and integrated into this React visualizer.
            </div>
          </div>

          <div className="space-y-4">
            {IDENTIFIED_BUGS.map((bug, index) => {
              const isCritical = bug.severity === 'Critical';

              return (
                <div
                  key={index}
                  className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-slate-500">#{index + 1}</span>
                      <h3 className="font-bold text-slate-200 text-sm">{bug.title}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] text-slate-400">{bug.file}</span>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${
                          isCritical
                            ? 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                            : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                        }`}
                      >
                        {bug.severity}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {bug.issueDescription}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                    <div className="bg-rose-950/20 border border-rose-900/40 rounded-lg p-2.5">
                      <span className="text-[10px] uppercase font-bold text-rose-400 tracking-wider block mb-1 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" /> Original Buggy Code
                      </span>
                      <pre className="font-mono text-[11px] text-rose-200/90 overflow-x-auto whitespace-pre-wrap">
                        {bug.originalCodeSnippet}
                      </pre>
                    </div>

                    <div className="bg-emerald-950/20 border border-emerald-900/40 rounded-lg p-2.5">
                      <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider block mb-1 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Corrected Solution
                      </span>
                      <p className="text-[11px] text-emerald-200/90 leading-relaxed">
                        {bug.fixedImplementation}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-900 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors"
          >
            Close Report
          </button>
        </div>
      </div>
    </div>
  );
};
