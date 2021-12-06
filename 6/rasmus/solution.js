const fs = require("fs");

//const input = fs.readFileSync("input_example", "utf-8");
const input = fs.readFileSync("input", "utf-8");
const startingGeneration = input.split(",").map(lanternStr => parseInt(lanternStr));

function renderGeneration(buckets, needle) {
    let res = "";
    for (let i = needle; i < (needle + buckets.length); i++) {
        const ix = i % buckets.length;
        for (let j = 0; j < buckets[ix];j++) {
            res += (i - needle) + ","
        }
    }
    return res;
}

function evolveLanternFishes(startingGeneration, days) {
    const buckets = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (const fish in startingGeneration) {
        buckets[startingGeneration[fish]]++;
    }
    let dayZeroNeedle = 0;
    for (let i = 0; i < days; i++) {
        // We move the needle forward so the buckets[dayZeroNeedle] will be the next generation (leave it, dont zero it)
        const fishesToSpawn = buckets[dayZeroNeedle];
        // Since we move forward it is off by one (6 + 1)
        buckets[(dayZeroNeedle + 7) % buckets.length] += fishesToSpawn;
        dayZeroNeedle = (dayZeroNeedle + 1) % buckets.length;
    }
    return buckets.reduce((a, b) => a + b);
}

console.log(`Total readings ${startingGeneration.length}`)
console.log(`part 1 > ${evolveLanternFishes(startingGeneration, 256)}`);