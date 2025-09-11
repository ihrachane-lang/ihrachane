import dbConnect from "@/lib/mongodb";
import Client from "@/models/Client";
import { isAdminCheck } from "@/utils/isAdminCheck";
import { NextResponse } from "next/server";

// PUT update a client
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
    const body = await request.json();
    const { id } = await params;
    const client = await Client.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!client) {
      return NextResponse.json(
        { success: false, error: "Client not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Client Update Successfully!",
      data: client,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
