import { v4 as uuidV4 } from "uuid";
import { Parser } from "json2csv";
import { writeToFile } from "../utils/fileIO";

// Regex ====================

const TECHNICAL_EVENT = "TECHNICAL";
const CRITICAL_SEVERITY = "RED";
const MEDIUM_SEVERITY = "AMBER";
const GENERAL_SEVERITY = "INFO";

// [severity]:[origin]:[eventSubType]:[eventCode]:[timeInMilliseconds]:[source]

// ErrorCodeStructure ====================
export const SEPARATOR = ":";

// Error Codes ====================
export const VENDING_EVENT_SUB_TYPE = "VE"; // Vend Event
export const SMARTBOX_EVENT_SUB_TYPE = "SE"; // SmartBox Events
export const PAYMENT_EVENT_SUB_TYPE = "PE"; // Payment Event
export const PRINTER_EVENT_SUB_TYPE = "PR"; // Printer Event
export const PUMP_EVENT_SUB_TYPE = "PM"; // Pump Event
export const DISPLAY_EVENT_SUB_TYPE = "DS"; // Display Event
export const SCREEN_EVENT_SUB_TYPE = "SC"; // Screen Event
export const QR_EVENT_SUB_TYPE = "QR"; // QR Event
export const BATTERY_EVENT_SUB_TYPE = "BT"; // Battery Event
export const LIFT_EVENT_SUB_TYPE = "LT"; // Lift Event
export const SMART_BOX_HEALTH_TYPE = "SH"; // SmartBox Health
export const NETWORK_EVENT_SUB_TYPE = "NW"; // Network Event
export const DOOR_EVENT_SUB_TYPE = "DR"; // Door Event
export const VENDING_PORT_EVENT_SUB_TYPE = "VP"; // Vending Port Event
export const WEIGHT_SENSOR_EVENT_SUB_TYPE = "WS"; // Weight Sensor Event
export const LIGHT_EVENTS_TYPE = "LI"; // Light Events
export const MOTOR_EVENT_SUB_TYPE = "MO"; // Motor Event
export const PRODUCT_TEMPERATURE_EVENT_SUB_TYPE = "PT"; // Temperature Events

export const EVENT_SUB_TYPES = {
  [VENDING_EVENT_SUB_TYPE]: "Vend Error", // Bool
  [SMARTBOX_EVENT_SUB_TYPE]: "SmartBox Events", // Temperature, cpu speed,
  [PAYMENT_EVENT_SUB_TYPE]: "Payment Event", // Bool
  [PRINTER_EVENT_SUB_TYPE]: "Printer Event", // InkLevel, status,
  [PUMP_EVENT_SUB_TYPE]: "Pump Event", // status
  [DISPLAY_EVENT_SUB_TYPE]: "Display Event", //status
  [SCREEN_EVENT_SUB_TYPE]: "Screen Event", // status
  [QR_EVENT_SUB_TYPE]: "QR Scanner Event", // status
  [BATTERY_EVENT_SUB_TYPE]: "Battery Event", // threshold
  [LIFT_EVENT_SUB_TYPE]: "Lift Event", // status
  [SMART_BOX_HEALTH_TYPE]: "SmartBox Health", // ?
  [NETWORK_EVENT_SUB_TYPE]: "Network Event", // status
  [DOOR_EVENT_SUB_TYPE]: "Door Event", // status
  [VENDING_PORT_EVENT_SUB_TYPE]: "Port Event", //
  [WEIGHT_SENSOR_EVENT_SUB_TYPE]: "Sensor Event",
  [LIGHT_EVENTS_TYPE]: "Light Events",
  [MOTOR_EVENT_SUB_TYPE]: "Motor Event",
  [PRODUCT_TEMPERATURE_EVENT_SUB_TYPE]: "Product Temperature Events",
};

export const VALID_ERROR_CODES = {
  [VENDING_EVENT_SUB_TYPE]: {
    "0000": {
      eventType: TECHNICAL_EVENT,
      severity: GENERAL_SEVERITY,
      title: "Vend Success",
      description: "",
      criterion: [
        {
          eventCode: "A",
          criteria: "CE",
          severity: CRITICAL_SEVERITY,
          threshold: {
            value: true,
          },
          title: "",
        },
      ],
    },
    "0001": {
      eventType: TECHNICAL_EVENT,
      severity: CRITICAL_SEVERITY,
      title: "Vend Failed",
      description: "",
      criterion: [
        {
          eventCode: "A",
          criteria: "CE",
          severity: CRITICAL_SEVERITY,
          threshold: {
            value: false,
          },
          title: "Vend Failed",
        },
      ],
    },
  },
  [SMARTBOX_EVENT_SUB_TYPE]: {
    "0000": {
      eventType: TECHNICAL_EVENT,
      severity: CRITICAL_SEVERITY,
      title: EVENT_SUB_TYPES[SMARTBOX_EVENT_SUB_TYPE],
      description: "",
      criterion: [
        {
          title: "",
          eventCode: "A",
          criteria: "CE",
          severity: CRITICAL_SEVERITY,
          threshold: {
            value: false,
          },
        },
      ],
    },
  },
  [PAYMENT_EVENT_SUB_TYPE]: {
    "0000": {
      eventType: TECHNICAL_EVENT,
      severity: CRITICAL_SEVERITY,
      title: EVENT_SUB_TYPES[PAYMENT_EVENT_SUB_TYPE],
      description: "",
      criterion: [
        {
          title: "",
          eventCode: "A",
          criteria: "CE",
          severity: CRITICAL_SEVERITY,
          threshold: {
            value: false,
          },
        },
      ],
    },
  },
  [PRINTER_EVENT_SUB_TYPE]: {
    "0000": {
      eventType: TECHNICAL_EVENT,
      severity: CRITICAL_SEVERITY,
      title: EVENT_SUB_TYPES[PRINTER_EVENT_SUB_TYPE],
      description: "",
      criterion: [
        {
          title: "",
          eventCode: "A",
          criteria: "CE",
          severity: CRITICAL_SEVERITY,
          threshold: {
            value: false,
          },
        },
      ],
    },
  },
  [PUMP_EVENT_SUB_TYPE]: {
    "0000": {
      eventType: TECHNICAL_EVENT,
      severity: CRITICAL_SEVERITY,
      title: EVENT_SUB_TYPES[PRINTER_EVENT_SUB_TYPE],
      description: "",
      criterion: [
        {
          title: "",
          eventCode: "A",
          criteria: "CE",
          severity: CRITICAL_SEVERITY,
          threshold: {
            value: false,
          },
        },
      ],
    },
  },
  [DISPLAY_EVENT_SUB_TYPE]: {
    "0000": {
      eventType: TECHNICAL_EVENT,
      severity: CRITICAL_SEVERITY,
      title: EVENT_SUB_TYPES[DISPLAY_EVENT_SUB_TYPE],
      description: "",
      criterion: [
        {
          title: "",
          eventCode: "A",
          criteria: "CE",
          severity: CRITICAL_SEVERITY,
          threshold: {
            value: false,
          },
        },
      ],
    },
  },
  [SCREEN_EVENT_SUB_TYPE]: {
    "0000": {
      eventType: TECHNICAL_EVENT,
      severity: CRITICAL_SEVERITY,
      title: EVENT_SUB_TYPES[SCREEN_EVENT_SUB_TYPE],
      description: "",
      criterion: [
        {
          title: "",
          eventCode: "A",
          criteria: "CE",
          severity: CRITICAL_SEVERITY,
          threshold: {
            value: false,
          },
        },
      ],
    },
  },
  [QR_EVENT_SUB_TYPE]: {
    "0000": {
      eventType: TECHNICAL_EVENT,
      severity: CRITICAL_SEVERITY,
      title: EVENT_SUB_TYPES[QR_EVENT_SUB_TYPE],
      description: "",
      criterion: [
        {
          title: "",
          eventCode: "A",
          criteria: "CE",
          severity: CRITICAL_SEVERITY,
          threshold: {
            value: false,
          },
        },
      ],
    },
  },
  [BATTERY_EVENT_SUB_TYPE]: {
    "0000": {
      eventType: TECHNICAL_EVENT,
      severity: CRITICAL_SEVERITY,
      title: EVENT_SUB_TYPES[BATTERY_EVENT_SUB_TYPE],
      description: "",
      criterion: [
        {
          title: "",
          eventCode: "A",
          criteria: "CE",
          severity: CRITICAL_SEVERITY,
          threshold: {
            value: false,
          },
        },
      ],
    },
  },
  [LIFT_EVENT_SUB_TYPE]: {
    "0000": {
      eventType: TECHNICAL_EVENT,
      severity: CRITICAL_SEVERITY,
      title: EVENT_SUB_TYPES[LIFT_EVENT_SUB_TYPE],
      description: "",
      criterion: [
        {
          title: "",
          eventCode: "A",
          criteria: "CE",
          severity: CRITICAL_SEVERITY,
          threshold: {
            value: false,
          },
        },
      ],
    },
  },
  [SMART_BOX_HEALTH_TYPE]: {
    "0000": {
      eventType: TECHNICAL_EVENT,
      severity: MEDIUM_SEVERITY,
      title: "CPU Speed",
      description: "",
      criterion: [
        {
          title: "",
          eventCode: "A",
          criteria: "CI",
          severity: CRITICAL_SEVERITY,
          threshold: {
            value: ["Test"],
          },
        },
      ],
    },
    "0001": {
      eventType: TECHNICAL_EVENT,
      severity: MEDIUM_SEVERITY,
      title: "CPU Temperature",
      description: "",
      criterion: [
        {
          title: "CPU Temperature is high",
          eventCode: "A",
          criteria: "CA",
          threshold: {
            value: 80,
          },
          severity: CRITICAL_SEVERITY,
        },
        {
          title: "CPU Temperature is low",
          eventCode: "B",
          criteria: "CA",
          threshold: {
            value: 50,
          },
          severity: MEDIUM_SEVERITY,
        },
      ],
    },
    "0002": {
      eventType: TECHNICAL_EVENT,
      severity: CRITICAL_SEVERITY,
      title: "Free memory issue",
      description: "",
      criterion: [
        {
          title: "",
          eventCode: "A",
          criteria: "CB",
          severity: CRITICAL_SEVERITY,
          threshold: {
            value: 200,
          },
        },
      ],
    },
    "0003": {
      eventType: TECHNICAL_EVENT,
      severity: CRITICAL_SEVERITY,
      title: "Machine Uptime",
      description: "",
      criterion: [
        {
          title: "",
          eventCode: "A",
          criteria: "CA",
          severity: CRITICAL_SEVERITY,
          threshold: {
            value: 4000,
          },
        },
      ],
    },
  },
  [NETWORK_EVENT_SUB_TYPE]: {
    "0000": {
      eventType: TECHNICAL_EVENT,
      severity: CRITICAL_SEVERITY,
      title: EVENT_SUB_TYPES[NETWORK_EVENT_SUB_TYPE],
      description: "",
      criterion: [
        {
          title: "Machine went offline",
          eventCode: "A",
          criteria: "CE",
          severity: CRITICAL_SEVERITY,
          threshold: {
            value: "MACHINE_OFFLINE",
          },
        },
        {
          title: "Machine is online",
          eventCode: "B",
          criteria: "CE",
          severity: CRITICAL_SEVERITY,
          threshold: {
            value: "MACHINE_ONLINE",
          },
        },
      ],
    },
  },
  [DOOR_EVENT_SUB_TYPE]: {
    "0000": {
      eventType: TECHNICAL_EVENT,
      severity: CRITICAL_SEVERITY,
      title: EVENT_SUB_TYPES[DOOR_EVENT_SUB_TYPE],
      description: "",
      criterion: [
        {
          title: "",
          eventCode: "A",
          criteria: "CE",
          severity: CRITICAL_SEVERITY,
          threshold: {
            value: false,
          },
        },
      ],
    },
  },
  [VENDING_PORT_EVENT_SUB_TYPE]: {
    "0000": {
      eventType: TECHNICAL_EVENT,
      severity: CRITICAL_SEVERITY,
      title: EVENT_SUB_TYPES[VENDING_PORT_EVENT_SUB_TYPE],
      description: "",
      criterion: [
        {
          title: "",
          eventCode: "A",
          criteria: "CE",
          severity: CRITICAL_SEVERITY,
          threshold: {
            value: false,
          },
        },
      ],
    },
  },
  [WEIGHT_SENSOR_EVENT_SUB_TYPE]: {
    "0000": {
      eventType: TECHNICAL_EVENT,
      severity: CRITICAL_SEVERITY,
      title: EVENT_SUB_TYPES[WEIGHT_SENSOR_EVENT_SUB_TYPE],
      description: "",
      criterion: [
        {
          title: "",
          eventCode: "A",
          criteria: "CE",
          severity: CRITICAL_SEVERITY,
          threshold: {
            value: false,
          },
        },
      ],
    },
  },
  [LIGHT_EVENTS_TYPE]: {
    "0000": {
      eventType: TECHNICAL_EVENT,
      severity: CRITICAL_SEVERITY,
      title: EVENT_SUB_TYPES[LIGHT_EVENTS_TYPE],
      description: "",
      criterion: [
        {
          title: "",
          eventCode: "A",
          criteria: "CE",
          severity: CRITICAL_SEVERITY,
          threshold: {
            value: false,
          },
        },
      ],
    },
  },
  [MOTOR_EVENT_SUB_TYPE]: {
    "0000": {
      eventType: TECHNICAL_EVENT,
      severity: CRITICAL_SEVERITY,
      title: EVENT_SUB_TYPES[MOTOR_EVENT_SUB_TYPE],
      description: "",
      criterion: [
        {
          title: "",
          eventCode: "A",
          criteria: "CE",
          severity: CRITICAL_SEVERITY,
          threshold: {
            value: false,
          },
        },
      ],
    },
  },
  [PRODUCT_TEMPERATURE_EVENT_SUB_TYPE]: {
    "0000": {
      eventType: TECHNICAL_EVENT,
      severity: CRITICAL_SEVERITY,
      title: EVENT_SUB_TYPES[PRODUCT_TEMPERATURE_EVENT_SUB_TYPE],
      description: "",
      criterion: [
        {
          title: "",
          eventCode: "A",
          criteria: "CA",
          severity: CRITICAL_SEVERITY,
          threshold: {
            value: 70,
          },
        },
      ],
    },
  },
};

const output = [];

Object.entries(VALID_ERROR_CODES).forEach(([eventSubType, eventTypes]) => {
  Object.entries(eventTypes).forEach(([telemetryCode, criteriaMap]) => {
    const { eventType, criterion, severity, title, description } = criteriaMap;
    const vendingMachineType = "NA";
    const vendorId = "NA";
    const id = uuidV4();
    output.push({
      id,
      vendingMachineType,
      vendorId,
      eventSubType,
      telemetryCode,
      eventType,
      severity,
      title,
      criterion,
      description,
    });
  });
});

const fields = [
  "id",
  "vendingMachineType",
  "vendorId",
  "eventSubType",
  "telemetryCode",
  "eventType",
  "severity",
  "title",
  "criterion",
  "description",
];
const parser = new Parser({ fields });
const csv = parser.parse(output);

let res = writeToFile("errorCodes", csv, "csv");
res = writeToFile("errorCodes", output);
res = writeToFile("errorCodeMap", VALID_ERROR_CODES);
