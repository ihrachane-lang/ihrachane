import dbConnect from "@/lib/mongodb";
import SubCategoryService from "@/models/SubCategoryService";
import { isAdminCheck } from "@/utils/isAdminCheck";
import { NextResponse } from "next/server";
import { revalidateForSubCategoryId } from "@/lib/revalidate-helpers";

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
    const subCategoryService = await SubCategoryService.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    );
    if (!subCategoryService) {
      return NextResponse.json(
        { success: false, error: "Sub-Category Service not found" },
        { status: 404 }
      );
    }

    await revalidateForSubCategoryId(subCategoryService.selectedSubCategory);

    return NextResponse.json({
      success: true,
      message: "Sub-Category Service updated successfully!",
      data: subCategoryService,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
