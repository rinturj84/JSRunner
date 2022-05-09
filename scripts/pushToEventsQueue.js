import * as AWS from "aws-sdk";
import { v4 as uuidV4 } from "uuid";
import { readJSONFile } from "../utils/fileIO";

const region = "eu-west-1";
const account = "107914033409";
const machineTelemetryQueueName = "MachineTelemetryQueue";
const myConfig = new AWS.Config({
    region,
});
AWS.config.update(myConfig);
const sqs = new AWS.SQS({ apiVersion: "2012-11-05" });

const config = {
  //   https://sqs.eu-west-1.amazonaws.com/107914033409/MachineTelemetryQueue
  QueueUrl: `https://sqs.${region}.amazonaws.com/${account}/${machineTelemetryQueueName}`,
  DelaySeconds: 10,
};

export const pushToTelemetryQueue = async (message) => {
  const params = JSON.parse(JSON.stringify(config));
  params.MessageBody = JSON.stringify(message);
  try {
    const response = await sqs.sendMessage(params).promise();
    console.log(`Response after pushing to Q:${JSON.stringify(response)}`);
    return true;
  } catch (e) {
    console.error(
      `Error pushing messages from queue with options: ${JSON.stringify(
        params,
        null,
        4
      )} err: ${e} err.stack: ${e}`
    );
    return false;
  }
};

const telemetryEvents = readJSONFile("telemetryEventsFromDynamoDB");

// const telemetryObject = {
//   "c": `CR:AP:AN:0000:${new Date().getTime()}:SS`,
//   "vid": "6e57fc86-4d62-48bd-9ba6-bd674ce78219",
//   "mid": "aa84b968-95b3-401c-9f19-d6f3b6808fba",
//   "mt": "NA",
//   "d": { "v": 'NO_SALE_FOR_A_DAY' },
//   "id": uuidV4(),
// };

// pushToTelemetryQueue(telemetryObject);

for (let i = 0; i < telemetryEvents.length; i++) {
  const telemetry = telemetryEvents[i];
  console.log({ telemetry });
  pushToTelemetryQueue(telemetry);
  console.log("Done...");
}
