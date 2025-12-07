const fs = require('fs');

let info = fs.readFileSync("day07input.txt", "utf8").split("\n");
info = info.map(e => e.split(""))

let totalSplits = 0;
for (let i = 0; i < info.length; i++) {
    for (let j = 0; j < info[0].length; j++) {
        if (i != 0 && (info[i-1][j] == "|" || info[i-1][j] == "S") && info[i][j] != "^") {
            info[i][j] = "|";
        }
        if (j > 0 && info[i][j-1] == "^") {
            info[i][j] = "|";
        }
        if (j < info[0].length - 1 && info[i][j+1] == "^") {
            info[i][j] = "|";
        }
        if (i < info.length - 1 && info[i+1][j] == "^" && info[i][j] == "|") {
            totalSplits++;
        }
    }
}
console.log("Part One Solution: " + totalSplits);

for (let i = 0; i < info.length; i++) {
    for (let j = 0; j < info[0].length; j++) {
        let v = 0;
        if (i != 0 && (typeof info[i-1][j] == "number" || info[i-1][j] == "S") && info[i][j] != "^") {
            v = typeof info[i-1][j] == "number" ? info[i-1][j] : 1;
        }
        if (j > 0 && info[i][j-1] == "^" && typeof info[i-1][j-1] == "number") {
            v += info[i-1][j-1];
        }
        if (j < info[0].length - 1 && info[i][j+1] == "^" && typeof info[i-1][j+1] == "number") {
            v += info[i-1][j+1];
        }
        if (v > 0) info[i][j] = v;
    }
}
let timelines = info[info.length - 1].reduce((a, b) => a + (typeof b == "number" ? b : 0));
console.log("Part Two Solution: " + timelines);