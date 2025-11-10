export const bubbleSort = (arr, key) => {
  if (!Array.isArray(arr) || arr.length <= 1) return arr;

  const sortedArr = [...arr]; // avoid mutating original array
  let n = sortedArr.length;
  let swapped;

  do {
    swapped = false;
    for (let i = 0; i < n - 1; i++) {
      const a = sortedArr[i][key] ?? "";
      const b = sortedArr[i + 1][key] ?? "";

      if (a > b) {
        // swap
        [sortedArr[i], sortedArr[i + 1]] = [sortedArr[i + 1], sortedArr[i]];
        swapped = true;
      }
    }
    n--; // each pass places largest element at end
  } while (swapped);

  return sortedArr;
};