import {
  ClerkLoaded,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";

import AuthorizedView from "@/components/authorized-view";
import { SideSheet } from "@/components/layout/sidesheet";
import { dark } from "@clerk/themes";

export function Topbar() {
  return (
    <header className="bg-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <img
                className="h-10 w-10 color-white text-white"
                src="/ripple-white.svg"
                alt="Logo"
              />
              <h1 className="text-white text-lg ml-2 text-nowrap">
                Time flows as ripples on a still pond
              </h1>
            </a>
            <nav className="hidden md:block ml-10 space-x-4">
              <a
                href="/"
                className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </a>
              <a
                href="/about"
                className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                About
              </a>
              <a
                href="/explore"
                className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Explore
              </a>
              <AuthorizedView allowedRoles={["admin"]}>
                <a
                  href="/write"
                  className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Write
                </a>
              </AuthorizedView>
            </nav>
          </div>
          <SideSheet />
          <div className="hidden md:block">
            <ClerkLoaded>
              <SignedOut>
                <SignInButton>
                  <button className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                    Sign in
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <div className="text-white">
                  <UserButton showName appearance={{ baseTheme: dark }} />
                </div>
              </SignedIn>
            </ClerkLoaded>
          </div>
        </div>
      </div>
    </header>
  );
}
