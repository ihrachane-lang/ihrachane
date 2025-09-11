import dbConnect from "@/lib/mongodb";
import SourcingRequestForm from "@/models/SourcingRequestForm";
import { NextResponse } from "next/server";

// DELETE a request
export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const deletedRequest = await SourcingRequestForm.findByIdAndDelete(id);

    if (!deletedRequest) {
      return NextResponse.json(
        { success: false, error: "Request not found!" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Request Delete Successfully!",
      data: {},
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
