const fs = require("fs");

const input = fs.readFileSync("input", "utf-8");
const readings = input.split(',').map(value => parseInt(value));

function calculate(readings, days) {
    const data = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < readings.length; ++i) {
        ++data[readings[i]];
    }

    let needle = 0;
    const offset = 7;

    for (let day = 0; day < days; ++day) {
        data[(needle + offset) % data.length] += data[needle];
        needle = ++needle % data.length;
    }

    let total_data = 0;
    for (let i = 0; i < data.length; ++i) total_data += data[i];
    return total_data;
}

const start = Date.now()
console.log(`part 1 > ${calculate(readings, 80)}`);
console.log(`part 2 > ${calculate(readings, 256)}`);
console.log(`${Date.now() - start} ms`);