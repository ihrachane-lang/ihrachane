import { absoluteUrl, BRAND_NAME, SITE_URL } from "./seo-utils";

function safeJson(value) {
  return JSON.stringify(value);
}

export function websiteJsonLd() {
  const graph = [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: BRAND_NAME,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en",
    },
  ];
  return safeJson({ "@context": "https://schema.org", "@graph": graph });
}

export function breadcrumbJsonLd(items) {
  const list = items.map((item, idx) => ({
    "@type": "ListItem",
    position: idx + 1,
    name: item.name,
    item: item.url ? absoluteUrl(item.url) : undefined,
  }));
  return safeJson({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: list,
  });
}

export function collectionPageJsonLd({
  url,
  title,
  description,
  items = [],
  updatedAt,
}) {
  return safeJson({
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    url: absoluteUrl(url),
    name: title,
    description: description,
    dateModified: updatedAt ? new Date(updatedAt).toISOString() : undefined,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: items.map((item, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        name: item.name,
        url: absoluteUrl(item.url),
        image: item.image,
      })),
    },
  });
}

export function productJsonLd({
  url,
  name,
  description,
  image,
  sku,
  brand = BRAND_NAME,
  category,
  updatedAt,
}) {
  return safeJson({
    "@context": "https://schema.org",
    "@type": "Product",
    url: absoluteUrl(url),
    name,
    description,
    image: image ? (Array.isArray(image) ? image : [image]) : undefined,
    sku: sku || name?.replace(/\s+/g, "-").toLowerCase(),
    brand: { "@type": "Brand", name: brand },
    category: category,
    dateModified: updatedAt ? new Date(updatedAt).toISOString() : undefined,
    areaServed: "Worldwide",
    offers: {
      "@type": "Offer",
      url: absoluteUrl(url),
      priceCurrency: "USD",
      price: "0",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      description:
        "Request a tailored quotation for sourcing, inspection, warehousing, and freight.",
    },
  });
}

export function faqJsonLd(pairs) {
  return safeJson({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: (pairs || []).map(([q, a]) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  });
}

export function servicesJsonLd({
  url,
  name,
  description,
  provider = BRAND_NAME,
  serviceType,
  areaServed = "Worldwide",
}) {
  return safeJson({
    "@context": "https://schema.org",
    "@type": "Service",
    url: absoluteUrl(url),
    name,
    description,
    provider: { "@type": "Organization", name: provider },
    serviceType,
    areaServed,
  });
}

export function organizationJsonLd({
  name = BRAND_NAME,
  url = SITE_URL,
  logo,
  description,
  social = [],
  address,
  contactPoints = [],
} = {}) {
  return safeJson({
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name,
    url,
    logo: logo ? absoluteUrl(logo) : undefined,
    description,
    sameAs: social,
    address: address ? { "@type": "PostalAddress", ...address } : undefined,
    contactPoint: contactPoints.length
      ? contactPoints.map((cp) => ({ "@type": "ContactPoint", ...cp }))
      : undefined,
  });
}

export function homePageJsonLd(overrides = {}) {
  const graph = [
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: `${BRAND_NAME} | Global Supply Chain, Sourcing & Logistics Solutions`,
      description:
        "End-to-end global supply chain management, factory sourcing, supplier verification, quality inspection, and international freight shipping.",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#organization` },
      primaryImageOfPage: overrides.heroImage,
      dateModified: overrides.updatedAt
        ? new Date(overrides.updatedAt).toISOString()
        : undefined,
    },
  ];
  return safeJson({ "@context": "https://schema.org", "@graph": graph });
}

export function legalPageJsonLd({ url, title, description, updatedAt, type }) {
  return safeJson({
    "@context": "https://schema.org",
    "@type": type || "WebPage",
    url: absoluteUrl(url),
    name: title,
    description,
    dateModified: updatedAt ? new Date(updatedAt).toISOString() : undefined,
    isPartOf: { "@id": `${SITE_URL}/#website` },
  });
}
