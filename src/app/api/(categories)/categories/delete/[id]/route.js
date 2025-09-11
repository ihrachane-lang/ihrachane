import dbConnect from "@/lib/mongodb";
import Category from "@/models/Category";
import { isAdminCheck } from "@/utils/isAdminCheck";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    const isAdmin = await isAdminCheck();
    if (!isAdmin) {
      return NextResponse.json(
        {success: false, error: "Forbidden: Admin access only" },
        { status: 403 }
      );
    }
    const { id } = await params;
    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return NextResponse.json(
        { success: false, error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Category Delete Successfully!",
      data: {},
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
