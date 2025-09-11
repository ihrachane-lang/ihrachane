import dbConnect from "@/lib/mongodb";
import Category from "@/models/Category";
import { NextResponse } from "next/server";

// GET a specific category
export async function GET(request, { params }) {
  try {
    // Await the params first
    const { name } = await params;
    await dbConnect();

    const categoryName = decodeURIComponent(name);

    const category = await Category.findOne({
      name: { $regex: new RegExp(`^${categoryName}$`, "i") },
    }).populate("subCategories");

    if (!category) {
      return NextResponse.json(
        {
          success: false,
          message: "Category Retrieved Successfully!",
          error: "Category not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: category });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
