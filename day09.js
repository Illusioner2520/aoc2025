const fs = require('fs');

let info = fs.readFileSync("day09input.txt", "utf8").split("\n");
info = info.map(e => e.split(",").map(Number));

let maxArea = 0;

for (let i = 0; i < info.length; i++) {
    for (let j = i + 1; j < info.length; j++) {
        let area = Math.abs((info[i][0] - info[j][0] + 1) * (info[i][1] - info[j][1] + 1));
        maxArea = Math.max(maxArea, area);
    }
}

console.log("Part One Solution: " + maxArea);

let outside = [];
let extraOutside = [];

let insideDir = 1;
// 0 - right;
// 1 - up;
// 2 - left;
// 3 - down;

for (let i = 0; i < info.length; i++) {
    let previous = i == 0 ? info[info.length - 1] : info[i - 1];
    let current = info[i];
    let future = i == info.length - 1 ? info[0] : info[i + 1];
    let goesLeft = previous[0] > current[0];
    let goesRight = previous[0] < current[0];
    let goesUp = previous[1] > current[1];
    let goesDown = previous[1] < current[1];
    let willGoLeft = current[0] > future[0];
    let willGoRight = current[0] < future[0];
    let willGoUp = current[1] > future[1];
    let willGoDown = current[1] < future[1];
    let leftTurn = (goesLeft && willGoDown) || (goesRight && willGoUp) || (goesUp && willGoLeft) || (goesDown && willGoRight);
    let m = insideDir >= 2 ? -1 : 1;
    if (goesLeft) {
        if (willGoUp) {
            outside.push([current[0] - m, current[1] + m]);
        } else if (willGoDown) {
            outside.push([current[0] + m, current[1] + m]);
        }
    } else if (goesRight) {
        if (willGoUp) {
            outside.push([current[0] + m, current[1] + m]);
        } else if (willGoDown) {
            outside.push([current[0] - m, current[1] + m]);
        }
    } else if (goesUp) {
        if (willGoLeft) {
            outside.push([current[0] - m, current[1] + m]);
        } else if (willGoRight) {
            outside.push([current[0] - m, current[1] - m]);
        }
    } else if (goesDown) {
        if (willGoLeft) {
            outside.push([current[0] - m, current[1] - m]);
        } else if (willGoRight) {
            outside.push([current[0] - m, current[1] + m]);
        }
    }
    if (leftTurn) {
        insideDir++;
        insideDir %= 4;
    } else {
        insideDir--;
        if (insideDir == -1) insideDir = 3;
    }
    let last = outside[outside.length - 1];
    if (outside.length < 2) continue;
    let last2 = outside[outside.length - 2];
    if (last[0] < last2[0]) {
        for (let i = last[0] + 1; i < last2[0]; i += 50) {
            extraOutside.push([i, last[1]]);
        }
    } else if (last2[0] < last[0]) {
        for (let i = last2[0] + 1; i < last[0]; i += 50) {
            extraOutside.push([i, last[1]]);
        }
    } else if (last[1] < last2[1]) {
        for (let i = last[1] + 1; i < last2[1]; i += 50) {
            extraOutside.push([last[0], i]);
        }
    } else if (last2[1] < last[1]) {
        for (let i = last2[1] + 1; i < last[1]; i += 50) {
            extraOutside.push([last[0], i]);
        }
    }
}

outside = outside.concat(extraOutside);

let maxAreaPt2 = 0;

for (let i = 0; i < info.length; i++) {
    b: for (let j = i + 1; j < info.length; j++) {
        for (let k = 0; k < outside.length; k++) {
            if (((info[i][0] <= outside[k][0] && outside[k][0] <= info[j][0]) || (info[j][0] <= outside[k][0] && outside[k][0] <= info[i][0])) && ((info[i][1] <= outside[k][1] && outside[k][1] <= info[j][1]) || (info[j][1] <= outside[k][1] && outside[k][1] <= info[i][1]))) {
                continue b;
            }
        }
        let area = Math.abs((info[j][0] - info[i][0] + 1) * (info[i][1] - info[j][1] + 1));
        maxAreaPt2 = Math.max(maxAreaPt2, area);
    }
}

console.log("Part Two Solution: " + maxAreaPt2);