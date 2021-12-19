const fs = require("fs");
const input = fs.readFileSync("input", "utf-8");

const decodeTable = {
    "0": "0000",
    "1": "0001",
    "2": "0010",
    "3": "0011",
    "4": "0100",
    "5": "0101",
    "6": "0110",
    "7": "0111",
    "8": "1000",
    "9": "1001",
    "A": "1010",
    "B": "1011",
    "C": "1100",
    "D": "1101",
    "E": "1110",
    "F": "1111"
}

const decodeHex = (hex) => {
    let binaryFile = "";
    for (let i = 0; i < hex.length; i++) {
        binaryFile += decodeTable[hex[i]];
    }
    return binaryFile;
}

// # 3 bit version
// # 3 bit type ID (4 )
const readPacketFromBuffer = (binaryFile, marker = 0) => {
    if (binaryFile.length < (marker - 5)) {
        return {
            type: -1,
            marker: marker
        }
    }

    const packetVersion = binaryFile.substr(marker, 3);
    marker += 3;
    const packetType = binaryFile.substr(marker, 3);
    marker += 3;

    let packageVersionInt = parseInt(packetVersion, 2);
    let packageTypeInt = parseInt(packetType, 2);

    switch (packageTypeInt) {
        case 4: return { version: packageVersionInt, type: packageTypeInt, ...readLiteralPacket(binaryFile, marker) };
        default: return { version: packageVersionInt, type: packageTypeInt, ...operatorPacket(binaryFile, marker) };
    }
}

const readLiteralPacket = (binaryFile, marker) => {
    let end = false;
    let data = "";
    while (!end) {
        const package = binaryFile.substr(marker, marker + 5);
        if (package[0] === '0') {
            end = true;
        }
        data += package.substr(1, 4);
        marker += 5;
    }

    return {
        data: parseInt(data, 2),
        marker: marker
    }
}

const operatorPacket = (binaryFile, marker) => {
    const lengthTypeId = binaryFile.substr(marker, 1);
    marker += 1;

    if (lengthTypeId === '0') {
        const size = binaryFile.substr(marker, 15);
        marker += 15;
        const intSize = parseInt(size, 2);
        const stopMark = marker + intSize;

        const subPackages = [];
        while (marker < stopMark) {
            const package = readPacketFromBuffer(binaryFile, marker);
            marker = package.marker;
            subPackages.push(package);
        }
        return {
            data: subPackages,
            marker: marker
        }
    } else {
        const packages = binaryFile.substr(marker, 11);
        marker += 11;
        const intPackages = parseInt(packages, 2);
        const subPackages = []
        for (let i = 0; i < intPackages; i++) {
            const package = readPacketFromBuffer(binaryFile, marker);
            subPackages.push(package);
            marker = package.marker;
        }
        return {
            data: subPackages,
            marker: marker
        }
    }
}

const sumVersionNumbers = (package) => {
    if (package.type === -1) {
        return 0;
    } else if (package.type === 4) {
        return package.version;
    } else {
        let sum = 0;
        for (const subPackage of package.data) {
            sum += sumVersionNumbers(subPackage);
        }
        return package.version + sum;
    }
}

const evaluate = (package) => {
    if (package.type === -1) {
        return 0;
    } else if (package.type === 0) {
        let sum = 0;
        for (const subPackage of package.data) {
            sum += evaluate(subPackage);
        }
        return sum;
    } else if (package.type === 1) {
        let sum = 1;
        for (const subPackage of package.data) {
            sum *= evaluate(subPackage);
        }
        return sum;
    } else if (package.type === 2) {
        let numbers = [];
        for (const subPackage of package.data) {
            numbers.push(evaluate(subPackage));
        }
        return Math.min(...numbers);
    } else if (package.type === 3) {
        let numbers = [];
        for (const subPackage of package.data) {
            numbers.push(evaluate(subPackage));
        }
        return Math.max(...numbers);
    } else if (package.type === 4) {
        return package.data;
    } else if (package.type === 5) {
        let numbers = [];
        for (const subPackage of package.data) {
            numbers.push(evaluate(subPackage));
        }
        if (numbers[0] > numbers[1]) {
            return 1;
        }
        return 0;
    } else if (package.type === 6) {
        let numbers = [];
        for (const subPackage of package.data) {
            numbers.push(evaluate(subPackage));
        }
        if (numbers[0] < numbers[1]) {
            return 1;
        }
        return 0;
    } else if (package.type === 7) {
        let numbers = [];
        for (const subPackage of package.data) {
            numbers.push(evaluate(subPackage));
        }
        if (numbers[0] === numbers[1]) {
            return 1;
        }
        return 0;
    }
}


binaryFile = decodeHex(input);
const package = readPacketFromBuffer(binaryFile);
console.log("part 1 > " + sumVersionNumbers(package));
console.log("part 2 > " + evaluate(package));
