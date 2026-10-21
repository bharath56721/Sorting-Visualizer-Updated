import { AlgorithmId, AlgorithmMetadata, AnimationStep, BugRecord } from '../types';
import { generateBubbleSortSteps } from './bubbleSort';
import { generateSelectionSortSteps } from './selectionSort';
import { generateInsertionSortSteps } from './insertionSort';
import { generateMergeSortSteps } from './mergeSort';
import { generateQuickSortSteps } from './quickSort';
import { generateHeapSortSteps } from './heapSort';

export const ALGORITHMS: Record<AlgorithmId, AlgorithmMetadata> = {
  bubble: {
    id: 'bubble',
    name: 'Bubble Sort',
    shortName: 'Bubble',
    tagline: 'Simple comparison sort that repeatedly steps through the list, swapping adjacent elements if out of order.',
    complexity: {
      timeWorst: 'O(N²)',
      timeAverage: 'Θ(N²)',
      timeBest: 'Ω(N)',
      spaceWorst: 'O(1)',
      stable: true,
      inPlace: true,
      description: 'Iteratively sweeps through adjacent pairs. Large elements "bubble" up to the right.',
      bestCaseDescription: 'Already sorted array with early-exit flag triggered on pass 1.',
      worstCaseDescription: 'Completely reversed array where every pair must be swapped.',
    },
    pseudocode: [
      { text: 'function bubbleSort(array):', indent: 0 },
      { text: '  for i from 0 to n - 1:', indent: 1 },
      { text: '    swapped = false', indent: 2 },
      { text: '    for j from 0 to n - i - 2:', indent: 2 },
      { text: '      if array[j] > array[j + 1]: swap(j, j + 1); swapped = true', indent: 3 },
      { text: '    mark array[n - 1 - i] as sorted', indent: 2 },
      { text: '    if not swapped: break', indent: 2 },
      { text: '  return array', indent: 1 },
    ],
  },
  selection: {
    id: 'selection',
    name: 'Selection Sort',
    shortName: 'Selection',
    tagline: 'In-place comparison sort that repeatedly selects the minimum element from the unsorted part.',
    complexity: {
      timeWorst: 'O(N²)',
      timeAverage: 'Θ(N²)',
      timeBest: 'Ω(N²)',
      spaceWorst: 'O(1)',
      stable: false,
      inPlace: true,
      description: 'Divides the list into sorted and unsorted regions. Appends minimum remaining item each pass.',
      bestCaseDescription: 'Always takes O(N²) because it must scan the entire unsorted region regardless of initial order.',
      worstCaseDescription: 'Array reversed or arbitrarily disordered.',
    },
    pseudocode: [
      { text: 'function selectionSort(array):', indent: 0 },
      { text: '  for i from 0 to n - 2:', indent: 1 },
      { text: '    minIdx = i', indent: 2 },
      { text: '    for j from i + 1 to n - 1:', indent: 2 },
      { text: '      if array[j] < array[minIdx]: minIdx = j', indent: 3 },
      { text: '    if minIdx != i: swap(array[i], array[minIdx])', indent: 2 },
      { text: '    mark array[i] as sorted', indent: 2 },
      { text: '  return array', indent: 1 },
    ],
  },
  insertion: {
    id: 'insertion',
    name: 'Insertion Sort',
    shortName: 'Insertion',
    tagline: 'Builds the final sorted array one item at a time, highly efficient for nearly sorted or small datasets.',
    complexity: {
      timeWorst: 'O(N²)',
      timeAverage: 'Θ(N²)',
      timeBest: 'Ω(N)',
      spaceWorst: 'O(1)',
      stable: true,
      inPlace: true,
      description: 'Shifts larger elements to make room for current key element in the sorted prefix.',
      bestCaseDescription: 'Nearly or fully sorted array where inner while loop terminates in O(1) time per item.',
      worstCaseDescription: 'Reversed array where every element must shift across the entire sorted prefix.',
    },
    pseudocode: [
      { text: 'function insertionSort(array):', indent: 0 },
      { text: '  for i from 1 to n - 1:', indent: 1 },
      { text: '    key = array[i]; j = i - 1', indent: 2 },
      { text: '    while j >= 0 and array[j] > key:', indent: 2 },
      { text: '      array[j + 1] = array[j]; j = j - 1', indent: 3 },
      { text: '    array[j + 1] = key', indent: 2 },
      { text: '  return array', indent: 1 },
    ],
  },
  merge: {
    id: 'merge',
    name: 'Merge Sort',
    shortName: 'Merge',
    tagline: 'Efficient, general-purpose, comparison-based divide and conquer sorting algorithm.',
    complexity: {
      timeWorst: 'O(N log N)',
      timeAverage: 'Θ(N log N)',
      timeBest: 'Ω(N log N)',
      spaceWorst: 'O(N)',
      stable: true,
      inPlace: false,
      description: 'Recursively splits array in half, sorts each half, and merges the two sorted halves.',
      bestCaseDescription: 'Guaranteed O(N log N) time complexity across all inputs.',
      worstCaseDescription: 'Guaranteed O(N log N) time complexity across all inputs.',
    },
    pseudocode: [
      { text: 'function mergeSort(array, start, end):', indent: 0 },
      { text: '  if start >= end: return', indent: 1 },
      { text: '  mid = floor((start + end) / 2)', indent: 1 },
      { text: '  mergeSort(array, start, mid)', indent: 1 },
      { text: '  mergeSort(array, mid + 1, end)', indent: 1 },
      { text: '  merge(array, start, mid, end)', indent: 1 },
      { text: 'function merge(array, start, mid, end):', indent: 0 },
      { text: '  // Combine two sorted halves into single sequence', indent: 1 },
    ],
  },
  quick: {
    id: 'quick',
    name: 'Quick Sort',
    shortName: 'Quick',
    tagline: 'High-performance divide and conquer algorithm that picks a pivot and partitions the elements around it.',
    complexity: {
      timeWorst: 'O(N²)',
      timeAverage: 'Θ(N log N)',
      timeBest: 'Ω(N log N)',
      spaceWorst: 'O(log N)',
      stable: false,
      inPlace: true,
      description: 'Picks an element as pivot and partitions array so elements smaller are left, greater are right.',
      bestCaseDescription: 'Balanced partitions where pivot consistently splits the array in half.',
      worstCaseDescription: 'Already sorted or reverse sorted with unbalanced pivot choice (e.g. extremes).',
    },
    pseudocode: [
      { text: 'function quickSort(array, low, high):', indent: 0 },
      { text: '  if low < high:', indent: 1 },
      { text: '    pivotIndex = partition(array, low, high)', indent: 2 },
      { text: '    quickSort(array, low, pivotIndex - 1)', indent: 2 },
      { text: '    quickSort(array, pivotIndex + 1, high)', indent: 2 },
      { text: 'function partition(array, low, high):', indent: 0 },
      { text: '  // Place pivot in correct spot & rearrange elements', indent: 1 },
      { text: '  return pivotIndex', indent: 1 },
    ],
  },
  heap: {
    id: 'heap',
    name: 'Heap Sort',
    shortName: 'Heap',
    tagline: 'Comparison-based sort using a binary heap data structure to extract the maximum element repeatedly.',
    complexity: {
      timeWorst: 'O(N log N)',
      timeAverage: 'Θ(N log N)',
      timeBest: 'Ω(N log N)',
      spaceWorst: 'O(1)',
      stable: false,
      inPlace: true,
      description: 'Builds a max heap from the array, then repeatedly swaps root to the end and heapifies.',
      bestCaseDescription: 'Guaranteed O(N log N) performance with minimal auxiliary memory.',
      worstCaseDescription: 'Guaranteed O(N log N) performance regardless of data distribution.',
    },
    pseudocode: [
      { text: 'function heapSort(array):', indent: 0 },
      { text: '  buildMaxHeap(array)', indent: 1 },
      { text: '  for i from n - 1 down to 1:', indent: 1 },
      { text: '    swap(array[0], array[i])', indent: 2 },
      { text: '    maxHeapify(array, size=i, root=0)', indent: 2 },
      { text: 'function maxHeapify(array, size, root):', indent: 0 },
      { text: '  // Sift down larger elements to satisfy heap condition', indent: 1 },
    ],
  },
};

export function getStepsForAlgorithm(id: AlgorithmId, array: number[]): AnimationStep[] {
  switch (id) {
    case 'bubble':
      return generateBubbleSortSteps(array);
    case 'selection':
      return generateSelectionSortSteps(array);
    case 'insertion':
      return generateInsertionSortSteps(array);
    case 'merge':
      return generateMergeSortSteps(array);
    case 'quick':
      return generateQuickSortSteps(array);
    case 'heap':
      return generateHeapSortSteps(array);
    default:
      return generateBubbleSortSteps(array);
  }
}

export const IDENTIFIED_BUGS: BugRecord[] = [
  {
    file: 'main.js (line 61)',
    title: 'Fatal TypeError on Button Click',
    severity: 'Critical',
    originalCodeSnippet: 'algorithms[activeAlgorithm]().finally(finishSorting);',
    issueDescription: 'Sorting functions (Bubble, Insertion, etc.) did not return a Promise (returned undefined). Calling .finally() threw an unhandled TypeError: "Cannot read properties of undefined (reading \'finally\')", immediately crashing the sorting execution on the first click.',
    fixedImplementation: 'Re-architected sorting execution into a robust step-driven engine with synchronous generation and requestAnimationFrame/interval playback, eliminating promise dependency and enabling pause/resume/scrubbing.',
  },
  {
    file: 'visualizations.js (line 33)',
    title: 'Invalid DOM TokenList Assignment',
    severity: 'Critical',
    originalCodeSnippet: 'butts_algos[i].classList = [];',
    issueDescription: 'DOMTokenList classList is read-only in modern browser DOM implementations. Assigning an empty array throws a TypeError in strict mode or fails silently, leaving locked CSS classes stuck on the buttons.',
    fixedImplementation: 'Clean declarative state management where button disable/active states are bound to reactive state properties (isSorting, isPaused, activeAlgorithm) with proper accessible attributes.',
  },
  {
    file: 'visualizations.js (lines 24-28) & main.js',
    title: 'Reset Button Did Not Stop In-Flight Animations',
    severity: 'Major',
    originalCodeSnippet: 'window.setTimeout(function(){ ... }, c_delay+=delay_time); // Not tracked in activeTimeouts',
    issueDescription: 'While main.js had a resetEverything() function iterating activeTimeouts, div_update called window.setTimeout directly without pushing timeout IDs into activeTimeouts. Consequently, pressing Reset never cancelled pending callbacks, leading to race conditions where old timeouts overwrote newly generated arrays.',
    fixedImplementation: 'Integrated a controllable playback loop where pause, step, and reset instantly cancel active timers and reset the visual state to step 0 in 0ms.',
  },
  {
    file: 'heap_sort.js (lines 80-87)',
    title: 'Heap Sort Color State Flashing & Overwrite',
    severity: 'Major',
    originalCodeSnippet: `div_update(divs[i],div_sizes[i],"green");
div_update(divs[i],div_sizes[i],"yellow");
max_heapify(i,0);
div_update(divs[i],div_sizes[i],"blue");
div_update(divs[i],div_sizes[i],"green");`,
    issueDescription: 'In the main extraction loop, the element at index i was set to green, immediately overwritten to yellow, sifted down, set to blue, then back to green. This caused distracting color artifacts, and the final element at index 0 had index out-of-bounds in div_update outside the loop.',
    fixedImplementation: 'Refactored heap sort to clearly highlight the root being extracted, animate sifting down in the active heap size [0..i-1], and permanently lock sorted elements at the tail [i..n-1] in green.',
  },
  {
    file: 'quick_sort.js (lines 43-48)',
    title: 'Quick Sort Premature "Sorted" Marking',
    severity: 'Major',
    originalCodeSnippet: 'for(var t=start;t<=i;t++) { div_update(divs[t],div_sizes[t],"green"); }',
    issueDescription: 'In quick_partition, every bar from start to i was marked green as "sorted" after the first partition! In reality, only the pivot element is in its final sorted position; the left sub-array is still unordered and yet to be processed by recursive partition calls.',
    fixedImplementation: 'Properly tracked only confirmed sorted pivot indices after partition placement, and marked the entire array sorted only when recursion terminates.',
  },
  {
    file: 'Project Architecture / index.html / src/App.tsx',
    title: 'Vanilla JS Files Disconnected from React SPA Pipeline',
    severity: 'Critical',
    originalCodeSnippet: 'App.tsx returned <div></div>, while index.html had Vite entry point',
    issueDescription: 'The user uploaded raw vanilla HTML/CSS/JS files, but Vite served the React root from App.tsx which was an empty div. None of the visualization scripts or CSS were connected or compiled.',
    fixedImplementation: 'Re-implemented the entire sorting visualizer as a sleek, modular React 19 application with full feature parity, audio synthesis, scrub controls, and complexity cards.',
  },
];
