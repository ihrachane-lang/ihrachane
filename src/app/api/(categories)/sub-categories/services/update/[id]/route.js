import dbConnect from "@/lib/mongodb";
import SubCategoryService from "@/models/SubCategoryService";
import { isAdminCheck } from "@/utils/isAdminCheck";
import { NextResponse } from "next/server";

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

    const { id } = await params; // ✅ destructure directly

    // console.log(id);
    const body = await request.json();
    const scs = await SubCategoryService.findById(id);
    // console.log(scs);
    const subCategoryService = await SubCategoryService.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    );
    // console.log(subCategoryService);
    if (!subCategoryService) {
      return NextResponse.json(
        { success: false, error: "Sub-Category Service not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Sub-Category Service updated successfully!",
      data: subCategoryService, // ✅ fixed
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
