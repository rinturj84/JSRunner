import { readJSONFile, writeToFile } from "../utils/fileIO";

// Change to your input json file name.
const fileName = "inputFileName";
const inputData = readJSONFile(fileName);
const outputData = inputData; // Implement the relevant parser and store into outputData variable.

writeToFile(fileName, outputData);
