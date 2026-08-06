import { unstable_cache } from "next/cache";
import dbConnect from "@/lib/mongodb";
import Category from "@/models/Category";
import SubCategory from "@/models/SubCategory";
import Testimonial from "@/models/Testimonial";
import Client from "@/models/Client";
import Partner from "@/models/Partner";
import Service from "@/models/Service";
import HomeHero from "@/models/HomeHero";
import CompanyDetails from "@/models/CompanyDetails";
import SocialLink from "@/models/SocialLink";
import {
  CACHE_TAGS,
  categoryTag,
  homeHeroTag,
  subCategoryTag,
} from "@/lib/cache-tags";
import { nameFromSlug, slugify } from "@/lib/slug";

async function fetchCategories() {
  await dbConnect();
  const docs = await Category.find({}, { name: 1, slug: 1, updatedAt: 1 }).lean();
  return docs.map((d) => ({ ...d, slug: d.slug || slugify(d.name) }));
}

async function fetchCategoryNames() {
  await dbConnect();
  const docs = await Category.find({}, { name: 1, slug: 1 }).lean();
  return docs.map((d) => ({ ...d, slug: d.slug || slugify(d.name) }));
}

async function fetchCategoryBySlug(slug) {
  await dbConnect();
  const cleanSlug = slugify(slug);

  let category = await Category.findOne({ slug: cleanSlug })
    .populate("subCategories")
    .lean();

  if (!category) {
    const namePattern = nameFromSlug(cleanSlug);
    const escaped = namePattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    category = await Category.findOne({
      name: { $regex: new RegExp(`^${escaped}$`, "i") },
    })
      .populate("subCategories")
      .lean();
  }

  if (category && !category.slug) {
    category.slug = slugify(category.name);
  }

  return category;
}

async function fetchSubCategoryById(id) {
  await dbConnect();
  return SubCategory.findById(id).populate("subCategoryServices").lean();
}

async function fetchSubCategoriesWithCategories() {
  await dbConnect();
  const subCategories = await SubCategory.find({}, { title: 1, slug: 1, selectedCategory: 1, updatedAt: 1 })
    .populate("selectedCategory", "name slug")
    .lean();

  return subCategories
    .filter((sub) => sub.selectedCategory?.name)
    .map((sub) => ({
      id: sub._id.toString(),
      subSlug: sub.slug || slugify(sub.title),
      categorySlug: sub.selectedCategory.slug || slugify(sub.selectedCategory.name),
      updatedAt: sub.updatedAt,
    }));
}

async function fetchSubCategoryBySlugs(categorySlug, subCategorySlug) {
  await dbConnect();
  const cleanCategorySlug = slugify(categorySlug);
  const cleanSubSlug = slugify(subCategorySlug);

  let category = await Category.findOne({ slug: cleanCategorySlug }, { _id: 1, slug: 1, name: 1 }).lean();

  if (!category) {
    const namePattern = nameFromSlug(cleanCategorySlug);
    const escaped = namePattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    category = await Category.findOne({
      name: { $regex: new RegExp(`^${escaped}$`, "i") },
    }, { _id: 1, slug: 1, name: 1 }).lean();
  }

  if (!category) return null;

  let subCategory = await SubCategory.findOne({
    selectedCategory: category._id,
    slug: cleanSubSlug,
  })
    .populate("subCategoryServices")
    .populate("selectedCategory", "name slug")
    .lean();

  if (!subCategory) {
    const subNamePattern = nameFromSlug(cleanSubSlug);
    const subEscaped = subNamePattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    subCategory = await SubCategory.findOne({
      selectedCategory: category._id,
      title: { $regex: new RegExp(`^${subEscaped}$`, "i") },
    })
      .populate("subCategoryServices")
      .populate("selectedCategory", "name slug")
      .lean();
  }

  if (subCategory && !subCategory.slug) {
    subCategory.slug = slugify(subCategory.title);
  }

  return subCategory;
}

async function fetchTestimonials() {
  await dbConnect();
  return Testimonial.find().lean();
}

async function fetchClients() {
  await dbConnect();
  return Client.find().lean();
}

async function fetchPartners() {
  await dbConnect();
  return Partner.find().lean();
}

async function fetchServices() {
  await dbConnect();
  return Service.find().lean();
}

async function fetchHomeHero(slug) {
  await dbConnect();
  return HomeHero.findOne({ slug }).lean();
}

async function fetchCompanyDetails() {
  await dbConnect();
  return CompanyDetails.findOne().lean();
}

async function fetchSocialLinks() {
  await dbConnect();
  return SocialLink.find().lean();
}

export const getCategories = unstable_cache(fetchCategories, ["categories"], {
  tags: [CACHE_TAGS.categories],
});

export const getCategoryNames = unstable_cache(fetchCategoryNames, ["category-names"], {
  tags: [CACHE_TAGS.categoryNames],
});

export function getCategoryBySlug(slug) {
  return unstable_cache(
    () => fetchCategoryBySlug(slug),
    [`category-by-slug-${slug}`],
    { tags: [CACHE_TAGS.categories, categoryTag(slug)] }
  )();
}

export function getSubCategoryById(id) {
  return unstable_cache(
    () => fetchSubCategoryById(id),
    [`sub-category-${id}`],
    { tags: [CACHE_TAGS.subCategories, subCategoryTag(id)] }
  )();
}

export const getSubCategoriesForSitemap = unstable_cache(
  fetchSubCategoriesWithCategories,
  ["sub-categories-sitemap"],
  { tags: [CACHE_TAGS.subCategories, CACHE_TAGS.categories] }
);

export function getSubCategoryBySlugs(categorySlug, subCategorySlug) {
  return unstable_cache(
    () => fetchSubCategoryBySlugs(categorySlug, subCategorySlug),
    [`subcategory-by-slugs-${categorySlug}-${subCategorySlug}`],
    {
      tags: [
        CACHE_TAGS.subCategories,
        CACHE_TAGS.categories,
        subCategoryTag(`${categorySlug}-${subCategorySlug}`),
        categoryTag(categorySlug),
      ],
    }
  )();
}

export const getTestimonials = unstable_cache(fetchTestimonials, ["testimonials"], {
  tags: [CACHE_TAGS.testimonials],
});

export const getClients = unstable_cache(fetchClients, ["clients"], {
  tags: [CACHE_TAGS.clients],
});

export const getPartners = unstable_cache(fetchPartners, ["partners"], {
  tags: [CACHE_TAGS.partners],
});

export const getServices = unstable_cache(fetchServices, ["services"], {
  tags: [CACHE_TAGS.services],
});

export function getHomeHero(slug) {
  return unstable_cache(
    () => fetchHomeHero(slug),
    [`home-hero-${slug}`],
    { tags: [CACHE_TAGS.homeHero, homeHeroTag(slug)] }
  )();
}

export const getCompanyDetails = unstable_cache(fetchCompanyDetails, ["company-details"], {
  tags: [CACHE_TAGS.companyDetails],
});

export const getSocialLinks = unstable_cache(fetchSocialLinks, ["social-links"], {
  tags: [CACHE_TAGS.socialLinks],
});
