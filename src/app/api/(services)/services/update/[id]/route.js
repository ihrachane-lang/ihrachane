import dbConnect from "@/lib/mongodb";
import Service from "@/models/Service";
import { isAdminCheck } from "@/utils/isAdminCheck";
import { NextResponse } from "next/server";

// PUT update a service
export async function PUT(request, { params }) {
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
    const body = await request.json();
    const service = await Service.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!service) {
      return NextResponse.json(
        { success: false, error: "Service not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Service Update Successfully!",
      data: service,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
