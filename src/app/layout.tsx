import { Topbar } from "@/components/topbar";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Musings",
  description: "A blog by Carlos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <html lang="en">
        <body className={inter.className}>
          <Topbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
