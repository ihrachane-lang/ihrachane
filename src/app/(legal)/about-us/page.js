import Link from "next/link";

export const metadata = {
  title: "About Us | IHRACHANE Global Sourcing & Logistics Partner",
  description:
    "Learn about IHRACHANE - your trusted global sourcing, factory verification, quality control, and logistics partner. Hakkımızda - Küresel tedarik zinciri ve satın alma ortağınız.",
  keywords: [
    "about ihrachane",
    "ihrachane company",
    "global sourcing partner",
    "china procurement team",
    "factory inspection services",
    "hakkımızda",
    "ihrachane şirket bilgisi",
    "küresel tedarik ortağı",
    "çin satın alma ekibi",
  ],
  alternates: {
    canonical: "https://www.ihrachane.com/about-us",
  },
};

export default function About() {
  const serviceHighlights = [
    {
      title: "Product Research & Market Analysis",
      description:
        "We help validate demand, evaluate sourcing feasibility, and shortlist suppliers with the right production fit.",
    },
    {
      title: "Factory Sourcing & Visits",
      description:
        "We identify reliable factories, conduct on-site checks, and verify production capabilities before you commit.",
    },
    {
      title: "Warehousing & Fulfillment in China",
      description:
        "We coordinate storage, consolidation, packaging, and dispatch preparation for international fulfillment.",
    },
    {
      title: "Global Shipping & Logistics",
      description:
        "We manage export coordination, shipping partners, and visibility across the delivery journey.",
    },
  ];

  const trustPoints = [
    "Local sourcing expertise with international business understanding",
    "Transparent process management and commercially practical guidance",
    "Long-term partnership approach focused on repeatable operational value",
  ];

  return (
    <div className="min-h-screen">
      <section className="site-section-dark overflow-hidden pt-28 sm:pt-32 lg:pt-36">
        <div className="site-container relative z-10">
          <div className="mb-8">
            <Link href="/" className="site-button-dark">
              Back to Home
            </Link>
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <div className="site-badge-dark">About IHRACHANE</div>
              <h1 className="site-title-dark max-w-3xl text-4xl sm:text-5xl lg:text-6xl">
                A trusted sourcing and logistics partner for businesses scaling globally.
              </h1>
              <p className="site-copy-dark max-w-2xl">
                IHRACHANE helps simplify global trade by connecting businesses with reliable manufacturers, disciplined quality control, and coordinated international logistics.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link href="/#contact" className="site-button-primary">
                  Contact Us Today
                </Link>
                <Link href="/shipping-partners" className="site-button-dark">
                  Explore Shipping Partners
                </Link>
              </div>
            </div>

            <div className="site-panel-dark grid gap-4 rounded-[2rem] p-6 sm:grid-cols-2">
              <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                <div className="text-3xl font-black text-orange-300">End-to-End</div>
                <p className="mt-2 text-sm leading-7 text-slate-300">
                  From supplier discovery and inspections to warehousing and shipping coordination.
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                <div className="text-3xl font-black text-white">Transparent</div>
                <p className="mt-2 text-sm leading-7 text-slate-300">
                  Clear communication, practical updates, and operational visibility throughout the process.
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5 sm:col-span-2">
                <div className="text-3xl font-black text-orange-300">Growth Focused</div>
                <p className="mt-2 text-sm leading-7 text-slate-300">
                  We remove sourcing friction so teams can spend more time on market expansion and commercial growth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="site-section-soft">
        <div className="site-container">
          <div className="site-panel p-8 sm:p-12">
            <div className="mb-6 site-badge">Our Mission</div>
            <h2 className="site-title mb-5">Make global sourcing easier to trust, manage, and scale.</h2>
            <p className="site-copy max-w-4xl">
              Our mission is to simplify global trade for businesses of all sizes by helping them navigate manufacturing, supplier validation, quality control, warehousing, and international logistics with more confidence.
            </p>
          </div>
        </div>
      </section>

      <section className="site-section-muted">
        <div className="site-container">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <div className="site-badge">Core Services</div>
            <h2 className="site-title mt-4">What we support across the sourcing journey</h2>
            <p className="site-copy mt-4">
              These service areas reflect the operational support we provide to help clients move from idea to delivery more efficiently.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {serviceHighlights.map((item) => (
              <div key={item.title} className="site-panel site-card-hover rounded-[1.75rem] p-7">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="site-section-soft">
        <div className="site-container">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="rounded-[2rem] bg-gradient-to-br from-orange-500 via-orange-600 to-amber-500 p-8 text-white shadow-[0_28px_70px_-34px_rgba(249,115,22,0.85)] sm:p-10">
              <div className="site-badge border-white/20 bg-white/10 text-white">Why Businesses Stay With Us</div>
              <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl">Built for reliability, clarity, and long-term value.</h2>
              <p className="mt-4 text-base leading-7 text-orange-50">
                We combine local sourcing knowledge, practical execution, and a partnership mindset so clients can make better decisions with less operational risk.
              </p>
            </div>

            <div className="space-y-5">
              {trustPoints.map((item) => (
                <div key={item} className="site-panel rounded-[1.75rem] p-6">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-base leading-7 text-slate-700">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
