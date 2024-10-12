import { currentUser } from "@clerk/nextjs/server";
import React from "react";

interface AuthorizedViewProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

async function AuthorizedView({
  allowedRoles,
  children,
}: React.PropsWithChildren<AuthorizedViewProps>) {
  const user = await currentUser();

  if (!user || !user.privateMetadata || !user.privateMetadata.role) {
    return null; // Render nothing if user or role is not available
  }

  const userRole = (user.privateMetadata.role as string) || "guest";

  if (!allowedRoles.includes(userRole)) {
    return null; // Render nothing if user's role is not allowed
  }

  return <>{children}</>; // Render the content if user's role is allowed
}

export default AuthorizedView;
