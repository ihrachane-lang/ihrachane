import dbConnect from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";
import { isAdminCheck } from "@/utils/isAdminCheck";
import { NextResponse } from "next/server";

// POST a new testimonial
export async function POST(request) {
  try {
    await dbConnect();
    const isAdmin = await isAdminCheck();
    if (!isAdmin) {
      return NextResponse.json(
        { success: false, error: "Forbidden: Admin access only" },
        { status: 403 }
      );
    }
    const body = await request.json();
    const testimonial = await Testimonial.create(body);
    return NextResponse.json(
      {
        success: true,
        message: "Testimonial Create Successfully!",
        data: testimonial,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
