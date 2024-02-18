import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import prisma from "@/lib/db";
import Meetings from "./Meetings";

export default async function Page() {
  const meetings = await prisma.meeting.findMany();

  return (
    <div className="max-w-lg mx-auto p-4">
      <div className="flex space-x-4 mb-4">
        <Button className="flex-1" variant="outline">
          Upcoming
        </Button>
        <Button className="flex-1" variant="outline">
          Past
        </Button>
      </div>
      <Separator className="my-4" />
      <Meetings meetings={meetings} />
    </div>
  );
}
