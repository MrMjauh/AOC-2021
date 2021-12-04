const fs = require("fs");

const input = fs.readFileSync("input", "utf-8");
const lines = input.split('\r\n');

const draws = lines[0].split(",").map(numberStr => parseInt(numberStr));
const boards = [];

let currentlyParsedBoard = [];
for (let i = 1; i < lines.length;i++) {
    const line = lines[i];
    if (line.trim().length === 0) {
        if (currentlyParsedBoard.length > 0) {
            boards.push(currentlyParsedBoard);
        }
        currentlyParsedBoard = [];
        continue;
    }

    currentlyParsedBoard.push(line.trim().split(/\s+/g).map(numberStr => parseInt(numberStr)));
}

function calculateSum(board) {
    let sum = 0;
    for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board.length; x++) {
            if (board[y][x] !== "x") {
                sum += board[y][x];
            }
        }
    }

    return sum;
}

function boardWon(board) {
    let winning = false;

    for (let y = 0; y < board.length; y++) {
        winning = true;
        for (let x = 0; x < board.length; x++) {
            if (board[y][x] !== "x") {
                winning = false;
                break;
            }
        }
        if (winning) {
            return true;
        }
    }

    for (let x = 0; x < board.length; x++) {
        winning = true;
        for (let y = 0; y < board.length; y++) {
            if (board[y][x] !== "x") {
                winning = false;
                break;
            }
        }
        if (winning) {
            return true;
        }
    }
}

function playBingo(draws, boards) {
    const boardWins = [];

    for (const draw of draws) {
        for (let i = 0; i < boards.length; i++) {
            if (boardWins.filter(win => win.id === i).length > 0) {
                continue;
            }

            const board = boards[i];
            for (let y = 0; y < board.length; y++) {
                for (let x = 0; x < board.length; x++) {
                    if (board[y][x] === draw) {
                        board[y][x] = "x";
                    }
                }
            }
            if (boardWon(board)) {
                boardWins.push({
                    id: i,
                    score: calculateSum(board) * draw
                })
            }
        }
    }
    return boardWins;
}

// Play bingo
const result = playBingo(draws, boards);
console.log(`part 1 > ${result[0].score}`);
console.log(`part 2 > ${result[result.length - 1].score}`);
