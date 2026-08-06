import { revalidateTag, revalidatePath } from "next/cache";
import { CACHE_TAGS } from "./cache-tags";
import { pingGoogleSitemap, warmupPublicRoute } from "./seo/seo-utils";
import { slugify } from "./slug";

export function sitemapChanged() {
  try {
    revalidatePath("/sitemap.xml");
    revalidatePath("/robots.txt");
  } catch (_err) {}
  pingGoogleSitemap();
}

export function revalidateHome() {
  revalidateTag(CACHE_TAGS.hero);
  revalidateTag(CACHE_TAGS.partners);
  revalidateTag(CACHE_TAGS.services);
  revalidateTag(CACHE_TAGS.testimonials);
  revalidateTag(CACHE_TAGS.clients);
  revalidatePath("/");
}

export function revalidateHomeHero() {
  revalidateTag(CACHE_TAGS.hero);
  revalidatePath("/");
  sitemapChanged();
}

export function revalidateServices() {
  revalidateTag(CACHE_TAGS.services);
  revalidatePath("/");
}

export function revalidatePartners() {
  revalidateTag(CACHE_TAGS.partners);
  revalidatePath("/");
  revalidatePath("/shipping-partners");
  sitemapChanged();
}

export function revalidateTestimonials() {
  revalidateTag(CACHE_TAGS.testimonials);
  revalidatePath("/");
}

export function revalidateClients() {
  revalidateTag(CACHE_TAGS.clients);
  revalidatePath("/");
}

export function revalidateCategories(categoryName) {
  revalidateTag(CACHE_TAGS.categories);
  revalidateTag(CACHE_TAGS.categoryNames);
  revalidatePath("/");
  revalidatePath("/shipping-partners");
  revalidatePath("/about-us");
  revalidatePath("/privacy");
  revalidatePath("/sitemap.xml");
  if (categoryName) {
    revalidatePath(`/${slugify(categoryName)}`);
  }
  sitemapChanged();
}

export function revalidateSubCategories({ subCategoryId, categoryName, subCategoryTitle } = {}) {
  revalidateTag(CACHE_TAGS.subCategories);
  revalidateTag(CACHE_TAGS.subCategoriesWithCategories);
  revalidateTag(CACHE_TAGS.subCategoryNames);
  revalidatePath("/");
  revalidatePath("/sitemap.xml");
  if (categoryName) {
    revalidatePath(`/${slugify(categoryName)}`);
  }
  if (categoryName && (subCategoryId || subCategoryTitle)) {
    const subSlug = subCategoryTitle ? slugify(subCategoryTitle) : subCategoryId;
    revalidatePath(`/${slugify(categoryName)}/${subSlug}`);
  }
  sitemapChanged();
}

export function revalidateSubCategoryServices({
  subCategoryId,
  categoryName,
  subCategoryTitle,
} = {}) {
  revalidateTag(CACHE_TAGS.subCategoryServices);
  revalidatePath("/");
  if (categoryName && (subCategoryId || subCategoryTitle)) {
    const subSlug = subCategoryTitle ? slugify(subCategoryTitle) : subCategoryId;
    revalidatePath(`/${slugify(categoryName)}/${subSlug}`);
  } else if (categoryName) {
    revalidatePath(`/${slugify(categoryName)}`);
  }
}

export async function revalidateForSubCategoryDoc(doc) {
  if (!doc) return;

  const subCat = await doc.populate?.("selectedCategory", "name slug");
  const selectedCategory = subCat?.selectedCategory || doc.selectedCategory;

  let categorySlugOrName = selectedCategory?.slug || selectedCategory?.name;
  const subCategoryId = doc._id?.toString();

  if (!categorySlugOrName) {
    revalidateSubCategories({ subCategoryId });
    return;
  }

  const safeCategoryName =
    typeof categorySlugOrName === "string" ? categorySlugOrName : "";

  const subCategoryTitle = doc?.title;
  const subCategorySlug = doc?.slug || (subCategoryTitle ? slugify(subCategoryTitle) : subCategoryId);

  revalidateSubCategories({
    subCategoryId,
    categoryName: safeCategoryName,
    subCategoryTitle,
  });
  revalidateSubCategoryServices({
    subCategoryId,
    categoryName: safeCategoryName,
    subCategoryTitle,
  });
  revalidateCategories(safeCategoryName);
  warmupPublicRoute(
    `/${safeCategoryName}`,
    `/${safeCategoryName}/${subCategorySlug}`
  );
}

export async function revalidateForSubCategoryId(subCategoryId) {
  if (!subCategoryId) return;
  try {
    const { default: SubCategory } = await import("@/models/SubCategory");
    const sub = await SubCategory.findById(subCategoryId).populate(
      "selectedCategory",
      "name slug"
    );
    await revalidateForSubCategoryDoc(sub);
  } catch (err) {
    revalidateSubCategories({ subCategoryId: subCategoryId.toString?.() });
  }
}

export function revalidateCompanyDetails() {
  revalidateTag(CACHE_TAGS.companyDetails);
  revalidatePath("/");
  revalidatePath("/shipping-partners");
  revalidatePath("/about-us");
  revalidatePath("/privacy");
  revalidatePath("/sitemap.xml");
}

export function revalidateSocialLinks() {
  revalidateTag(CACHE_TAGS.socialLinks);
  revalidatePath("/");
  revalidatePath("/shipping-partners");
  revalidatePath("/about-us");
  revalidatePath("/privacy");
}
