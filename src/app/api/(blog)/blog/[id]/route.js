import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";
import { isAdminCheck } from "@/utils/isAdminCheck";
import { isValidObjectId } from "mongoose";
import { revalidateBlog } from "@/lib/revalidate-public";

export async function GET(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;

    const isAdmin = await isAdminCheck();

    let post = null;
    if (isValidObjectId(id)) {
      post = await BlogPost.findById(id).lean();
    } else {
      post = await BlogPost.findOne({ slug: id }).lean();
    }

    if (!post) {
      return NextResponse.json(
        { success: false, error: "Blog post not found" },
        { status: 404 }
      );
    }

    if (post.status !== "published" && !isAdmin) {
      return NextResponse.json(
        { success: false, error: "Post is not published" },
        { status: 403 }
      );
    }

    // Increment view count asynchronously for published posts in non-admin visits
    if (post.status === "published" && !isAdmin) {
      BlogPost.findByIdAndUpdate(post._id, { $inc: { viewsCount: 1 } }).catch(
        () => {}
      );
    }

    return NextResponse.json({
      success: true,
      data: post,
    });
  } catch (error) {
    console.error("GET /api/blog/[id] error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

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

    const { id } = await params;
    const body = await request.json();

    const {
      title,
      excerpt,
      content,
      coverImage,
      category,
      tags,
      status,
      readTimeMinutes,
      metaTitle,
      metaDescription,
      keywords,
      ogImage,
      canonicalUrl,
    } = body;

    const parsedKeywords = Array.isArray(keywords)
      ? keywords
      : typeof keywords === "string"
      ? keywords.split(",").map((k) => k.trim()).filter(Boolean)
      : [];

    const parsedTags = Array.isArray(tags)
      ? tags
      : typeof tags === "string"
      ? tags.split(",").map((t) => t.trim()).filter(Boolean)
      : [];

    const updateFields = {
      ...(title && { title }),
      ...(excerpt && { excerpt }),
      ...(content && { content }),
      ...(coverImage && { coverImage }),
      ...(category && { category }),
      tags: parsedTags,
      ...(status && { status }),
      readTimeMinutes: Number(readTimeMinutes) || 5,
      seo: {
        metaTitle: metaTitle || title,
        metaDescription: metaDescription || excerpt,
        keywords: parsedKeywords,
        ogImage: ogImage || coverImage,
        canonicalUrl: canonicalUrl || "",
      },
    };

    if (status === "published") {
      const existing = await BlogPost.findById(id);
      if (existing && !existing.publishedAt) {
        updateFields.publishedAt = new Date();
      }
    }

    const updatedPost = await BlogPost.findByIdAndUpdate(id, updateFields, {
      new: true,
      runValidators: true,
    });

    if (!updatedPost) {
      return NextResponse.json(
        { success: false, error: "Blog post not found" },
        { status: 404 }
      );
    }

    revalidateBlog(updatedPost.slug);

    return NextResponse.json({
      success: true,
      message: "Blog post updated successfully!",
      data: updatedPost,
    });
  } catch (error) {
    console.error("PUT /api/blog/[id] error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

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
    const deletedPost = await BlogPost.findByIdAndDelete(id);

    if (!deletedPost) {
      return NextResponse.json(
        { success: false, error: "Blog post not found" },
        { status: 404 }
      );
    }

    revalidateBlog(deletedPost.slug);

    return NextResponse.json({
      success: true,
      message: "Blog post deleted successfully!",
    });
  } catch (error) {
    console.error("DELETE /api/blog/[id] error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

