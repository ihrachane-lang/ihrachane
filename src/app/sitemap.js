import {
  getCategories,
  getSubCategoriesForSitemap,
} from "@/lib/data/public-data";

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
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  let dynamicCategoryRoutes = [];
  let dynamicSubCategoryRoutes = [];

  try {
    const [categories, subCategories] = await Promise.all([
      getCategories(),
      getSubCategoriesForSitemap(),
    ]);

    dynamicCategoryRoutes = categories.map((cat) => ({
      url: `${baseUrl}/home/${cat.slug}`,
      lastModified: cat.updatedAt ? new Date(cat.updatedAt) : new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    }));

    dynamicSubCategoryRoutes = subCategories.map((sub) => ({
      url: `${baseUrl}/home/${sub.slug}/${sub.id}`,
      lastModified: sub.updatedAt ? new Date(sub.updatedAt) : new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    }));
  } catch (error) {
    console.error("Error generating dynamic sitemap:", error);
  }

  return [...staticRoutes, ...dynamicCategoryRoutes, ...dynamicSubCategoryRoutes];
}
