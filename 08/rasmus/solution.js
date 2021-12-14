const fs = require("fs");

const input = fs.readFileSync("input", "utf-8");
//const input = fs.readFileSync("input_example", "utf-8");
const readings = input.split("\r\n");

let segmentReadings = [];

for (const reading of readings) {
    let [inputs, outputs] = reading.split(" | ");
    inputs = inputs.split(" ");
    outputs = outputs.split(" ")
    segmentReadings.push([inputs, outputs]);
}

function outputReadings(segmentReadings) {
    let res = 0;
    for (const reading of segmentReadings) {
        for (const output of reading[1]) {
            if (output.length === 2 ||
                output.length === 7 ||
                output.length === 4 ||
                output.length === 3) {
                    res++;
                }
        }
    }

    return res;
}

function containsLetters(letters, word) {
    for (const letter of letters.split("")) {
        if (!word.includes(letter)) {
            return false;
        }
    }
    return true;
}

function numberOfContainedLetters(letters, word) {
    let words = 0;
    for (const letter of letters.split("")) {
        if (word.includes(letter)) {
            words++;
        }
    }
    return words;
}

function sortAlphabets(text) {
    return text.split('').sort().join('');
};

function decodeOutputs(segmentReadings) {
    const results = []
    for (const segmentReading of segmentReadings) {
        const decodeTable = {};
        const reverseDecodeTable = {};
        for (let reading of segmentReading[0]) {
            reading = sortAlphabets(reading);
            if (reading.length === 2) {
                decodeTable["1"] = reading;
                reverseDecodeTable[reading] = 1;
            } else if (reading.length === 4) {
                decodeTable["4"] = reading;
                reverseDecodeTable[reading] = 4;
            } else if (reading.length === 3) {
                decodeTable["7"] = reading;
                reverseDecodeTable[reading] = 7;
            } else if (reading.length === 7) {
                decodeTable["8"] = reading;
                reverseDecodeTable[reading] = 8;
            }
        }

        let foundNumber = "";
        for (let reading of segmentReading[1]) {
            reading = sortAlphabets(reading);
            if (reading in reverseDecodeTable) {
                foundNumber += reverseDecodeTable[reading];
            } else {
                // Either 0, 6 or 9
                if (reading.length === 6) {
                    // Has to be a 9
                    if (containsLetters(decodeTable["4"], reading)) {
                        foundNumber += "9"
                    } else if (containsLetters(decodeTable["1"], reading)) {
                        foundNumber += "0"
                    } else {
                        foundNumber += "6"
                    }
                } else if (reading.length === 5) {
                    if (containsLetters(decodeTable["1"], reading)) {
                        foundNumber += "3";
                    } else if (numberOfContainedLetters(decodeTable["4"], reading) === 3) {
                        foundNumber += "5"
                    } else {
                        foundNumber += "2"
                    }
                } else {
                    console.log("error for reading " + reading);
                }
            }
        }
        results.push(parseInt(foundNumber));
    }
    return results;
}

const start = Date.now()
console.log(`part 1 > ${outputReadings(segmentReadings)}`);
console.log(`part 2 > ${decodeOutputs(segmentReadings).reduce((a, b) => a + b)}`);
console.log(`${Date.now() - start} ms`);