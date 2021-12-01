const fs = require("fs");

const input = fs.readFileSync("input", "utf-8");
const readings = input.split('\n').map(readingStr => parseInt(readingStr));

function amountOfIncrementalSteps(readings) {
    let numberOfIncreasedReadings = 0;
    for (let i = 1; i <= readings.length; i++) {
        numberOfIncreasedReadings += readings[i-1] < readings[i];
    }
    return numberOfIncreasedReadings;
}

function amountOfIncrementalStepsSlidingWindow(readings) {
    let numberOfIncreasedReadings = 0;
    for (let i = 3; i <= readings.length; i++) {
        numberOfIncreasedReadings += readings[i-3] + readings[i-2] + readings[i-1] < readings[i-2] + readings[i-1] + readings[i];
    }
    return numberOfIncreasedReadings;
}

console.log(`Total readings ${readings.length}`)
console.log(`part 1 > ${amountOfIncrementalSteps(readings)}`);
console.log(`part 2 > ${amountOfIncrementalStepsSlidingWindow(readings)}`);