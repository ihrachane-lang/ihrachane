import Partners from "@/components/Home/partners/Partners";
import SubCategoryPageContent from "@/components/shared/SubCategoryPageContent";
import SourcingSection from "@/components/sourcing/SourcingSection";
import {
  getCategoryBySlug,
  getSubCategoriesForSitemap,
  getSubCategoryById,
} from "@/lib/data/public-data";
import { slugToTitle } from "@/lib/slug";
import { notFound } from "next/navigation";
import {
  buildOgImages,
  clampDescription,
  clampTitle,
} from "@/lib/seo/seo-utils";
import {
  breadcrumbJsonLd,
  faqJsonLd,
  productJsonLd,
  servicesJsonLd,
} from "@/lib/seo/jsonld";

export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const subCategories = await getSubCategoriesForSitemap();
    return subCategories.map((sub) => ({
      slug: sub.slug,
      id: sub.id,
    }));
  } catch (error) {
    console.error("generateStaticParams sub-category error:", error);
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { id, slug } = await params;

  let subCategoryData = null;
  try {
    subCategoryData = await getSubCategoryById(id);
  } catch (e) {
    console.error("Error fetching sub-category metadata:", e);
  }

  const categoryTitle = slugToTitle(slug);
  const rawTitle = subCategoryData?.title
    ? `${subCategoryData.title} | ${categoryTitle}`
    : `${categoryTitle} Solutions`;

  const title = clampTitle(rawTitle);

  const rawDescription =
    subCategoryData?.description ||
    `Explore ${subCategoryData?.title || categoryTitle} sourcing solutions, supplier verification, and logistics support from IHRACHANE.`;
  const description = clampDescription(rawDescription);

  return {
    title,
    description,
    keywords: [
      `${subCategoryData?.title || categoryTitle} supplier`,
      `${subCategoryData?.title || categoryTitle} china factory`,
      `${categoryTitle} procurement`,
      "ihrachane quality inspection",
      `${subCategoryData?.title || categoryTitle}`,
      `${categoryTitle} freight`,
    ],
    alternates: {
      canonical: `/home/${slug}/${id}`,
    },
    openGraph: {
      title,
      description,
      url: `/home/${slug}/${id}`,
      type: "article",
      images: buildOgImages(
        subCategoryData?.bannerImg,
        subCategoryData?.title || categoryTitle,
      ),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: buildOgImages(
        subCategoryData?.bannerImg,
        subCategoryData?.title || categoryTitle,
      ),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function SubCategoryPage({ params }) {
  const { id, slug } = await params;
  const [data, category] = await Promise.all([
    getSubCategoryById(id),
    getCategoryBySlug(slug),
  ]);

  if (!data || !category) {
    notFound();
  }

  const categoryName = category.name || slugToTitle(slug);
  const productName = data.title || categoryName;

  const faqBase = [
    [
      `How do I source ${productName} with IHRACHANE?`,
      `We handle ${productName} sourcing end-to-end: supplier identification, factory audit, production monitoring, quality inspection, warehousing, and coordinated global freight shipping.`,
    ],
    [
      `Can I get a custom quote for ${productName}?`,
      `Yes. Contact our team for a tailored quotation including unit pricing, MOQ, inspection schedule, and freight options for your ${productName} order.`,
    ],
    [
      `Do you inspect ${productName} before shipment?`,
      `Absolutely — we perform pre-shipment, in-line production, and container loading supervision for every ${productName} order.`,
    ],
  ];

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: breadcrumbJsonLd([
            { name: "Home", url: "/" },
            { name: categoryName, url: `/home/${slug}` },
            { name: productName, url: `/home/${slug}/${id}` },
          ]),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: productJsonLd({
            url: `/home/${slug}/${id}`,
            name: productName,
            description: clampDescription(data.description || ""),
            image: data.bannerImg,
            sku: id,
            brand: "IHRACHANE",
            category: categoryName,
            updatedAt: data.updatedAt,
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: servicesJsonLd({
            url: `/home/${slug}/${id}`,
            name: `${productName} Sourcing & Logistics`,
            description: clampDescription(
              data.description ||
                `Complete ${productName} sourcing, QC, and shipping from IHRACHANE.`,
            ),
            serviceType: `${productName} Procurement`,
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqJsonLd(faqBase) }}
      />
      <SubCategoryPageContent data={data} slug={slug} />
      <Partners />
      <SourcingSection />
    </div>
  );
}
