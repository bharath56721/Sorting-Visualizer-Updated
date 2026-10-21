import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

interface CustomArrayModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newArray: number[]) => void;
}

export const CustomArrayModal: React.FC<CustomArrayModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [inputVal, setInputVal] = useState('45, 12, 85, 32, 89, 21, 67, 10, 54, 98, 29, 73');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleApply = () => {
    const numbers = inputVal
      .split(/[\s,]+/)
      .map((n) => n.trim())
      .filter((n) => n.length > 0)
      .map(Number);

    if (numbers.length < 4) {
      setError('Please provide at least 4 numbers.');
      return;
    }

    if (numbers.length > 80) {
      setError('Maximum 80 numbers allowed for custom inputs.');
      return;
    }

    if (numbers.some((n) => isNaN(n) || n < 1 || n > 999)) {
      setError('All values must be positive integers between 1 and 999.');
      return;
    }

    setError(null);
    onSubmit(numbers);
    onClose();
  };

  const samplePresets = [
    { label: 'Small Jumbled', val: '64, 34, 25, 12, 22, 11, 90' },
    { label: 'Nearly Sorted', val: '5, 10, 15, 20, 22, 35, 30, 40, 50, 48, 60' },
    { label: 'Strictly Reversed', val: '95, 85, 75, 65, 55, 45, 35, 25, 15, 5' },
    { label: 'Many Duplicates', val: '20, 50, 20, 80, 50, 20, 90, 80, 50, 20' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-base font-bold text-white">Custom Array Input</h3>
            <p className="text-xs text-slate-400">Enter comma-separated values between 1 and 999</p>
          </div>
          <button onClick={onClose} className="p-1 rounded text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div>
          <textarea
            value={inputVal}
            onChange={(e) => {
              setInputVal(e.target.value);
              setError(null);
            }}
            rows={3}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-xs sm:text-sm font-mono text-slate-100 focus:outline-none focus:border-sky-500"
            placeholder="e.g. 25, 70, 12, 85, 30, 45, 90, 15, 60"
          />
          {error && <p className="text-xs text-rose-400 mt-1">{error}</p>}
        </div>

        <div>
          <span className="text-xs text-slate-400 block mb-1.5 font-medium">Quick Presets:</span>
          <div className="flex flex-wrap gap-1.5">
            {samplePresets.map((preset, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setInputVal(preset.val);
                  setError(null);
                }}
                className="px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 transition-colors"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            className="px-4 py-2 text-xs font-semibold text-slate-950 bg-sky-400 hover:bg-sky-300 rounded-lg transition-colors flex items-center gap-1.5 shadow-md shadow-sky-500/20"
          >
            <Check className="w-4 h-4" />
            <span>Apply Custom Array</span>
          </button>
        </div>
      </div>
    </div>
  );
};
