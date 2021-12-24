const fs = require('fs');

const puzzle = fs.readFileSync('puzzle.txt', 'utf8');
const testPuzzle = fs.readFileSync('testpuzzle.txt', 'utf8');

const fishesList = puzzle.split(',').map(str => parseInt(str));
let fishes = fishesList;
const days = 256;
let totalFishes = 0;

const totalOfFishes = (colony, numDays) => {
  let fishesAge = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  colony.forEach(fish => fishesAge[fish]++);

  for (let i = 0; i < numDays; i++) {
    let zeroFishes = fishesAge[0];
    for (let j = 0; j < fishesAge.length; j++) {
      if(j <= 7) {
        nextIndexValue = fishesAge[j+1];
        fishesAge[j] = nextIndexValue;
      }
    }
    fishesAge[6] = fishesAge[6] + zeroFishes;
    fishesAge[8] = zeroFishes;
  }

  for (let x = 0; x < fishesAge.length; x++) {
    totalFishes =totalFishes + fishesAge[x]
  }
  return totalFishes
}

console.log(totalOfFishes(fishes, days))






