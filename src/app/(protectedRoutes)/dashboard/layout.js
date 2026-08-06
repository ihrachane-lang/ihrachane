import "@/app/globals.css";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export const metadata = {
  title: "IHRACHANE || DASHBOARD",
  description: "Sourcing control from here",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default async function DashboardMainLayout({ children }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
