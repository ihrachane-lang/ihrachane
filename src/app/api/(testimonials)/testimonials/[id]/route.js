import dbConnect from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";
import { NextResponse } from "next/server";

// GET a specific testimonial
export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const testimonial = await Testimonial.findById(id);

    if (!testimonial) {
      return NextResponse.json(
        {
          success: false,
          message: "Testimonial Retrieved Successfully!",
          error: "Testimonial not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: testimonial });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
