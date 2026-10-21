import { AnimationStep } from '../types';

export function generateHeapSortSteps(initialArray: number[]): AnimationStep[] {
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
    description: 'Starting Heap Sort. Step 1: Build max-heap representation from unordered array.',
    comparisons,
    swaps,
    arrayAccesses: accesses,
  });

  function heapify(size: number, rootIdx: number) {
    let largest = rootIdx;
    const left = 2 * rootIdx + 1;
    const right = 2 * rootIdx + 2;

    steps.push({
      array: [...arr],
      comparingIndices: [],
      swappingIndices: [],
      pivotIndices: [rootIdx],
      sortedIndices: [...sortedIndices],
      codeLine: 3,
      description: `Examining subtree at root index ${rootIdx} (value: ${arr[rootIdx]}).`,
      comparisons,
      swaps,
      arrayAccesses: accesses,
      soundValue: arr[rootIdx],
    });

    if (left < size) {
      comparisons++;
      accesses += 2;
      steps.push({
        array: [...arr],
        comparingIndices: [left, largest],
        swappingIndices: [],
        pivotIndices: [rootIdx],
        sortedIndices: [...sortedIndices],
        codeLine: 4,
        description: `Comparing left child ${arr[left]} (index ${left}) with largest ${arr[largest]} (index ${largest}).`,
        comparisons,
        swaps,
        arrayAccesses: accesses,
        soundValue: arr[left],
      });

      if (arr[left] > arr[largest]) {
        largest = left;
      }
    }

    if (right < size) {
      comparisons++;
      accesses += 2;
      steps.push({
        array: [...arr],
        comparingIndices: [right, largest],
        swappingIndices: [],
        pivotIndices: [rootIdx],
        sortedIndices: [...sortedIndices],
        codeLine: 4,
        description: `Comparing right child ${arr[right]} (index ${right}) with largest ${arr[largest]} (index ${largest}).`,
        comparisons,
        swaps,
        arrayAccesses: accesses,
        soundValue: arr[right],
      });

      if (arr[right] > arr[largest]) {
        largest = right;
      }
    }

    if (largest !== rootIdx) {
      const temp = arr[rootIdx];
      arr[rootIdx] = arr[largest];
      arr[largest] = temp;
      swaps++;
      accesses += 4;

      steps.push({
        array: [...arr],
        comparingIndices: [],
        swappingIndices: [rootIdx, largest],
        pivotIndices: [],
        sortedIndices: [...sortedIndices],
        codeLine: 5,
        description: `Swapped root ${temp} with larger child ${arr[rootIdx]} to maintain max-heap property.`,
        comparisons,
        swaps,
        arrayAccesses: accesses,
        soundValue: arr[rootIdx],
      });

      heapify(size, largest);
    }
  }

  // Step 1: Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(n, i);
  }

  steps.push({
    array: [...arr],
    comparingIndices: [],
    swappingIndices: [],
    pivotIndices: [0],
    sortedIndices: [],
    codeLine: 1,
    description: `Max-heap constructed. Root ${arr[0]} is the overall maximum element.`,
    comparisons,
    swaps,
    arrayAccesses: accesses,
    soundValue: arr[0],
  });

  // Step 2: Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    // Swap root (maximum) to end
    const temp = arr[0];
    arr[0] = arr[i];
    arr[i] = temp;
    swaps++;
    accesses += 4;

    sortedIndices.push(i);

    steps.push({
      array: [...arr],
      comparingIndices: [],
      swappingIndices: [0, i],
      pivotIndices: [],
      sortedIndices: [...sortedIndices],
      codeLine: 2,
      description: `Moved maximum element ${arr[i]} to end index ${i} (now sorted).`,
      comparisons,
      swaps,
      arrayAccesses: accesses,
      soundValue: arr[i],
    });

    heapify(i, 0);
  }

  sortedIndices.push(0);

  const allSorted = Array.from({ length: n }, (_, idx) => idx);
  steps.push({
    array: [...arr],
    comparingIndices: [],
    swappingIndices: [],
    pivotIndices: [],
    sortedIndices: allSorted,
    codeLine: 6,
    description: `Heap Sort complete! Sorted ${n} elements with ${comparisons} comparisons and ${swaps} swaps.`,
    comparisons,
    swaps,
    arrayAccesses: accesses,
  });

  return steps;
}
