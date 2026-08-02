import dbConnect from "@/lib/mongodb";
import Client from "@/models/Client";
import { isAdminCheck } from "@/utils/isAdminCheck";
import { NextResponse } from "next/server";
import { revalidateClients } from "@/lib/revalidate-public";

// DELETE a client
export async function DELETE(request, { params }) {
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
    const deletedClient = await Client.findByIdAndDelete(id);

    if (!deletedClient) {
      return NextResponse.json(
        { success: false, error: "Client not found" },
        { status: 404 }
      );
    }

    revalidateClients();

    return NextResponse.json({
      success: true,
      message: "Client Delete Successfully!",
      data: {},
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
