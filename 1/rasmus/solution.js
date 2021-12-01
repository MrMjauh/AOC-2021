const fs = require("fs");
const os = require('os');

const input = fs.readFileSync("input", "utf-8");
const readings = input.split('\n').map(readingStr => parseInt(readingStr));

function getAccumulatedReading(readings, pos, size) {
    let sum = 0;
    for (let i = pos; i < (pos + size); i++) {
        sum += readings[i];
    }
    return sum;
}

function getNumberOfIncreasedReadings(readings, windowSize) {
    let numberOfIncreasedReadings = 0;
    for (let i = 1; i <= (readings.length - windowSize); i++) {
        if (getAccumulatedReading(readings, i, windowSize) > getAccumulatedReading(readings, i - 1, windowSize)) {
            numberOfIncreasedReadings++;
        }
    }
    return numberOfIncreasedReadings;
}

console.log(`Total readings ${readings.length}`)
console.log(`part 1 > ${getNumberOfIncreasedReadings(readings, 1)}`);
console.log(`part 2 > ${getNumberOfIncreasedReadings(readings, 3)}`);