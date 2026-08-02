import dbConnect from "@/lib/mongodb";
import Category from "@/models/Category";

export default async function sitemap() {
  const baseUrl = "https://www.ihrachane.com";

  // Static routes
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

  // Dynamic Category / Solutions routes
  let dynamicCategoryRoutes = [];
  try {
    await dbConnect();
    const categories = await Category.find().select("name updatedAt").lean();

    dynamicCategoryRoutes = categories.map((cat) => {
      const slug = cat.name.toLowerCase().replace(/\s+/g, "-");
      return {
        url: `${baseUrl}/home/${slug}`,
        lastModified: cat.updatedAt ? new Date(cat.updatedAt) : new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
      };
    });
  } catch (error) {
    console.error("Error generating dynamic sitemap:", error);
  }

  return [...staticRoutes, ...dynamicCategoryRoutes];
}
