const fs = require('fs');

const puzzle = fs.readFileSync('puzzle.txt', 'utf8');
const testPuzzle = fs.readFileSync('testpuzzle.txt', 'utf8');

const crabsPosition = puzzle.split(',').map(str => parseInt(str));

let positionsAllSum = [];

const countCheapMove = () => {
  const maxNum = Math.max(...crabsPosition);

  for (let i = 0; i < maxNum; i++) {
    let positionsSum = 0;
    for (let j = 0; j < crabsPosition.length; j++) {
      let distance = Math.abs(i - crabsPosition[j]);
      let biggerDistance = 0;

      for (let x = 1; x <= distance; x++) {
        biggerDistance = biggerDistance + x
      }
      positionsSum = positionsSum + biggerDistance;
    }
    positionsAllSum.push(positionsSum);
  }
  const min = Math.min(...positionsAllSum);
  return min;
}

console.log(countCheapMove());