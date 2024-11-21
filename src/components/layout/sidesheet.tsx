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

import AuthorizedView from "@/components/authorized-view";
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
            <ClerkLoaded>
              <SignedOut>
                <SignInButton>
                  <button className="text-gray-800 hover:bg-gray-100 px-3 py-2 rounded-md text-md text-start">
                    Sign in
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <div className="flex flex-row gap-2">
                  <UserButton showName />
                  <div className="text-md">
                    <SignOutButton />
                  </div>
                </div>
              </SignedIn>
            </ClerkLoaded>
            <ClerkLoading>
              <button className="text-gray-800 hover:bg-gray-100 px-3 py-2 rounded-md text-xl text-start">
                Sign in
              </button>
            </ClerkLoading>
            <SheetTitle>Time flows as ripples on a still pond</SheetTitle>
            <SheetDescription>A blog by Carlos Delos Santos</SheetDescription>
          </SheetHeader>
          <nav className="flex flex-col mt-4">
            <a
              href="/"
              className="hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </a>
            <a
              href="/about"
              className="hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              About
            </a>
            <a
              href="/explore"
              className="hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Explore
            </a>
            <AuthorizedView allowedRoles={["admin"]}>
              <a
                href="/write"
                className="hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Write
              </a>
            </AuthorizedView>
          </nav>
        </SheetContent>
      </div>
    </Sheet>
  );
}
