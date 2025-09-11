"use client"
import { signOut } from "next-auth/react";
import React from "react";

const LogOutBtn = () => {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
    >
      Logout
    </button>
  );
};

export default LogOutBtn;
