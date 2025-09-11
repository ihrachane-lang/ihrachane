import dbConnect from "@/lib/mongodb";
import SubCategoryService from "@/models/SubCategoryService";
import { isAdminCheck } from "@/utils/isAdminCheck";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
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
    const deletedSubCategoryService =
      await SubCategoryService.findByIdAndDelete(id);

    if (!deletedSubCategoryService) {
      return NextResponse.json(
        { success: false, error: "Sub Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Sub-Category Service Delete Successfully!",
      data: {},
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
