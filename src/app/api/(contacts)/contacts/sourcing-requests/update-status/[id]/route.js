import dbConnect from "@/lib/mongodb";
import SourcingRequestForm from "@/models/SourcingRequestForm";
import { NextResponse } from "next/server";

// PUT update a client
export async function PUT(request, { params }) {
  try {
    await dbConnect();
    const body = await request.json();
    const { status } = body;
    const { id } = await params;
    const client = await SourcingRequestForm.findByIdAndUpdate(
      id,
      { "productRequirements.status": status },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!client) {
      return NextResponse.json(
        { success: false, error: "Client not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Client Update Successfully!",
      data: client,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
