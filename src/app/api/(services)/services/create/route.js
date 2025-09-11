import dbConnect from "@/lib/mongodb";
import Service from "@/models/Service";
import { isAdminCheck } from "@/utils/isAdminCheck";
import { NextResponse } from "next/server";

// POST a new service
export async function POST(request) {
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
    const service = await Service.create(body);
    return NextResponse.json(
      { success: true, message: "Service Create Successfully!", data: service },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
