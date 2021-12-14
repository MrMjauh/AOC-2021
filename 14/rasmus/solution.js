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

function generate(template, decodeTable, generations) {
    for (let i = 0; i < generations; i++) {
        for (let i = template.length - 2; i >= 0; i--) {
            const pair = template.slice(i, i + 2).join("");
            if (pair in decodeTable) {
                template.splice(i + 1, 0, decodeTable[pair]);
            }
        }
        false && console.log(template.join(""))
    }
    return template;
}

function getSolution(template) {
    const letters = {};
    for (let i = 0; i < template.length; i++) {
        if (template[i] && !(template[i] in letters)) {
            letters[template[i]] = 0;
        }
        letters[template[i]]++;
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

console.log("part 1 > " + getSolution(generate([...template], pairs, 10)));
