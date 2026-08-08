import Link from "next/link";
import {
  FiSearch,
  FiCheckCircle,
  FiBox,
  FiTruck,
  FiUsers,
  FiMessageSquare,
  FiPhone,
  FiSettings,
  FiGlobe,
  FiTrendingUp,
  FiShield,
  FiTarget,
  FiBriefcase,
  FiCompass,
  FiCheck,
  FiArrowRight,
} from "react-icons/fi";

export const metadata = {
  title: "About IHRACHANE | Global Sourcing, Quality Assurance & Logistics",
  description:
    "Learn how IHRACHANE bridges global businesses with Chinese manufacturing. Full-service product sourcing, factory audits, quality control, China warehousing, machinery procurement, and international logistics.",
  keywords: [
    // English - General & Brand
    "global sourcing company",
    "china procurement agency",
    "international supply chain partner",
    "cross-border sourcing solutions",
    "full-service procurement agent china",

    // Turkish - General & Brand
    "küresel tedarik zinciri danışmanlığı",
    "çin satın alma danışmanlığı",
    "çin tedarikçi bulma firmaları",
    "uluslararası tedarik ortağı",
    "çin ithalat danışmanlık hizmetleri",

    // English - Factory Audits & Quality Control
    "china factory inspection services",
    "pre-shipment inspection china",
    "on-site factory audit china",
    "supplier verification and background check",
    "china quality assurance agent",

    // Turkish - Factory Audits & Quality Control
    "çin fabrika denetim hizmetleri",
    "çin kalite kontrol danışmanlığı",
    "yükleme öncesi denetim çin",
    "çin tedarikçi doğrulama ve fabrika ziyareti",
    "çin ürün kalite denetimi",

    // English - Warehousing, Freight & Dropshipping
    "china warehousing and fulfillment",
    "consolidated shipping china",
    "china freight forwarding services",
    "e-commerce dropshipping agent china",
    "door-to-door shipping from china",

    // Turkish - Warehousing, Freight & Dropshipping
    "çin depo ve depolama hizmetleri",
    "çin konsolide kargo ve nakliye",
    "çin uluslararası lojistik firmaları",
    "çin dropshipping tedarikçi ve depolama",
    "çin’den kapıdan kapıya nakliye",

    // English - Machine Procurement & Specialized Services
    "china industrial machinery sourcing",
    "factory visit interpreter china",
    "direct supplier price negotiation china",
    "machinery parts sourcing china",
    "china business translation services",

    // Turkish - Machine Procurement & Specialized Services
    "çin endüstriyel makine tedariki",
    "çin fabrika ziyareti tercümanlık hizmeti",
    "çin üretici fiyat pazarlığı danışmanlığı",
    "makine yedek parça ithalatı çin",
    "çin ticari tercüman ve rehberlik",

    // Long-Tail Intent Keywords
    "how to source products from china safely",
    "on-the-ground sourcing agent in china",
    "end-to-end supply chain management china",
    "çin'den güvenli ürün tedariki nasıl yapılır",
    "çin'de yerinde fabrika denetimi yapan şirketler",
    "çin’den makine ve ekipman ithalatı danışmanlığı",
  ],
  alternates: {
    canonical: "https://www.ihrachane.com/about-us",
  },
  openGraph: {
    title: "About IHRACHANE | Global Sourcing & Supply Chain Solutions",
    description:
      "Simplifying global trade with factory audits, China warehousing, direct manufacturer negotiation, and worldwide shipping.",
    url: "https://www.ihrachane.com/about-us",
    siteName: "IHRACHANE",
    locale: "en_US",
    type: "website",
  },
};

export default function About() {
  const stats = [
    { label: "Full-Spectrum Services", value: "10+" },
    { label: "Local On-Site Presence", value: "China & Global" },
    { label: "End-to-End Coverage", value: "Sourcing to Delivery" },
    { label: "Risk Mitigation", value: "100% Quality Vetted" },
  ];

  const services = [
    {
      title: "Product Sourcing",
      description:
        "We analyze global market demand, find trustworthy manufacturers, evaluate feasibility, and shortlist factories perfectly aligned with your product specifications.",
      icon: FiSearch,
    },
    {
      title: "Factory Audits & Quality Control",
      description:
        "Rigorous on-site factory inspections to evaluate operational legitimacy, manufacturing capability, worker conditions, and pre-shipment product quality.",
      icon: FiCheckCircle,
    },
    {
      title: "China Storage & Warehousing",
      description:
        "Secure and organized storage facilities in China offering consolidated inventory management, customized packaging, and direct dispatch preparation.",
      icon: FiBox,
    },
    {
      title: "International Shipping & Freight",
      description:
        "End-to-end global shipping solutions spanning ocean, air, and express door-to-door freight with full route visibility and customs coordination.",
      icon: FiTruck,
    },
    {
      title: "Factory Visits & On-Site Management",
      description:
        "In-person representation during factory tours, key project meetings, and production milestones to keep suppliers accountable.",
      icon: FiUsers,
    },
    {
      title: "Interpreter & Translation Services",
      description:
        "Professional bilingual interpreters to eliminate language barriers during high-stakes supplier meetings, factory tours, and complex negotiations.",
      icon: FiMessageSquare,
    },
    {
      title: "Factory Communication & Negotiation",
      description:
        "Direct dialogue management with Chinese manufacturers to secure competitive trade terms, fair pricing, target lead times, and binding SLAs.",
      icon: FiPhone,
    },
    {
      title: "Industrial Machinery & Components",
      description:
        "Specialized procurement and technical verification of heavy machinery, industrial production equipment, and specialized replacement parts across sectors.",
      icon: FiSettings,
    },
    {
      title: "Dropshipping & E-commerce Logistics",
      description:
        "Automated fulfillment workflows, direct customer packaging, quality check before dispatch, and seamless direct delivery for e-commerce brands.",
      icon: FiGlobe,
    },
    {
      title: "Market Consulting & Global Strategy",
      description:
        "Actionable strategic guidance for businesses aiming to expand internationally, enter new target regions, or diversify their supply chain risks.",
      icon: FiTrendingUp,
    },
  ];

  const workflowSteps = [
    {
      step: "01",
      title: "Discovery & Analysis",
      description:
        "We dive deep into your target specifications, target margins, quality standards, and volume timelines.",
    },
    {
      step: "02",
      title: "Supplier Matching & Vetting",
      description:
        "Our local China team verifies suppliers, performs factory visits, and negotiates pricing.",
    },
    {
      step: "03",
      title: "Quality Control & Warehousing",
      description:
        "Goods undergo strict pre-shipment quality checks at our China storage hub before packing.",
    },
    {
      step: "04",
      title: "Global Delivery & Fulfillment",
      description:
        "We handle customs clearance, export paperwork, and manage door-to-door shipping to your warehouse.",
    },
  ];

  const targetAudience = [
    {
      title: "E-commerce Brands & Dropshippers",
      description:
        "Seeking automated fulfillment, reliable unit quality checks, and fast direct shipping.",
    },
    {
      title: "Industrial & Manufacturing Enterprises",
      description:
        "Requiring verified machinery sourcing, precise industrial components, and complex freight routing.",
    },
    {
      title: "Importers & Wholesale Distributors",
      description:
        "Looking to scale bulk order quantities, secure commercial terms, and protect margins.",
    },
    {
      title: "Growing Enterprises Entering China",
      description:
        "Needing bilingual negotiation, local boots-on-the-ground support, and total process transparency.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "IHRACHANE",
            url: "https://www.ihrachane.com",
            logo: "https://www.ihrachane.com/logo.png",
            description:
              "Global sourcing, factory verification, quality control, and logistics management.",
            sameAs: [],
          }),
        }}
      />

      {/* Hero Section */}
      <section className="site-section-dark overflow-hidden pt-28 sm:pt-32 lg:pt-36 pb-20">
        <div className="site-container relative z-10">
          <div className="mb-8">
            <Link href="/" className="site-button-dark">
              ← Back to Home
            </Link>
          </div>

          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <span className="site-badge-dark">About IHRACHANE</span>
              <h1 className="site-title-dark max-w-3xl text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Eliminating borders between global businesses and reliable
                trade.
              </h1>
              <p className="site-copy-dark max-w-2xl text-lg text-slate-300">
                IHRACHANE was founded on a simple premise: international
                business scaling should never be stalled by language barriers,
                quality uncertainties, or supply chain friction. We serve as
                your dedicated operational partner in China and beyond.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row pt-2">
                <Link href="/sourcing#contact" className="site-button-primary">
                  Start Your Procurement
                </Link>
                <Link href="/shipping-partners" className="site-button-dark">
                  Explore Shipping Network
                </Link>
              </div>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
                >
                  <div className="text-3xl sm:text-4xl font-black text-slate-900/90">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-sm font-medium text-slate-200">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Extended Narrative / Our Story */}
      <section className="site-section-soft py-20">
        <div className="site-container">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <span className="site-badge">Who We Are</span>
              <h2 className="site-title text-3xl sm:text-4xl font-bold text-slate-900">
                Your trusted operational team on the ground in China
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Navigating cross-border procurement requires much more than
                browsing supplier catalogues. It demands local knowledge,
                hands-on quality audits, cultural understanding, and strict
                oversight at every link in the logistics chain.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Whether you need specialized industrial machinery, daily
                e-commerce product sourcing, or complete factory contract
                management, IHRACHANE removes operational risk so you can expand
                into international markets with total commercial confidence.
              </p>
              <div className="pt-2">
                <ul className="space-y-3">
                  {[
                    "Dedicated project managers & inspectors",
                    "Direct manufacturer contract negotiations",
                    "Complete pre-shipment quality verification",
                  ].map((point, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-slate-800 font-medium"
                    >
                      <FiCheck className="text-orange-600 flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="site-panel rounded-[2rem] p-8 sm:p-10 border border-slate-200 bg-white shadow-lg space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                  <FiTarget className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Our Core Vision
                  </h3>
                  <p className="text-sm text-slate-500">
                    Building transparent global supply chains
                  </p>
                </div>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed">
                To serve as the most dependable, transparent, and comprehensive
                supply chain gateway for enterprises expanding across
                borders—turning global procurement into a streamlined, risk-free
                competitive advantage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive Services Grid (10 Services) */}
      <section className="site-section-muted py-24">
        <div className="site-container">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <span className="site-badge">Core Services</span>
            <h2 className="site-title mt-4 text-3xl sm:text-4xl font-bold text-slate-900">
              End-to-End Capabilities Across the Sourcing Journey
            </h2>
            <p className="site-copy mt-4 text-slate-600">
              From the initial idea and supplier verification to packaging,
              warehousing, and final door delivery—we cover all 10 core pillars
              of global sourcing.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((item) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.title}
                  className="site-panel site-card-hover rounded-[1.75rem] p-7 border border-slate-200/80 bg-white shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                      <IconComponent className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section className="site-section-soft py-20">
        <div className="site-container">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <span className="site-badge">Our Process</span>
            <h2 className="site-title mt-4 text-3xl sm:text-4xl font-bold text-slate-900">
              How We Streamline Your Procurement
            </h2>
            <p className="site-copy mt-4 text-slate-600">
              A disciplined step-by-step workflow engineered to eliminate
              defects and shipping delays.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {workflowSteps.map((item) => (
              <div
                key={item.step}
                className="rounded-[1.75rem] border border-slate-200 bg-white p-7 relative"
              >
                <span className="text-4xl font-black text-orange-500/90">
                  {item.step}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Serve Section */}
      <section className="site-section-muted py-20">
        <div className="site-container">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <span className="site-badge">Client Ecosystem</span>
              <h2 className="site-title mt-4 text-3xl sm:text-4xl font-bold text-slate-900">
                Tailored Solutions for Scaling Businesses
              </h2>
              <p className="mt-4 text-slate-600 leading-relaxed">
                Whether you are an established industrial corporation sourcing
                heavy machinery or a high-growth brand expanding fulfillment
                channels, our services adapt to your specific operational scale.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {targetAudience.map((audience, i) => (
                <div
                  key={i}
                  className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <h3 className="font-bold text-slate-900">{audience.title}</h3>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                    {audience.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
