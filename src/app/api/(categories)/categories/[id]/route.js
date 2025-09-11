import dbConnect from "@/lib/mongodb";
import Category from "@/models/Category";
import { NextResponse } from "next/server";

// GET a specific category
export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const category = await Category.findById(id)
      .populate("subCategories")
      .populate({
        path: "creatorInfo",
        select: "-password -email",
      });

    if (!category) {
      return NextResponse.json(
        { success: false, error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Category Retrieved Successfully!",
      data: category,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
