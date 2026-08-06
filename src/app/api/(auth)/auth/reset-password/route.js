import { NextResponse } from "next/server";
import { sendEmail } from "@/utils/sendEmail";
import User from "@/models/User";
import dbConnect from "@/lib/mongodb";

export const runtime = "nodejs";
export const maxDuration = 30;

export const POST = async (request) => {
  try {
    await dbConnect();

    // Parse the request body
    const userInfo = await request.json();
    const { email } = userInfo;

    // Validate required fields
    if (!email) {
      return NextResponse.json({
        message: "Email is required!",
        status: 400,
      });
    }

    // Check if user already exists
    const userIsExist = await User.findOne({ email });
    if (!userIsExist) {
      return NextResponse.json({
        message: "User does not exist!",
        status: 400,
      });
    }

    const isAdmin =
      userIsExist.role === "admin" || userIsExist.role === "super_admin";

    if (!isAdmin) {
      return NextResponse.json(
        { success: false, error: "Forbidden: admin can only reset password!" },
        { status: 403 }
      );
    }
    // Send verification email
    const emailResponse = await sendEmail(
      userIsExist?.name || "Sir/Madam",
      email,
      "reset-password"
    );
    if (!emailResponse.success) {
      return NextResponse.json(
        { message: emailResponse.message || "Failed to send OTP." },
        { status: 502 }
      );
    }

    return NextResponse.json(
      { message: emailResponse.message, email, status: 200 },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        message:
          err instanceof Error ? err.message : "An unknown error occurred",
        status: 500,
      },
      { status: 500 }
    );
  }
};
