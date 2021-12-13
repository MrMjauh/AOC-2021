import { dataArray } from "./data.js";

const recursiveIncrease = (prev, arr, count) => {
  if (arr.length > 0) {
    if (arr[0] > prev) {
      return recursiveIncrease(arr[0], arr.slice(1), count + 1);
    }
    return recursiveIncrease(arr[0], arr.slice(1), count);
  }
  return count;
}

const recursiveGroupIncrease = (prev, arr, count) => {
  if (arr.length > 2) {
    const newSum = arr[0] + arr[1] + arr[2];
    if (newSum > prev) {
      return recursiveGroupIncrease(newSum, arr.slice(1), count + 1);
    }
    return recursiveGroupIncrease(newSum, arr.slice(1), count)
  }
  return count;
}
const findIncreases = (arr) => recursiveIncrease(arr[0], arr.slice(1), 0);
const findGroupIncreases = (arr) => recursiveGroupIncrease((arr[0] + arr[1] + arr[2]), arr.slice(1), 0);


// console.log(findIncreases(dataArray));
console.log(findGroupIncreases(dataArray));