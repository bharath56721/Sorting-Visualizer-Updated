import { AnimationStep } from '../types';

export function generateBubbleSortSteps(initialArray: number[]): AnimationStep[] {
  const steps: AnimationStep[] = [];
  const arr = [...initialArray];
  const n = arr.length;
  let comparisons = 0;
  let swaps = 0;
  let accesses = 0;
  const sortedIndices: number[] = [];

  // Initial snapshot
  steps.push({
    array: [...arr],
    comparingIndices: [],
    swappingIndices: [],
    pivotIndices: [],
    sortedIndices: [],
    codeLine: 0,
    description: 'Starting Bubble Sort. Array is initially unsorted.',
    comparisons,
    swaps,
    arrayAccesses: accesses,
  });

  for (let i = 0; i < n - 1; i++) {
    let swappedInPass = false;

    steps.push({
      array: [...arr],
      comparingIndices: [],
      swappingIndices: [],
      pivotIndices: [],
      sortedIndices: [...sortedIndices],
      codeLine: 1,
      description: `Starting pass ${i + 1} of ${n - 1}. Checking elements from index 0 to ${n - i - 2}.`,
      comparisons,
      swaps,
      arrayAccesses: accesses,
    });

    for (let j = 0; j < n - i - 1; j++) {
      comparisons++;
      accesses += 2;

      // Comparing step
      steps.push({
        array: [...arr],
        comparingIndices: [j, j + 1],
        swappingIndices: [],
        pivotIndices: [],
        sortedIndices: [...sortedIndices],
        codeLine: 3,
        description: `Comparing elements ${arr[j]} at index ${j} and ${arr[j + 1]} at index ${j + 1}.`,
        comparisons,
        swaps,
        arrayAccesses: accesses,
        soundValue: arr[j],
      });

      if (arr[j] > arr[j + 1]) {
        // Swap
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        swaps++;
        accesses += 4;
        swappedInPass = true;

        steps.push({
          array: [...arr],
          comparingIndices: [],
          swappingIndices: [j, j + 1],
          pivotIndices: [],
          sortedIndices: [...sortedIndices],
          codeLine: 4,
          description: `Swapped ${temp} and ${arr[j]} because ${temp} > ${arr[j]}.`,
          comparisons,
          swaps,
          arrayAccesses: accesses,
          soundValue: arr[j + 1],
        });
      }
    }

    // Element at n - 1 - i is now in its final sorted position
    sortedIndices.push(n - 1 - i);

    steps.push({
      array: [...arr],
      comparingIndices: [],
      swappingIndices: [],
      pivotIndices: [],
      sortedIndices: [...sortedIndices],
      codeLine: 5,
      description: `Element ${arr[n - 1 - i]} bubbled to its final sorted position at index ${n - 1 - i}.`,
      comparisons,
      swaps,
      arrayAccesses: accesses,
      soundValue: arr[n - 1 - i],
    });

    if (!swappedInPass) {
      // Early exit optimization
      for (let k = 0; k < n - 1 - i; k++) {
        if (!sortedIndices.includes(k)) sortedIndices.push(k);
      }
      steps.push({
        array: [...arr],
        comparingIndices: [],
        swappingIndices: [],
        pivotIndices: [],
        sortedIndices: [...sortedIndices],
        codeLine: 6,
        description: 'No swaps occurred during this pass. The array is already completely sorted (Early Exit).',
        comparisons,
        swaps,
        arrayAccesses: accesses,
      });
      break;
    }
  }

  // Ensure all marked sorted
  for (let k = 0; k < n; k++) {
    if (!sortedIndices.includes(k)) sortedIndices.push(k);
  }

  steps.push({
    array: [...arr],
    comparingIndices: [],
    swappingIndices: [],
    pivotIndices: [],
    sortedIndices: [...sortedIndices],
    codeLine: 7,
    description: `Bubble Sort complete! Sorted ${n} elements with ${comparisons} comparisons and ${swaps} swaps.`,
    comparisons,
    swaps,
    arrayAccesses: accesses,
  });

  return steps;
}
