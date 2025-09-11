import dbConnect from "@/lib/mongodb";
import SubCategoryService from "@/models/SubCategoryService";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const subCategoryService = await SubCategoryService.findById(id).populate(
      "selectedSubCategory"
    );

    if (!subCategoryService) {
      return NextResponse.json(
        { success: false, error: "Sub-Category Service not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Sub-Category Service Retrieved Successfully!",
      data: subCategoryService,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
