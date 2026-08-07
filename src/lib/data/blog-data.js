import { unstable_cache } from "next/cache";
import dbConnect from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";

function toPublicData(value) {
  return value == null ? value : JSON.parse(JSON.stringify(value));
}

async function fetchPublishedBlogPosts(category = null) {
  try {
    await dbConnect();
    const query = { status: "published" };
    if (category && category !== "All") {
      query.category = category;
    }
    const posts = await BlogPost.find(query)
      .sort({ publishedAt: -1, createdAt: -1 })
      .lean();
    return toPublicData(posts);
  } catch (error) {
    console.error("fetchPublishedBlogPosts error:", error);
    return [];
  }
}

async function fetchBlogPostBySlug(slug) {
  try {
    await dbConnect();
    const post = await BlogPost.findOne({ slug, status: "published" }).lean();
    return toPublicData(post);
  } catch (error) {
    console.error("fetchBlogPostBySlug error:", error);
    return null;
  }
}

async function fetchBlogPostSlugsForSitemap() {
  try {
    await dbConnect();
    const posts = await BlogPost.find(
      { status: "published" },
      { slug: 1, updatedAt: 1, publishedAt: 1 }
    ).lean();
    return toPublicData(posts);
  } catch (error) {
    console.error("fetchBlogPostSlugsForSitemap error:", error);
    return [];
  }
}

export const getPublishedBlogPosts = (category = null) => {
  return unstable_cache(
    () => fetchPublishedBlogPosts(category),
    [`published-blogs-${category || "all"}`],
    { revalidate: 3600, tags: ["blog-posts"] }
  )();
};

export const getBlogPostBySlug = (slug) => {
  return unstable_cache(
    () => fetchBlogPostBySlug(slug),
    [`blog-post-${slug}`],
    { revalidate: 3600, tags: ["blog-posts", `blog-${slug}`] }
  )();
};

export const getBlogPostSlugsForSitemap = unstable_cache(
  fetchBlogPostSlugsForSitemap,
  ["blog-sitemap-slugs"],
  { revalidate: 86400, tags: ["blog-posts"] }
);
