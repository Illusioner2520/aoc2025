const fs = require('fs');

let info = fs.readFileSync("day03input.txt", "utf8").split("\n");

let total = 0;

for (let i = 0; i < info.length; i++) {
    let number = "";
    let previousIndex = -1;
    let numSearch = 9;
    while (number.length < 2) {
        let index = info[i].indexOf(numSearch.toString(), previousIndex + 1);
        if (index < 0 || index > info[i].length - 2 + number.length) {
            numSearch--;
            continue;
        }
        number += numSearch;
        previousIndex = index;
        numSearch = 9;
    }
    total += Number(number);
}

console.log("Part One Solution: " + total);


let total2 = 0;

for (let i = 0; i < info.length; i++) {
    let number = "";
    let previousIndex = -1;
    let numSearch = 9;
    while (number.length < 12) {
        let index = info[i].indexOf(numSearch.toString(), previousIndex + 1);
        if (index < 0 || index > info[i].length - 12 + number.length) {
            numSearch--;
            continue;
        }
        number += numSearch;
        previousIndex = index;
        numSearch = 9;
    }
    total2 += Number(number);
}

console.log("Part Two Solution: " + total2);