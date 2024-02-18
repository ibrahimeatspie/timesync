"use client";

import { joinOrganization } from "@/actions";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Organization } from "@prisma/client";
import { useAction } from "next-safe-action/hooks";
import { toast } from "react-hot-toast";

export default function JoinOrganizations({
  organizations,
}: {
  organizations: Organization[];
}) {
  const { execute } = useAction(joinOrganization, {
    onSuccess: () => {
      toast.success("You have joined the organization!");
    },
    onError: (error) => {
      toast.error(error.serverError || String(error.validationErrors));
    },
  });

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold">Join an Organization</h2>
      <div className="space-y-4">
        {organizations.map((organization) => (
          <Card key={organization.id}>
            <div className="flex items-center p-4 space-x-4">
              <Avatar className="w-10 h-10">
                <img
                  alt="Avatar"
                  className="rounded-full"
                  height="40"
                  src="/placeholder.png"
                  style={{
                    aspectRatio: "40/40",
                    objectFit: "cover",
                  }}
                  width="40"
                />
              </Avatar>
              <div className="flex-1">
                <CardTitle className="text-xl font-semibold">
                  {organization.name}
                </CardTitle>
                <CardDescription>{organization.description}</CardDescription>
              </div>
              <Button onClick={() => execute({ id: organization.id })}>
                Join
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
