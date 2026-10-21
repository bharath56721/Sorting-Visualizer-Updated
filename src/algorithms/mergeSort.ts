import { AnimationStep } from '../types';

export function generateMergeSortSteps(initialArray: number[]): AnimationStep[] {
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
    description: 'Starting Merge Sort. Recursively splitting array into halves.',
    comparisons,
    swaps,
    arrayAccesses: accesses,
  });

  function merge(start: number, mid: number, end: number) {
    const leftArr = arr.slice(start, mid + 1);
    const rightArr = arr.slice(mid + 1, end + 1);
    accesses += end - start + 1;

    let i = 0;
    let j = 0;
    let k = start;

    steps.push({
      array: [...arr],
      comparingIndices: [],
      swappingIndices: [],
      pivotIndices: [],
      sortedIndices: [...sortedIndices],
      activeRange: [start, end],
      codeLine: 3,
      description: `Merging sub-arrays [${start}..${mid}] and [${mid + 1}..${end}].`,
      comparisons,
      swaps,
      arrayAccesses: accesses,
    });

    while (i < leftArr.length && j < rightArr.length) {
      comparisons++;
      accesses += 2;

      steps.push({
        array: [...arr],
        comparingIndices: [start + i, mid + 1 + j],
        swappingIndices: [],
        pivotIndices: [],
        sortedIndices: [...sortedIndices],
        activeRange: [start, end],
        codeLine: 4,
        description: `Comparing ${leftArr[i]} from left and ${rightArr[j]} from right.`,
        comparisons,
        swaps,
        arrayAccesses: accesses,
        soundValue: leftArr[i],
      });

      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i];
        swaps++;
        accesses++;

        steps.push({
          array: [...arr],
          comparingIndices: [],
          swappingIndices: [k],
          pivotIndices: [],
          sortedIndices: [...sortedIndices],
          activeRange: [start, end],
          codeLine: 5,
          description: `Placed ${leftArr[i]} at merged position ${k}.`,
          comparisons,
          swaps,
          arrayAccesses: accesses,
          soundValue: arr[k],
        });
        i++;
      } else {
        arr[k] = rightArr[j];
        swaps++;
        accesses++;

        steps.push({
          array: [...arr],
          comparingIndices: [],
          swappingIndices: [k],
          pivotIndices: [],
          sortedIndices: [...sortedIndices],
          activeRange: [start, end],
          codeLine: 5,
          description: `Placed ${rightArr[j]} at merged position ${k}.`,
          comparisons,
          swaps,
          arrayAccesses: accesses,
          soundValue: arr[k],
        });
        j++;
      }
      k++;
    }

    while (i < leftArr.length) {
      arr[k] = leftArr[i];
      swaps++;
      accesses += 2;

      steps.push({
        array: [...arr],
        comparingIndices: [],
        swappingIndices: [k],
        pivotIndices: [],
        sortedIndices: [...sortedIndices],
        activeRange: [start, end],
        codeLine: 6,
        description: `Flushed remaining left element ${leftArr[i]} to position ${k}.`,
        comparisons,
        swaps,
        arrayAccesses: accesses,
        soundValue: arr[k],
      });
      i++;
      k++;
    }

    while (j < rightArr.length) {
      arr[k] = rightArr[j];
      swaps++;
      accesses += 2;

      steps.push({
        array: [...arr],
        comparingIndices: [],
        swappingIndices: [k],
        pivotIndices: [],
        sortedIndices: [...sortedIndices],
        activeRange: [start, end],
        codeLine: 6,
        description: `Flushed remaining right element ${rightArr[j]} to position ${k}.`,
        comparisons,
        swaps,
        arrayAccesses: accesses,
        soundValue: arr[k],
      });
      j++;
      k++;
    }

    // If whole array merged, mark all sorted
    if (start === 0 && end === n - 1) {
      for (let idx = 0; idx < n; idx++) {
        if (!sortedIndices.includes(idx)) sortedIndices.push(idx);
      }
    }
  }

  function mergeSortHelper(start: number, end: number) {
    if (start >= end) return;

    const mid = Math.floor((start + end) / 2);

    steps.push({
      array: [...arr],
      comparingIndices: [],
      swappingIndices: [],
      pivotIndices: [mid],
      sortedIndices: [...sortedIndices],
      activeRange: [start, end],
      codeLine: 1,
      description: `Dividing range [${start}..${end}] at midpoint index ${mid}.`,
      comparisons,
      swaps,
      arrayAccesses: accesses,
      soundValue: arr[mid],
    });

    mergeSortHelper(start, mid);
    mergeSortHelper(mid + 1, end);
    merge(start, mid, end);
  }

  mergeSortHelper(0, n - 1);

  const allSorted = Array.from({ length: n }, (_, idx) => idx);
  steps.push({
    array: [...arr],
    comparingIndices: [],
    swappingIndices: [],
    pivotIndices: [],
    sortedIndices: allSorted,
    codeLine: 7,
    description: `Merge Sort complete! Array sorted with ${comparisons} comparisons and ${swaps} writes.`,
    comparisons,
    swaps,
    arrayAccesses: accesses,
  });

  return steps;
}
