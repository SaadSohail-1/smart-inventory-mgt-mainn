export const binarySearchByKey = (sortedArr, target, key) => {
  let l = 0, r = sortedArr.length - 1;
  while (l <= r) {
    const mid = Math.floor((l + r) / 2);
    if (sortedArr[mid][key] === target) return sortedArr[mid];
    if ((sortedArr[mid][key] || "") < (target || "")) l = mid + 1;
    else r = mid - 1;
  }
  return null;
};

export const linearSearch = (arr, predicate) => {
  for (let i = 0; i < arr.length; i++) if (predicate(arr[i], i)) return arr[i];
  return null;
};