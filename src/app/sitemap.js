import {
  getCategories,
  getSubCategoriesForSitemap,
} from "@/lib/data/public-data";
import { servicePages } from "@/lib/seo/service-pages";

export const revalidate = 86400;

export default async function sitemap() {
  const baseUrl = "https://www.ihrachane.com";

  const staticRoutes = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/shipping-partners`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    { url: `${baseUrl}/tr`, changeFrequency: "weekly", priority: 0.9, alternates: { languages: { en: baseUrl, tr: `${baseUrl}/tr`, "x-default": baseUrl } } },
    ...Object.entries(servicePages).flatMap(([slug, page]) => [
      { url: `${baseUrl}/services/${slug}`, changeFrequency: "monthly", priority: 0.9, alternates: { languages: { en: `${baseUrl}/services/${slug}`, tr: `${baseUrl}/tr/${page.turkishSlug}`, "x-default": `${baseUrl}/services/${slug}` } } },
      { url: `${baseUrl}/tr/${page.turkishSlug}`, changeFrequency: "monthly", priority: 0.9, alternates: { languages: { en: `${baseUrl}/services/${slug}`, tr: `${baseUrl}/tr/${page.turkishSlug}`, "x-default": `${baseUrl}/services/${slug}` } } },
    ]),
  ];

  let dynamicCategoryRoutes = [];
  let dynamicSubCategoryRoutes = [];

  try {
    const [categories, subCategories] = await Promise.all([
      getCategories(),
      getSubCategoriesForSitemap(),
    ]);

    dynamicCategoryRoutes = categories.map((cat) => ({
      url: `${baseUrl}/${cat.slug}`,
      ...(cat.updatedAt ? { lastModified: new Date(cat.updatedAt) } : {}),
      changeFrequency: "weekly",
      priority: 0.9,
    }));

    dynamicSubCategoryRoutes = subCategories.map((sub) => ({
      url: `${baseUrl}/${sub.categorySlug}/${sub.subSlug}`,
      ...(sub.updatedAt ? { lastModified: new Date(sub.updatedAt) } : {}),
      changeFrequency: "weekly",
      priority: 0.85,
    }));
  } catch (error) {
    console.error("Error generating dynamic sitemap:", error);
  }

  return [...staticRoutes, ...dynamicCategoryRoutes, ...dynamicSubCategoryRoutes];
}
