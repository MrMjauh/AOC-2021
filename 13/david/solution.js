const { count } = require("console");
const fs = require("fs");

const input = fs.readFileSync("input", "utf-8");
const readings = input.split(/\r\n\s*\r\n/);
const matrix_data = readings[0].split('\r\n').map(value => {
    [X,Y] = value.split(',');
    return [parseInt(X), parseInt(Y)];
});
const matrix_size = matrix_data.reduce((prev, curr) => { //This could be taken from first 2 folds as it has to be in the middle so (fold*2 + 1)
    if (curr[0] > prev[0]) prev[0] = curr[0];
    if (curr[1] > prev[1]) prev[1] = curr[1];
    return prev;
}, [0,0]);
let matrix = Array(matrix_size[1] + 1).fill(null).map(()=>Array(matrix_size[0] + 1).fill(0));
for (point of matrix_data) {
    matrix[point[1]][point[0]] = 1;
}
const foldings = readings[1].split('\r\n').map(value => {
    let slice = value.slice(11);
    [alignment,value] = slice.split('=');
    return [alignment, parseInt(value)];
});

function fold_matrix_once(matrix, fold) {
    let result_matrix;
    if (fold[0] == 'x') {
        result_matrix = Array(matrix.length).fill(null).map(()=>Array(matrix[0].length >> 1).fill(0));
    }
    else {
        result_matrix = Array(matrix.length >> 1).fill(null).map(()=>Array(matrix[0].length).fill(0));
    }
    for (let y = 0; y < result_matrix.length;++y) {    
        for (let x = 0; x < result_matrix[y].length;++x) {
            if (fold[0] == 'x') result_matrix[y][x] = matrix[y][x] | matrix[y][matrix[y].length - x - 1];
            else result_matrix[y][x] = matrix[y][x] | matrix[matrix.length - y - 1][x];
        }
    }
    return result_matrix;
}

function fold_matrix(matrix, folds) {
    for (fold of folds) {
        matrix = fold_matrix_once(matrix, fold);
    }
    return matrix;
}

function count_occupied_spaces(matrix) {
    let count = 0;
    for (let y = 0; y < matrix.length;++y) {    
        for (let x = 0; x < matrix[y].length;++x) {
            count += matrix[y][x];
        }
    }
    return count;
}

console.log(`part 1 > ${count_occupied_spaces(fold_matrix_once(matrix, foldings[0]))}`);

let part2 = fold_matrix(matrix, foldings).map(e => {
    let line = "";
    e.map(v => line += v ? '#' : ' ');
    return line;
});
console.log("part 2 >");
console.log(part2)