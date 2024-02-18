import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  BellIcon,
  CalendarCheckIcon,
  CalendarPlusIcon,
  PhoneCallIcon,
} from "lucide-react";

export default function Page() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="px-4 lg:px-6 py-4 lg:py-6 flex items-center">
        <div className="flex items-center space-x-2">
          <img
            alt="Logo"
            className="rounded-full"
            height="40"
            src="/placeholder.png"
            style={{
              aspectRatio: "40/40",
              objectFit: "cover",
            }}
            width="40"
          />
          <span className="font-semibold">TimeSync Inc</span>
        </div>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Pricing
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            About
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6 text-center">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Simple Appointments
              </h1>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Easy appointment scheduling for your business. Let your
                customers book their time with you.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <form className="flex space-x-2">
                <Input
                  className="max-w-lg flex-1"
                  placeholder="Enter your email"
                  type="email"
                />
                <Button asChild type="submit">
                  <Link href="/dashboard">Sign Up</Link>
                </Button>
              </form>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Sign up to get notified when we launch.
                <Link className="underline underline-offset-2" href="#">
                  Terms & Conditions
                </Link>
              </p>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 border-t">
          <div className="container grid items-center gap-4 px-4 md:px-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Features
              </h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Let your team focus on shipping features instead of managing
                infrastructure with automated CI/CD.
              </p>
            </div>
            <div className="mx-auto w-full max-w-3xl grid gap-4 md:gap-6 lg:grid-cols-2">
              <div className="flex flex-col items-center space-y-2">
                <CalendarCheckIcon className="h-10 w-10" />
                <div className="space-y-2 text-center">
                  <h3 className="font-bold">Easy Scheduling</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Customers can easily book appointments at their convenience.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <CalendarPlusIcon className="h-10 w-10" />
                <div className="space-y-2 text-center">
                  <h3 className="font-bold">Multiple Providers</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Perfect for businesses with multiple service providers.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <BellIcon className="h-10 w-10" />
                <div className="space-y-2 text-center">
                  <h3 className="font-bold">Reminders</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Automated reminders to reduce no-shows.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <PhoneCallIcon className="h-10 w-10" />
                <div className="space-y-2 text-center">
                  <h3 className="font-bold">Virtual Appointments</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Support for video calls for remote consultations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <nav className="flex flex-col gap-2 sm:flex-row">
          <Link
            className="text-xs hover:underline underline-offset-4 inline-block"
            href="#"
          >
            Terms of Service
          </Link>
          <Link
            className="text-xs hover:underline underline-offset-4 inline-block"
            href="#"
          >
            Privacy
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            © 2024 TimeSync Inc
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Support
          </Link>
        </div>
      </footer>
    </div>
  );
}
