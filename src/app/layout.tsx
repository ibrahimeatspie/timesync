import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import ConvexClientProvider from "./ConvexClientProvider";
const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}
