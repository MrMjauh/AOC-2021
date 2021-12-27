const fs = require('fs');

const puzzle = fs.readFileSync('puzzle.txt', 'utf8');
const testPuzzle = fs.readFileSync('testpuzzle.txt', 'utf8');

const lines = puzzle
  .split('\r\n')
  .map(line => line.split('|'))


  let sum = 0;
  let tr = '';
  let br = '';
  let numArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  

  for (let i = 0; i < lines.length; i++) {
  
    let decoder = lines[i][0].trim().split(' ');
    let numbers = lines[i][1].trim().split(' ');
  
    for (let j = 0; j < numbers.length; j++) {
      if(numbers[j].length === 2 || numbers[j].length === 3 || numbers[j].length === 4 || numbers[j].length === 7) {
        sum = sum + 1;
      } 
    }
  }
  
  console.log(sum);



  // for (let j = 0; j < numbers.length; j++) {
    // if (numbers[j].length === 2 || numbers[j].length === 3 || 
      // numbers[j].length === 4 || numbers[j].length === 7) {
      // switch (numbers[j].length) {
        // case 2:
          // numArr[1] = numbers[j];
          // break;
        // case 3:
          // numArr[7] = numbers[j];
          // break;
        // case 4:
          // numArr[4] = numbers[j];
          // break;
        // case 7:
          // numArr[8] = numbers[j];
          // break;
      // }
    // }

  // }
  // if (numbers[j].length === 6) {
  //   if (!numbers[j].contains(num[1])) {
  //     num[6] = numbers[j];
  //     if (num[6].contains(numbers[1][0])) {
  //       tl = numbers[1][1];
  //       rb = numbers[1][0];
  //     };
  //     if (num[6].contains(numbers[1][1])) {
  //       tr = numbers[1][0];
  //       br = numbers[1][1];
  //     };
  //   } else if (numbers[j].contains(num[4])) {
  //     num[9] = numbers[j];
  //   } else {
  //     num[0] = numbers[j];
  //   }
  // }

  // if (numbers[j].length === 5) {
  //   if (numbers[j].contains(num[1])) {
  //     num[3] = numbers[j];
  //   }
  //   if (numbers[j].contains(tr)) {
  //     num[2] = numbers[j];
  //   }
  //   if (numbers[j].contains(br)) {
  //     num[5] = numbers[j];
  //   }
  // }
//   return;
// }

// console.log(sum);

// uniq
// 1- 2  ab
// 4- 4
// 7- 3 7 - 1 === t
// 8- 7

// repetitions
// 4// 0- 6 8 - other one
// 1// 6- 6 if both letters from 1 not appearing
// 3// 9- 6 if it has num from 4

// 2- 5 - contains rt
// 2// 3- 5 7 + b + x     x === m  if both letters from 1 appearing
//   5- 5 - dont contains rb other

//   == 8 - 6 = tr








