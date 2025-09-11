import "@/app/globals.css";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

export const metadata = {
  title: "IHRACHANE || DASHBOARD",
  description: "Sourcing control from here",
};

export default async function DashboardMainLayout({ children }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
