const fs = require("fs");

const input = fs.readFileSync("input", "utf-8");
const lines = input.split('\r\n');

function checkLines(lines) {
    const flip_bracket = (char) => {
        switch (char) {
            case '<':
                return '>';
            case '(':
                return ')';
            case '[':
                return ']';
            case '{':
                return '}';
        }
    };

    let line_errors = [];
    let left_out_chars = [];
    for (line in lines) {
        let stack = [];
        let erronous_chars = [];
        for (char in lines[line]) {
            //Starting bracket
            if (lines[line][char] == '<' || lines[line][char] == '(' || lines[line][char] == '[' || lines[line][char] == '{') {
                stack.push(lines[line][char]);
            }
            //Ending bracket
            else {
                //Missmatch on stack
                let flipped_char = flip_bracket(stack[stack.length-1]);
                if (lines[line][char] != flipped_char) {
                    erronous_chars.push(lines[line][char]);
                }
                stack.pop()
            }
        }
        if (erronous_chars.length) line_errors.push(erronous_chars);
        else left_out_chars.push(stack);
    }
    return [line_errors, left_out_chars];
}

function part1(lines) {
    let score = 0;
    for (line in lines) {
        for (issue in lines[line]) {
            switch (lines[line][issue]) {
                case ')':
                    score += 3;
                    break;
                case ']':
                    score += 57;
                    break;
                case '}':
                    score += 1197;
                    break;
                case '>':
                    score += 25137;
                    break;
                default:
                    console.log("Error")
            }
        }
    }
    return score;
}
function part2(lines) {
    let score = new Array(lines.length).fill(null).map(() => 0);
    for (line in lines) {
        while (issue = lines[line].pop()) {
            score[line] *= 5;
            switch (issue) {
                case '(':
                    score[line] += 1;
                    break;
                case '[':
                    score[line] += 2;
                    break;
                case '{':
                    score[line] += 3;
                    break;
                case '<':
                    score[line] += 4;
                    break;
            }
        }
    }
    score.sort((a, b) => a - b);
    return score[(score.length-1)/2];
}

const start = Date.now()
let line_issues = checkLines(lines);
console.log(`part 1 > ${part1(line_issues[0])}`);
console.log(`part 2 > ${part2(line_issues[1])}`);
console.log(`${Date.now() - start} ms`);