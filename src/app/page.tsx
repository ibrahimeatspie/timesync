"use client"

import { CalendarCustomize } from "@/components/CalendarCustomize";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <CalendarCustomize />
    </main>
  );
}
