import MyOrganizations from "./MyOrganizations";

import prisma from "@/lib/db";
import JoinOrganizations from "./JoinOrganizations";
import { createClient } from "@/lib/supabase/server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/");
  }
  const organizations = await prisma.organization.findMany({
    include: { members: { select: { supabaseId: true } } },
  });
  const myOrganizations = organizations.filter((org) =>
    org.members.some((member) => member.supabaseId === data.user.id)
  );
  const joinableOrganizations = organizations.filter(
    (org) => !myOrganizations.includes(org)
  );

  return (
    <main className="flex-1 py-6 md:py-10">
      <div className="container space-y-8">
        <MyOrganizations organizations={myOrganizations} />
        <JoinOrganizations organizations={joinableOrganizations} />
      </div>
    </main>
  );
}
