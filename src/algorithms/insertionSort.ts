import { AnimationStep } from '../types';

export function generateInsertionSortSteps(initialArray: number[]): AnimationStep[] {
  const steps: AnimationStep[] = [];
  const arr = [...initialArray];
  const n = arr.length;
  let comparisons = 0;
  let swaps = 0;
  let accesses = 0;
  const sortedIndices: number[] = [0];

  steps.push({
    array: [...arr],
    comparingIndices: [],
    swappingIndices: [],
    pivotIndices: [],
    sortedIndices: [0],
    codeLine: 0,
    description: 'Starting Insertion Sort. First element is trivially sorted.',
    comparisons,
    swaps,
    arrayAccesses: accesses,
  });

  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;
    accesses++;

    steps.push({
      array: [...arr],
      comparingIndices: [],
      swappingIndices: [],
      pivotIndices: [i],
      sortedIndices: [...sortedIndices],
      codeLine: 1,
      description: `Selected key element ${key} at index ${i} to insert into sorted prefix [0..${i - 1}].`,
      comparisons,
      swaps,
      arrayAccesses: accesses,
      soundValue: key,
    });

    while (j >= 0) {
      comparisons++;
      accesses++;

      steps.push({
        array: [...arr],
        comparingIndices: [j, j + 1],
        swappingIndices: [],
        pivotIndices: [j + 1],
        sortedIndices: [...sortedIndices],
        codeLine: 3,
        description: `Comparing key ${key} with element ${arr[j]} at index ${j}.`,
        comparisons,
        swaps,
        arrayAccesses: accesses,
        soundValue: arr[j],
      });

      if (arr[j] > key) {
        arr[j + 1] = arr[j];
        swaps++;
        accesses += 2;

        steps.push({
          array: [...arr],
          comparingIndices: [],
          swappingIndices: [j, j + 1],
          pivotIndices: [],
          sortedIndices: [...sortedIndices],
          codeLine: 4,
          description: `Shifted element ${arr[j + 1]} one position right to index ${j + 1}.`,
          comparisons,
          swaps,
          arrayAccesses: accesses,
          soundValue: arr[j + 1],
        });
        j--;
      } else {
        break;
      }
    }

    arr[j + 1] = key;
    accesses++;
    if (!sortedIndices.includes(i)) sortedIndices.push(i);

    steps.push({
      array: [...arr],
      comparingIndices: [],
      swappingIndices: [j + 1],
      pivotIndices: [],
      sortedIndices: Array.from({ length: i + 1 }, (_, idx) => idx),
      codeLine: 5,
      description: `Inserted key ${key} into position ${j + 1}. Prefix [0..${i}] is now sorted.`,
      comparisons,
      swaps,
      arrayAccesses: accesses,
      soundValue: key,
    });
  }

  const allSorted = Array.from({ length: n }, (_, idx) => idx);
  steps.push({
    array: [...arr],
    comparingIndices: [],
    swappingIndices: [],
    pivotIndices: [],
    sortedIndices: allSorted,
    codeLine: 6,
    description: `Insertion Sort complete! Sorted ${n} elements with ${comparisons} comparisons and ${swaps} shifts.`,
    comparisons,
    swaps,
    arrayAccesses: accesses,
  });

  return steps;
}
