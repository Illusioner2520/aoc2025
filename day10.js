const fs = require('fs');

let info = fs.readFileSync("day10input.txt", "utf8").split("\n");
info = info.map(e => e.split(" "));

let total = 0;

for (let i = 0; i < info.length; i++) {
    let lights = ".".repeat(info[i][0].length - 2);
    let goal = info[i][0].substring(1, info[i][0].length - 1);
    let results = [{ lights: lights, pressed: 0 }];
    m: while (true) {
        let newResults = [];
        for (let k = 0; k < results.length; k++) {
            for (let j = 1; j < info[i].length - 1; j++) {
                let indexes = info[i][j].substring(1, info[i][j].length - 1).split(",").map(Number);
                let tempLights = results[k].lights.split("");
                indexes.forEach(e => tempLights[e] = tempLights[e] == "." ? "#" : ".");
                newResults.push({ lights: tempLights.join(""), pressed: results[k].pressed + 1 });
                if (tempLights.join("") == goal) {
                    total += results[k].pressed + 1;
                    break m;
                }
            }
        }
        results = newResults.filter((obj, index, self) =>
            index === self.findIndex((o) => o.lights === obj.lights && o.pressed === obj.pressed)
        );
    }
}

console.log("Part One Solution: " + total);