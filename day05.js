const fs = require('fs');

let info = fs.readFileSync("day05input.txt", "utf8").split("\r\n\r\n");
info = info.map(e => e.split("\r\n"));
info[0] = info[0].map(e => e.split("-").map(Number));
info[1] = info[1].map(Number);

let fresh = 0;
main: for (let i = 0; i < info[1].length; i++) {
    for (let j = 0; j < info[0].length; j++) {
        if (info[1][i] >= info[0][j][0] && info[1][i] <= info[0][j][1]) {
            fresh++;
            continue main;
        }
    }
}
console.log("Part One Solution: " + fresh);

let done = false;

let oldRanges = info[0];

let compactsComplete = 0;

while (!done) {
    let ranges = [];
    let compacted = 0;
    main: for (let i = 0; i < oldRanges.length; i++) {
        for (let j = 0; j < ranges.length; j++) {
            if (oldRanges[i][0] >= ranges[j][0] && oldRanges[i][0] <= ranges[j][1] + 1) {
                ranges[j][1] = Math.max(ranges[j][1], oldRanges[i][1]);
                compacted++;
                continue main;
            }
            if (oldRanges[i][1] >= ranges[j][0] - 1 && oldRanges[i][1] <= ranges[j][1]) {
                ranges[j][0] = Math.min(ranges[j][0], oldRanges[i][0]);
                compacted++;
                continue main;
            }
        }
        ranges.push(oldRanges[i])
    }
    oldRanges = ranges.toReversed();
    if (compacted == 0) {
        compactsComplete++;
    } else {
        compactsComplete = 0;
    }
    done = compactsComplete == 2;
}

oldRanges = oldRanges.map(e => e[1] - e[0] + 1);

console.log("Part Two Solution: " + oldRanges.reduce((a, b) => a + b));