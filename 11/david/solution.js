const fs = require("fs");

const input = fs.readFileSync("input", "utf-8");
const matrix = input.split('\r\n').map(row => Array.from(row)).map(value => value.map(value => parseInt(value)));
const matrix_size = 10;
const flash_point = 10;

let neighbours = [[-1,-1], [-1,0], [-1,1], [0,-1], [0,1], [1,-1], [1,0], [1,1]];
function flash(matrix, position) {
    for(neighbour of neighbours) {
        if (position[0] + neighbour[0] < 0 || position[0] + neighbour[0] > matrix_size-1 || position[1] + neighbour[1] < 0 || position[1] + neighbour[1] > matrix_size-1) continue;
        if (++matrix[position[0] + neighbour[0]][position[1] + neighbour[1]] == flash_point) {
            flash(matrix, [position[0] + neighbour[0], position[1] + neighbour[1]]);
        }
    }
}
function simulate(matrix, steps, stopFlash) {
    let amountOfFlashes = 0;
    let step = 1;
    steps += 1;
    for (; step < steps; ++step) {
        let amountOfFlashIncrements = 0;
        for(let y = 0; y < matrix.length; ++y) { 
            for(let x = 0; x < matrix[y].length; ++x) {
                if (++matrix[y][x] == flash_point) {
                    flash(matrix, [y, x]);
                }
            }
        }
        for(let y = 0; y < matrix.length; ++y) { 
            for(let x = 0; x < matrix[y].length; ++x) {
                if (matrix[y][x] >= flash_point) {
                    matrix[y][x] = 0;
                    ++amountOfFlashIncrements;
                }
            }
        }
        amountOfFlashes += amountOfFlashIncrements;
        if(amountOfFlashIncrements == stopFlash) break;
    }

    return {amountOfFlashes, step};
}

function printMatrix(matrix) {
    for(let y = 0; y < matrix.length; ++y) { 
        let string = "";
        for(let x = 0; x < matrix[y].length; ++x) {
            if (matrix[y][x] >= flash_point)
                string += "F";
            else
                string += matrix[y][x];
        }
        console.log(string);
    }
}

const start = Date.now()
console.log(`part 1 > ${simulate(matrix.map((x) => x.map((y) => y)), 100).amountOfFlashes}`);
console.log(`part 2 > ${simulate(matrix.map((x) => x.map((y) => y)), 1000, 100).step}`);
console.log(`${Date.now() - start} ms`);