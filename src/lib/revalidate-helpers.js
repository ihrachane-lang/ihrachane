import dbConnect from "@/lib/mongodb";
import SubCategory from "@/models/SubCategory";
import { revalidateSubCategories } from "@/lib/revalidate-public";

export async function revalidateForSubCategoryId(subCategoryId) {
  if (!subCategoryId) return;

  await dbConnect();
  const sub = await SubCategory.findById(subCategoryId).populate(
    "selectedCategory",
    "name"
  );

  if (!sub) return;

  revalidateSubCategories({
    subCategoryId: sub._id.toString(),
    categoryName: sub.selectedCategory?.name,
  });
}

export async function revalidateForSubCategoryDoc(subCategory) {
  if (!subCategory) return;

  await dbConnect();
  const sub = subCategory.selectedCategory?.name
    ? subCategory
    : await SubCategory.findById(subCategory._id).populate(
        "selectedCategory",
        "name"
      );

  if (!sub) return;

  revalidateSubCategories({
    subCategoryId: sub._id.toString(),
    categoryName: sub.selectedCategory?.name,
  });
}
