"use client";

import { useSession } from "next-auth/react";

export function getClientUser() {
  const { data: session, status } = useSession();

  return {
    user: session?.user || null,
    status, // "loading" | "authenticated" | "unauthenticated"
    session,
  };
}
