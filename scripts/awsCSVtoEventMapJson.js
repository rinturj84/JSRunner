import * as DynamoDBUtil from "@aws-sdk/util-dynamodb";
import csv from "csvtojson";
import { writeToFile } from "../utils/fileIO";

const parse = async () => {
  const telemetries = [];
  const awsJson = await csv().fromFile("./data/csv/eventCriteria.csv");

  for (let i = 0; i < awsJson.length; i++) {
    const awsDynamoRow = awsJson[i];
    const parsedJson = JSON.parse(awsDynamoRow.criterion);
    const criterion = parsedJson.map((item) =>
      DynamoDBUtil.unmarshall({ item }).item
    );
    awsDynamoRow.criterion = criterion;
    telemetries.push(awsDynamoRow);
  }

  writeToFile("telemetryEventMapFromDynamoDB", telemetries);
};

parse();