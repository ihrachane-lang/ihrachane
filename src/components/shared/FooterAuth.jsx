"use client";

import LogOutBtn from "./LogOutBtn";
import Link from "next/link";
import { getClientUser } from "@/utils/getClientUser";

export default function FooterAuth() {
  const { user } = getClientUser();

  if (user) {
    return (
      <>
        <li>
          <Link
            href="/dashboard"
            className="inline-flex rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-xs font-bold text-orange-300 transition-all hover:bg-orange-500/20"
          >
            Go to Dashboard
          </Link>
        </li>
        <li className="pt-2">
          <LogOutBtn />
        </li>
      </>
    );
  }

  return (
    <li>
      <Link
        href="/login"
        className="inline-flex rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-bold text-white transition-all hover:border-orange-500/40 hover:bg-white/10"
      >
        Client Login
      </Link>
    </li>
  );
}
