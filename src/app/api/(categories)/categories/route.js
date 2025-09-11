import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Category from "@/models/Category";

export async function GET() {
  try {
    await dbConnect();
    const categories = await Category.find().populate({
      path: "creatorInfo",
      select: "-password -email",
    });
    return NextResponse.json({
      success: true,
      message: "All Category Data Retrieved Successfully!",
      data: categories,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
