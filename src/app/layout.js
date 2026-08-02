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
  title: {
    default: "IHRACHANE | Global Supply Chain, Sourcing & Logistics Solutions",
    template: "%s | IHRACHANE",
  },
  description:
    "IHRACHANE provides end-to-end global supply chain management, factory sourcing, supplier verification, quality inspection, and international freight shipping solutions. Küresel tedarik zinciri ve lojistik çözümleri.",
  keywords: [
    // English Keywords
    "ihrachane",
    "ihrachane sourcing",
    "global supply chain management",
    "international procurement solutions",
    "factory sourcing agent",
    "china product sourcing",
    "supplier verification and inspection",
    "international freight logistics",
    "end-to-end supply chain",
    "B2B trade procurement",
    // Turkish Keywords
    "küresel tedarik zinciri",
    "satın alma çözümleri",
    "kaynak sağlama temsilcisi",
    "uluslararası lojistik",
    "ürün ve fabrika denetimi",
    "çin tedarik temsilcisi",
    "navlun taşımacılığı",
    "tedarikçi doğrulaması",
    "dış ticaret tedarik yönetimi",
    "ihracat lojistik desteği",
  ],
  authors: [{ name: "IHRACHANE Global Team" }],
  creator: "IHRACHANE",
  publisher: "IHRACHANE",
  metadataBase: new URL("https://www.ihrachane.com"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
      "tr-TR": "/",
    },
  },
  openGraph: {
    title: "IHRACHANE | Global Supply Chain, Sourcing & Logistics Solutions",
    description:
      "Streamlining end-to-end procurement, factory sourcing, quality control, and global delivery for businesses worldwide.",
    url: "https://www.ihrachane.com",
    siteName: "IHRACHANE",
    images: [
      {
        url: "/logo/siteLogo/logo.svg",
        width: 1200,
        height: 630,
        alt: "IHRACHANE Global Supply Chain & Logistics",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IHRACHANE | Global Supply Chain & Sourcing Solutions",
    description:
      "Trusted global procurement, supplier verification, and shipping coordination.",
    images: ["/logo/siteLogo/logo.svg"],
    creator: "@ihrachane",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/logo/siteLogo/logo.svg" }],
    shortcut: "/logo/siteLogo/logo.svg",
    apple: [{ url: "/logo/siteLogo/logo.svg" }],
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://www.ihrachane.com/#organization",
        name: "IHRACHANE",
        url: "https://www.ihrachane.com",
        logo: "https://www.ihrachane.com/logo/siteLogo/logo.svg",
        description:
          "Single Center from Supply to Delivery. Global procurement, sourcing, and logistics solutions.",
        sameAs: [],
      },
      {
        "@type": "WebSite",
        "@id": "https://www.ihrachane.com/#website",
        url: "https://www.ihrachane.com",
        name: "IHRACHANE",
        publisher: { "@id": "https://www.ihrachane.com/#organization" },
        inLanguage: ["en-US", "tr-TR"],
      },
      {
        "@type": "Service",
        "@id": "https://www.ihrachane.com/#service",
        name: "Global Supply Chain & Logistics Management",
        provider: { "@id": "https://www.ihrachane.com/#organization" },
        serviceType: "Procurement & Freight Forwarding Services",
        areaServed: "Worldwide",
        description:
          "Comprehensive product sourcing, supplier inspection, China warehousing, and international shipping logistics.",
      },
    ],
  };

  return (
    <html lang="en" data-theme="light">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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