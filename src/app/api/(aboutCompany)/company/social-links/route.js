import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import SocialLink from "@/models/SocialLink";

// GET all Social Links
export async function GET() {
  try {
    await dbConnect();
    const socialLinks = await SocialLink.find({}).populate({
      path: "creatorInfo",
      select: "-password -email",
    });
    return NextResponse.json({ success: true, data: socialLinks });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
