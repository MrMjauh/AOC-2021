const fs = require("fs");

const input = fs.readFileSync("input", "utf-8");
const matrix = input.split('\r\n').map(row => Array.from(row)).map(value => value.map(value => parseInt(value)));

function findLowestPoints(matrix) {
    let lowestPoints = [];
    for (let y = 0; y < matrix.length; ++y) {
        for (let x = 0; x < matrix[y].length; ++x) {
            let lowestPoint = [y, x];
            if (
                (y == 0 || matrix[y-1][x] > matrix[y][x]) && 
                (y == matrix.length-1 || matrix[y+1][x] > matrix[y][x]) &&
                (x == 0 || matrix[y][x-1] > matrix[y][x]) && 
                (x == matrix[y].length-1 || matrix[y][x+1] > matrix[y][x])) {
                    lowestPoints.push(lowestPoint);
                }
        }
    }
    return lowestPoints;
}

function findBasinSize(matrix, lowestPoint) {
    let currentSize = 0;
    let currentPointValue = matrix[lowestPoint[0]][lowestPoint[1]];
    matrix[lowestPoint[0]][lowestPoint[1]] = 9; //Set stopper (Yes we destroy the matrix, but idgaf x))
    if (lowestPoint[0] != 0 && currentPointValue < matrix[lowestPoint[0] - 1][lowestPoint[1]] && matrix[lowestPoint[0] - 1][lowestPoint[1]] != 9) {
        currentSize += findBasinSize(matrix, [lowestPoint[0] - 1, lowestPoint[1]]);
    }
    if (lowestPoint[0] != matrix.length-1 && currentPointValue < matrix[lowestPoint[0] + 1][lowestPoint[1]] && matrix[lowestPoint[0] + 1][lowestPoint[1]] != 9) {
        currentSize += findBasinSize(matrix, [lowestPoint[0] + 1, lowestPoint[1]]);
    }
    if (lowestPoint[1] != 0 && currentPointValue < matrix[lowestPoint[0]][lowestPoint[1] - 1] && matrix[lowestPoint[0]][lowestPoint[1] - 1] != 9) {
        currentSize += findBasinSize(matrix, [lowestPoint[0], lowestPoint[1] - 1]);
    }
    if (lowestPoint[1] != matrix[lowestPoint[0]].length-1 && currentPointValue < matrix[lowestPoint[0]][lowestPoint[1] + 1] && matrix[lowestPoint[0]][lowestPoint[1] + 1] != 9) {
        currentSize += findBasinSize(matrix, [lowestPoint[0], lowestPoint[1] + 1]);
    }
    return currentSize + 1;
}

function findAllBasinSizes(matrix, lowestPoints) {
    let basins = [];
    for (let i = 0; i < lowestPoints.length; ++i) {
        basins.push(findBasinSize(matrix, lowestPoints[i]));
    }
    const sorter = (firstElement, secondElement) => firstElement - secondElement;
    return basins.sort(sorter);
}

const start = Date.now()
const reducerPart1 = (previousValue, currentValue) => previousValue + currentValue + 1;
console.log(`part 1 > ${findLowestPoints(matrix).map(value => matrix[value[0]][value[1]]).reduce(reducerPart1, 0)}`);
let allBasins = findAllBasinSizes(matrix, findLowestPoints(matrix));
console.log(`part 2 > ${allBasins[allBasins.length-1] * allBasins[allBasins.length-2] * allBasins[allBasins.length-3]}`);
console.log(`${Date.now() - start} ms`);