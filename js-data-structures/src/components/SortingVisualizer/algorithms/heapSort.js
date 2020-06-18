function parent(i) {
  return [i / 2];
}

function left(i) {
  return 2 * i;
}

function right(i) {
  return 2 * i + 1;
}

function maxHeapify(arr, i, animations) {
  var l = left(i);
  var r = right(i);
  var largest;
  if (l < arr.heapSize && arr[l] > arr[i]) {
    largest = l;
  } else {
    largest = i;
  }
  if (r < arr.heapSize && arr[r] > arr[largest]) {
    largest = r;
  }

  if (largest !== i) {
    swap(arr, i, largest);
    if (largest > 0) {
      animations.push([i, largest]);
      animations.push([i, largest]);
    }
    maxHeapify(arr, largest, animations);
  }
}

function buildMaxHeap(arr, animations) {
  arr.heapSize = arr.length;
  for (let i = arr.length / 2; 0 <= i; i -= 1) {
    maxHeapify(arr, i, animations);
  }
  return arr;
}

export default function heapSort(arr) {
  const middleArray = arr.slice();
  const animations = [];
  buildMaxHeap(middleArray, animations);
  for (let i = middleArray.length - 1; 0 < i; i--) {
    swap(middleArray, i, 0);
    animations.push([i, 0]);
    animations.push([i, 0]);
    middleArray.heapSize = middleArray.heapSize - 1;
    maxHeapify(middleArray, 0, animations);
  }
  return animations;
}

function swap(arr, a, b) {
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}
