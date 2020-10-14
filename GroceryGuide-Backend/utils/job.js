const data1 = require("./config");
const data2 = require("./config2");
const data3 = require("./config3");
const writeJsonFile = require("write-json-file");

const d = {}

for (let i = 0; i < data1.length; ++i) {
    const el = data1[i]
    console.log("1: ", i)
    if (i === 0) continue;
  if (i % 2 !== 0) {
      const key = data1[i - 1].slice(0, -1);
      d[key] = el;
  }  
}
for (let i = 0; i < data2.length; ++i) {
    const el = data2[i]
    console.log("2: ", i)
    if (i === 0) continue;
  if (i % 2 !== 0) {
      const key = data2[i - 1].slice(0, -1);
      d[key] = el;
  }  
}

 for (let i = 0; i < data3.length; ++i) {
     const el = data3[i]
    console.log("3: ", i)
    if (i === 0) continue;
  if (i % 2 !== 0) {
        const key = data3[i - 1].slice(0, -1);
        d[key] = el;
    }  
 }
    


writeJsonFile("busyTimes.json", d);