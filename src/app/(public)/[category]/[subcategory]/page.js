import Partners from "@/components/Home/partners/Partners";
import SubCategoryPageContent from "@/components/shared/SubCategoryPageContent";
import BilingualSeoSection from "@/components/shared/BilingualSeoSection";
import SourcingSection from "@/components/sourcing/SourcingSection";
import {
  getCategoryBySlug,
  getSubCategoriesForSitemap,
  getSubCategoryBySlugs,
  getSubCategoryById,
} from "@/lib/data/public-data";
import { slugToTitle, slugify } from "@/lib/slug";
import { notFound, permanentRedirect } from "next/navigation";

const OBJECT_ID_HEX = /^[0-9a-fA-F]{24}$/;
import {
  SITE_URL,
  buildOgImages,
  clampDescription,
  clampTitle,
  absoluteUrl,
} from "@/lib/seo/seo-utils";
import {
  breadcrumbJsonLd,
  faqJsonLd,
  servicesJsonLd,
} from "@/lib/seo/jsonld";

export const revalidate = 86400;
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const subCategories = await getSubCategoriesForSitemap();
    return subCategories.map((sub) => ({
      category: sub.categorySlug,
      subcategory: sub.subSlug,
    }));
  } catch (error) {
    console.error("generateStaticParams sub-category error:", error);
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { category, subcategory } = await params;

  let subCategoryData = null;
  try {
    subCategoryData = await getSubCategoryBySlugs(category, subcategory);
  } catch (e) {
    console.error("Error fetching sub-category metadata:", e);
  }

  const categoryTitle = slugToTitle(category);
  const subCategoryTitle = slugToTitle(subcategory);

  const rawTitle = subCategoryData?.title
    ? `${subCategoryData.title} | ${categoryTitle} Procurement & ${categoryTitle} Tedarik`
    : `${categoryTitle} Solutions | ${categoryTitle} Çözümleri`;

  const title = rawTitle;

  const rawDescription =
    subCategoryData?.description ||
    `Explore ${subCategoryData?.title || subCategoryTitle} sourcing solutions, supplier verification, and logistics support from IHRACHANE. ${subCategoryData?.title || subCategoryTitle} tedarik, üretici doğrulama ve lojistik desteği.`;
  const description = clampDescription(rawDescription);

  const canonicalPath = `/${category}/${subcategory}`;
  const canonicalAbs = absoluteUrl(canonicalPath);

  return {
    title,
    description,
    keywords: [
      `${subCategoryData?.title || subCategoryTitle} supplier`,
      `${subCategoryData?.title || subCategoryTitle} china factory`,
      `${categoryTitle} procurement`,
      `ihrachane quality inspection`,
      `${subCategoryData?.title || subCategoryTitle} sourcing`,
      `${categoryTitle} freight forwarding`,
      `${subCategoryData?.title || subCategoryTitle} manufacturer`,
      `${subCategoryData?.title || subCategoryTitle} üretici`,
      `${categoryTitle} tedarik`,
      `${subCategoryData?.title || subCategoryTitle} Çin fabrika`,
      `uluslararası ${categoryTitle} nakliye`,
    ],
    alternates: {
      canonical: canonicalAbs,
    },
    openGraph: {
      title,
      description,
      url: canonicalAbs,
      type: "article",
      siteName: "IHRACHANE",
      locale: "en_US",
      images: buildOgImages(
        subCategoryData?.bannerImg,
        subCategoryData?.title || subCategoryTitle,
      ),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: buildOgImages(
        subCategoryData?.bannerImg,
        subCategoryData?.title || subCategoryTitle,
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
  const { category, subcategory } = await params;

  // Backward compat: legacy _id-based URLs (24-char MongoDB ObjectId pattern)
  if (OBJECT_ID_HEX.test(subcategory)) {
    try {
      const legacyDoc = await getSubCategoryById(subcategory);
      if (legacyDoc && legacyDoc.selectedCategory) {
        const catDoc =
          typeof legacyDoc.selectedCategory === "object" && legacyDoc.selectedCategory.name
            ? legacyDoc.selectedCategory
            : await getCategoryBySlug(category);
        const catSlug = (catDoc?.slug || slugify(catDoc?.name || category));
        const realSubSlug = legacyDoc.slug || slugify(legacyDoc.title || "");
        if (catSlug && realSubSlug) {
          permanentRedirect(`/${catSlug}/${realSubSlug}`);
        }
      }
    } catch (_err) {
      // fall through
    }
  }

  let data = null;
  let categoryDoc = null;

  try {
    [data, categoryDoc] = await Promise.all([
      getSubCategoryBySlugs(category, subcategory),
      getCategoryBySlug(category),
    ]);
  } catch (_err) {
    data = null;
    categoryDoc = null;
  }

  // Secondary fallback: slug resolver failed but incoming is not ObjectId,
  // try resolving through populated relationship by reverse lookup
  if (!data && !OBJECT_ID_HEX.test(subcategory)) {
    try {
      const subCats = await getSubCategoriesForSitemap();
      const match = subCats.find(
        (s) =>
          s.subSlug === slugify(subcategory) &&
          slugify(s.categorySlug) === slugify(category)
      );
      if (match) {
        permanentRedirect(`/${match.categorySlug}/${match.subSlug}`);
      }
    } catch (_err) {
      // noop
    }
  }

  if (!data || !categoryDoc) {
    notFound();
  }

  const categoryName = categoryDoc.name || slugToTitle(category);
  const productName = data.title || slugToTitle(subcategory);
  const subSlug = data.slug || slugify(data.title || subcategory);

  const faqBase = [
    [
      `How do I source ${productName} with IHRACHANE?`,
      `We handle ${productName} sourcing end-to-end: supplier identification, factory audit, production monitoring, quality inspection, warehousing, and coordinated global freight shipping. ${productName} tedarik süreçlerinin tamamını yönetiyoruz.`,
    ],
    [
      `Can I get a custom quote for ${productName}?`,
      `Yes. Contact our team for a tailored quotation including unit pricing, MOQ, inspection schedule, and freight options for your ${productName} order. Evet — ${productName} siparişiniz için özel fiyat teklifi alın.`,
    ],
    [
      `Do you inspect ${productName} before shipment?`,
      `Absolutely — we perform pre-shipment, in-line production, and container loading supervision for every ${productName} order. ${productName} sevkiyatından önce tam denetim sağlıyoruz.`,
    ],
    [
      `${productName} için IHRACHANE ile nasıl çalışabilirim?`,
      `Size özel ${productName} tedarik planı, fabrika ziyareti, üretim takibi, kalite kontrolü ve kapıda teslim seçenekleri için hemen bizimle iletişime geçin.`,
    ],
  ];

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: breadcrumbJsonLd([
            { name: "Home", url: "/" },
            { name: categoryName, url: `/${category}` },
            { name: productName, url: `/${category}/${subcategory}` },
          ]),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: servicesJsonLd({
            url: `/${category}/${subcategory}`,
            name: `${productName} Sourcing & Logistics / ${productName} Tedarik`,
            description: clampDescription(
              data.description ||
                `Complete ${productName} sourcing, QC, and shipping from IHRACHANE. ${productName} için eksiksiz tedarik, kalite kontrolü ve sevkiyat.`,
            ),
            serviceType: `${productName} Procurement / ${productName} Tedarik`,
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqJsonLd(faqBase) }}
      />
      <SubCategoryPageContent data={data} slug={category} />
      <BilingualSeoSection
        category={categoryName}
        subCategory={productName}
        enKeywords={[
          `${productName} supplier`,
          `${productName} manufacturer`,
          `${productName} china factory`,
          `${categoryName} procurement`,
          `${productName} quality inspection`,
          `${productName} freight`,
          `${categoryName} sourcing agent`,
        ]}
        trKeywords={[
          `${productName} tedarikçi`,
          `${productName} üretici`,
          `${productName} çin fabrika`,
          `${categoryName} satın alma`,
          `${productName} kalite denetimi`,
          `${productName} navlun`,
          `${categoryName} temsilci`,
        ]}
      />
      <Partners />
      <SourcingSection />
    </div>
  );
}
