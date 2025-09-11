import dbConnect from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";
import { isAdminCheck } from "@/utils/isAdminCheck";
import { NextResponse } from "next/server";

// PUT update a testimonial
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
    const testimonial = await Testimonial.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!testimonial) {
      return NextResponse.json(
        { success: false, error: "Testimonial not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Testimonial Update Successfully!",
      data: testimonial,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
