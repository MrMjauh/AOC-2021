const fs = require("fs");

const input = fs.readFileSync("input", "utf-8");
//const input = fs.readFileSync("input_example", "utf-8");
const readings = input.split("\r\n");
const playerPositions = [parseInt(readings[0].split(":")[1] - 1), parseInt(readings[1].split(":")[1] - 1)]

const scores = [0,0];
let playerTurn = 0;
let rolls = 0;
let die = 0;

while (scores[0] < 1000 && scores[1] < 1000) {
    let score = 0;
    for (let i = 0; i < 3; i++) {
        if (die > 100) {
            die = 1;
        }
        die++;
        score += die;
        rolls++;
    }

    playerPositions[playerTurn] = (playerPositions[playerTurn] + score) % 10;
    scores[playerTurn] += playerPositions[playerTurn] + 1;
    playerTurn = (playerTurn + 1) % 2;
}

console.log(rolls);
console.log(scores);
console.log("part 1 > " + (rolls * Math.min(...scores)))