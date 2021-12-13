const fs = require("fs");

const input = fs.readFileSync("input", "utf-8");
//const input = fs.readFileSync("input_example", "utf-8");
//const input = fs.readFileSync("input_debug", "utf-8");
const readings = input.split('\n');

const lines = [];
for (const reading of readings) {
    const [from, to] = reading.split("->");
    lines.push([getCordsFromPairRead(from), getCordsFromPairRead(to)]);
}

function getCordsFromPairRead(pair) {
    return pair.split(",").map(value => parseInt(value));
}

function createKey(x, y) {
    return x + "_" + y;
}

function debugRender(size, countMap) {
    let res = "";
    for (let y = 0; y < size; y++) {
        let row = "";
        for (let x = 0; x < size; x++) {
            const key = createKey(x, y);
            if (key in countMap) {
                row += countMap[key]
            } else {
                row += "."
            }
        }
        res += row + "\n"
    }
    return res;
}

function createCountMap(lines, filterOutDiagonal) {
    // sparse count map
    const countCordsMap = {};

    const incrementCordsMap = (x, y) => {
        const key = createKey(x, y)
        if (!(key in countCordsMap)) {
            countCordsMap[key] = 0;
        }
        countCordsMap[key]++;
    }

    // This is slow, there is an optimization where you can consider line segments
    // also instead of just points
    // Also doing the count in here would get rid of the calculateSolution function
    // Also we could filter out lines that have been overlapped multiple times
    for (const [from, to] of lines) {
        if (filterOutDiagonal && from[0] !== to[0] && from[1] !== to[1]) {
            continue;
        }
        const dx = Math.sign(to[0] - from[0])
        const dy = Math.sign(to[1] - from[1])
        let currentPos = [from[0], from[1]];
        while (currentPos[0] !== to[0] || currentPos[1] !== to[1]) {
            incrementCordsMap(currentPos[0], currentPos[1])
            currentPos[0] += dx;
            currentPos[1] += dy;
        }

        incrementCordsMap(to[0], to[1]);
    }
    return countCordsMap;
}

function calculateSolution(countMap) {
    let res = 0;
    for (const key of Object.keys(countMap)) {
        if (countMap[key] > 1) {
            res++;
        }
    }
    return res;
}

console.log(`Total readings ${lines.length}`)
const start = Date.now()
const countMap = createCountMap(lines, true);
console.log(`part 1 > ${calculateSolution(countMap)}`);
const countMapDiagonal = createCountMap(lines, false);
console.log(`part 2 > ${calculateSolution(countMapDiagonal)}`);
const elapsedTime = Date.now() - start;
console.log(`${elapsedTime} ms`);