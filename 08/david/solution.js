const fs = require("fs");

const input = fs.readFileSync("input", "utf-8");
const readings = input.split('\r\n');

function initialize(data) {
    let parsed_data = [];

    for (let i = 0; i < data.length; ++i) {
        let split = data[i].split(" | ");
        let entry = [];
        entry.push(split[0].split(' '));
        entry.push(split[1].split(' '));
        parsed_data.push(entry);
    }

    return parsed_data;
}

const all_letters = 'abcdefg';
String.prototype.removeLetters = function(...args) {
    let retStr = this;
    for (let i = 0; i < args.length; ++i) {
        retStr = retStr.replace(args[i], '');
    }
    return retStr;
};
String.prototype.getAllUniqueLetters = function(string) {
    let retStr = "";
    retStr = this.removeLetters(...string);
    retStr += string.removeLetters(...this);
    return retStr;
};


String.prototype.findMatchingLetters = function(...args) {
    let letters = this;
    let returnStr = "";
    for (let i = 0; i < args.length; ++i) {
        if (letters.includes(args[i])) returnStr += args[i];
    }
    return returnStr;
};

function deducePattern(entry) {
    const original_mapping_input = Array(7).fill(null).map(() => []);
    const number_mapping = Array(10).fill(null).map(() => "");
    const letter_mapping = Array(7).fill(null).map(() => "");

    for (let i = 0; i < entry.length; ++i) {
        original_mapping_input[entry[i].length-1].push(entry[i]);
    }

    //Map numbers
    number_mapping[1] = original_mapping_input[1][0];
    number_mapping[4] = original_mapping_input[3][0];
    number_mapping[7] = original_mapping_input[2][0];
    number_mapping[8] = original_mapping_input[6][0];
    let bd = number_mapping[4].getAllUniqueLetters(number_mapping[1]);
    number_mapping[0] = original_mapping_input[5].find(entry => entry.getAllUniqueLetters(bd).length == 6);
    number_mapping[6] = original_mapping_input[5].find(entry => entry.getAllUniqueLetters(number_mapping[1]).length == 6);
    number_mapping[9] = original_mapping_input[5].find(entry => entry.getAllUniqueLetters(number_mapping[4]).length == 2);

    //Map letters
    letter_mapping[0] = number_mapping[7].getAllUniqueLetters(number_mapping[1])[0];
    letter_mapping[1] = number_mapping[0].findMatchingLetters(...bd)[0];
    letter_mapping[2] = number_mapping[6].getAllUniqueLetters(all_letters)[0];
    letter_mapping[3] = number_mapping[0].getAllUniqueLetters(all_letters)[0];
    letter_mapping[4] = number_mapping[9].getAllUniqueLetters(all_letters)[0];
    letter_mapping[5] = number_mapping[1].getAllUniqueLetters(letter_mapping[2])[0];
    letter_mapping[6] = all_letters.getAllUniqueLetters(letter_mapping.join().slice(6))[0];

    //Map last numbers
    number_mapping[2] = original_mapping_input[4].find(entry => entry.findMatchingLetters(...letter_mapping[4]).length == 1);
    number_mapping[3] = original_mapping_input[4].find(entry => entry.findMatchingLetters(...number_mapping[1]).length == 2);
    number_mapping[5] = original_mapping_input[4].find(entry => entry.findMatchingLetters(...letter_mapping[1]).length == 1);
    
    return {
        numbers: number_mapping,
        letters: letter_mapping,
    };
}

function deduceNumbers(pattern, numbers) {
    let deduced_numbers = [];
    for (let number in numbers) {
        for (let intNumber = 0; intNumber < pattern.numbers.length; ++intNumber) {
            if(numbers[number].getAllUniqueLetters(pattern.numbers[intNumber]) == 0) {
                deduced_numbers.push(intNumber);
                break;
            }
        }
    }
    return deduced_numbers;
}

function getOutputAsStringOfNumbers(data) {
    let output = [];
    for (let i = 0; i < data.length; ++i) {
        let results = deduceNumbers(deducePattern(data[i][0]), data[i][1]);
        output.push("" + results[0] + results[1] + results[2] + results[3])
    }
    return output;
}

let data = initialize(readings);
const start = Date.now()
let output = getOutputAsStringOfNumbers(data);
const part1 = (previousValue, currentValue) => previousValue += (currentValue.match(/(1|4|7|8)/g) || []).length;
const part2 = (previousValue, currentValue) => previousValue + parseInt(currentValue);
console.log(`part 1 > ${output.reduce(part1, 0)}`);
console.log(`part 2 > ${output.reduce(part2, 0)}`);
console.log(`${Date.now() - start} ms`);