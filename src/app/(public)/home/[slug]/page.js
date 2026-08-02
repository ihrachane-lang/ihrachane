import Partners from "@/components/Home/partners/Partners";
import CategoryPageContent from "@/components/shared/CategoryPageContent";
import SourcingSection from "@/components/sourcing/SourcingSection";
import { getCategories, getCategoryBySlug } from "@/lib/data/public-data";
import { slugToTitle } from "@/lib/slug";
import { notFound } from "next/navigation";
import {
  buildOgImages,
  clampDescription,
  clampTitle,
} from "@/lib/seo/seo-utils";
import {
  breadcrumbJsonLd,
  collectionPageJsonLd,
  faqJsonLd,
  servicesJsonLd,
} from "@/lib/seo/jsonld";

export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const categories = await getCategories();
    return categories.map((cat) => ({ slug: cat.slug }));
  } catch (error) {
    console.error("generateStaticParams category error:", error);
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const formattedTitle = slugToTitle(slug);

  let categoryData = null;
  try {
    categoryData = await getCategoryBySlug(slug);
  } catch (e) {
    console.error("Error fetching metadata category:", e);
  }

  const rawTitle =
    categoryData?.mainBannerHeader ||
    `${formattedTitle} Sourcing Solutions`;
  const title = clampTitle(rawTitle);

  const rawDescription =
    categoryData?.mainBannerDescription ||
    `Verified ${formattedTitle} procurement, supplier inspection, quality control, and shipping logistics by IHRACHANE.`;
  const description = clampDescription(rawDescription);

  return {
    title,
    description,
    keywords: [
      `${formattedTitle} sourcing`,
      `${formattedTitle} procurement`,
      `${formattedTitle} china suppliers`,
      "ihrachane",
      `${formattedTitle} tedarik`,
      `${formattedTitle} üretici bulma`,
      "ürün denetimi",
    ],
    alternates: {
      canonical: `/home/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `/home/${slug}`,
      type: "website",
      images: buildOgImages(categoryData?.bannerImg, rawTitle),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: buildOgImages(categoryData?.bannerImg, rawTitle),
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

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const data = await getCategoryBySlug(slug);

  if (!data) {
    notFound();
  }

  const subCategoryItems = (data.subCategories || []).map((sub) => ({
    name: sub.title,
    url: `/home/${slug}/${sub._id}`,
    image: sub.bannerImg,
  }));

  const faqPairs = (
    data.contentTitle
      ? [
          [
            `What ${data.name || slugToTitle(slug)} solutions does IHRACHANE provide?`,
            data.mainBannerDescription ||
              `We provide end-to-end ${data.name || slugToTitle(slug)} solutions including supplier verification, factory inspection, warehousing, and global freight forwarding.`,
          ],
          [
            `Can you handle quality control for ${data.name || slugToTitle(slug)} orders?`,
            `Yes. We provide pre-shipment inspection, in-line quality checks, and final random inspection for all ${data.name || slugToTitle(slug)} shipments.`,
          ],
          [
            `Which regions do you ship ${data.name || slugToTitle(slug)} products from?`,
            `We primarily source from trusted manufacturers across Greater China, Turkey, and Southeast Asia, with warehousing and coordinated global freight.`,
          ],
        ]
      : []
  );

  const serviceListScript =
    subCategoryItems.length
      ? collectionPageJsonLd({
          url: `/home/${slug}`,
          title: data.contentTitle || clampTitle(
            data.mainBannerHeader || `${slugToTitle(slug)} Sourcing Solutions`,
            "",
          ).replace(" | IHRACHANE", ""),
          description: clampDescription(
            data.mainBannerDescription || "",
          ),
          items: subCategoryItems,
          updatedAt: data.updatedAt,
        })
      : null;

  const serviceMarkup = data.contentTitle
    ? servicesJsonLd({
        url: `/home/${slug}`,
        name:
          data.mainBannerHeader ||
          `${slugToTitle(slug)} Sourcing Solutions`,
        description: clampDescription(data.mainBannerDescription || ""),
        serviceType: `${data.name || slugToTitle(slug)} Sourcing`,
      })
    : null;

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: breadcrumbJsonLd([
            { name: "Home", url: "/" },
            {
              name: data.name || slugToTitle(slug),
              url: `/home/${slug}`,
            },
          ]),
        }}
      />
      {serviceListScript ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serviceListScript }}
        />
      ) : null}
      {serviceMarkup ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serviceMarkup }}
        />
      ) : null}
      {faqPairs.length ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: faqJsonLd(faqPairs) }}
        />
      ) : null}
      <CategoryPageContent data={data} slug={slug} />
      <Partners />
      <SourcingSection />
    </div>
  );
}
