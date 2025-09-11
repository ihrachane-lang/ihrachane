import dbConnect from "@/lib/mongodb";
import Service from "@/models/Service";
import { NextResponse } from "next/server";

// GET a specific service
export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const service = await Service.findById(id).populate({
      path: "creatorInfo",
      select: "-password -email",
    });

    if (!service) {
      return NextResponse.json(
        { success: false, error: "Service not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Service Retrieved Successfully!",
      data: service,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
