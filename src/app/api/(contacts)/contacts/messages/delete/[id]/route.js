import dbConnect from "@/lib/mongodb";
import ContactForm from "@/models/ContactForm";
import { isAdminCheck } from "@/utils/isAdminCheck";
import { NextResponse } from "next/server";

// DELETE a message
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
    const deletedMessage = await ContactForm.findByIdAndDelete(id);

    if (!deletedMessage) {
      return NextResponse.json(
        { success: false, error: "Message not found!" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Message Delete Successfully!",
      data: {},
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
