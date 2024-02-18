"use server";

import { createSafeActionClient } from "next-safe-action";
import prisma from "@/lib/db";

export const action = createSafeActionClient();

import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";

const cookieStore = cookies();
const supabase = createClient(cookieStore);

export async function scheduleMeeting(
  year: number,
  month: number,
  date: number,
  hour: number,
  timeRange: number,
  attendees: string[],
  providerToken: string
) {
  const { data: sessionData } = await supabase.auth.getSession();

  if (!sessionData?.session) throw new Error("Not authenticated");

  const profiles = await prisma.profile.findMany({
    where: {
      OR: [
        {
          displayName: {
            in: attendees,
          },
        },
        ...attendees.map((attendee) => ({
          displayName: {
            contains: attendee,
          },
        })),
      ],
    },
  });

  const events = await Promise.all(
    profiles.map(async (profile) => {
      const res = await fetch(
        "https://www.googleapis.com/calendar/v3/calendars/primary/events",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${profile.providerToken}`,
          },
        }
      );

      const data = await res.json();
      return data;
    })
  )
    .then((events) => events.flat())
    // @ts-ignore
    .then((event) => {
      return event.map((e) => e.items);
    })
    .then((items) => {
      return items.flat();
    });

  // Create new event
  const start = new Date(year, month, date, hour);
  const end = new Date(year, month, date, hour + timeRange);
  const newEvent = {
    summary: "Meeting",
    start: {
      dateTime: start.toISOString(),
      timeZone: "America/Los_Angeles",
    },
    end: {
      dateTime: end.toISOString(),
      timeZone: "America/Los_Angeles",
    },
    attendees: profiles.map((profile) => ({
      email: profile.email,
    })),
  };

  const res = await fetch(
    "https://www.googleapis.com/calendar/v3/calendars/primary/events",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${providerToken}`,
      },
      body: JSON.stringify(newEvent),
    }
  );

  const data = await res.json();

  console.log(data);

  return { start, end, link: data.htmlLink };
}
