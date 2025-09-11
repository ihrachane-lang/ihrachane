import { NextResponse } from "next/server";
import Partner from "@/models/Partner";
import dbConnect from "@/lib/mongodb";

// GET a specific partner
export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const partner = await Partner.findById(id).populate({
      path: "creatorInfo",
      select: "-password -email",
    });

    if (!partner) {
      return NextResponse.json(
        { success: false, error: "Partner not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Partner Retrieved Successfully!",
      data: partner,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
