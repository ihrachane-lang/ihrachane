import dbConnect from "@/lib/mongodb";
import SubCategory from "@/models/SubCategory";
import SubCategoryService from "@/models/SubCategoryService";
import { isAdminCheck } from "@/utils/isAdminCheck";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await dbConnect();
        const isAdmin = await isAdminCheck();
        if (!isAdmin) {
          return NextResponse.json(
            {success: false, error: "Forbidden: Admin access only" },
            { status: 403 }
          );
        }
    const body = await request.json();
    const { selectedSubCategory } = body;

    const subCategory = await SubCategory.findById(selectedSubCategory);

    if (!subCategory) {
      return NextResponse.json(
        { success: false, error: "Category not found" },
        { status: 404 }
      );
    }

    const subCategoryService = await SubCategoryService.create(body);

    // More concise way to update the array
    subCategory.subCategoryServices = [
      ...(subCategory.subCategoryServices || []),
      subCategoryService._id,
    ];
    await subCategory.save();

    return NextResponse.json(
      { success: true,
      message: "Sub-Category Service Created Successfully!", data: subCategory },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
