import { v4 as uuid } from "uuid";
import { readJSONFile, writeToFile } from "../utils/fileIO";

export const CRITERIA = {
  CB: {
    handler: (data) => {
      return data - 1;
    },
  },
  CA: {
    handler: (data) => {
      return data + 1;
    },
  },
  CE: {
    handler: (data) => {
      return data;
    },
  },
  CI: {
    handler: (data) => {
      return data[0];
    },
  },
  IE: {
    handler: (data) => {
      return true;
    },
  },
};

const generateTelemetryObject = (
  severityCode,
  originCode,
  vendingMachineId,
  vendorId,
  eventSubTypeCode,
  eventCode,
  timeInMilliSeconds,
  source,
  machineType,
  value
) => {
  const item = {
    c: `${severityCode}:${originCode}:${eventSubTypeCode}:${eventCode}:${timeInMilliSeconds}:${source}`,
    vid: vendorId,
    mid: vendingMachineId,
    mt: machineType,
    d: {
      v: value,
    },
    id: uuid(),
  };
  return item;
};

const mid = "aa84b968-95b3-401c-9f19-d6f3b6808fba";
const vid = "6e57fc86-4d62-48bd-9ba6-bd674ce78219";
const machineType = "NA";
const origin = "OS";
const source = "SS";

const severityMap = {
  RED: "CR",
  AMBER: "MD",
  INFO: "GN",
};

const eventMaps = readJSONFile("telemetryEventMapFromDynamoDB");

const eventTelemetries = [];

eventMaps.forEach((eventTypes, index) => {
  const timeInMilliSeconds = new Date().getTime();
  const { criterion, telemetryCode, eventSubType } = eventTypes;
  criterion.forEach((criteria) => {
    const {
      severity,
      threshold: { value },
      criteria: criteriaType,
    } = criteria;
    const triggerValue = CRITERIA[criteriaType].handler(value);
    const telemetry = generateTelemetryObject(
      severityMap[severity],
      origin,
      mid,
      vid,
      eventSubType,
      telemetryCode,
      timeInMilliSeconds,
      source,
      machineType,
      triggerValue
    );
    eventTelemetries.push(telemetry);
  });
});
console.log(
  `${
    eventTelemetries.length || 0
  } valid event telemetries created for ${JSON.stringify(
    { mid, vid, origin, source, machineType },
    null,
    2
  )}`
);
writeToFile("telemetryEventsFromDynamoDB", eventTelemetries);
