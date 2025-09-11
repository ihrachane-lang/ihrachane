import { NextResponse } from "next/server";
import Client from "@/models/Client";
import dbConnect from "@/lib/mongodb";

// GET a specific client
export async function GET(request, { params }) {
  try {
    await dbConnect();
    const {id} = await params;
     const client = await Client.findById(id);

    if (!client) {
      return NextResponse.json(
        { success: false, error: "Client not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Client Retrieved Successfully!",
      data: client,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
