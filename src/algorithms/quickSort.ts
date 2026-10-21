import { AnimationStep } from '../types';

export function generateQuickSortSteps(initialArray: number[]): AnimationStep[] {
  const steps: AnimationStep[] = [];
  const arr = [...initialArray];
  const n = arr.length;
  let comparisons = 0;
  let swaps = 0;
  let accesses = 0;
  const sortedIndices: number[] = [];

  steps.push({
    array: [...arr],
    comparingIndices: [],
    swappingIndices: [],
    pivotIndices: [],
    sortedIndices: [],
    codeLine: 0,
    description: 'Starting Quick Sort. Partitioning array using pivot elements.',
    comparisons,
    swaps,
    arrayAccesses: accesses,
  });

  function partition(low: number, high: number): number {
    const pivot = arr[high]; // Lomuto partition scheme for clean visual logic
    let i = low - 1;
    accesses++;

    steps.push({
      array: [...arr],
      comparingIndices: [],
      swappingIndices: [],
      pivotIndices: [high],
      sortedIndices: [...sortedIndices],
      activeRange: [low, high],
      codeLine: 2,
      description: `Selected pivot element ${pivot} at index ${high} for range [${low}..${high}].`,
      comparisons,
      swaps,
      arrayAccesses: accesses,
      soundValue: pivot,
    });

    for (let j = low; j < high; j++) {
      comparisons++;
      accesses++;

      steps.push({
        array: [...arr],
        comparingIndices: [j, high],
        swappingIndices: [],
        pivotIndices: [high],
        sortedIndices: [...sortedIndices],
        activeRange: [low, high],
        codeLine: 3,
        description: `Comparing element ${arr[j]} at index ${j} with pivot ${pivot}.`,
        comparisons,
        swaps,
        arrayAccesses: accesses,
        soundValue: arr[j],
      });

      if (arr[j] < pivot) {
        i++;
        if (i !== j) {
          const temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
          swaps++;
          accesses += 4;

          steps.push({
            array: [...arr],
            comparingIndices: [],
            swappingIndices: [i, j],
            pivotIndices: [high],
            sortedIndices: [...sortedIndices],
            activeRange: [low, high],
            codeLine: 4,
            description: `Swapped smaller element ${arr[i]} with ${arr[j]}.`,
            comparisons,
            swaps,
            arrayAccesses: accesses,
            soundValue: arr[i],
          });
        }
      }
    }

    // Place pivot in correct position
    const pivotPos = i + 1;
    if (pivotPos !== high) {
      const temp = arr[pivotPos];
      arr[pivotPos] = arr[high];
      arr[high] = temp;
      swaps++;
      accesses += 4;

      steps.push({
        array: [...arr],
        comparingIndices: [],
        swappingIndices: [pivotPos, high],
        pivotIndices: [pivotPos],
        sortedIndices: [...sortedIndices],
        activeRange: [low, high],
        codeLine: 5,
        description: `Swapped pivot ${arr[pivotPos]} into its final position at index ${pivotPos}.`,
        comparisons,
        swaps,
        arrayAccesses: accesses,
        soundValue: arr[pivotPos],
      });
    }

    // The pivot at pivotPos is now strictly in its sorted position!
    if (!sortedIndices.includes(pivotPos)) sortedIndices.push(pivotPos);

    steps.push({
      array: [...arr],
      comparingIndices: [],
      swappingIndices: [],
      pivotIndices: [],
      sortedIndices: [...sortedIndices],
      activeRange: [low, high],
      codeLine: 6,
      description: `Pivot element ${arr[pivotPos]} is now fixed in its final sorted position at index ${pivotPos}.`,
      comparisons,
      swaps,
      arrayAccesses: accesses,
      soundValue: arr[pivotPos],
    });

    return pivotPos;
  }

  function quickSortHelper(low: number, high: number) {
    if (low < high) {
      const pi = partition(low, high);
      quickSortHelper(low, pi - 1);
      quickSortHelper(pi + 1, high);
    } else if (low === high) {
      if (!sortedIndices.includes(low)) sortedIndices.push(low);
    }
  }

  quickSortHelper(0, n - 1);

  const allSorted = Array.from({ length: n }, (_, idx) => idx);
  steps.push({
    array: [...arr],
    comparingIndices: [],
    swappingIndices: [],
    pivotIndices: [],
    sortedIndices: allSorted,
    codeLine: 7,
    description: `Quick Sort complete! Array sorted with ${comparisons} comparisons and ${swaps} swaps.`,
    comparisons,
    swaps,
    arrayAccesses: accesses,
  });

  return steps;
}
