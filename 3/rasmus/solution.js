const fs = require("fs");

//const input = fs.readFileSync("test_input", "utf-8");
const input = fs.readFileSync("input", "utf-8");
const readings = input.split('\n').map(str => str.trim());

function calculatePowerConsumption(readings) {
    let gamma = "";
    let epsilon = "";
    const totalBits = readings[0].length;
    const halfReadings  = readings.length/2;
    const getBitChar = (isOne) => isOne ? "1" : "0";
    for (let i = 0; i < totalBits;i++) {
        const bit = readings.filter(reading => reading[i] === "1").length >= halfReadings;
        gamma += getBitChar(bit);
        epsilon += getBitChar(!bit);
    }

    return parseInt(gamma, 2) * parseInt(epsilon, 2);
}

function calculateLifeSupport(readings) {
    return parseInt(findCandidate(readings, true), 2) * parseInt(findCandidate(readings, false), 2);
}

function findCandidate(readings, isMSB) {
    let readPos = 0;
    while (readings.length > 1) {
        const halfReadings = readings.length/2;
        let bitCompare = readings.filter(reading => reading[readPos] === "1").length >= halfReadings;
        if (!isMSB) {
            bitCompare = !bitCompare;
        }
        readings = readings.filter(reading => (reading[readPos] === "1") === bitCompare);
        readPos++;
    }

    return readings;
}

console.log(`Total readings ${readings.length}`)
console.log(`part 1 > ${calculatePowerConsumption(readings)}`);
console.log(`part 2 > ${calculateLifeSupport(readings)}`);