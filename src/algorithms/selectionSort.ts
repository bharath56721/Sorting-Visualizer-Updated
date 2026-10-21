import { AnimationStep } from '../types';

export function generateSelectionSortSteps(initialArray: number[]): AnimationStep[] {
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
    description: 'Starting Selection Sort. Finding smallest elements sequentially.',
    comparisons,
    swaps,
    arrayAccesses: accesses,
  });

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    steps.push({
      array: [...arr],
      comparingIndices: [],
      swappingIndices: [],
      pivotIndices: [minIdx],
      sortedIndices: [...sortedIndices],
      codeLine: 1,
      description: `Starting pass ${i + 1}. Assume minimum element is at index ${minIdx} (value: ${arr[minIdx]}).`,
      comparisons,
      swaps,
      arrayAccesses: accesses,
    });

    for (let j = i + 1; j < n; j++) {
      comparisons++;
      accesses += 2;

      steps.push({
        array: [...arr],
        comparingIndices: [minIdx, j],
        swappingIndices: [],
        pivotIndices: [minIdx],
        sortedIndices: [...sortedIndices],
        codeLine: 3,
        description: `Comparing candidate min ${arr[minIdx]} (index ${minIdx}) with element ${arr[j]} (index ${j}).`,
        comparisons,
        swaps,
        arrayAccesses: accesses,
        soundValue: arr[j],
      });

      if (arr[j] < arr[minIdx]) {
        minIdx = j;
        steps.push({
          array: [...arr],
          comparingIndices: [],
          swappingIndices: [],
          pivotIndices: [minIdx],
          sortedIndices: [...sortedIndices],
          codeLine: 4,
          description: `Found new minimum: ${arr[minIdx]} at index ${minIdx}.`,
          comparisons,
          swaps,
          arrayAccesses: accesses,
          soundValue: arr[minIdx],
        });
      }
    }

    if (minIdx !== i) {
      const temp = arr[i];
      arr[i] = arr[minIdx];
      arr[minIdx] = temp;
      swaps++;
      accesses += 4;

      steps.push({
        array: [...arr],
        comparingIndices: [],
        swappingIndices: [i, minIdx],
        pivotIndices: [],
        sortedIndices: [...sortedIndices],
        codeLine: 5,
        description: `Swapped minimum ${arr[i]} into its sorted position at index ${i}.`,
        comparisons,
        swaps,
        arrayAccesses: accesses,
        soundValue: arr[i],
      });
    }

    sortedIndices.push(i);

    steps.push({
      array: [...arr],
      comparingIndices: [],
      swappingIndices: [],
      pivotIndices: [],
      sortedIndices: [...sortedIndices],
      codeLine: 6,
      description: `Index ${i} (value: ${arr[i]}) is now sorted.`,
      comparisons,
      swaps,
      arrayAccesses: accesses,
    });
  }

  sortedIndices.push(n - 1);
  steps.push({
    array: [...arr],
    comparingIndices: [],
    swappingIndices: [],
    pivotIndices: [],
    sortedIndices: [...sortedIndices],
    codeLine: 7,
    description: `Selection Sort complete! Sorted ${n} elements with ${comparisons} comparisons and ${swaps} swaps.`,
    comparisons,
    swaps,
    arrayAccesses: accesses,
  });

  return steps;
}
