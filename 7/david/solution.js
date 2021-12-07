const fs = require("fs");

const input = fs.readFileSync("input", "utf-8");
const readings = input.split(',').map(value => parseInt(value));

function calculate(readings, special_mode) {
    const maximum_value = Math.max(...readings);
    const data = new Array(maximum_value).fill(0);

    for (let i = 0; i < readings.length; ++i) {
        for (let fuel_distance = 0; fuel_distance < data.length; ++fuel_distance) {
            const fuel = Math.abs(readings[i] - fuel_distance);
            if (!special_mode) data[fuel_distance] += fuel;
            else data[fuel_distance] += (fuel + 1) * (fuel / 2);
        }
    }

    return Math.min(...data);
}

const start = Date.now()
console.log(`part 1 > ${calculate(readings, false)}`);
console.log(`part 2 > ${calculate(readings, true)}`);
console.log(`${Date.now() - start} ms`);

