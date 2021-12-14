const fs = require('fs');

const report = fs.readFileSync('puzzle.txt', 'utf8');
const reportArr = report.split('\n').map(number => number.trim());

const arrLength = reportArr.length;
const numLength = reportArr[0].length;

const gammaRateBin = () => {
  let maxBitArr = [];
  for (let i = 0; i < numLength; i++) {
    let zeroSum = 0;
    let oneSum = 0;
    for (let j = 0; j < arrLength; j++) {
      if (reportArr[j][i] === '0') {
        zeroSum++
      } else (oneSum++);
    }
    if (zeroSum > oneSum) {
      maxBitArr.push(0)
    } else (maxBitArr.push(1))
  }
  return maxBitArr;
}

const epsilonRateBin = () => {
  let maxBitArr = [];
  gammaRateBin().forEach(num => {
    if (num === 1) {
      maxBitArr.push(0)
    } else (maxBitArr.push(1));
  });
  return maxBitArr;
};

const lifeReadings = (arr, bit, type) => {
  let zeroNumSum = [];
  let oneNumSum = [];
  
  while (arr.length > 1) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i][bit] === '0') {
        zeroNumSum.push(arr[i]);
      } else (oneNumSum.push(arr[i]))
    }
    
    let newBit = bit +=1

    if (type === 'o2') {
      if (zeroNumSum.length > oneNumSum.length) {
        return lifeReadings(zeroNumSum, newBit, 'o2') 
      } else if (zeroNumSum.length <= oneNumSum.length) {
        return lifeReadings(oneNumSum, newBit, 'o2');
      }
    }
    if (type === 'co2') {
      if (zeroNumSum.length > oneNumSum.length) {
        return lifeReadings(oneNumSum, newBit, 'co2') 
      } else if (zeroNumSum.length <= oneNumSum.length) {
        return lifeReadings(zeroNumSum, newBit, 'co2');
      }
    }
  } return arr;
};

const gammaRateDec = parseInt(gammaRateBin().join(''), 2)
const epsilonRate = parseInt(epsilonRateBin().join(''), 2)

const oxygenGenerator = parseInt(lifeReadings(reportArr, 0, 'o2').join(''), 2);
const Co2Scrubber = parseInt(lifeReadings(reportArr, 0, 'co2').join(''), 2);

const powerConsumption = gammaRateDec * epsilonRate;
console.log(powerConsumption);

const lifeSupportRating = oxygenGenerator * Co2Scrubber
console.log(lifeSupportRating);



