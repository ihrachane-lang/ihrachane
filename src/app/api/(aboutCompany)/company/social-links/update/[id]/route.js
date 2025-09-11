import dbConnect from "@/lib/mongodb";
import SocialLink from "@/models/SocialLink";
import { isAdminCheck } from "@/utils/isAdminCheck";
import { NextResponse } from "next/server";

// PUT update a socialLink
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
    const body = await request.json();
    const { id } = await params;
    const socialLink = await SocialLink.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!socialLink) {
      return NextResponse.json(
        { success: false, error: "Social Link not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: socialLink });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
