const fs = require('fs');

const puzzle = fs.readFileSync('puzzle.txt', 'utf8');

const hydroVents = puzzle.split('\r\n');

let diagram = [];

for (let x = 0; x <= 1000; x++) {
  diagram.push([])
  for (let y = 0; y <= 1000; y++) {
    diagram[x].push(0);
  };
};

const overlapCounter = arrays => {
  let sum = 0;
  for (let array of arrays) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === 2) {
        sum += 1;
      }
    }
  }
  return sum;
}

const drawLines = () => {
  for (let i = 0; i < hydroVents.length; i++) {

    let line = hydroVents[i].replace(' -> ', ',').split(',').map(num => parseInt(num));

    let xS = [line[0], line[2]].sort((a, b) => a - b);
    let yS = [line[1], line[3]].sort((a, b) => a - b);
    let x1 = xS[0];
    let x2 = xS[1];
    let y1 = yS[0];
    let y2 = yS[1];

    if (x1 === x2) {
      for (let y = y1; y <= y2; y++) {
        if (diagram[x1][y] < 2) {
          diagram[x1][y] += 1;
        }
      }
    };

    if (y1 === y2) {
      for (let x = x1; x <= x2; x++) {
        if (diagram[x][y1] < 2) {
          diagram[x][y1] += 1;
        }
      }
    };

    let x1R = line[0];
    let x2R = line[2];
    let y1R = line[1];
    let y2R = line[3];

    const diagonalCheckerIsSlash = () => {
      if ((x1R < x2R && y1R < y2R) || (x1R > x2R && y1R > y2R)) {
        return true;
      }
    }
    const diagonalCheckerIsBckSlash = () => {
      if ((x1R < x2R && y1R > y2R) || (x1R > x2R && y1R < y2R)) {
        return true;
      }
    }

    if (diagonalCheckerIsSlash()) {
      let xSSlash = [x1R, x2R].sort((a, b) => a - b);
      let ySSlash = [y1R, y2R].sort((a, b) => a - b);
      let counter = 0;
      for (let x = xSSlash[0]; x <= xSSlash[1]; x++) {
        if (diagram[x][ySSlash[0] + counter] < 2) {
          diagram[x][ySSlash[0] + counter] += 1;
        }
        counter++
      }
      counter = 0;
    }

    if (diagonalCheckerIsBckSlash()) {
      let count = 0;
      if (x1R < x2R) {
        for (let x = x1R; x <= x2R; x++) {
          if (diagram[x][y1R - count] < 2) {
            diagram[x][y1R - count] += 1;
          }
          count++;
        }
        count = 0;
      }

      if (x1R > x2R) {
        for (let x = x1R; x >= x2R; x--) {
          if (diagram[x][y1R + count] < 2) {
            diagram[x][y1R + count] += 1;
          }
          count++;
        }
        count = 0;
      }
    }
  }
  return diagram;
}

console.log(overlapCounter(drawLines()));

