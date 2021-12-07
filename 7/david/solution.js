const fs = require("fs");

const input = fs.readFileSync("input", "utf-8");
const readings = input.split(',').map(value =>  parseInt(value));

function calculate(readings, special_mode) {
    const calc_maximum_value = (data) => {
        let max = 0;
        for (let i = 0; i < data.length; ++i) {
            if (max < data[i]) max = data[i];
        }
        return max;
    };
    const maximum_value = calc_maximum_value(readings);
    const data = new Array(maximum_value).fill(0);

    for (let i = 0; i < readings.length; ++i) {
        for (let fuel_distance = 0; fuel_distance < data.length; ++fuel_distance) {
            const fuel = Math.abs(readings[i] - fuel_distance);
            if (!special_mode) data[fuel_distance] += fuel;
            else data[fuel_distance] += (fuel + 1) * (fuel / 2);
        }
    }

    let minimum_fuel_used = Number.MAX_SAFE_INTEGER;
    for (let i = 0; i < data.length; ++i) {
        if (minimum_fuel_used > data[i]) minimum_fuel_used = data[i];
    }

    return minimum_fuel_used;
}

const start = Date.now()
console.log(`part 1 > ${calculate(readings, false)}`);
console.log(`part 2 > ${calculate(readings, true)}`);
console.log(`${Date.now() - start} ms`);

