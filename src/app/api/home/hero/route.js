import dbConnect from "@/lib/mongodb";
import HomeHero from "@/models/HomeHero";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug") || "home";

    const post = await HomeHero.findOne({ slug });

    if (!post) {
      return NextResponse.json({ message: "No post found" }, { status: 404 });
    }

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
