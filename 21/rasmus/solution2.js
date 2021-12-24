const fs = require("fs");

const DEBUG_PROGRESS = true;
const GAME_WIN_SCORE = 21;
const input = fs.readFileSync("input", "utf-8");
//const input = fs.readFileSync("input_example", "utf-8");
const readings = input.split("\r\n");
const playerPositions = [parseInt(readings[0].split(":")[1] - 1), parseInt(readings[1].split(":")[1] - 1)]

function rollDie(die) {
    const val = die + 1;
    return {val: val, next: val === 100 ? 0 : val};
}

function findPermutations(current, depth) {
    if (depth === 3) {
        return current;
    }

    let permutations = [];
    for (let i = 1; i <= 3; i++) {
        permutations.push(findPermutations([...current, i], depth + 1));
    }

    if (depth <= 1) {
        return permutations.flat();
    }

    return permutations
}
const permutations = findPermutations([], 0).map(val => val.reduce((a,b) => a + b));

let uniquePermutations = {};
for (const permutation of permutations) {
    if (!(permutation in uniquePermutations)) {
        uniquePermutations[permutation] = 0;
    }
    uniquePermutations[permutation]++;
}

function playGame(scores, playerPositions, playerTurn, depth = 0) {
    if (scores[0] >= GAME_WIN_SCORE) {
        return {0: 1, 1: 0};
    } else if (scores[1] >= GAME_WIN_SCORE) {
        return {0: 0, 1: 1};
    }

    let gamesWon = [];
    const newPlayerTurn = (playerTurn + 1) % 2;

    for (const dieRollKey in uniquePermutations) {
        if (depth === 0) {
            DEBUG_PROGRESS && console.log(dieRollKey);            
        }
        const dieRoll = parseInt(dieRollKey);
        let mutatedPlayerPosition = [...playerPositions];
        mutatedPlayerPosition[playerTurn] = (mutatedPlayerPosition[playerTurn] + dieRoll) % 10;

        let mutatedScores = [...scores];
        mutatedScores[playerTurn] += mutatedPlayerPosition[playerTurn] + 1;

        const gameWins = playGame(mutatedScores, mutatedPlayerPosition, newPlayerTurn, depth + 1);
        gameWins[0] = gameWins[0] * uniquePermutations[dieRoll]; 
        gameWins[1] = gameWins[1] * uniquePermutations[dieRoll]; 
        gamesWon.push(gameWins);
    }

    let wonGames = {0: 0, 1: 0};
    for (const gameWon of gamesWon) {
        wonGames[0] += gameWon[0];
        wonGames[1] += gameWon[1];
    }
    
    return wonGames;
}

const start = Date.now()
const res = playGame([0,0], playerPositions, 0);
console.log("part 2 > " + Math.max(res[0], res[1]));
console.log("elapsed time " + (Date.now() - start) + " ms");