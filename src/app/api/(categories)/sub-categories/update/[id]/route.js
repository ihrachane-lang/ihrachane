import dbConnect from "@/lib/mongodb";
import SubCategory from "@/models/SubCategory";
import Category from "@/models/Category";
import { isAdminCheck } from "@/utils/isAdminCheck";
import { NextResponse } from "next/server";
import { revalidateForSubCategoryDoc } from "@/lib/revalidate-helpers";

export async function PUT(request, { params }) {
  try {
    await dbConnect();
    const isAdmin = await isAdminCheck();
    if (!isAdmin) {
      return NextResponse.json(
        { success: false, error: "Forbidden: Admin access only" },
        { status: 403 }
      );
    }

    const { id } = await params;
    const body = await request.json();

    const subCategory = await SubCategory.findById(id).populate(
      "selectedCategory",
      "name slug"
    );

    if (!subCategory) {
      return NextResponse.json(
        { success: false, error: "Sub-Category not found" },
        { status: 404 }
      );
    }

    const previousTitle = subCategory.title;
    const previousCategoryId = subCategory.selectedCategory?._id?.toString
      ? subCategory.selectedCategory._id.toString()
      : subCategory.selectedCategory?.toString?.();
    const newCategoryId = body.selectedCategory?.toString
      ? body.selectedCategory.toString()
      : body.selectedCategory;
    const categoryChanged =
      newCategoryId && newCategoryId !== previousCategoryId;
    const titleChanged = body.title && body.title !== previousTitle;

    Object.assign(subCategory, body);
    await subCategory.save();

    if (categoryChanged && previousCategoryId) {
      const prevCategory = await Category.findById(previousCategoryId);
      if (prevCategory) {
        prevCategory.subCategories = (
          prevCategory.subCategories || []
        ).filter((sid) => sid.toString() !== id);
        await prevCategory.save();
      }
      const nextCategory = await Category.findById(newCategoryId);
      if (nextCategory) {
        const already = (nextCategory.subCategories || []).some(
          (sid) => sid.toString() === id
        );
        if (!already) {
          nextCategory.subCategories = [
            ...(nextCategory.subCategories || []),
            subCategory._id,
          ];
          await nextCategory.save();
        }
      }
    }

    await revalidateForSubCategoryDoc(subCategory);
    if ((categoryChanged || titleChanged) && previousCategoryId) {
      try {
        const { revalidateSubCategories } = await import(
          "@/lib/revalidate-public"
        );
        const prevCat = await Category.findById(previousCategoryId).select(
          "name slug"
        );
        if (prevCat) {
          revalidateSubCategories({
            subCategoryId: id,
            categoryName: prevCat.slug || prevCat.name,
          });
        }
      } catch (_err) {}
    }

    return NextResponse.json({
      success: true,
      message: "Sub-Category Update Successfully!",
      data: subCategory,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
