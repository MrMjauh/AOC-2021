const fs = require("fs");

const input = fs.readFileSync("input", "utf-8");
//const input = fs.readFileSync("input_example", "utf-8");
const readings = input.split("\n")

const adjacencyMap = {};
for (const reading of readings) {
    let [from, to] = reading.split("-");
    from = from.trim();
    to = to.trim()
    if (!(from in adjacencyMap)) {
        adjacencyMap[from] = [];
    }
    if (!(to in adjacencyMap)) {
        adjacencyMap[to] = [];
    }

    adjacencyMap[from].push(to);
    adjacencyMap[to].push(from);
}

function canVisitCaveTwice(currentPath) {
    const bucket = {};
    for (const path of currentPath) {
        if (path !== path.toUpperCase()) {
            if (path in bucket) {
                return false;
            }
            bucket[path] = true;
        }
    }
    return true;
}

function findPaths(currentNode, adjacencyMap, currentPath, res, canVisitCaveTwiceOnce) {
    if (currentNode === "end") {
        currentPath.push(currentNode);
        res.push(currentPath);
        return;
    } else if (currentNode === "start" && currentPath.length > 0) {
        return;
    }

    currentPath.push(currentNode);
    const newPaths = adjacencyMap[currentNode];
    const validNewPaths = newPaths.filter(path => {
        if (path === path.toUpperCase()) {
            return true;
        } else {
            const isVisited = currentPath.filter(val => val === path).length > 0;
            if (!isVisited) {
                return true;
            } else if (isVisited && !canVisitCaveTwiceOnce) {
                return false;
            } else {
                return canVisitCaveTwice(currentPath);
            }
        }
    })

    for (const validPath of validNewPaths) {
        findPaths(validPath, adjacencyMap, [...currentPath], res, canVisitCaveTwiceOnce);
    }
}

const arr = []
findPaths("start", adjacencyMap, [], arr, false)
console.log(`part 1 > ${arr.length}`);
const arr2 = []
findPaths("start", adjacencyMap, [], arr2, true)
console.log(`part 2 > ${arr2.length}`);