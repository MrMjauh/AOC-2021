const fs = require("fs");

const input = fs.readFileSync("input", "utf-8");
//const input = fs.readFileSync("input_example", "utf-8");
const readings = input.split("\r\n");

const scoreTablePart1 = {
    ")" : 3,
    "]" : 57,
    "}" : 1197,
    ">" : 25137
}
const scoreTablePart2 = {
    ")" : 1,
    "]" : 2,
    "}" : 3,
    ">" : 4
}

const validLeftChars = ["(", "[", "{", "<"];

function evaluateLine(line) {
    const leftChars = [];
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (validLeftChars.includes(char)) {
            leftChars.push(char);
        } else {
            const leftEnclosing = leftChars.pop();
            if (char === ")" && leftEnclosing === "(") {
                continue;
            } else if (char === "]" && leftEnclosing === "[") {
                continue;
            } else if (char === ">" && leftEnclosing === "<") {
                continue;
            } else if (char === "}" && leftEnclosing === "{") {
                continue;
            } else {
                return {reading: line, error: char};
            }
        }
    }
    return {reading: line, missingEnclosing: leftChars};
}

function calculateSyntaxErrorScore(readings, scoreTable) {
    let sum = 0;
    for (const reading of readings) {
        const evaluation = evaluateLine(reading);
        if (evaluation.error) {
            sum += scoreTable[evaluation.error];
        }
    }
    return sum;
}

function filterReadErrors(readings) {
    const correctReadings = [];
    for (const reading of readings) {
        const evaluation = evaluateLine(reading);
        if (evaluation.error === undefined) {
            correctReadings.push(evaluation)
        }
    }
    return correctReadings;
}

function repairLine(evaluatedLine, scoreTable) {
    if (evaluatedLine.error) {
        return evaluatedLine.reading;
    }
    let line = evaluatedLine.reading;
    let sum = 0;
    while (evaluatedLine.missingEnclosing.length > 0) {
        const char = evaluatedLine.missingEnclosing.pop();
        let repairChar = "";
        if (char === "(") {
            repairChar += ")";
        } else if (char === "[") {
            repairChar += "]";
        } else if (char === "{") {
            repairChar += "}";
        } else if (char === "<") {
            repairChar += ">"
        }
        line += repairChar;
        sum = sum * 5 + scoreTable[repairChar];
    }
    return {repairedLine: line, sum: sum};
}

function calculateIncompleteScore(readings, scoreTable) {
    let score = [];
    for (const reading of readings) {
        const repair = repairLine(reading, scoreTable);
        score.push(repair.sum);
    }
    
    score = score.sort((a, b) => a - b);
    return score[Math.floor(score.length/2)];
}

console.log("part 1 > " + calculateSyntaxErrorScore(readings, scoreTablePart1));

const filteredReadings = filterReadErrors(readings);
console.log("part 2 > " + calculateIncompleteScore(filteredReadings, scoreTablePart2));