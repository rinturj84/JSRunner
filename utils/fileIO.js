
import fs from 'fs';
import allInputData from "../data/index.js";

export const readJSONFile = (fileName) => {
    if (!fileName) {
        console.error('🔦 file name is missing!');
        return
    }
    const fileNames = Object.keys(allInputData);
    if (fileNames.includes(fileName)) {
        return allInputData[fileName]
    }
};

export const writeToFile = (fileName, outputData = '', type = "json") => {
  fs.writeFile(
    `./data/output/${fileName}.${type}`,
    JSON.stringify(outputData),
    "utf8",
    console.log
  );
  console.log("🚀 Finished writing into file 😀");
  console.log(`🛣️ Path: /data/output/${fileName}.${type}`);
};