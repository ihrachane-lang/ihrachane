import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { getServerUser } from "@/utils/getServerUser";
import { isAdminCheck } from "@/utils/isAdminCheck";

export async function PUT(req, { params }) {
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
    const authUser = await getServerUser();

    if (!authUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if authUser is updating their own account (or allow admin if needed)
    if (authUser.role !== "super_admin") {
      if (authUser.id.toString() !== id.toString()) {
        return NextResponse.json(
          { error: "You are not allowed to change another user's password." },
          { status: 403 }
        );
      }
    }

    const body = await req.json();

    // ❌ Remove password and role fields if provided
    const { password, role, ...updateData } = body;

    // Update user without password & role
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select("-password -role");

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: "User updated successfully",
        data: updatedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("User update error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
