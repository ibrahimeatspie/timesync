"use server";

import OpenAI from "openai";

import { z } from "zod";
import { zact } from "zact/server";

const openai = new OpenAI({
  apiKey: "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",
  dangerouslyAllowBrowser: true,
});

function scheduleMeeting(
  year: number,
  month: number,
  date: number,
  hour: number,
  timeRange: number,
  attendees: [string]
) {
  //     var currentDate = new Date();

  // // Convert Date object to JSON
  // var jsonDate = JSON.stringify(currentDate);

  // // Display the JSON string
  // console.log(jsonDate);
  let inputtedDate = new Date(year, month, date, hour, 0, 0, 0);
  let returnObject = {
    date: JSON.stringify(inputtedDate),
    attendees: attendees,
    duration: timeRange * 60 * 60 * 1000,
  };
  return (
    "Scheduling meeting with " +
    attendees +
    " on" +
    JSON.stringify(inputtedDate)
  );
  console.log("Scheduling meeting");
  console.log(returnObject);
  //   console.log(attendees);
  //   console.log(date)
  return returnObject;
}
// const tools: [OpenAI.ChatCompletionTool] = [
//   {
//     type: "function",
//     function: {
//       name: "get_current_weather",
//       description: "Get the current weather in a given location",
//       parameters: {
//         type: "object",
//         properties: {
//           location: {
//             type: "string",
//             description: "The city and state, e.g. San Francisco, CA",
//           },
//           unit: { type: "string", enum: ["celsius", "fahrenheit"] },
//         },
//         required: ["location"],
//       },
//     },
//   },
// ];

const tools: [OpenAI.ChatCompletionTool] = [
  {
    type: "function",
    function: {
      name: "schedule_meeting",
      description:
        "Schedule a meeting given a date, formatted as a string that can be used to construct a JS date object, given a required year, month, date, hour, all of which are integers. For example (2024, 12, 12, 12) and time range (2) representing 2 hours.' If specific names and dates are NOT mentioned, you cannot schedule the meeting at ALL. Specific names can be for example Alex and Bob",
      parameters: {
        //year:number, month:number, date:number, hour: number, timeRange:number, attendees: [string]
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

export const validatedAction = zact(z.object({ stuff: z.string() }))(
  async (input) => {
    console.log("GETTING INPUT");
    console.log(input);
    const messages: OpenAI.ChatCompletionMessageParam[] = [
      {
        role: "user",
        content: input.stuff,
      },
    ];
    //ChatCompletionMessageParam[]
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      messages: messages,
      tools: tools,
      tool_choice: "auto", // auto is default, but we'll be explicit
    });
    console.log("LOGGING RESPONSE");
    // console.log(response.choices[0]);
    const responseMessage = response.choices[0].message;
    console.log(responseMessage);

    // Step 2: check if the model wanted to call a function
    const toolCalls = responseMessage.tool_calls;
    console.log(toolCalls);
    if (responseMessage.tool_calls) {
      console.log("We have a function to call");
      // Step 3: call the function
      // Note: the JSON response may not always be valid; be sure to handle errors
      const availableFunctions = {
        schedule_meeting: scheduleMeeting,
      }; // only one function in this example, but you can have multiple
      messages.push(responseMessage); // extend conversation with assistant's reply

      for (const toolCall of toolCalls!) {
        console.log("WHat is a toolcall");
        console.log(toolCall);
        const functionName = toolCall.function.name;
        const functionToCall = availableFunctions[functionName];
        const functionArgs = JSON.parse(toolCall.function.arguments);
        const functionResponse = functionToCall(
          functionArgs.year,
          functionArgs.month,
          functionArgs.date,
          functionArgs.hour,
          functionArgs.timeRange,

          functionArgs.attendees
        );
        messages.push({
          tool_call_id: toolCall.id,
          role: "tool",
          name: functionName,
          content: functionResponse,
        }); // extend conversation with function response
      }
      const secondResponse = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-0125",
        messages: messages,
      }); // get a new response from the model where it can see the function response
      console.log("SECOND RESPONSE");
      console.log(secondResponse.choices[0].message);
      return secondResponse.choices[0].message;
    } else {
      return responseMessage;
      console.log("We have no function to call");
    }
  }
);

export default async function TalkAI() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant." }],
    model: "gpt-3.5-turbo",
  });
}
