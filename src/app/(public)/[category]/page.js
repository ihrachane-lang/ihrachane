import Partners from "@/components/Home/partners/Partners";
import CategoryPageContent from "@/components/shared/CategoryPageContent";
import BilingualSeoSection from "@/components/shared/BilingualSeoSection";
import SourcingSection from "@/components/sourcing/SourcingSection";
import { getCategories, getCategoryBySlug } from "@/lib/data/public-data";
import { slugToTitle } from "@/lib/slug";
import { notFound } from "next/navigation";
import {
  SITE_URL,
  buildOgImages,
  clampDescription,
  clampTitle,
  absoluteUrl,
} from "@/lib/seo/seo-utils";
import {
  breadcrumbJsonLd,
  collectionPageJsonLd,
  faqJsonLd,
  servicesJsonLd,
} from "@/lib/seo/jsonld";

export const revalidate = 86400;
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const categories = await getCategories();
    return categories.map((cat) => ({ category: cat.slug }));
  } catch (error) {
    console.error("generateStaticParams category error:", error);
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { category } = await params;
  const formattedTitle = slugToTitle(category);

  let categoryData = null;
  try {
    categoryData = await getCategoryBySlug(category);
  } catch (e) {
    console.error("Error fetching metadata category:", e);
  }

  const rawTitle =
    categoryData?.mainBannerHeader ||
    `${formattedTitle} Sourcing Solutions | ${formattedTitle} Tedarik`;
  const title = rawTitle;

  const rawDescription =
    categoryData?.mainBannerDescription ||
    `Verified ${formattedTitle} procurement, supplier inspection, quality control, and shipping logistics by IHRACHANE. Doğrulanmış ${formattedTitle} tedarik, fabrika denetimi, kalite kontrolü ve uluslararası lojistik.`;
  const description = clampDescription(rawDescription);

  const trTitle = `${formattedTitle} Tedarik ve Lojistik Çözümleri`;
  const trDescription = `IHRACHANE ile ${formattedTitle} tedarik, fabrika doğrulama, kalite denetimi ve küresel kargo taşımacılığı hizmetleri.`;

  const canonicalPath = `/${category}`;
  const canonicalAbs = absoluteUrl(canonicalPath);

  return {
    title,
    description,
    keywords: [
      `${formattedTitle} sourcing`,
      `${formattedTitle} procurement`,
      `${formattedTitle} china suppliers`,
      `${formattedTitle} factory audit`,
      `ihrachane ${formattedTitle}`,
      `${formattedTitle} quality inspection`,
      `${formattedTitle} tedarik`,
      `${formattedTitle} üretici bulma`,
      `${formattedTitle} Çin tedarikçi`,
      `ürün denetimi ${formattedTitle}`,
      `${formattedTitle} navlun`,
    ],
    alternates: {
      canonical: canonicalAbs,
    },
    openGraph: {
      title,
      description,
      url: canonicalAbs,
      type: "website",
      siteName: "IHRACHANE",
      locale: "en_US",
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
  const { category } = await params;
  const data = await getCategoryBySlug(category);

  if (!data) {
    notFound();
  }

  const subCategoryItems = (data.subCategories || []).map((sub) => ({
    name: sub.title,
    url: `/${category}/${sub.slug || (sub.title || "").toString().toLowerCase().replace(/\s+/g, "-")}`,
    image: sub.bannerImg,
  }));

  const faqPairs = (
    data.contentTitle
      ? [
          [
            `What ${data.name || slugToTitle(category)} solutions does IHRACHANE provide?`,
            data.mainBannerDescription ||
              `We provide end-to-end ${data.name || slugToTitle(category)} solutions including supplier verification, factory inspection, warehousing, and global freight forwarding.`,
          ],
          [
            `Can you handle quality control for ${data.name || slugToTitle(category)} orders?`,
            `Yes. We provide pre-shipment inspection, in-line quality checks, and final random inspection for all ${data.name || slugToTitle(category)} shipments. Evet — tüm siparişler için sevkiyat öncesi, üretim içi ve nihai rastgele kalite denetimi sağlıyoruz.`,
          ],
          [
            `Which regions do you ship ${data.name || slugToTitle(category)} products from?`,
            `We primarily source from trusted manufacturers across Greater China, Turkey, and Southeast Asia, with warehousing and coordinated global freight. Öncelikle Çin, Türkiye ve Güneydoğu Asya'daki güvenilir üreticilerden tedarik sağlıyoruz.`,
          ],
          [
            `${data.name || slugToTitle(category)} ürünleri için hangi bölgelerden tedarik sağlıyorsunuz?`,
            `Çin, Türkiye ve Güneydoğu Asya'daki doğrulanmış fabrikalardan tedarik, depolama ve koordineli küresel kargo hizmetleri sunuyoruz.`,
          ],
        ]
      : []
  );

  const serviceListScript =
    subCategoryItems.length
      ? collectionPageJsonLd({
          url: `/${category}`,
          title: data.contentTitle || clampTitle(
            data.mainBannerHeader || `${slugToTitle(category)} Sourcing Solutions`,
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
        url: `/${category}`,
        name:
          data.mainBannerHeader ||
          `${slugToTitle(category)} Sourcing Solutions`,
        description: clampDescription(data.mainBannerDescription || ""),
        serviceType: `${data.name || slugToTitle(category)} Sourcing / ${slugToTitle(category)} Tedarik`,
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
              name: data.name || slugToTitle(category),
              url: `/${category}`,
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
      <CategoryPageContent data={data} slug={category} />
      <BilingualSeoSection
        category={data.name || slugToTitle(category)}
        enKeywords={[
          `${slugToTitle(category)} sourcing`,
          `${slugToTitle(category)} procurement`,
          `${slugToTitle(category)} suppliers`,
          `${slugToTitle(category)} factory audit`,
          `${slugToTitle(category)} quality inspection`,
          `${slugToTitle(category)} freight forwarding`,
          `${slugToTitle(category)} manufacturer`,
        ]}
        trKeywords={[
          `${slugToTitle(category)} tedarik`,
          `${slugToTitle(category)} satın alma`,
          `${slugToTitle(category)} üretici`,
          `${slugToTitle(category)} fabrika denetimi`,
          `${slugToTitle(category)} kalite kontrol`,
          `${slugToTitle(category)} navlun`,
          `${slugToTitle(category)} lojistik`,
        ]}
      />
      <Partners />
      <SourcingSection />
    </div>
  );
}
