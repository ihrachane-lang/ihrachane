import "@/app/globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import AppProvider from "@/providers/AppProvider";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL("https://www.ihrachane.com"),
  title: { default: "IHRACHANE | Global Sourcing & Logistics", template: "%s | IHRACHANE" },
  description: "IHRACHANE manages factory sourcing, supplier verification, quality inspection, China warehousing and international freight for growing businesses.",
  keywords: ["IHRACHANE", "global sourcing", "supplier verification", "factory audit", "quality inspection", "international freight logistics"],
  authors: [{ name: "IHRACHANE Global Team" }],
  creator: "IHRACHANE",
  publisher: "IHRACHANE",
  openGraph: {
    title: "IHRACHANE | Global Sourcing & Logistics",
    description: "Factory sourcing, supplier verification, quality inspection and international freight coordination.",
    url: "https://www.ihrachane.com/",
    siteName: "IHRACHANE",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "IHRACHANE global sourcing and logistics" }],
    locale: "en_US",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "IHRACHANE | Global Sourcing & Logistics", description: "Factory sourcing, supplier verification, quality inspection and freight coordination.", images: ["/opengraph-image"] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 } },
  icons: { icon: [{ url: "/favicon.ico" }] },
  category: "business",
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Organization", "@id": "https://www.ihrachane.com/#organization", name: "IHRACHANE", url: "https://www.ihrachane.com", logo: "https://www.ihrachane.com/logo/siteLogo/logo.svg", description: "Global procurement, sourcing, quality control and logistics solutions." },
      { "@type": "WebSite", "@id": "https://www.ihrachane.com/#website", url: "https://www.ihrachane.com", name: "IHRACHANE", publisher: { "@id": "https://www.ihrachane.com/#organization" }, inLanguage: "en" },
      { "@type": "Service", "@id": "https://www.ihrachane.com/#service", name: "Global Supply Chain & Logistics Management", provider: { "@id": "https://www.ihrachane.com/#organization" }, serviceType: "Procurement and freight forwarding services", areaServed: "Worldwide" },
    ],
  };

  return <html lang="en" data-theme="light"><head><link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /></head><body className={`${geistSans.variable} ${geistMono.variable} antialiased`}><AppProvider><main>{children}</main><Toaster /></AppProvider></body></html>;
}
