const fs = require("fs");

const amountOfBitsInreading = 12;
const input = fs.readFileSync("input", "utf-8");
const readings = input.split('\n').map(readingStr => {
    let number = 0;
    for (let bit = 0; bit < amountOfBitsInreading; ++bit) {
        number += (readingStr[bit] === '1') << amountOfBitsInreading - bit - 1;
    }
    return number;
});

function bitCalculator(readings) {
    let bitAmount = new Array(amountOfBitsInreading).fill(0);
    for (let i = 0; i < readings.length; ++i) {
        for (let bit = 0; bit < amountOfBitsInreading; ++bit) {
            bitAmount[bit] += ((((readings[i] >> bit) & 1) << 1) -1);
        }
    }
    let gammaRate = 0;
    for (let i = 0; i < amountOfBitsInreading; ++i) {
        gammaRate += (((Math.sign(bitAmount[i]) + 1) >> 1) << i);
    }
    let epsilonRate = gammaRate ^ 0xfff;

    return gammaRate*epsilonRate;
}

function recursiveBitSomethingFinderCalculator(readings, bitIndex, mode) {
    let numbersStartingWith0 = [];
    let numbersStartingWith1 = [];
    for (let i = 0; i < readings.length; ++i) {
        if (readings[i] & (1 << amountOfBitsInreading-1-bitIndex)) {
            numbersStartingWith1.push(readings[i]);
        }
        else {
            numbersStartingWith0.push(readings[i]);
        }
    }

    //Sneaky reverser
    let swappedArrayA = mode ? numbersStartingWith0 : numbersStartingWith1;
    let swappedArrayB = mode ? numbersStartingWith1 : numbersStartingWith0;

    if (swappedArrayA.length > swappedArrayB.length) {
        if(swappedArrayA.length == 1) {
            return numbersStartingWith1[0];
        }
        return recursiveBitSomethingFinderCalculator(numbersStartingWith0, ++bitIndex, mode);
    }
    else if (swappedArrayA.length == swappedArrayB.length) {
        if(swappedArrayA.length == 1) {
            return mode ? numbersStartingWith1[0] : numbersStartingWith0[0];
        }
        return recursiveBitSomethingFinderCalculator(swappedArrayB, ++bitIndex, mode);
    }
    else {
        if(swappedArrayB.length == 1) {
            return numbersStartingWith1[0];
        }
        return recursiveBitSomethingFinderCalculator(numbersStartingWith1, ++bitIndex, mode);
    }
}

console.log(`Total readings ${readings.length}`)
console.log(`part 1 > ${bitCalculator(readings)}`);
console.log(`part 2 > ${recursiveBitSomethingFinderCalculator(readings, 0, 1) * recursiveBitSomethingFinderCalculator(readings, 0, 0)}`);


//If we want to slightly optimize this we can use:

console.log(`part 2 optimized > ${precomputeFirstStepForBoth(readings)}`);

function precomputeFirstStepForBoth(readings) {
    //Initial search here because we know that the array will be split in 2 parts where both are interesting
    let numbersStartingWith0 = [];
    let numbersStartingWith1 = [];
    for (let i = 0; i < readings.length; ++i) {
        if (readings[i] & (1 << amountOfBitsInreading-1)) {
            numbersStartingWith1.push(readings[i]);
        }
        else {
            numbersStartingWith0.push(readings[i]);
        }
    }
    
    let oxygen;
    let co2;

    if (numbersStartingWith0.length > numbersStartingWith1.length) {
        oxygen = recursiveBitSomethingFinderCalculator(numbersStartingWith0, 1, 1);
        co2 = recursiveBitSomethingFinderCalculator(numbersStartingWith1, 1, 0);
    }
    else {
        oxygen = recursiveBitSomethingFinderCalculator(numbersStartingWith1, 1, 1);
        co2 = recursiveBitSomethingFinderCalculator(numbersStartingWith0, 1, 0);
    }

    return oxygen*co2;
}