import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";
import { isAdminCheck } from "@/utils/isAdminCheck";
import { getServerUser } from "@/utils/getServerUser";
import { revalidateBlog } from "@/lib/revalidate-public";

export async function GET(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);

    const status = searchParams.get("status");
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const skip = (page - 1) * limit;

    const isAdmin = await isAdminCheck();

    const query = {};

    // Public users can only view published posts
    if (!isAdmin) {
      query.status = "published";
    } else if (status) {
      query.status = status;
    }

    if (category && category !== "All") {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { excerpt: { $regex: search, $options: "i" } },
        { "seo.keywords": { $regex: search, $options: "i" } },
      ];
    }

    const [posts, total] = await Promise.all([
      BlogPost.find(query)
        .sort({ publishedAt: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      BlogPost.countDocuments(query),
    ]);

    return NextResponse.json({
      success: true,
      data: posts,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("GET /api/blog error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

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

    const user = await getServerUser();
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

    if (!title || !excerpt || !content || !coverImage) {
      return NextResponse.json(
        {
          success: false,
          error: "Title, excerpt, content, and coverImage are required.",
        },
        { status: 400 }
      );
    }

    // Process keywords into an array if string provided
    const parsedKeywords = Array.isArray(keywords)
      ? keywords
      : typeof keywords === "string"
      ? keywords.split(",").map((k) => k.trim()).filter(Boolean)
      : [];

    // Process tags into an array if string provided
    const parsedTags = Array.isArray(tags)
      ? tags
      : typeof tags === "string"
      ? tags.split(",").map((t) => t.trim()).filter(Boolean)
      : [];

    const post = await BlogPost.create({
      title,
      excerpt,
      content,
      coverImage,
      category: category || "General",
      tags: parsedTags,
      author: user?._id || null,
      authorName: user?.name || "IHRACHANE Team",
      status: status || "draft",
      readTimeMinutes: Number(readTimeMinutes) || 5,
      seo: {
        metaTitle: metaTitle || title,
        metaDescription: metaDescription || excerpt,
        keywords: parsedKeywords,
        ogImage: ogImage || coverImage,
        canonicalUrl: canonicalUrl || "",
      },
    });

    revalidateBlog(post.slug);

    return NextResponse.json(
      {
        success: true,
        message: "Blog post created successfully!",
        data: post,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/blog error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
