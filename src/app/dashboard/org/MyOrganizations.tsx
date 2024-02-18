"use client";

import { leaveOrganization } from "@/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Organization } from "@prisma/client";

import {} from "next-safe-action";
import { useAction } from "next-safe-action/hooks";
import { toast } from "react-hot-toast";

export default function MyOrganizations({
  organizations,
}: {
  organizations: Organization[];
}) {
  const { execute } = useAction(leaveOrganization, {
    onSuccess: () => {
      toast.success("You have left the organization.");
    },
  });

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Your Organizations</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {organizations.length === 0 && (
          <div className="text-center">
            You are not part of any organizations.
          </div>
        )}
        {organizations.map((organization) => (
          <Card key={organization.id}>
            <div className="flex justify-center p-6">
              <img
                alt={organization.name}
                className="rounded-full"
                height="150"
                src="/placeholder.png"
                style={{
                  aspectRatio: "150/150",
                  objectFit: "cover",
                }}
                width="150"
              />
            </div>
            <CardContent className="p-6">
              <CardTitle className="text-xl font-semibold">
                {organization.name}
              </CardTitle>
              <CardDescription>{organization.description}</CardDescription>
            </CardContent>
            <CardFooter>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => execute({ id: organization.id })}
              >
                Leave Organization
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
