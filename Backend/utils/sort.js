export const mergeSort = (arr, key) => {
  if (!Array.isArray(arr) || arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid), key);
  const right = mergeSort(arr.slice(mid), key);
  return merge(left, right, key);
};

const merge = (left, right, key) => {
  const result = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    const a = left[i][key];
    const b = right[j][key];
    if ((a || "") < (b || "")) result.push(left[i++]);
    else result.push(right[j++]);
  }
  return [...result, ...left.slice(i), ...right.slice(j)];
};
