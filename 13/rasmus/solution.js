const fs = require("fs");

const input = fs.readFileSync("input", "utf-8");
//const input = fs.readFileSync("input_example", "utf-8");
const readings = input.split("\r\n");
const cords = [];
const folds = [];

let readingsIx = 0;
let maxX = 0;
let maxY = 0;
for (let reading of readings) {
    if (reading.length === 0) {
        readingsIx++;
        break;
    }

    const cord = reading.split(",").map(str => parseInt(str));
    cords.push(cord);
    if (cord[0] > maxX) {
        maxX = cord[0];
    }
    if (cord[1] > maxY) {
        maxY = cord[1];
    }
    readingsIx++;
}

let data = [];
for (let y = 0; y <= maxY; y++) {
    let row = []
    for (let x = 0; x <= maxX; x++) {
        row.push(0);
    }
    data.push(row);
}

for (const cord of cords) {
    data[cord[1]][cord[0]] = 1;
}

for (let i = readingsIx; i < readings.length; i++) {
    const [dim, value] = readings[i].replace("fold along ", "").split("=");
    folds.push({dim: dim, value: parseInt(value)});
}

function fold(fold, paper) {
    let maxX = paper.x;
    let maxY = paper.y;
    if (fold.dim === 'x') {
        for (let y = 0; y < maxY; y++) {
            for (let x = fold.value; x < maxX; x++) {
                const relativeX = x - fold.value;
                const newX = fold.value - relativeX;
                paper.data[y][newX] = paper.data[y][newX] || paper.data[y][x];
            }
        }
        maxX = fold.value;
    } else {
        for (let y = fold.value; y < maxY; y++) {
            for (let x = 0; x < maxX; x++) {
                const relativeY = y - fold.value;
                const newY = fold.value - relativeY;
                paper.data[newY][x] = paper.data[newY][x] || paper.data[y][x]; 
            }
        }
        maxY = fold.value;
    }

    return {data: paper.data, x: maxX, y: maxY };
}

let renderPaper = (paper) => {
    let res = "\n";
    for (let y = 0; y < paper.y; y++) {
        for (let x = 0; x < paper.x; x++) {
            if (paper.data[y][x]) {
                res += "X";
            } else {
                res += " "
            }
        }
        res += "\n";
    }
    res += "\n";
    return res;
}

function countDots(paper) {
    let dots = 0;
    for (let y = 0; y < paper.y; y++) {
        for (let x = 0; x < paper.x; x++) {
            dots += paper.data[y][x];
        }
    }
    return dots;
}

let paper = {data: data, y: data.length, x: data[0].length};

let i = 0;
for (const foldInstruction of folds) {
    paper = fold(foldInstruction, paper);
    i++;
    if (i == 1) {
        console.log("part 1 > " + countDots(paper));
    }
}

console.log("part 2 > " + renderPaper(paper));