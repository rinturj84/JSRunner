import fs from 'fs';
import path from 'path';

let data = {};
const jsonsInDir = fs.readdirSync(`${__dirname}/json`).filter(file => path.extname(file) === '.json');

jsonsInDir.forEach(file => {
  const fileData = fs.readFileSync(path.join(`${__dirname}/json`, file));
  const json = JSON.parse(fileData.toString());
  data[file.replace('.json','')] = json;
});

export default data;
