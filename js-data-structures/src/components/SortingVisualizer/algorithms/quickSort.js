export default function quickSort(array) {
  const animations = [];
  const middleArray = array.slice();
  quickSortHelper(middleArray, 0, array.length - 1, animations);
  return animations;
}

function partition(array, startIdx, endIdx, animations) {
  let pivotIndex = startIdx;
  let pivotValue = array[endIdx];
  for (let i = startIdx; i < endIdx; i++) {
    animations.push([pivotIndex, i, 0]);
    animations.push([pivotIndex, i, 0]);
    if (array[i] < pivotValue) {
      swap(array, i, pivotIndex);
      animations.push([pivotIndex, i, 1]);
      animations.push([pivotIndex, i, 1]);
      pivotIndex++;
    }
  }

  swap(array, pivotIndex, endIdx);
  animations.push([pivotIndex, endIdx, 1]);
  animations.push([pivotIndex, endIdx, 1]);
  return pivotIndex;
}

function quickSortHelper(array, startIdx, endIdx, animations) {
  if (startIdx >= endIdx) return;
  let index = partition(array, startIdx, endIdx, animations);
  quickSortHelper(array, startIdx, index - 1, animations);
  quickSortHelper(array, index + 1, endIdx, animations);
}

function swap(array, i, j) {
  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}
