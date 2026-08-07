import { NextResponse } from "next/server";
import { uploadToCloudinary } from "@/utils/uploadToCloudinary";
import { isAdminCheck } from "@/utils/isAdminCheck";

export async function POST(request) {
  try {
    const isAdmin = await isAdminCheck();
    if (!isAdmin) {
      return NextResponse.json(
        { success: false, error: "Forbidden: Admin access only" },
        { status: 403 }
      );
    }

    const data = await request.formData();
    const file = data.get("file");

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 }
      );
    }

    const result = await uploadToCloudinary(file, "blog");

    return NextResponse.json({
      success: true,
      url: result?.secure_url || "",
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
