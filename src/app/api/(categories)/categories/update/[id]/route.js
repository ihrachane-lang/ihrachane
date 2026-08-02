import dbConnect from "@/lib/mongodb";
import Category from "@/models/Category";
import { isAdminCheck } from "@/utils/isAdminCheck";
import { NextResponse } from "next/server";
import { revalidateCategories, revalidateSubCategories } from "@/lib/revalidate-public";
import { slugify } from "@/lib/slug";

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

    const body = await request.json();
    const { id } = await params;

    const category = await Category.findById(id);

    if (!category) {
      return NextResponse.json(
        { success: false, error: "Category not found" },
        { status: 404 }
      );
    }

    const previousName = category.name;
    const previousSlug = category.slug || slugify(previousName);
    const nameChanged = body.name && body.name !== previousName;

    Object.assign(category, body);
    await category.save();

    revalidateCategories(category.name);
    if (nameChanged && previousSlug !== (category.slug || slugify(category.name))) {
      revalidateCategories(previousName);
      if (category.subCategories?.length) {
        for (const subId of category.subCategories) {
          revalidateSubCategories({
            subCategoryId: subId.toString(),
            categoryName: previousName,
          });
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: "Category Successfully Updated!",
      data: category,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
