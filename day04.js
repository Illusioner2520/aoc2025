const fs = require('fs');

let info = fs.readFileSync("day04input.txt", "utf8").split("\n");
info = info.map(e => e.split(""));

function getCoords(x, y) {
    if (x < 0) return null;
    if (y < 0) return null;
    if (x > info[0].length - 1) return null;
    if (y > info.length - 1) return null;
    return info[y][x];
}

function getAround(x, y) {
    let count = 0;
    for (let a = -1; a <= 1; a++) {
        for (let b = -1; b <= 1; b++) {
            if (a == 0 && b == 0) continue;
            if (getCoords(x + a, y + b) == "@") count++;
        }
    }
    return count;
}

let accessible = 0;

for (let x = 0; x < info[0].length; x++) {
    for (let y = 0; y < info.length; y++) {
        if (getCoords(x, y) != "@") continue;
        let around = getAround(x, y);
        if (around < 4) accessible++;
    }
}

console.log("Part One Solution: " + accessible);

let accessiblePt2 = 0;
let done = false;

while (!done) {
    let thisRound = 0;
    for (let x = 0; x < info[0].length; x++) {
        for (let y = 0; y < info.length; y++) {
            if (getCoords(x, y) != "@") continue;
            let around = getAround(x, y);
            if (around < 4) {
                accessiblePt2++;
                thisRound++;
                info[y][x] = ".";
            }
        }
    }
    if (thisRound == 0) {
        done = true;
    }
}

console.log("Part Two Solution: " + accessiblePt2);