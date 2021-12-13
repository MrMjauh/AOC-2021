const fs = require("fs");

const input = fs.readFileSync("input", "utf-8");
//const input = fs.readFileSync("input_example", "utf-8");
const crabPositions = input.split(",").map(posStr => parseInt(posStr));

const max = Math.max(...crabPositions);
const buckets = []
for (let i = 0; i < (max + 1); i++) {
    buckets.push(0);
}

for (let i = 0; i < crabPositions.length;i++) {
    buckets[crabPositions[i]]++;
}

function calculateSolution(buckets, linearMovementCost) {
    let bestSum = Number.POSITIVE_INFINITY;
    for (let i = 0; i < buckets.length;i++) {
        let sum = 0;
        for (let j = 0; j < buckets.length;j++) {
            if (j === i || buckets[j] === 0) {
                continue;
            }
            let cost = Math.abs(i - j);
            if (!linearMovementCost) {
                cost = (Math.abs(i-j)) * (1 + (Math.abs(i-j))) * 0.5
            }
            sum += buckets[j] * cost;
        }
    
        if (sum < bestSum) {
            bestSum = sum;
        }
    }
    return bestSum;
}

const start = Date.now()
console.log(`part 1 > ${calculateSolution(buckets, true)}`);
console.log(`part 2 > ${calculateSolution(buckets, false)}`);
console.log(`${Date.now() - start} ms`);
