const fs = require("fs");

const input = fs.readFileSync("input", "utf-8");
const commands = input.split('\n');

function calculateSolution(commands, part) {
    let x = 0;
    let y = 0;
    let aim = 0;

    for (const command of commands) {
        const [commandType, valueStr] = command.split(" ");
        const value = parseInt(valueStr);
        
        if (commandType === "forward") {
            x += value;
            y += (value * aim * (part === "2"));
        } else if (commandType === "down") {
            y += (value * (part === "1"));
            aim += value;
        } else if (commandType === "up") {
            y -= (value * (part === "1"));
            aim -= value;
        }
    }
    return x * y;
}

console.log(`Total readings ${commands.length}`)
console.log(`part 1 > ${calculateSolution(commands, "1")}`);
console.log(`part 2 > ${calculateSolution(commands, "2")}`);