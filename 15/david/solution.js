const fs = require("fs");

const input = fs.readFileSync("input", "utf-8");
const matrix = input.split('\r\n').map(string => string.split('').map(v => parseInt(v), []));
const matrix_size = matrix.length;

const travelDirections = [[1, 0], [-1, 0], [0, 1], [0, -1]];

function finalizeIndexCost(matrix, cost_matrix, index, edge_position, flattened_size) {
    //Loop over all alternative routes and finalize best path value
    let bestScore = Number.MAX_SAFE_INTEGER;

    let offestY = ((flattened_size - 1) / 2) - index;
    let offestX = ((flattened_size - 1) / 2) + index;

    let positionInCostMatrix = [edge_position + offestY, edge_position + offestX];

    //Loop left
    for (let i = 0; i < ; ++i) {
    }

    //Loop right
}

function calculateEdgeCost(matrix, cost_matrix, edge_position) {
    //Initialize entry costs
    //Calculate all horizontal indices
    for (let x = edge_position + 1; x < matrix_size; ++x) {
        cost_matrix[edge_position][x] = cost_matrix[edge_position + 1][x];
    }
    //Calculate all vertical indices
    for (let y = edge_position + 1; y < matrix_size; ++y) {
        cost_matrix[y][edge_position] = cost_matrix[y][edge_position + 1];
    }
    //Edge cost
    if (edge_position != matrix_size - 1) {
        cost_matrix[edge_position][edge_position] = Math.min(cost_matrix[edge_position + 1][edge_position], cost_matrix[edge_position][edge_position + 1]);
    }

    //Calculate all path costs
    let flattenedSize = (matrix_size - edge_position) * 2 - 1;
    for (let i = 0; i < flattenedSize; ++i) {
        finalizeIndexCost(matrix, cost_matrix, i, edge_position, flattenedSize);
    }
}

function calculateMatrixCosts(matrix) {
    let cost_matrix = Array(matrix_size).fill(null).map(()=>Array(matrix_size).fill(0));
    
    cost_matrix[matrix_size-1][matrix_size-1] = matrix[matrix_size-1][matrix_size-1];
    for (let i = 2; i <= matrix_size; ++i) { //Loop over diagonal edges
        let edgePosition = matrix_size-i;
        calculateEdgeCost(matrix, cost_matrix, edgePosition);
        //console.log(cost_matrix.map(e => ""+e));
    }

    return cost_matrix;
}

let cost_matrix = calculateMatrixCosts(matrix);