import { Button } from "@/components/ui/button";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import {
  PopoverTrigger,
  PopoverContent,
  Popover,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarDaysIcon, ClockIcon, LayoutDashboardIcon } from "lucide-react";

export default function Component() {
  return (
    <main className="flex min-h-[calc(100vh-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
      <div className="flex gap-4 flex-row">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Meeting Time</CardTitle>
            <ClockIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-sm font-medium">Select a time and date:</div>
            <div className="mt-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    className="w-[240px] justify-start text-left font-normal"
                    variant="outline"
                  >
                    <CalendarDaysIcon className="mr-1 h-4 w-4 -translate-x-1" />
                    Pick a date
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-auto p-0">
                  <Calendar initialFocus mode="single" />
                </PopoverContent>
              </Popover>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Organizational Dashboard
            </CardTitle>
            <LayoutDashboardIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-sm font-medium">
              Your organizational overview:
            </div>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Check your upcoming meetings, deadlines, and tasks here.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
