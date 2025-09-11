import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { getServerUser } from "@/utils/getServerUser";
import { isAdminCheck } from "@/utils/isAdminCheck";

export async function POST(req, { params }) {
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

    // req body থেকে data নেওয়া
    const { currentPassword, newPassword } = await req.json();
    // console.log(newPassword);

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: "Current password & new password are required." },
        { status: 400 }
      );
    }

    // authenticated user পাওয়া
    const authUser = await getServerUser();
    if (!authUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (authUser.role !== "super_admin") {
      if (authUser.id.toString() !== id.toString()) {
        return NextResponse.json(
          { error: "You are not allowed to change another user's password." },
          { status: 403 }
        );
      }
    }

    // User DB থেকে খুঁজে আনা
    const user = await User.findById(id).select("+password");
    if (!user) {
      return NextResponse.json({ error: "User not found!!" }, { status: 404 });
    }

    // Current password check
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "current password is incorrect!!" },
        { status: 401 }
      );
    }

    // নতুন password hash করা
    const hashedPassword = await bcrypt.hash(
      newPassword,
      Number(process.env.HASH_SALT_ROUND)
    );
    user.password = hashedPassword;
    await user.save();

    return NextResponse.json(
      { message: "Password updated successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Change password error:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
