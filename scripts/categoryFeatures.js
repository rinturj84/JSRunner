import fs from 'fs';
import inputData from "../data/index.js";
const fileName = "vendingSlots";

const newVal = inputData[fileName].map((item) => {
  if (item.data.extSlotNumber && typeof item.data.extSlotNumber !== 'number') {
    item.data.extSlotNumber = Number(item.data.extSlotNumber);
  }
  return item;
});

// const newVal2 = inputData[fileName].map((elem) => {
//   const { data } = elem;
//   const { key, ...feature } = data;
//   elem.data = { ...feature, displayName: feature.name };
//   return elem;
// });
fs.writeFile(`./data/output/${fileName}.json`, JSON.stringify(newVal), 'utf8',console.log);
console.log("========START========");
console.log(JSON.stringify(newVal, null, 2));
console.log("=========END=========");
