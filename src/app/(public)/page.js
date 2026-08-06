import { Suspense } from "react";
import Clients from "@/components/Home/Clients";
import Features from "@/components/Home/Features";
import Supplier from "@/components/Home/Supplier";
import Form from "@/components/shared/Form";
import SupplyChain from "@/components/Home/SupplyChain";
import OurServices from "@/components/Home/OurServices";
import Testimonials from "@/components/Home/Testimonials";
import Partners from "@/components/Home/partners/Partners";
import HomeHeroSection from "@/components/Home/HomeHeroSection";
import HeroSkeleton from "@/components/shared/HeroSkeleton";
import BilingualSeoSection from "@/components/shared/BilingualSeoSection";
import {
  clampTitle,
  clampDescription,
  buildOgImages,
  SITE_URL,
} from "@/lib/seo/seo-utils";
import {
  homePageJsonLd,
  websiteJsonLd,
  servicesJsonLd,
  faqJsonLd,
} from "@/lib/seo/jsonld";

export const revalidate = 3600;

const pageTitle = clampTitle(
  "Global Supply Chain, Product Sourcing & Logistics",
  "",
);
const pageDescription = clampDescription(
  "Single center from supply to delivery. IHRACHANE offers managed factory sourcing, supplier inspection, China warehousing, and global shipping logistics. Tedarik zincirinden teslimata tek merkez. Fabrika temini, tedarikçi denetimi, Çin depolama ve küresel sevkiyat.",
);
const canonicalHome = "https://www.ihrachane.com/";

export const metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: [
    "ihrachane",
    "ihrachane sourcing",
    "ihrachane global",
    "ihrachane b2b",
    "global supply chain management",
    "international procurement solutions",
    "factory sourcing agent",
    "china product sourcing",
    "china turkey supplier",
    "supplier verification and inspection",
    "international freight logistics",
    "end-to-end supply chain",
    "B2B trade procurement",
    "china warehouse fulfillment",
    "factory audit quality control",
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
    "fabrika denetimi kalite kontrol",
  ],
  alternates: {
    canonical: canonicalHome,
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: canonicalHome,
    type: "website",
    siteName: "IHRACHANE",
    locale: "en_US",
    alternateLocale: ["tr_TR"],
    images: buildOgImages(null, "IHRACHANE Global Supply Chain Solutions"),
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    creator: "@ihrachane",
    images: buildOgImages(null, "IHRACHANE Global Supply Chain Solutions"),
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
};

function ServicesSkeleton() {
  return (
    <section
      id="services"
      className="site-section-dark my-10 overflow-hidden relative"
    >
      <div className="site-container relative z-10">
        <div className="mb-16 space-y-4 text-center">
          <div className="mx-auto h-6 w-36 animate-pulse rounded-full bg-white/10" />
          <div className="mx-auto h-10 w-80 animate-pulse rounded-2xl bg-white/10 sm:w-96" />
          <div className="mx-auto h-6 w-full max-w-2xl animate-pulse rounded-xl bg-white/5" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="site-panel-dark h-80 animate-pulse rounded-[2rem] border-white/10"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionCardsSkeleton({
  count = 4,
  dark = false,
}) {
  const bg = dark ? "bg-white/5" : "bg-slate-100";
  return (
    <section className="site-section-muted overflow-hidden">
      <div className="site-container">
        <div className="mb-16 space-y-4 text-center">
          <div className="mx-auto h-6 w-32 animate-pulse rounded-full bg-orange-500/20" />
          <div className="mx-auto h-10 w-72 animate-pulse rounded-2xl bg-slate-200 sm:w-96" />
          <div className="mx-auto h-6 w-full max-w-2xl animate-pulse rounded-xl bg-slate-100" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: count }).map((_, i) => (
            <div
              key={i}
              className={`h-56 animate-pulse rounded-[2rem] ${bg}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function MarqueeSkeleton() {
  return (
    <section className="site-section-soft overflow-hidden">
      <div className="site-container">
        <div className="mb-16 space-y-4 text-center">
          <div className="mx-auto h-6 w-32 animate-pulse rounded-full bg-orange-500/20" />
          <div className="mx-auto h-10 w-72 animate-pulse rounded-2xl bg-slate-200 sm:w-96" />
        </div>
        <div className="flex space-x-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-32 w-48 flex-shrink-0 animate-pulse rounded-[1.5rem] bg-slate-100"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSkeleton() {
  return (
    <section className="site-section-soft overflow-hidden">
      <div className="site-container">
        <div className="mb-16 space-y-4 text-center">
          <div className="mx-auto h-6 w-32 animate-pulse rounded-full bg-orange-500/20" />
          <div className="mx-auto h-10 w-72 animate-pulse rounded-2xl bg-slate-200 sm:w-96" />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-64 animate-pulse rounded-[2rem] bg-white"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const faqItems = [
  [
    "What supply chain services does IHRACHANE offer?",
    "IHRACHANE provides end-to-end global supply chain management including factory sourcing, supplier and factory audits, quality inspection, China warehousing, international freight coordination, and delivery to your doorstep.",
  ],
  [
    "Which product categories can you source?",
    "We source across textiles, apparel accessories, home goods, packaging, industrial components, and fast-moving consumer goods — contact us for a tailored shortlist of verified manufacturers.",
  ],
  [
    "How do you verify supplier quality?",
    "Our on-ground teams perform factory audits, in-line production inspections, pre-shipment random checks, and container loading supervision with detailed reporting and photographic evidence.",
  ],
  [
    "Can you ship products globally?",
    "Yes. We coordinate FCL/LCL ocean freight, air freight, and express courier services from origin warehouses to your destination with full documentation and tracking.",
  ],
];

export default async function Home() {
  return (
    <div className="">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: websiteJsonLd() }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: homePageJsonLd() }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: servicesJsonLd({
            url: "/",
            name: "Global Supply Chain & Procurement Solutions",
            description: pageDescription,
            serviceType:
              "Factory Sourcing, Supplier Audit, Quality Inspection, Warehousing, Freight Forwarding",
            areaServed: "Worldwide",
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqJsonLd(faqItems) }}
      />
      <Suspense fallback={<HeroSkeleton />}>
        <HomeHeroSection />
      </Suspense>
      <Features />
      <Suspense fallback={<ServicesSkeleton />}>
        <OurServices />
      </Suspense>
      <SupplyChain />
      <Supplier />
      <Suspense fallback={<TestimonialsSkeleton />}>
        <Testimonials />
      </Suspense>
      <Suspense fallback={<MarqueeSkeleton />}>
        <Partners />
      </Suspense>
      <Suspense fallback={<MarqueeSkeleton />}>
        <Clients />
      </Suspense>
      <BilingualSeoSection showTurkish={false}
        enKeywords={[
          "global supply chain management",
          "china product sourcing",
          "supplier verification inspection",
          "international freight logistics",
          "factory audit quality control",
          "china warehousing",
          "B2B procurement service",
          "end to end supply chain",
        ]}
        trKeywords={[
          "küresel tedarik zinciri",
          "çin ürün temini",
          "tedarikçi doğrulaması",
          "uluslararası lojistik",
          "fabrika denetimi",
          "kalite kontrol",
          "çin depolama",
          "navlun taşımacılığı",
          "dış ticaret desteği",
        ]}
      />
      <Form />
    </div>
  );
}
