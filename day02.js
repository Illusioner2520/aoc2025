const fs = require('fs');

let info = fs.readFileSync("day02input.txt", "utf8").split(",");

function isInvalidNum(n) {
    let str = n.toString();
    let length = str.length;
    if (length % 2 == 1) return false;
    let num1 = Number(str.substring(0,length/2));
    let num2 = Number(str.substring(length/2));
    return num1 == num2;
}

function isInvalidNumPt2(n) {
    let str = n.toString();
    let length = str.length;
    for (let i = 1; i <= length / 2; i++) {
        let sub = str.substring(0,i);
        if (length % i == 0 && sub.repeat(length / i) == str) return true;
    }
    return false;
}

let sum = 0;
let sum2 = 0;

for (let i = 0; i < info.length; i++) {
    let nums = info[i].split("-").map(Number);
    for (let j = nums[0]; j <= nums[1]; j++) {
        if (isInvalidNum(j)) {
            sum += j;
        }
        if (isInvalidNumPt2(j)) {
            sum2 += j;
        }
    }
}

console.log("Part One Solution: " + sum);
console.log("Part Two Solution: " + sum2);