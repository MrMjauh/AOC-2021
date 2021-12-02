import dataArray from './data.js'

const recursivePositionCalculator1 = (arr, depth = 0, forward = 0) => {
  const val = +arr[0].match(/\d/);
  if(/forward/i.test(arr[0])) {
    return recursivePositionCalculator1(arr.slice(1), depth, forward + val);
  }
  if(/down/i.test(arr[0])) {
    return recursivePositionCalculator1(arr.slice(1), depth + val, forward);
  }
  if(/up/i.test(arr[0])) {
    return recursivePositionCalculator1(arr.slice(1), depth - val, forward);
  }
  return depth * forward;
}

const recursivePositionCalculator2 = (arr, depth = 0, forward = 0, aim = 0) => {
  const val = +arr[0].match(/\d/);
  if (/forward/i.test(arr[0])) {
    return recursivePositionCalculator2(arr.slice(1), (depth + (aim * val)), forward + val, aim);
  }
  if (/down/i.test(arr[0])) {
    return recursivePositionCalculator2(arr.slice(1), depth, forward, aim + val);
  }
  if (/up/i.test(arr[0])) {
    return recursivePositionCalculator2(arr.slice(1), depth, forward, aim - val);
  }
  return depth * forward;
}

// console.log(recursivePositionCalculator1(dataArray));
console.log(recursivePositionCalculator2(dataArray));