import dbConnect from "@/lib/mongodb";
import SocialLink from "@/models/SocialLink";
import { isAdminCheck } from "@/utils/isAdminCheck";
import { NextResponse } from "next/server";

// DELETE a Social Links
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
    const deletedSocialLink = await SocialLink.findByIdAndDelete(id);

    if (!deletedSocialLink) {
      return NextResponse.json(
        { success: false, error: "SocialLink not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: {} });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
