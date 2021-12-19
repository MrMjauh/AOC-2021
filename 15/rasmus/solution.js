const fs = require("fs");

const input = fs.readFileSync("input", "utf-8");
//const input = fs.readFileSync("input_example", "utf-8");
const lines = input.split("\n");

const map = [];
for (const line of lines) {
    map.push(line.trim().split("").map(item => parseInt(item)))
}

function solveAStar(map) {
    let toVisit = [{x: 0, y: 0, cost: 0, from: undefined}];
    const neighbours = [[1,0], [-1, 0], [0, 1], [0, -1]];
    
    const openList = {};
    const closedList = {};
    const hashKey = (x, y) => x + "_" + y;

    while (toVisit.length > 0) {
        // :cry:
        toVisit = toVisit.sort((a, b) => a.cost - b.cost);
        let nodeToVisit = toVisit[0];
        toVisit = toVisit.slice(1);
        const nodeKey = hashKey(nodeToVisit.x, nodeToVisit.y);
        delete openList[nodeKey];
        closedList[nodeKey] = nodeToVisit;
    
        // End node
        if (nodeToVisit.x === (map[0].length - 1) && nodeToVisit.y === (map.length - 1)) {
            const path = [];
            while(nodeToVisit.from !== undefined) {
                path.push(nodeToVisit);
                nodeToVisit = nodeToVisit.from;
            }
            path.push(nodeToVisit);
            return path;
        }
    
        for (const neighbour of neighbours) {
            const x = neighbour[0] + nodeToVisit.x;
            const y = neighbour[1] + nodeToVisit.y;
            if (x < 0 || x >= map[0].length || y < 0 || y >= map.length) {
                continue;
            }
            const key = hashKey(x, y);
            const cost = nodeToVisit.cost + map[y][x];
    
            if (key in openList) {
                if (cost < openList[key].cost) {
                    openList[key].cost = cost;
                    openList[key].from = nodeToVisit;
                    const index = toVisit.findIndex(val => val.x === x && val.y === y);
                    toVisit[index].cost = cost;
                    toVisit[index].from = nodeToVisit;
                }
            } else if (key in closedList) {
                if (cost < closedList[key].cost) {
                    const node = closedList[key];
                    node.cost = cost;
                    node.from = nodeToVisit;
                    openList[key] = node;
                    delete closedList[key];
                    toVisit.push(node);
                }
            } else {
                const node = {x: x, y: y, cost: cost, from: nodeToVisit};
                openList[key] = node;
                toVisit.push(node);
            }
        } 
    }
}

function expandMap(map, times) {
    const width = map[0].length;
    const height = map.length;
    const newMap = [];
    for (let y = 0; y < height*times; y++) {
        const row = []
        for (let x = 0; x < width*times;x++) {
            row.push(0)
        }
        newMap.push(row);
    }
    
    for (let vert = 0; vert < times; vert++) {
        for (let horz = 0; horz < times; horz++) {
            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    const costIncrease = vert + horz;
                    const xCord = x + (horz * width);
                    const yCord = y + (vert * height);
                    let cost = (map[y][x] + costIncrease) % 9;
                    if (cost === 0) {
                        cost = 9;
                    }
                    newMap[yCord][xCord] = cost;
                }
            }
        }
    }
    
    return newMap;
}

function prettyRenderMap(map) {
    let res = "";
    for (let y = 0; y < map.length;y++) {
        for (let x = 0; x < map[y].length;x++) {
            res += map[y][x];
        }
        res += "\n"
    }
    return res;
}

const path = solveAStar(map);
console.log("part 1 > " + path[0].cost);
const path2 = solveAStar(expandMap([...map], 5));
console.log("part 2 > " + path2[0].cost);