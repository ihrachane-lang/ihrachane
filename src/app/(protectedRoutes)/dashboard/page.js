// import { authOptions } from "@/lib/authOptions";
// import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";
import React from "react";
import dynamic from "next/dynamic";

// Use dynamic import for components that use client-side features
const DashboardSummary = dynamic(
  () => import("@/components/dashboard/summary/DashboardSummary")
);

const DashboardPage = async () => {
  // const session = await getServerSession(authOptions);

  // if (!session) return redirect("/login");
  // if (session?.user?.role !== "admin") return redirect("/unauthorized");

  return (
    <div className="p-4">
      <DashboardSummary />
    </div>
  );
};

export default DashboardPage;
