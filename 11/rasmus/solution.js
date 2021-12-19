const fs = require("fs");

const input = fs.readFileSync("input", "utf-8");
//const input = fs.readFileSync("input_example", "utf-8");
//const input = fs.readFileSync("input_example_2", "utf-8");
const rows = input.split("\r\n");

const initialOctopusStates = []; 
rows.forEach(row => {
    initialOctopusStates.push(row.split("").map(str => parseInt(str)));
});

function simulateStep(octopuses, step) {
    let flashes = 0;
    for (let y = 0; y < octopuses.length; y++) {
        for (let x = 0; x < octopuses[y].length; x++) {
            // Ignore already flashed octopus
            if (octopuses[y][x] === -step) {
                continue;
            } 
            // Reset 0 energy octopuses
            else if (octopuses[y][x] < 0) {
                octopuses[y][x] = 0;
            }

            octopuses[y][x]++;
            if (octopuses[y][x] > 9) {
                octopuses[y][x] = -step;
                flashes += flash(x, y, octopuses, step) + 1;
            }
        }
    }
    return {nextState: octopuses, flashes: flashes};
}

const neighbours = [[1,0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]];

function flash(x, y, octopuses, step) {
    let flashes = 0;
    for (const neighbour of neighbours) {
        const newX = x + neighbour[0];
        const newY = y + neighbour[1];
        if (newX < 0 || newX >= octopuses[0].length || newY < 0 || newY >= octopuses.length) {
            continue;
        } else if (octopuses[newY][newX] === -step) {
            continue;
        } else if (octopuses[newY][newX] < 0) {
            octopuses[newY][newX] = 0;
        }

        octopuses[newY][newX]++;

        if (octopuses[newY][newX] > 9) {
            octopuses[newY][newX] = -step;
            flashes += flash(newX, newY, octopuses, step) + 1;
        }
    }

    return flashes;
}

let renderOctopuses = (board) => {
    let res = "";
    for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[y].length; x++) {
            if (board[y][x] < 0) {
                res += "0"
            } else {
                res += board[y][x];
            }
        }
        res += "\n";
    }
    return res;
}

let flashes = 0;
let currentOctopuses = [...initialOctopusStates];
for (let i = 0; i < 100; i++) {
    // 0 is taken for 0 energy, so i + 1
    const res = simulateStep(currentOctopuses, i + 1);
    currentOctopuses = res.nextState;
    flashes += res.flashes;
}
console.log("part 1 > " + flashes);

let step = 101;
while (true) {
    const res = simulateStep(currentOctopuses, step);
    if (res.flashes === currentOctopuses.length*currentOctopuses[0].length) {
        console.log("part 2 > " + step);
        break;
    }
    step++;
}