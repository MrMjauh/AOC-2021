const fs = require("fs");

const input = fs.readFileSync("input", "utf-8");
const readings = input.split('\r\n');
const _MappingSize = 1000;

function insertVectorIntoMatrix(vector, matrix) {
    let horizontal = vector.vector_start[0] == vector.vector_end[0];
    let diagonal = !horizontal && vector.vector_start[1] != vector.vector_end[1];

    let vector_length = Math.max(Math.abs(vector.vector_end[0] - vector.vector_start[0]), Math.abs(vector.vector_end[1] - vector.vector_start[1]));
    let directionX = Math.sign(vector.vector_end[0] - vector.vector_start[0]);
    let directionY = Math.sign(vector.vector_end[1] - vector.vector_start[1]);
    
    for (let i = 0; i <= vector_length; ++i) {
        ++matrix[vector.vector_start[0] + (i * directionX)][vector.vector_start[1] + (i * directionY)];
    }
    return;
}

function initializeMatrix(serialized_data, skip_diagonal) {
    let matrix = Array(_MappingSize).fill(null).map(() => Array(_MappingSize).fill(0));
    for (let vector = 0; vector < serialized_data.length; ++vector) {
        split_vector = serialized_data[vector].split(" -> ");
        vector_start = split_vector[0].split(',').map(value => parseInt(value));
        vector_end = split_vector[1].split(',').map(value => parseInt(value));
        
        if (vector_start[0] != vector_end[0] && vector_start[1] != vector_end[1] && skip_diagonal) continue; //Skip diagonal vectors
        insertVectorIntoMatrix({vector_start, vector_end}, matrix);
    }
    return matrix;
}

function getAmountOfVents(vent_matrix, minimum_power) {
    let vent_amount = 0;
    for (let x = 0; x < vent_matrix.length; ++x) {
        for (let y = 0; y < vent_matrix[x].length; ++y) {
            if (vent_matrix[x][y] >= minimum_power) ++vent_amount;
        }
    }
    return vent_amount;
}

const start = Date.now()
const amount_dangerous_vents_no_diagonals = getAmountOfVents(initializeMatrix(readings, true), 2);
const amount_dangerous_vents = getAmountOfVents(initializeMatrix(readings, false), 2);
const elapsedTime = Date.now() - start;

console.log(`part 1 > ${amount_dangerous_vents_no_diagonals}`);
console.log(`part 2 > ${amount_dangerous_vents}`);
console.log(`${elapsedTime} ms`);