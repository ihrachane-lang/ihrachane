import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { getServerUser } from "@/utils/getServerUser";
import { NextResponse } from "next/server";

// PUT update a user role
export async function PUT(request, { params }) {
  try {
    await dbConnect();
    const { role } = await request.json();
    const { id } = await params;

    const user = await getServerUser();
    if (!user) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const isUserExist = await User.findById(id);

    if (!isUserExist) {
      return NextResponse.json(
        { success: false, error: "User not found!" },
        { status: 404 }
      );
    }

    // ✅ Authorization checks
    if (
      user.role !== "admin" ||
      (user.role === "admin" &&
        (isUserExist.role === "super_admin" ||
          role === "super_admin" ||
          role === "user"))
    ) {
      throw new Error("You are not authorized!");
    }

    if (role === "admin" && user.id.toString() === id) {
      throw new Error("You can't change your own role!");
    }

    // ✅ Update role
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, error: "User role not updated!" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "User role updated successfully!",
      data: updatedUser,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
