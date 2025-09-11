import { NextResponse } from "next/server";
import { sendEmail } from "@/utils/sendEmail";
import User from "@/models/User";
import dbConnect from "@/lib/mongodb";

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
    let responseMessage = "Failed to send OTP!";

    if (typeof emailResponse == "object" && emailResponse.success) {
      responseMessage = emailResponse?.message;

      return NextResponse.json(
        {
          message: responseMessage,
          email,
          status: 200,
        },
        { status: 201 }
      );
    }
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
