import { NextResponse } from "next/server";
import { sendEmail } from "@/utils/sendEmail";
import User from "@/models/User";
import dbConnect from "@/lib/mongodb";

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
    const userIsExist = await User.findOne({ email });
    if (!userIsExist) {
      return NextResponse.json(
        { message: "User does not exist!", status: 404 },
        { status: 404 }
      );
    }

    const isAdmin =
      userIsExist.role === "admin" || userIsExist.role === "super_admin";

    if (!isAdmin) {
      return NextResponse.json(
        { success: false, error: "Forbidden: admin can only reset password!" },
        { status: 403 }
      );
    }

    // Send OTP email again
    const emailResponse = await sendEmail(
      userIsExist?.name || "Sir/Madam",
      email,
      "reset-password"
    );

    let hashedEmail = "";
    let responseMessage = "Failed to send OTP!";

    if (typeof emailResponse === "object" && emailResponse.success) {
      responseMessage = emailResponse?.message || "OTP sent successfully!";
      hashedEmail = emailResponse?.hashedEmail || "";
    }

    return NextResponse.json(
      {
        message: responseMessage,
        hashedEmail,
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
