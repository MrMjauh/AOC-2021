const fs = require("fs");

const DEBUG_LOG = false;
const input = fs.readFileSync("input", "utf-8");
//const input = fs.readFileSync("input_example", "utf-8");
const readings = input.split("\r\n");

function parseStrLine(line, atChar = 0) {
    if (line[atChar] === '[') {
        const leftSide = parseStrLine(line, atChar + 1);
        const rightSide = parseStrLine(line, leftSide.marker + 1);
        return { data: [leftSide.data, rightSide.data], marker: rightSide.marker + 1 };
    } else if (line[atChar] === ']') {
        return { marker: atChar };
    } else if (line[atChar] === ',') {
        console.error("Something went wrong parsing");
    } else {
        return { data: parseInt(line[atChar]), marker: atChar + 1 };
    }
}
function add(left, right) {
    const result = [left, right];
    postProcess(result);
    return result;
}

function mergeRight(toMerge, data, sameLevel = false) {
    if (typeof (data) === 'object') {
        if (sameLevel && typeof (data[1]) !== 'object') {
            data[1] += toMerge;
            return true;
        } else if (typeof (data[0]) !== 'object') {
            data[0] += toMerge;
            return true;
        }

        if (sameLevel) {
            return mergeRight(toMerge, data[1]);
        } else {
            return mergeRight(toMerge, data[0]);
        }
    }
    return false;
}

function mergeLeft(toMerge, data, sameLevel = false) {
    if (typeof (data) === 'object') {
        if (sameLevel && typeof (data[0]) !== 'object') {
            data[0] += toMerge;
            return true;
        } else if (typeof (data[1]) !== 'object') {
            data[1] += toMerge;
            return true;
        }

        if (sameLevel) {
            return mergeLeft(toMerge, data[0]);
        } else {
            return mergeLeft(toMerge, data[1]);
        }
    }
    return false;
}

function postProcess(data) {
    DEBUG_LOG && console.pretty(data);
    let actionsRequired = false;
    do {
        actionsRequired = false;
        while (explode(data)) {
            DEBUG_LOG && console.pretty(data)
            actionsRequired = true;
        }
        while (split(data)) {
            DEBUG_LOG && console.pretty(data)
            while (explode(data)) {
                DEBUG_LOG && console.pretty(data)
            }
            actionsRequired = true;
        }
    } while (actionsRequired)
}

function split(data) {
    if (typeof (data) === 'object') {
        if (typeof (data[0]) !== 'object' && data[0] > 9) {
            DEBUG_LOG && console.log("LEFT SPLIT " + data[0]);
            data[0] = [Math.floor(data[0] / 2), Math.ceil(data[0] / 2)];
            return true;
        } else if (typeof (data[0]) === 'object') {
            const didSplit = split(data[0]);
            if (didSplit) {
                return true;
            }
        }

        if ((typeof (data[1]) !== 'object') && data[1] > 9) {
            DEBUG_LOG && console.log("RIGHT SPLIT " + data[1]);
            data[1] = [Math.floor(data[1] / 2), Math.ceil(data[1] / 2)];
            return true;
        } else if (typeof (data[1]) === 'object') {
            const didSplit = split(data[1]);
            if (didSplit) {
                return true;
            }
        }
    }
    return false;
}

function explode(data, depth = 0) {
    if (depth >= 4 && typeof (data) === 'object' && typeof (data[0]) !== 'object' && typeof (data[1]) !== 'object') {
        if ((typeof (data) === 'object')) {
            DEBUG_LOG && console.log("EXPLODED", data);
            return { data: data, mergedLeft: false, mergedRight: false, first: true };
        }
    } else if (typeof (data) === 'object') {
        let res = explode(data[0], depth + 1);
        if (res) {
            let mergedRight = res.mergedRight;
            if (!mergedRight) {
                mergedRight = mergeRight(res.data[1], data, true);
            }
            if (res.first) {
                data[0] = 0;
            }
            return { data: res.data, mergedLeft: res.mergedLeft, mergedRight: mergedRight, first: false };
        }
        res = explode(data[1], depth + 1);
        if (res) {
            let mergedLeft = res.mergedLeft;
            if (!mergedLeft) {
                mergedLeft = mergeLeft(res.data[0], data, true);
            }
            if (res.first) {
                data[1] = 0;
            }
            return { data: res.data, mergedLeft: mergedLeft, mergedRight: res.mergedRight, first: false };
        }
    }
}

function calculateScore(res) {
    let left = 0;
    let right = 0;
    if (typeof (res[0]) !== 'object') {
        left = 3 * res[0];
    } else {
        left = 3 * calculateScore(res[0]);
    }

    if (typeof (res[1]) !== 'object') {
        right = 2 * res[1];
    } else {
        right = 2 * calculateScore(res[1]);
    }

    return left + right;
}

function deepCopy(value) {
    return JSON.parse(JSON.stringify(value));
}

function sumSeries(series) {
    let result = deepCopy(additionSeries[0].data);
    for (let i = 1; i < additionSeries.length; i++) {
        DEBUG_LOG && console.log("----")
        DEBUG_LOG && console.pretty(result);
        DEBUG_LOG && console.pretty(additionSeries[i].data);
        result = add(result, deepCopy(additionSeries[i].data));
        DEBUG_LOG && console.pretty(result);
    }
    return result;
}

// For debug printing
console.pretty = (data) => console.log(JSON.stringify(data));

const additionSeries = [];
for (const reading of readings) {
    additionSeries.push(parseStrLine(reading));
}

console.log("part 1 > " + calculateScore(sumSeries(additionSeries)));

let maxScore = 0;
for (let i = 0; i < additionSeries.length; i++) {
    for (let j = 0; j < additionSeries.length; j++) {
        if (j === i) {
            continue;
        }
        const a = deepCopy(additionSeries[i].data);
        const b = deepCopy(additionSeries[j].data);
        const res = add(a, b);
        const result = calculateScore(res);
        if (result > maxScore) {
            maxScore = result;
        }
    }
}
console.log("part 2 > " + maxScore);