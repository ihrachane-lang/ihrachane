import dbConnect from "@/lib/mongodb";
import Partner from "@/models/Partner";
import { isAdminCheck } from "@/utils/isAdminCheck";
import { NextResponse } from "next/server";

// PUT update a partner
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
    const partner = await Partner.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!partner) {
      return NextResponse.json(
        { success: false, error: "Partner not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Partner Update Successfully!",
      data: partner,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
