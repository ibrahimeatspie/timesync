"use client";

import React, { useState } from "react";
import ScheduleSelector from "react-schedule-selector";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

const schema = z.object({
  startDate: z.date(),
  numDays: z.number(),
  minTime: z.number(),
  maxTime: z.number(),
});

export default function Page() {
  const [schedule, setSchedule] = useState<any[]>([]);

  const handleChange = (newSchedule: any[]) => {
    setSchedule(newSchedule);
    console.log(newSchedule);
  };

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      startDate: new Date(),
      numDays: 5,
      minTime: 8,
      maxTime: 22,
    },
  });

  return (
    <div className="flex flex-row gap-4 m-8 flex-1">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(console.log)} className="space-y-8">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Start Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  When you start the meeting, the schedule will be based on this
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="numDays"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Number of days</FormLabel>
                <Input {...field} type="number" />
                <FormDescription>Number of Days</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="minTime"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Earliest Time</FormLabel>
                <Input {...field} type="number" />
                <FormDescription>Earliest time to meet</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="maxTime"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Latest Time</FormLabel>
                <Input {...field} type="number" />
                <FormDescription>Latest time to meet</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      <div className="flex-1">
        <ScheduleSelector
          selection={schedule}
          numDays={form.watch("numDays")}
          minTime={form.watch("minTime")}
          maxTime={form.watch("maxTime")}
          hourlyChunks={2}
          startDate={form.watch("startDate")}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
