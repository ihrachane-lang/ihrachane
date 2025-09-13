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
    default: "Single Center from Supply to Delivery",
    
  },
  description: "IHRACHANE delivers end-to-end supply chain management, procurement, and global sourcing solutions for businesses seeking efficiency and growth.",
  keywords: "ihrachane, supply chain management, procurement, sourcing, logistics, inventory management, supplier management, global sourcing",
  authors: [{ name: "IHRACHANE Team" }],
  creator: "IHRACHANE",
  publisher: "IHRACHANE",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.ihrachane.com'), // Replace with your actual domain
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
    },
  },
  openGraph: {
    title: "Single Center from Supply to Delivery",
    description: "End-to-end supply chain management, procurement, and global sourcing solutions for businesses.",
    url: 'https://www.ihrachane.com', // Replace with your actual domain
    siteName: 'IHRACHANE',
    images: [
      {
        url: '/logo/siteLogo/logo.svg', // Replace with your actual OG image path
        width: 1200,
        height: 630,
        alt: 'Supply Chain Solutions',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Single Center from Supply to Delivery',
    description: 'End-to-end supply chain management solutions for businesses.',
    images: ['/logo/siteLogo/logo.svg'], // Replace with your actual Twitter image path
    creator: '@ihrachane', // Replace with your actual Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/logo/siteLogo/logo.svg' },
      { url: '/logo/siteLogo/logo.svg', sizes: '16x16', type: 'image/png' },
      { url: '/logo/siteLogo/logo.svg', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/logo/siteLogo/logo.svg',
    apple: [
      { url: '/logo/siteLogo/logo.svg' },
      { url: '/logo/siteLogo/logo.svg', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/logo/siteLogo/logo.svg',
        color: '#5bbad5',
      },
    ],
  },
  manifest: '/site.webmanifest', // Add if you have a web app manifest
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <head>
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "IHRACHANE",
              "url": "https://www.ihrachane.com",
              "logo": "https://www.ihrachane.com/logo/siteLogo/logo.svg",
              "description": "Single Center from Supply to Delivery",
            })
          }}
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