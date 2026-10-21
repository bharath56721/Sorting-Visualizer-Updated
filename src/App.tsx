import { useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { AlgorithmId, ArrayDistribution, AnimationStep } from './types';
import { ALGORITHMS, getStepsForAlgorithm } from './algorithms';
import { soundEngine } from './utils/audio';
import { Navbar } from './components/Navbar';
import { VisualizerStage } from './components/VisualizerStage';
import { ControlDeck } from './components/ControlDeck';
import { StatsCounter } from './components/StatsCounter';
import { ComplexityPanel } from './components/ComplexityPanel';
import { PseudocodeViewer } from './components/PseudocodeViewer';
import { BugReportModal } from './components/BugReportModal';
import { CustomArrayModal } from './components/CustomArrayModal';

function generateArrayForDistribution(size: number, dist: ArrayDistribution): number[] {
  const result: number[] = [];
  const minVal = 10;
  const maxVal = 100;

  if (dist === 'random') {
    for (let i = 0; i < size; i++) {
      result.push(Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal);
    }
  } else if (dist === 'nearly_sorted') {
    const step = (maxVal - minVal) / size;
    for (let i = 0; i < size; i++) {
      result.push(Math.round(minVal + i * step));
    }
    // Swap 2 to 4 pairs
    const swapsCount = Math.max(2, Math.floor(size * 0.08));
    for (let s = 0; s < swapsCount; s++) {
      const idx1 = Math.floor(Math.random() * (size - 1));
      const idx2 = Math.min(size - 1, idx1 + Math.floor(Math.random() * 3) + 1);
      const temp = result[idx1];
      result[idx1] = result[idx2];
      result[idx2] = temp;
    }
  } else if (dist === 'reversed') {
    const step = (maxVal - minVal) / size;
    for (let i = 0; i < size; i++) {
      result.push(Math.round(maxVal - i * step));
    }
  } else if (dist === 'few_unique') {
    const uniqueVals = [18, 38, 58, 78, 98];
    for (let i = 0; i < size; i++) {
      result.push(uniqueVals[Math.floor(Math.random() * uniqueVals.length)]);
    }
  }

  return result;
}

export default function App() {
  const [currentAlgorithm, setCurrentAlgorithm] = useState<AlgorithmId>('bubble');
  const [arraySize, setArraySize] = useState<number>(30);
  const [speed, setSpeed] = useState<number>(18);
  const [distribution, setDistribution] = useState<ArrayDistribution>('random');
  const [rawArray, setRawArray] = useState<number[]>(() => generateArrayForDistribution(30, 'random'));

  const [steps, setSteps] = useState<AnimationStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const [isBugModalOpen, setIsBugModalOpen] = useState<boolean>(false);
  const [isCustomArrayModalOpen, setIsCustomArrayModalOpen] = useState<boolean>(false);
  const [elapsedTimeMs, setElapsedTimeMs] = useState<number>(0);

  const animationFrameRef = useRef<number | null>(null);
  const lastStepTimestampRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  // Recompute steps whenever algorithm or raw array changes
  const rebuildSteps = useCallback((algo: AlgorithmId, arr: number[]) => {
    const computedSteps = getStepsForAlgorithm(algo, arr);
    setSteps(computedSteps);
    setCurrentStepIndex(0);
    setIsPlaying(false);
    setIsPaused(false);
    setElapsedTimeMs(0);
  }, []);

  // Initial load
  useEffect(() => {
    rebuildSteps(currentAlgorithm, rawArray);
  }, [currentAlgorithm, rawArray, rebuildSteps]);

  // Max value in array for bar scaling
  const maxValue = Math.max(...rawArray, 100);

  const currentStep = steps[currentStepIndex] || null;
  const isCompleted = steps.length > 0 && currentStepIndex >= steps.length - 1;

  // Sound sync
  const playStepSound = useCallback((step: AnimationStep | undefined) => {
    if (!step?.soundValue) return;
    soundEngine.playTone(step.soundValue, 10, maxValue, 40);
  }, [maxValue]);

  // Animation loop
  useEffect(() => {
    if (!isPlaying) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      return;
    }

    startTimeRef.current = performance.now() - elapsedTimeMs;
    lastStepTimestampRef.current = performance.now();

    const loop = (timestamp: number) => {
      // Step interval inversely proportional to speed:
      // speed = 1 -> 350ms, speed = 50 -> 8ms
      const stepInterval = Math.max(8, 400 / (speed * 1.2));

      setElapsedTimeMs(Math.round(performance.now() - startTimeRef.current));

      if (timestamp - lastStepTimestampRef.current >= stepInterval) {
        lastStepTimestampRef.current = timestamp;

        setCurrentStepIndex((prev) => {
          const nextIndex = prev + 1;
          if (nextIndex >= steps.length) {
            setIsPlaying(false);
            setIsPaused(false);
            soundEngine.playCompletionChime();
            try {
              confetti({
                particleCount: 50,
                spread: 70,
                origin: { y: 0.7 },
              });
            } catch {
              // ignore
            }
            return steps.length - 1;
          }

          playStepSound(steps[nextIndex]);
          return nextIndex;
        });
      }

      animationFrameRef.current = requestAnimationFrame(loop);
    };

    animationFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, speed, steps, playStepSound, elapsedTimeMs]);

  // Handler: Play / Resume
  const handlePlay = () => {
    if (isCompleted) {
      setCurrentStepIndex(0);
      setElapsedTimeMs(0);
    }
    setIsPlaying(true);
    setIsPaused(false);
  };

  // Handler: Pause
  const handlePause = () => {
    setIsPlaying(false);
    setIsPaused(true);
  };

  // Handler: Step forward
  const handleStepForward = () => {
    if (currentStepIndex < steps.length - 1) {
      const nextIdx = currentStepIndex + 1;
      setCurrentStepIndex(nextIdx);
      playStepSound(steps[nextIdx]);
    }
  };

  // Handler: Step back
  const handleStepBack = () => {
    if (currentStepIndex > 0) {
      const prevIdx = currentStepIndex - 1;
      setCurrentStepIndex(prevIdx);
      playStepSound(steps[prevIdx]);
    }
  };

  // Handler: Reset
  const handleReset = () => {
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentStepIndex(0);
    setElapsedTimeMs(0);
  };

  // Handler: Generate new array
  const handleGenerateNew = () => {
    setIsPlaying(false);
    setIsPaused(false);
    const newArr = generateArrayForDistribution(arraySize, distribution);
    setRawArray(newArr);
  };

  // Handler: Array size change
  const handleArraySizeChange = (newSize: number) => {
    setIsPlaying(false);
    setIsPaused(false);
    setArraySize(newSize);
    const newArr = generateArrayForDistribution(newSize, distribution);
    setRawArray(newArr);
  };

  // Handler: Distribution change
  const handleDistributionChange = (newDist: ArrayDistribution) => {
    setDistribution(newDist);
    setIsPlaying(false);
    setIsPaused(false);
    const newArr = generateArrayForDistribution(arraySize, newDist);
    setRawArray(newArr);
  };

  // Handler: Seek step
  const handleSeek = (index: number) => {
    setIsPlaying(false);
    setIsPaused(true);
    const safeIdx = Math.max(0, Math.min(steps.length - 1, index));
    setCurrentStepIndex(safeIdx);
    playStepSound(steps[safeIdx]);
  };

  // Handler: Custom array applied
  const handleCustomArraySubmit = (newArr: number[]) => {
    setIsPlaying(false);
    setIsPaused(false);
    setArraySize(newArr.length);
    setRawArray(newArr);
  };

  // Handler: Algorithm select
  const handleAlgorithmSelect = (id: AlgorithmId) => {
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentAlgorithm(id);
  };

  // Handler: Toggle sound
  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    soundEngine.setMuted(nextMuted);
  };

  const algoMeta = ALGORITHMS[currentAlgorithm];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-sky-500/20">
      <div>
        <Navbar
          currentAlgorithm={currentAlgorithm}
          onSelectAlgorithm={handleAlgorithmSelect}
          isSorting={isPlaying}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
          onOpenBugModal={() => setIsBugModalOpen(true)}
        />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
          {/* Header Info Tagline */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
                  {algoMeta.name}
                </h1>
                <span className="text-xs text-sky-400 font-mono bg-sky-950/60 border border-sky-800/50 px-2 py-0.5 rounded">
                  {algoMeta.complexity.timeAverage}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
                {algoMeta.tagline}
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto text-xs text-slate-400">
              <span className="font-mono text-slate-300 font-semibold tabular-nums">
                {rawArray.length} Elements
              </span>
              <span>·</span>
              <span className="capitalize">{distribution.replace('_', ' ')}</span>
            </div>
          </div>

          {/* Visualizer Stage */}
          <VisualizerStage
            currentStep={currentStep}
            array={rawArray}
            maxValue={maxValue}
          />

          {/* Playback Controls & Parameter Deck */}
          <ControlDeck
            isPlaying={isPlaying}
            isPaused={isPaused}
            isCompleted={isCompleted}
            currentStepIndex={currentStepIndex}
            totalSteps={steps.length}
            arraySize={arraySize}
            speed={speed}
            distribution={distribution}
            onPlay={handlePlay}
            onPause={handlePause}
            onStepBack={handleStepBack}
            onStepForward={handleStepForward}
            onReset={handleReset}
            onGenerateNew={handleGenerateNew}
            onArraySizeChange={handleArraySizeChange}
            onSpeedChange={setSpeed}
            onDistributionChange={handleDistributionChange}
            onSeek={handleSeek}
            onOpenCustomArray={() => setIsCustomArrayModalOpen(true)}
          />

          {/* Live Statistics Counter */}
          <StatsCounter
            comparisons={currentStep?.comparisons ?? 0}
            swaps={currentStep?.swaps ?? 0}
            arrayAccesses={currentStep?.arrayAccesses ?? 0}
            elapsedTimeMs={elapsedTimeMs}
          />

          {/* Two-Column Bottom Grid: Complexities + Pseudocode Viewer */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ComplexityPanel
              complexity={algoMeta.complexity}
              algorithmName={algoMeta.name}
            />

            <PseudocodeViewer
              lines={algoMeta.pseudocode}
              activeLineIndex={currentStep?.codeLine ?? 0}
              algorithmName={algoMeta.name}
            />
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-900/40 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <span>Sorting Algorithm Visualizer</span>
            <span className="mx-2">·</span>
            <span>Interactive Computer Science Education Simulation</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsBugModalOpen(true)}
              className="hover:text-slate-300 transition-colors underline underline-offset-4"
            >
              Audit of Original Files (6 Fixed Bugs)
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <BugReportModal
        isOpen={isBugModalOpen}
        onClose={() => setIsBugModalOpen(false)}
      />

      <CustomArrayModal
        isOpen={isCustomArrayModalOpen}
        onClose={() => setIsCustomArrayModalOpen(false)}
        onSubmit={handleCustomArraySubmit}
      />
    </div>
  );
}
