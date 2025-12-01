const fs = require('fs');

let info = fs.readFileSync("day01input.txt", "utf8").split("\n");

let zerosCountPt1 = 0;
let currentNumber = 50;

for (let i = 0; i < info.length; i++) {
    if (info[i][0] == "L") {
        currentNumber -= Number(info[i].substring(1));
    } else if (info[i][0] == "R") {
        currentNumber += Number(info[i].substring(1));
    }
    currentNumber += 100;
    currentNumber %= 100;
    if (currentNumber == 0) zerosCountPt1++;
}

console.log("Part One Solution: " + zerosCountPt1);


let zerosCountPt2 = 0;
currentNumber = 50;

for (let i = 0; i < info.length; i++) {
    let modifier = 1;
    if (info[i][0] == "L") {
        modifier = -1;
    }
    for (let j = 0; j < Number(info[i].substring(1)); j++) {
        currentNumber += modifier;
        currentNumber += 100;
        currentNumber %= 100;
        if (currentNumber == 0) zerosCountPt2++;
    }
}

console.log("Part Two Solution: " + zerosCountPt2);