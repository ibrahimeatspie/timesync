import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY,
});

export const tools: OpenAI.ChatCompletionTool[] = [
  {
    type: "function",
    function: {
      name: "schedule_meeting",
      description:
        "Schedule a meeting given a date, formatted as a string that can be used to construct a JS date object, given a required year, month, date, hour, all of which are integers. For example (2024, 12, 12, 12) and time range (2) representing 2 hours.' If specific names and dates are NOT mentioned, you cannot schedule the meeting at ALL. Specific names can be for example Alex and Bob",
      parameters: {
        type: "object",
        properties: {
          year: {
            type: "number",
            description:
              "A REQUIRED number that provides the year portion that will be later used to construct a date object. If it is not present do not run the function",
          },
          month: {
            type: "number",
            description:
              "A REQUIRED number that provides the month portion that will be later used to construct a date object. If it is not present do not run the function",
          },
          date: {
            type: "number",
            description:
              "A REQUIRED number that provides the date portion that will be later used to construct a date object. If it is not present do not run the function",
          },
          hour: {
            type: "number",
            description:
              "A REQUIRED number that provides the hour portion that will be later used to construct a date object. If it is not present do not run the function",
          },
          timeRange: {
            type: "number",
            description:
              "A REQUIRED number that provides a time range for which meetings can be made. If it is not present, do not run the function",
          },
          attendees: {
            type: "array",
            description:
              "An array of strings representing attendee names to the meeting. If specific names are not mentioned, do not fill out this field and do not run the function!",
            items: {
              type: "string",
            },
          },
        },
        required: ["year", "month", "date", "hour", "timeRange", "attendees"],
      },
    },
  },
];
