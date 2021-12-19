const fs = require('fs');

const bingoFile = fs.readFileSync('puzzle.txt', 'utf8');
const boardLines = bingoFile.split('\r\n');

const bingoNumbers = boardLines[0].trim().split(',').map(num => parseInt(num));

const boards = [];
let currBoard = [];

for (let i = 1; i < boardLines.length; i++) {
  const line = boardLines[i];
  if (line.trim().length === 0) {
    if (currBoard.length > 0) {
      boards.push(currBoard);
    }
    currBoard = []
  }
  currBoard.push(line.trim().split(/\s+/g).map(numberStr => parseInt(numberStr)));
}
boards.forEach(board => board.shift());

const winnerSum = winnerArr => {
  sum = 0;
  winnerArr.forEach(row => {
    for (i = 0; i < row.length; i++) {
      if (row[i] !== 'x') {
        sum += row[i];
      }
    }
  })
  return sum;
}

const isBoardWithBingo = board => {
  let winingPoint = 0;
  for (let row = 0; row < board.length; row++) {
    for (let column = 0; column < board.length; column++) {
      if (board[row][column] === 'x') {
        winingPoint++;
      }
      if (winingPoint === 5) {
        return true;
      }
    }
    winingPoint = 0;
  }

  for (let column = 0; column < board.length; column++) {
    for (let row = 0; row < board.length; row++) {
      if (board[row][column] === 'x') {
        winingPoint++
      } if (winingPoint === 5) {
        return true;
      }
    }
    winingPoint = 0;
  }
  return false;
};

const playingBingo = (givenNum, boardArr) => {
  const winingData = [];

  for (const num of givenNum) {
    for (let i = 0; i < boardArr.length; i++) {

      const board = boardArr[i];
      for (let row = 0; row < 5; row++) {
        for (let column = 0; column < 5; column++) {
          if (board[row][column] === num) {
            board[row][column] = 'x';
          }
        }
      }

      if (isBoardWithBingo(board)) {
        if (winingData.filter(win => win.index === i).length > 0) {
          continue;
        }
        winingData.push({
          index: i,
          score: winnerSum(board) * num
      });
      }
    }
  }
  return `first win: ${winingData[0].score} last win: ${winingData[winingData.length-1].score}`;

};

console.log(playingBingo(bingoNumbers, boards));




