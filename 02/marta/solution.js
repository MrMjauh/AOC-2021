const fs = require('fs');

const commands = fs.readFileSync('puzzle.txt', 'utf8');
const commandsArr  = commands.split('\n').map(element => element.split(' '));

const directions = arr => {
  let forward = 0;
  let depth = 0;
  for(let i = 0; i <= arr.length-1; i++) {
    if (arr[i][0] === 'forward') {
      forward += parseInt(arr[i][1]);
    } 
    if (arr[i][0] === 'down') {
      depth += parseInt(arr[i][1]);
    }
    if (arr[i][0] === 'up') {
      depth -= parseInt(arr[i][1]);
    } 
  }
  return forward * depth;
};

const directions2 = arr => {
  let forward = 0;
  let depth = 0;
  let aim = 0;
  for(let i = 0; i <= arr.length-1; i++) {
    if (arr[i][0] === 'forward') {
      forward += parseInt(arr[i][1]);
      depth += aim * parseInt(arr[i][1]);
    } 
    if (arr[i][0] === 'down') {
      aim += parseInt(arr[i][1]);
    }
    if (arr[i][0] === 'up') {
      aim -= parseInt(arr[i][1]);
    } 
  }
  return forward * depth;
};

console.log(directions
  (commandsArr));
console.log(directions2(commandsArr));

