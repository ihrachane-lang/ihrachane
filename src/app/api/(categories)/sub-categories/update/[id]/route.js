import dbConnect from "@/lib/mongodb";
import SubCategory from "@/models/SubCategory";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await request.json();
    const subCategory = await SubCategory.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!subCategory) {
      return NextResponse.json(
        { success: false, error: "Sub-Category not found" },
        { status: 404 }
      );
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
