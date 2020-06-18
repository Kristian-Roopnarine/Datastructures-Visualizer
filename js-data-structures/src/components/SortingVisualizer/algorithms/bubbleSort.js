export default function bubbleSort(array) {
  const animations = [];
  const middleArray = array.slice();
  for (let i = 0; i < middleArray.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (middleArray[j] > middleArray[j + 1]) {
        swap(middleArray, j, j + 1);
        animations.push([j, j + 1]);
        animations.push([j, j + 1]);
      }
    }
  }
  return animations;
}

function swap(arr, a, b) {
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}
