import dbConnect from "@/lib/mongodb";
import Category from "@/models/Category";
import { NextResponse } from "next/server";
import { uploadToCloudinary } from "@/utils/uploadToCloudinary";
import { isAdminCheck } from "@/utils/isAdminCheck";
import { revalidateCategories } from "@/lib/revalidate-public";
import { warmupPublicRoute } from "@/lib/seo/seo-utils";
import { slugify } from "@/lib/slug";

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

    const data = await request.formData();

    const name = data.get("name");
    const contentTitle = data.get("contentTitle");
    const mainBannerSpan = data.get("mainBannerSpan");
    const mainBannerHeader = data.get("mainBannerHeader");
    const mainBannerDescription = data.get("mainBannerDescription");
    const creatorInfo = data.get("creatorInfo");

    const bannerImgFile = data.get("bannerImg");
    const contentSideImgFile = data.get("contentSideImg");

    const bannerResult = await uploadToCloudinary(bannerImgFile, "categories");
    const contentSideResult = await uploadToCloudinary(
      contentSideImgFile,
      "categories"
    );

    const category = await Category.create({
      name,
      bannerImg: bannerResult?.secure_url || "",
      contentSideImg: contentSideResult?.secure_url || "",
      contentTitle,
      mainBannerSpan,
      mainBannerHeader,
      mainBannerDescription,
      creatorInfo,
    });

    revalidateCategories(category.name);
    warmupPublicRoute(`/${category.slug || slugify(category.name)}`);

    return NextResponse.json(
      {
        success: true,
        message: "Category Created Successfully!",
        data: category,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
