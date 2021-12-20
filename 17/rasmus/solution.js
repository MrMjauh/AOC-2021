const fs = require("fs");

const input = fs.readFileSync("input", "utf-8");
//const input = fs.readFileSync("input_example", "utf-8");

let readings = input.replace("target area: ", "")
const [xLimitStr, yLimitStr] = readings.split(",");
xLimit = xLimitStr.replace("x=", "").split("..").map(nr => parseInt(nr));
yLimit = yLimitStr.replace("y=", "").split("..").map(nr => parseInt(nr));

// Assumes acceleration of -1
function getPosition(steps, initialVelocity, isFriction = false) {
    if (isFriction) {
        const step = Math.abs(initialVelocity);
        if (step <= steps) {
            return ((step + 1) * (initialVelocity))/2
        }
    }

    // arithmetic sum
    return (steps * (initialVelocity + (initialVelocity - (steps - 1))))/2
}

let validVys = [];
let vy = -1000;
while (vy < 1000) {
    const candidateSteps = [];
    for (let steps = 0; steps < 10000; steps++) {
        const yPosition = getPosition(steps, vy);
        if (vy === -10) {
            console.log(yPosition);
        }
        // In position
        if (yPosition >= yLimit[0] && yPosition <= yLimit[1]) {
            candidateSteps.push(steps);
        } else if (yPosition < yLimit[0]) {
            break;
        }
    }

    for (let vx = -1000; vx < 1000; vx++) {
        for (step of candidateSteps) {
            const xPosition = getPosition(step, vx, true);

            if (xPosition >= xLimit[0] && xPosition <= xLimit[1]) {
                validVys.push([vx, vy]);
                break;
            } else if (xPosition > xLimit[1]) {
                break;
            }
        }
    }

    vy++;
}

console.log("part 1 > " + ((validVys[validVys.length-1][1] + 1) * validVys[validVys.length-1][1] / 2));
console.log("part 2 > " + validVys.length)