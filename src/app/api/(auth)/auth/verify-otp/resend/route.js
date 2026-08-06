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
    const { email } = await request.json();

    // Validate required fields
    if (!email) {
      return NextResponse.json(
        { message: "Email is required!", status: 400 },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "User does not exist!", status: 404 },
        { status: 404 }
      );
    }
    if (user.verified) {
      return NextResponse.json(
        { error: "User is already verified. Please Login!" },
        { status: 400 }
      );
    }

    // Send OTP email again
    const emailResponse = await sendEmail(
      user?.name || "Sir/Madam",
      email,
      "verify-email"
    );

    if (!emailResponse.success) {
      return NextResponse.json(
        { message: emailResponse.message || "Failed to re-send OTP." },
        { status: 502 }
      );
    }

    return NextResponse.json(
      {
        message: emailResponse.message || "OTP re-send successfully!",
        status: 200,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Resend OTP error:", err);
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
