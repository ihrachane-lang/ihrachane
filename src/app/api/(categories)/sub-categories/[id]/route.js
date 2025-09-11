import dbConnect from "@/lib/mongodb";
import SubCategory from "@/models/SubCategory";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const subCategory = await SubCategory.findById(id)
      .populate("subCategoryServices")
      .populate({
        path: "creatorInfo",
        select: "-password -email",
      });

    if (!subCategory) {
      return NextResponse.json(
        { success: false, error: "Sub-Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Sub-Category Retrieved Successfully!",
      data: subCategory,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
