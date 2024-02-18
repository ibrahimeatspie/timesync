import { MountainIcon } from "lucide-react";
import Link from "next/link";

export default function Component() {
  return (
    <div className="flex flex-col min-h-[100vh]">
      <header className="flex items-center justify-center h-14">
        <Link className="flex items-center justify-center" href="#">
          <MountainIcon className="h-6 w-6" />
          <span className="sr-only">TimeSync Inc</span>
        </Link>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            404 - Page Not Found
          </h1>
          <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            The page you're looking for couldn't be found. You might have
            mistyped the URL or it could be temporarily unavailable.
          </p>
          <Link
            className="inline-flex h-9 items-center justify-center rounded-md border border-gray-200bg-white px-4 shadow-sm text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
            href="#"
          >
            Back to the site
          </Link>
        </div>
      </main>
      <footer className="flex items-center justify-center h-14">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 TimeSync Inc. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
