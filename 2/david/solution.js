const fs = require("fs");

const input = fs.readFileSync("input", "utf-8");
const readings = input.split('\n');

function calculateFinalPositionWithAim(readings) {
    let horizontalValue = 0;
    let verticalValue = 0;
    let aim = 0;
    for (let i = 0; i < readings.length; ++i) {
        let splitReading = readings[i].split(' ');
        if (splitReading[0] == "forward") {
            horizontalValue += parseInt(splitReading[1]);
            verticalValue += parseInt(splitReading[1]) * aim;
        }
        else if (splitReading[0] == "down") {
            aim += parseInt(splitReading[1]);
        }
        else {
            aim -= parseInt(splitReading[1]);
        }
    }
    return horizontalValue*verticalValue;
}

function calculateFinalPosition(readings) {
    let horizontalValue = 0;
    let verticalValue = 0;
    for (let i = 0; i < readings.length; ++i) {
        let splitReading = readings[i].split(' ');
        if (splitReading[0] == "forward") {
            horizontalValue += parseInt(splitReading[1]);
        }
        else if (splitReading[0] == "down") {
            verticalValue += parseInt(splitReading[1]);
        }
        else {
            verticalValue -= parseInt(splitReading[1]);
        }
    }
    return horizontalValue*verticalValue;
}

//console.log(`Total readings ${readings.length}`)
//console.log(`part 1 > ${calculateFinalPosition(readings)}`);
//console.log(`part 2 > ${calculateFinalPositionWithAim(readings)}`);


// Traditional function
function foo1() {
    let a = 1;
    for (let i = 0; i < 100; ++i) {
        ++a;
    }
    for (let i = 0; i < 100; ++i) {
        ++a;
    }
    for (let i = 0; i < 100; ++i) {
        ++a;
    }
    for (let i = 0; i < 100; ++i) {
        ++a;
    }
    for (let i = 0; i < 100; ++i) {
        ++a;
    }
    for (let i = 0; i < 100; ++i) {
        ++a;
    }
    for (let i = 0; i < 100; ++i) {
        ++a;
    }
    return a;
}

// Arrow function
const foo2 = () => {
    let a = 1;
    for (let i = 0; i < 100; ++i) {
        ++a;
    }
    for (let i = 0; i < 100; ++i) {
        ++a;
    }
    for (let i = 0; i < 100; ++i) {
        ++a;
    }
    for (let i = 0; i < 100; ++i) {
        ++a;
    }
    for (let i = 0; i < 100; ++i) {
        ++a;
    }
    for (let i = 0; i < 100; ++i) {
        ++a;
    }
    for (let i = 0; i < 100; ++i) {
        ++a;
    }
    return a;
}

function testA() {
    let b = 0;
    for (let i = 0; i < 100000; ++i) {
        b += foo1();
    }
    return b;
}
function testB() {
    let b = 0;
    for (let i = 0; i < 100000; ++i) {
        b += foo2();
    }
    return b;
}

let ms = Date.now();
for (let i = 0; i < 100; ++i) {
    testB();
}
console.log("TESTB: " + (Date.now() - ms));
ms = Date.now();
for (let i = 0; i < 100; ++i) {
    testA();
}
console.log("TESTA: " + (Date.now() - ms));