import Link from "next/link";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { CheckCircleIcon, PackageIcon } from "lucide-react";

export default function Component() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-4">
            <CardTitle>Active Projects</CardTitle>
            <CardDescription>
              You have
              <Link className="underline" href="#">
                3 active projects
              </Link>
              .
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="grid gap-1 border-t">
              <div className="flex items-center gap-4 px-4 py-3">
                <PackageIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                <div className="font-medium">Project Onyx</div>
                <div className="text-sm ml-auto shrink-0 w-24 text-center">
                  50% Complete
                </div>
              </div>
              <div className="flex items-center gap-4 px-4 py-3">
                <PackageIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                <div className="font-medium">Project Phoenix</div>
                <div className="text-sm ml-auto shrink-0 w-24 text-center">
                  25% Complete
                </div>
              </div>
              <div className="flex items-center gap-4 px-4 py-3">
                <PackageIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                <div className="font-medium">Project Hydra</div>
                <div className="text-sm ml-auto shrink-0 w-24 text-center">
                  75% Complete
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-4">
            <CardTitle>Upcoming Tasks</CardTitle>
            <CardDescription>
              You have
              <Link className="underline" href="#">
                5 upcoming tasks
              </Link>
              .
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="grid gap-1 border-t">
              <div className="flex items-center gap-4 px-4 py-3">
                <CheckCircleIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                <div className="font-medium">Design Wireframes</div>
                <div className="text-sm ml-auto shrink-0 w-24 text-center">
                  Due Today
                </div>
              </div>
              <div className="flex items-center gap-4 px-4 py-3">
                <CheckCircleIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                <div className="font-medium">Review Mockups</div>
                <div className="text-sm ml-auto shrink-0 w-24 text-center">
                  Due Tomorrow
                </div>
              </div>
              <div className="flex items-center gap-4 px-4 py-3">
                <CheckCircleIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                <div className="font-medium">Prepare Presentation</div>
                <div className="text-sm ml-auto shrink-0 w-24 text-center">
                  Due in 2 days
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader className="pb-4">
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Your latest activity across all projects
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid gap-1 border-t">
            <div className="flex items-center gap-4 px-4 py-3">
              <PackageIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
              <div className="font-medium">Project Onyx</div>
              <div className="text-sm ml-auto shrink-0 w-24 text-center">
                50% Complete
              </div>
            </div>
            <div className="flex items-center gap-4 px-4 py-3">
              <PackageIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
              <div className="font-medium">Project Phoenix</div>
              <div className="text-sm ml-auto shrink-0 w-24 text-center">
                25% Complete
              </div>
            </div>
            <div className="flex items-center gap-4 px-4 py-3">
              <PackageIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
              <div className="font-medium">Project Hydra</div>
              <div className="text-sm ml-auto shrink-0 w-24 text-center">
                75% Complete
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
