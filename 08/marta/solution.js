const fs = require('fs');

const puzzle = fs.readFileSync('puzzle.txt', 'utf8');
const testPuzzle = fs.readFileSync('testpuzzle.txt', 'utf8');

const lines = puzzle
  .split('\r\n')
  .map(line => line.split('|'))

let sum = 0;

const uniqSumGetter = () => {
  for (let i = 0; i < lines.length; i++) {
    let numbers = lines[i][1].trim().split(' ');
    for (let j = 0; j < numbers.length; j++) {
      if (numbers[j].length === 2 || numbers[j].length === 3 || numbers[j].length === 4 || numbers[j].length === 7) {
        sum = sum + 1;
      }
    }
  }
  return sum;
}

const sortAlphabetically = word => {
  return word.split('').sort().join('');
};

const includesLetters = (letters, word) => {
  for (const letter of letters.split("")) {
    if (!word.includes(letter)) {
      return false;
    }
  }
  return true;
}

const includesAmountOfLetters = (letters, word) => {
  sum = 0;
  for (const letter of letters.split("")) {
    if (word.includes(letter)) {
      sum++;
    }
  }
  return sum;
}

const decodeNums = () => {
  let numArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let strCode = '';
  let strNum = '';
  let allNumbers = []


  for (let i = 0; i < lines.length; i++) {
    let decoder = lines[i][0].trim().split(' ');
    let numbers = lines[i][1].trim().split(' ');
    let decodedNumber = '';

    for (let j = 0; j < decoder.length; j++) {
      strCode = sortAlphabetically(decoder[j]);
      if (strCode.length === 2 || strCode.length === 3 || strCode.length === 4 || strCode.length === 7) {

        if (strCode.length === 2) { numArr[1] = strCode }
        else if (strCode.length === 4) { numArr[4] = strCode }
        else if (strCode.length === 3) { numArr[7] = strCode }
        else if (strCode.length === 7) { numArr[8] = strCode }
      }
    }

    for (let y = 0; y < numbers.length; y++) {
      strNum = sortAlphabetically(numbers[y]);

      if (strNum.length === 2 || strNum.length === 3 || strNum.length === 4 || strNum.length === 7) {
        if (strNum.length === 2) { decodedNumber = decodedNumber + '1' }
        else if (strNum.length === 4) { decodedNumber = decodedNumber + '4' }
        else if (strNum.length === 3) { decodedNumber = decodedNumber + '7' }
        else if (strNum.length === 7) { decodedNumber = decodedNumber + '8' }
      }

      if (strNum.length === 6) {
        if (!includesLetters(numArr[1], strNum)) { decodedNumber = decodedNumber + '6' }
        else if (includesLetters(numArr[4], strNum)) { decodedNumber = decodedNumber + '9' }
        else { decodedNumber = decodedNumber + '0' }
      }
      else if (strNum.length === 5) {
        if (includesLetters(numArr[1], strNum)) {
          decodedNumber = decodedNumber + '3';
        }
        if (!includesLetters(numArr[1], strNum) && includesAmountOfLetters(numArr[4], strNum) === 3) {
          decodedNumber = decodedNumber + '5'
        }
        else if (!includesLetters(numArr[1], strNum) && includesAmountOfLetters(numArr[4], strNum) === 2) {
          decodedNumber = decodedNumber + '2';
        }
      }
    }
    allNumbers.push(decodedNumber)
  }
  return allNumbers
}

let totalSum = 0;

const decodedNums = decodeNums().forEach(num => {
  totalSum = totalSum + parseInt(num)
  return totalSum
})

console.log(totalSum);
