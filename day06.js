const fs = require('fs');

let info = fs.readFileSync("day06input.txt", "utf8").split("\n");
info = info.map(e => e + " ");

let grandTotal = 0;
let currentIndex = 0;

while (true) {
    let symbol = info[info.length - 1].substring(currentIndex, currentIndex + 1);
    let value = symbol == "+" ? 0 : 1;
    let maxSpaceIndex = 0;
    for (let j = 0; j < info.length - 1; j++) {
        let spaceIndex = info[j].indexOf(" ", currentIndex);
        maxSpaceIndex = Math.max(maxSpaceIndex, spaceIndex);
    }
    if (maxSpaceIndex == 0) {
        maxSpaceIndex = info[0].length;
        break;
    }
    for (let j = 0; j < info.length - 1; j++) {
        let n = Number(info[j].substring(currentIndex, maxSpaceIndex).trim());
        if (symbol == "+") value += n;
        else value *= n;
    }
    currentIndex = maxSpaceIndex + 1;
    grandTotal += value;
}

console.log("Part One Solution: " + grandTotal);

let grandTotalPt2 = 0;

currentIndex = 0;

while (true) {
    let symbol = info[info.length - 1].substring(currentIndex, currentIndex + 1);
    let value = symbol == "+" ? 0 : 1;
    let maxSpaceIndex = 0;
    for (let j = 0; j < info.length - 1; j++) {
        let spaceIndex = info[j].indexOf(" ", currentIndex);
        maxSpaceIndex = Math.max(maxSpaceIndex, spaceIndex);
    }
    if (maxSpaceIndex == 0) {
        maxSpaceIndex = info[0].length;
        break;
    }
    for (let j = currentIndex; j < maxSpaceIndex; j++) {
        let n = Number(("" + info[0][j] + info[1][j] + info[2][j] + info[3][j]).trim());
        if (symbol == "+") value += n;
        else value *= n;
    }
    currentIndex = maxSpaceIndex + 1;
    grandTotalPt2 += value;
}

console.log("Part Two Solution: " + grandTotalPt2);