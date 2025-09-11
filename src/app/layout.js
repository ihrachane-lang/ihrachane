import "@/app/globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import AppProvider from "@/providers/AppProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "IHRACHANE",
  description: "The power full sourcing service",
  icons: {
    icon: "/logo/siteLogo/logo.svg",
    shortcut: "/logo/siteLogo/logo.svg",
    apple: "/logo/siteLogo/logo.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <AppProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <main>{children}</main>
          <Toaster />
        </body>
      </AppProvider>
    </html>
  );
}
