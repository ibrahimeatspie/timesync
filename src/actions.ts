"use server";

import { z } from "zod";
import { createSafeActionClient } from "next-safe-action";

import prisma from "@/lib/db";
import { cookies } from "next/headers";
import { createClient } from "./lib/supabase/server";
import { revalidatePath } from "next/cache";

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
        googleProviderToken: data.session.provider_token,
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
