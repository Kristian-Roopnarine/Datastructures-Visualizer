export default function insertionSort(array) {
  const animations = [];
  const middleArray = array.slice();
  for (let i = 0; i < array.length; i++) {
    let key = middleArray[i];
    let j = i - 1;
    while (j >= 0 && middleArray[j] > key) {
      middleArray[j + 1] = middleArray[j];
      j = j - 1;
      animations.push([j + 1, j + 2]);
      animations.push([j + 1, j + 2]);
    }
    middleArray[j + 1] = key;
  }
  return animations;
}
