const fs = require("fs");

const input = fs.readFileSync("input", "utf-8");
//const input = fs.readFileSync("input_example", "utf-8");
const readings = input.split("\n");

const template = readings[0].trim().split("");

const pairs = {}
for (let i = 2; i < readings.length; i++) {
    const [from, to] = readings[i].split("->")
    pairs[from.trim()] = to.trim();
}

function createCountPairs(wordArr, perPairValue = 1) {
    const pairs = {};
    for (let i = 0; i < wordArr.length - 1; i++) {
        const pair = wordArr.slice(i, i + 2).join("");
        if (!(pair in pairs)) {
            pairs[pair] = 0;
        }
        pairs[pair] += perPairValue;
    }

    return pairs;
}

function insertCount(dict, key, value = 1) {
    if (!(key in dict)) {
        dict[key] = 0;
    }
    dict[key] += value;
}

function runGeneration(template, decodingTable, generations) {
    let currentPairs = createCountPairs(template);

    for (let i = 0; i < generations; i++) {
        let nextGenerationPairs = {}
        for (const pair in currentPairs) {
            if (!pair in decodingTable) {
                continue;
            }

            let newWord = pair.split("");
            newWord.splice(1, 0, decodingTable[pair]);
            const newPairs = createCountPairs(newWord, currentPairs[pair]);

            for (const newPair in newPairs) {
                insertCount(nextGenerationPairs, newPair, newPairs[newPair]);
            }
        }
        currentPairs = nextGenerationPairs;
    }

    return currentPairs;
}

function calculateSolution(pairs, initialTemplate) {
    const letters = {};
    for (const pair in pairs) {
        for (const letter of pair.split("")) {
            insertCount(letters, letter, (0.5 * pairs[pair]));
        }
    }

    for (const edgeLetter of [initialTemplate[0], initialTemplate[initialTemplate.length - 1]]) {
        insertCount(letters, edgeLetter, 0.5);
    }

    let min = Number.POSITIVE_INFINITY;
    let max = Number.NEGATIVE_INFINITY;

    for (const letter in letters) {
        if (letters[letter] < min) {
            min = letters[letter];
        }
        if (letters[letter] > max) {
            max = letters[letter];
        }
    }

    return max - min;
}

const start = Date.now();
console.log("part 2 > " + calculateSolution(runGeneration([...template], pairs, 40), [...template]));
console.log(`${Date.now() - start} ms`);
