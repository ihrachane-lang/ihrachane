import { notFound } from "next/navigation";
import ServiceLandingPage from "@/components/seo/ServiceLandingPage";
import { servicePages } from "@/lib/seo/service-pages";
import SubCategoryPage, { generateMetadata as subCategoryMetadata } from "../../[category]/[subcategory]/page";

export function generateStaticParams() {
  return Object.keys(servicePages).map((service) => ({ service }));
}

export async function generateMetadata({ params }) {
  const { service } = await params;
  const page = servicePages[service];

  if (!page) {
    // If not a static service page, delegate to subcategory metadata resolver
    return subCategoryMetadata({ params: { category: "services", subcategory: service } });
  }

  const url = `https://www.ihrachane.com/services/${service}`;
  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords,
    alternates: {
      canonical: url,
      languages: {
        en: url,
        tr: `https://www.ihrachane.com/tr/${page.turkishSlug}`,
        "x-default": url,
      },
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url,
      type: "website",
    },
  };
}

export default async function Page({ params }) {
  const { service } = await params;
  const page = servicePages[service];

  if (!page) {
    // If not a static service page, render the subcategory page content instead
    return <SubCategoryPage params={Promise.resolve({ category: "services", subcategory: service })} />;
  }

  return <ServiceLandingPage page={{ ...page, slug: service }} />;
}
