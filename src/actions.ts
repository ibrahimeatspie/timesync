"use server";

import { z } from "zod";
import { createSafeActionClient } from "next-safe-action";

import prisma from "@/lib/db";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import OpenAI from "openai";
import { openai, tools } from "@/lib/openai";
import { scheduleMeeting } from "@/lib/core";

export const action = createSafeActionClient();

// This client ensures that the user is authenticated before running action server code.
export const authAction = createSafeActionClient({
  // Can also be a non async function.
  async middleware() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase.auth.getSession();

    if (!data?.session || !data.session.provider_token) {
      throw new Error("Session is not valid!");
    }

    await prisma.profile.upsert({
      where: { supabaseId: data.session.user.id },
      update: {},
      create: {
        supabaseId: data.session.user.id,
        providerToken: data.session.provider_token,
        email: data.session.user.email!,
        displayName: data.session.user.user_metadata.full_name,
      },
    });

    return { session: data.session };
  },
});

export const joinOrganization = authAction(
  z.object({ id: z.string() }),
  async (input, { session }) => {
    await prisma.profile.update({
      where: { supabaseId: session.user.id },
      data: {
        organizations: {
          connect: { id: input.id },
        },
      },
    });

    revalidatePath("/dashboard");
  }
);

export const leaveOrganization = authAction(
  z.object({ id: z.string() }),
  async (input, { session }) => {
    await prisma.profile.update({
      where: { supabaseId: session.user.id },
      data: {
        organizations: {
          disconnect: { id: input.id },
        },
      },
    });

    revalidatePath("/dashboard");
  }
);

export const callFunction = authAction(
  z.object({ stuff: z.string() }),
  async (input, { session }) => {
    const messages: OpenAI.ChatCompletionMessageParam[] = [
      {
        role: "user",
        content: input.stuff,
      },
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      messages: messages,
      tools: tools,
      tool_choice: "auto", // auto is default, but we'll be explicit
    });
    const responseMessage = response.choices[0].message;
    const noResponseData = response.choices;
    // Step 2: check if the model wanted to call a function
    const toolCalls = responseMessage.tool_calls;
    if (responseMessage.tool_calls) {
      // Step 3: call the function
      // Note: the JSON response may not always be valid; be sure to handle errors
      const availableFunctions = {
        schedule_meeting: scheduleMeeting,
      }; // only one function in this example, but you can have multiple
      messages.push(responseMessage); // extend conversation with assistant's reply
      for (const toolCall of toolCalls!) {
        const functionName = toolCall.function
          .name as keyof typeof availableFunctions;
        const functionToCall = availableFunctions[functionName];
        const functionArgs = JSON.parse(toolCall.function.arguments);
        const functionResponse = await functionToCall(
          functionArgs.year,
          functionArgs.month,
          functionArgs.date,
          functionArgs.hour,
          functionArgs.timeRange,
          functionArgs.attendees,
          session.provider_token!
        );
        messages.push({
          tool_call_id: toolCall.id,
          role: "tool",
          // name: functionName,
          content: JSON.stringify(functionResponse),
        }); // extend conversation with function response
      }
      const secondResponse = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-0125",
        messages: messages,
      }); // get a new response from the model where it can see the function response
      console.log("SECOND RESPONSE");
      console.log(secondResponse);
      return secondResponse.choices;
    } else {
      console.log("NO FUNCTION TO CALL");
      return noResponseData;
    }
  }
);
