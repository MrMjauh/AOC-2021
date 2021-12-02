const fs = require("fs");

const input = fs.readFileSync("input", "utf-8");
const readings = input.split('\n');

function calculateFinalPositionWithAim(readings) {
    let horizontalValue = 0;
    let verticalValue = 0;
    let aim = 0;
    for (let i = 0; i < readings.length; ++i) {
        let splitReading = readings[i].split(' ');
        if (splitReading[0] == "forward") {
            horizontalValue += parseInt(splitReading[1]);
            verticalValue += parseInt(splitReading[1]) * aim;
        }
        else if (splitReading[0] == "down") {
            aim += parseInt(splitReading[1]);
        }
        else {
            aim -= parseInt(splitReading[1]);
        }
    }
    return horizontalValue*verticalValue;
}

function calculateFinalPosition(readings) {
    let horizontalValue = 0;
    let verticalValue = 0;
    for (let i = 0; i < readings.length; ++i) {
        let splitReading = readings[i].split(' ');
        if (splitReading[0] == "forward") {
            horizontalValue += parseInt(splitReading[1]);
        }
        else if (splitReading[0] == "down") {
            verticalValue += parseInt(splitReading[1]);
        }
        else {
            verticalValue -= parseInt(splitReading[1]);
        }
    }
    return horizontalValue*verticalValue;
}

console.log(`Total readings ${readings.length}`)
console.log(`part 1 > ${calculateFinalPosition(readings)}`);
console.log(`part 2 > ${calculateFinalPositionWithAim(readings)}`);