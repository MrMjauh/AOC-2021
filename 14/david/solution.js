const fs = require("fs");

const input = fs.readFileSync("input", "utf-8");
const readings = input.split(/\r\n\s*\r\n/);
const polymer = readings[0];
const mutations = readings[1].split('\r\n').map(e => e.split(" -> "));

const polymer_map_base = new Map();
for (mutation of mutations) {
    polymer_map_base.set(mutation[0], 0);
}
let polymer_map = new Map(polymer_map_base);
for(let i = 1; i < polymer.length; ++i) {
    let polymer_key = polymer[i-1] + polymer[i];
    polymer_map.set(polymer_key, polymer_map.get(polymer_key) + 1);
}

function insert_mutation(polymer_map, mutations) {
    let new_polymer_map = new Map(polymer_map_base);
    for (mutation of mutations) {
        let polymer_item = polymer_map.get(mutation[0]);
        if (polymer_item) { //Find occurences
            new_polymer_map.set(mutation[0][0] + mutation[1], new_polymer_map.get(mutation[0][0] + mutation[1]) + polymer_item);
            new_polymer_map.set(mutation[1] + mutation[0][1], new_polymer_map.get(mutation[1] + mutation[0][1]) + polymer_item);
        }
    }
    return new_polymer_map;
}

function mutate_polymer(polymer_map, mutations, amount) {
    let new_polymer = polymer_map;
    for (let i = 0; i < amount; ++i) {
        new_polymer = insert_mutation(new_polymer, mutations);
    }
    return new_polymer;
}

function calculate_result(polymer_map) {
    let occurences = new Map();
    for (char_chain of polymer_map) {
        if (char_chain[1] == 0) continue;
        let value = occurences.get(char_chain[0][0]);
        if (value > 0) occurences.set(char_chain[0][0], value + char_chain[1]);
        else occurences.set(char_chain[0][0], char_chain[1]);
    }
    
    let lastChar = polymer[polymer.length-1];
    occurences.set(lastChar, occurences.get(lastChar) + 1);

    let highestValue = 0;
    let lowestValue = Number.MAX_SAFE_INTEGER;
    for (occurence of occurences) {
        if (occurence[1] > highestValue) highestValue = occurence[1];
        if (occurence[1] < lowestValue) lowestValue = occurence[1];
    }

    return highestValue - lowestValue;
}

console.log(`part 1 > ${calculate_result(mutate_polymer(polymer_map, mutations, 10))}`);
console.log(`part 2 > ${calculate_result(mutate_polymer(polymer_map, mutations, 40))}`);