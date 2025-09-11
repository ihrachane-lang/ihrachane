import dbConnect from "@/lib/mongodb";
import Partner from "@/models/Partner";
import { isAdminCheck } from "@/utils/isAdminCheck";
import { NextResponse } from "next/server";

// DELETE a partner
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
    const deletedPartner = await Partner.findByIdAndDelete(id);

    if (!deletedPartner) {
      return NextResponse.json(
        { success: false, error: "Partner not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Partner Delete Successfully!",
      data: {},
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
