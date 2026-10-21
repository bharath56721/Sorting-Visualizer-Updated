export type AlgorithmId = 'bubble' | 'selection' | 'insertion' | 'merge' | 'quick' | 'heap';

export type ArrayDistribution = 'random' | 'nearly_sorted' | 'reversed' | 'few_unique';

export interface ComplexityInfo {
  timeWorst: string;
  timeAverage: string;
  timeBest: string;
  spaceWorst: string;
  stable: boolean;
  inPlace: boolean;
  description: string;
  bestCaseDescription: string;
  worstCaseDescription: string;
}

export interface PseudocodeLine {
  text: string;
  indent: number;
}

export interface AlgorithmMetadata {
  id: AlgorithmId;
  name: string;
  shortName: string;
  complexity: ComplexityInfo;
  pseudocode: PseudocodeLine[];
  tagline: string;
}

export interface AnimationStep {
  array: number[];
  comparingIndices: number[]; // e.g. [i, j] yellow/amber
  swappingIndices: number[];  // e.g. [i, j] red/coral
  pivotIndices: number[];     // e.g. [pivot] purple/indigo
  sortedIndices: number[];    // elements guaranteed in final sorted position green/emerald
  activeRange?: [number, number]; // for divide and conquer (merge, quick)
  codeLine: number;           // 0-indexed line in pseudocode
  description: string;        // Human-readable step explanation
  comparisons: number;
  swaps: number;
  arrayAccesses: number;
  soundValue?: number;        // value for audio pitch
}

export interface BugRecord {
  file: string;
  title: string;
  severity: 'Critical' | 'Major' | 'Visual';
  originalCodeSnippet: string;
  issueDescription: string;
  fixedImplementation: string;
}
