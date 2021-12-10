const fs = require("fs");

const input = fs.readFileSync("input", "utf-8");
//const input = fs.readFileSync("input_example", "utf-8");
const readings = input.split("\r\n");

const heightMap = [];

for (const reading of readings) {
    heightMap.push(reading.split("").map(reading => parseInt(reading)))
}

const neighbours = [[-1,0], [1, 0], [0, -1], [0, 1]]

let sum = 0;
let lowPointCords = []
for (let y = 0; y < heightMap.length; y++) {
    for (let x = 0; x < heightMap[y].length; x++) {
        const heightAtPoint = heightMap[y][x];
        let isLowPoint = true;
        for (const neighbour of neighbours) {
            const nX = x + neighbour[0];
            const nY = y + neighbour[1];
            if (nX < 0 || nX >= heightMap[y].length || nY < 0 || nY >= heightMap.length) {
                continue;
            } else if (heightMap[nY][nX] <= heightAtPoint) {
                isLowPoint = false;
                break;
            }
        }

        if (isLowPoint) {
            lowPointCords.push([x, y]);
            sum += heightAtPoint + 1;
        }
    }
}

function getValidNeighbours(x, y, heightMap) {
    const points = [];
    for (const neighbour of neighbours) {
        const nX = x + neighbour[0];
        const nY = y + neighbour[1];
        if (nX < 0 || nX >= heightMap[0].length || nY < 0 || nY >= heightMap.length) {
            continue;
        } else if (heightMap[nY][nX] !== 9) {
            points.push([nX, nY])
        }
    }

    return points;
}

function createKey(x, y) {
    return x + "_" + y;
}

function findBasins(lowPointCords, heightMap) {
    const sizeList = [];
    for (const lowPointCord of lowPointCords) {
        let size = 1;
        const visited = {};
        visited[createKey(lowPointCord[0], lowPointCord[1])] = true;
        const pointsToVisit = [...getValidNeighbours(lowPointCord[0], lowPointCord[1], heightMap)];
        while (pointsToVisit.length > 0) {
            const pointToVisit = pointsToVisit.pop();
            const key = createKey(pointToVisit[0], pointToVisit[1]);
            if (key in visited) {
                continue;
            }

            visited[key] = true;
            size++;

            const neighbours = getValidNeighbours(pointToVisit[0], pointToVisit[1], heightMap);
            neighbours
            .filter((neighbour) => !(createKey(neighbour[0], neighbour[1]) in visited))
            .forEach((neighbour) => {
                pointsToVisit.push(neighbour)
            });
        }

        sizeList.push(size)
    }

    return sizeList;
}

const start = Date.now()
console.log(`part 1 > ${sum}`);
console.log(`part 2 > ${findBasins(lowPointCords, heightMap).sort((a, b) => b - a).slice(0, 3).reduce((a, b) => a * b)}`);
console.log(`${Date.now() - start} ms`);