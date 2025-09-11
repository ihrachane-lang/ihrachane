import dbConnect from "@/lib/mongodb";
import Category from "@/models/Category";
import SubCategory from "@/models/SubCategory";
import { isAdminCheck } from "@/utils/isAdminCheck";
import { NextResponse } from "next/server";

export async function POST(request) {
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
    const { selectedCategory } = body;

    const category = await Category.findById(selectedCategory);
    if (!category) {
      return NextResponse.json(
        { success: false, error: "Category not found" },
        { status: 404 }
      );
    }

    const subCategory = await SubCategory.create(body);

    // More concise way to update the array
    category.subCategories = [
      ...(category.subCategories || []),
      subCategory._id,
    ];
    await category.save();

    return NextResponse.json(
      {
        success: true,
        message: "Sub-Category Created Successfully!",
        data: subCategory,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
