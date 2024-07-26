"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  UserButton,
} from "@clerk/nextjs";

import { RxHamburgerMenu } from "react-icons/rx";
export function SideSheet() {
  return (
    <Sheet>
      <div className="md:hidden">
        <SheetTrigger asChild>
          <button className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
            <RxHamburgerMenu size={25} />
          </button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Musings by Carlos</SheetTitle>
            <SheetDescription>A blog by Carlos Delos Santos</SheetDescription>
          </SheetHeader>
          <nav className="flex flex-col mt-4">
            <ClerkLoaded>
              <SignedOut>
                <SignInButton>
                  <button className="text-gray-800 hover:bg-gray-100 px-3 py-2 rounded-md text-xl text-start">
                    Sign in
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <div className="flex flex-col self-center mb-4">
                  <UserButton showName />
                  <SignOutButton />
                </div>
              </SignedIn>
            </ClerkLoaded>
            <ClerkLoading>
              <button className="text-gray-800 hover:bg-gray-100 px-3 py-2 rounded-md text-xl text-start">
                Sign in
              </button>
            </ClerkLoading>
            <a
              href="/"
              className="text-gray-800 hover:bg-gray-100 px-3 py-2 rounded-md text-xl text-start"
            >
              Home
            </a>
            <a
              href="/about"
              className="text-gray-800 hover:bg-gray-100 px-3 py-2 rounded-md text-xl text-start"
            >
              About
            </a>
          </nav>
        </SheetContent>
      </div>
    </Sheet>
  );
}
