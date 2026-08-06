import dbConnect from "@/lib/mongodb";
import HomeHero from "@/models/HomeHero";
import { isAdminCheck } from "@/utils/isAdminCheck";
import { NextResponse } from "next/server";
import { revalidateHomeHero } from "@/lib/revalidate-public";

export async function POST(request) {
  try {
    await dbConnect();
    const isAdmin = await isAdminCheck();
    if (!isAdmin) {
      return NextResponse.json(
        { success: false, error: "Forbidden: Admin access only" },
        { status: 403 }
      );
    }

    const { slug, title, description, image } = await request.json();

    if (!slug || !title || !description || !image) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if post exists for this specific slug
    let post = await HomeHero.findOne({ slug });

    if (post) {
      // Update existing post for this slug
      post.title = title;
      post.description = description;
      post.image = image;

      await post.save();

      revalidateHomeHero(slug);

      return NextResponse.json(
        { message: "Post updated successfully", post },
        { status: 200 }
      );
    } else {
      // Create new post for this slug
      post = await HomeHero.create({ slug, title, description, image });
      revalidateHomeHero(slug);
      return NextResponse.json(
        { message: "Post created successfully", post },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
