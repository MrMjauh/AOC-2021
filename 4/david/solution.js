const fs = require("fs");

const amountOfBitsInreading = 12;
const input = fs.readFileSync("input", "utf-8");
const readings = input.split(/\r\n\s*\r\n/);
const bingo_numbers = readings[0].split(',').map(value => parseInt(value));
const serialized_boards = readings.slice(1);

function initializeBoard(serialized_board) {
    let board = serialized_board.split('\r\n').map(row => {
        return row.match(/[^ ]+/g).map(value => parseInt(value));
    });
    return board;
}

function initializeBoards(serialized_boards) {
    let boards = [];
    for (let i = 0; i < serialized_boards.length; ++i) {
        boards.push(initializeBoard(serialized_boards[i]));
    }
    return boards;
}

function playBingo(numbers, boards) {
    let boardResults = [];
    const enterValueForBoard = (value, board) => {
        for (let row = 0; row < board.length; ++row) {
            for (let column = 0; column < board[row].length; ++column) {
                if (value === board[row][column]) {
                    board[row][column] += 100; //Nrs range from 0-99 so adding 100 to symbolize all marked numbers
                    return;
                }
            }
        }
    }
    const evaluateBoardState = (board) => {
        //Check rows
        for (let row = 0; row < board.length; ++row) {
            for (let column = 0; column < board[row].length; ++column) {
                if (board[row][column] < 100) break;
                if (column + 1 == board[row].length) {
                    return true;
                }
            }
        }
        //Check columns
        for (let column = 0; column < board.length; ++column) {
            for (let row = 0; row < board[column].length; ++row) {
                if (board[row][column] < 100) break;
                if (row + 1 == board[row].length) {
                    return true;
                }
            }
        }
        return false;
    }
    const getSumOfUnmarkedNumbers = (board) => {
        let sum = 0;
        for (let row = 0; row < board.length; ++row) {
            for (let column = 0; column < board[row].length; ++column) {
                if (board[row][column] < 100) sum += board[row][column];
            }
        }
        return sum;
    }

    for (let number = 0; number < numbers.length; ++number) {
        if (boardResults.length == boards.length) break;
        for (let boardIndex = 0; boardIndex < boards.length; ++boardIndex) {
            let boardAlreadyCompleted = false;
            for (let i = 0; i < boardResults.length; ++i) {
                if (boardResults[i].id == boardIndex) {
                    boardAlreadyCompleted = true;
                    break;
                }
            }
            if (boardAlreadyCompleted) continue;
            
            enterValueForBoard(numbers[number], boards[boardIndex]);
            if(evaluateBoardState(boards[boardIndex])) {
                boardResults.push({
                    id: boardIndex,
                    score: getSumOfUnmarkedNumbers(boards[boardIndex])*numbers[number]
                })
            }
        }
    }
    return boardResults;
}

const bingo_boards = initializeBoards(serialized_boards);
const board_results = playBingo(bingo_numbers, bingo_boards);

console.log(`part 1 > ${board_results[0].score}`);
console.log(`part 2 > ${board_results[board_results.length-1].score}`);