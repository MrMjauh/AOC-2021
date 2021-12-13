const fs = require('fs');

const report = fs.readFileSync('puzzle.txt', 'utf8');
const depthReadArr  = report.split('\n').map(depthReadStr => parseInt(depthReadStr));

const totalIncNumbers = arr => {
  let totalIncNum = 0;
  for(let i = 0; i <= arr.length-1; i++) {
    if (arr[i] < arr[i+1]) {
      totalIncNum++;
    } 
  }
  return totalIncNum;
};

const totalTrioIncNumbers = arr => {
  let totalIncTrioNum = 0;
  for(let i = 0; i <= arr.length-1; i++) {
      let firstNum = arr[i];
      let lastNum = arr[i+3];
      if (firstNum < lastNum) {
        totalIncTrioNum++;
    };
  };
  return totalIncTrioNum;
};

console.log(totalIncNumbers(depthReadArr));
console.log(totalTrioIncNumbers(depthReadArr));
