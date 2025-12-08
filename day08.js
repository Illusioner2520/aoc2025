const fs = require('fs');

let info = fs.readFileSync("day08input.txt", "utf8").split("\n");
info = info.map(e => e.split(",").map(Number));

let connections = [];

for (let i = 0; i < info.length; i++) {
    for (let j = i + 1; j < info.length; j++) {
        connections.push({
            "box1": i,
            "box2": j,
            "distance": Math.sqrt((info[i][0] - info[j][0]) ** 2 + (info[i][1] - info[j][1]) ** 2 + (info[i][2] - info[j][2]) ** 2)
        });
    }
}

connections.sort((a, b) => a.distance - b.distance);

let circuits = [];
let i = 0;
while (true) {
    let boxes = connections[i];
    let box1circuit = -1;
    let box2circuit = -2;
    for (let j = 0; j < circuits.length; j++) {
        if (circuits[j].includes(boxes.box1)) box1circuit = j;
        if (circuits[j].includes(boxes.box2)) box2circuit = j;
    }
    if (box1circuit == box2circuit) {
        i++;
        continue;
    }
    if (box1circuit >= 0 && box2circuit >= 0) {
        if (circuits.length == 2 && circuits[0].length + circuits[1].length == info.length) {
            let product = info[boxes.box1][0] * info[boxes.box2][0];
            console.log("Part Two Solution: " + product);
            break;
        }
        circuits[box1circuit] = circuits[box1circuit].concat(circuits[box2circuit]);
        circuits.splice(box2circuit, 1);
    } else if (box1circuit >= 0) {
        if (circuits.length == 1 && circuits[0].length == info.length - 1) {
            let product = info[boxes.box1][0] * info[boxes.box2][0];
            console.log("Part Two Solution: " + product);
            break;
        }
        circuits[box1circuit].push(boxes.box2);
    } else if (box2circuit >= 0) {
        if (circuits.length == 1 && circuits[0].length == info.length - 1) {
            let product = info[boxes.box1][0] * info[boxes.box2][0];
            console.log("Part Two Solution: " + product);
            break;
        }
        circuits[box2circuit].push(boxes.box1);
    } else {
        circuits.push([boxes.box1, boxes.box2]);
    }
    i++;
    if (i == 10) {
        circuits.sort((a, b) => b.length - a.length);
        let product = circuits[0].length * circuits[1].length * circuits[2].length;
        console.log("Part One Solution: " + product);
    }
}