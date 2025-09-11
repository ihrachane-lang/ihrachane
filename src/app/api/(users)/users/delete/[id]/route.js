import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { getServerUser } from "@/utils/getServerUser";
import { NextResponse } from "next/server";

// DELETE a user
export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const user = await getServerUser();
    const isUserExist = await User.findById(id);

    if (
      user?.role !== "admin" ||
      (user?.role === "admin" &&
        (isUserExist?.role === "super_admin" ||
          isUserExist?.role === "admin")) ||
      (user?.role === "super_admin" && isUserExist?.role === "super_admin")
    ) {
      return NextResponse.json(
        { success: false, error: "You are not authorized!" },
        { status: 401 }
      );
    }
    if (!isUserExist) {
      return NextResponse.json(
        { success: false, error: "user not found!!" },
        { status: 404 }
      );
    }
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return NextResponse.json(
        { success: false, error: "user not deleted!!" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "User Delete Successfully!",
      data: {},
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
