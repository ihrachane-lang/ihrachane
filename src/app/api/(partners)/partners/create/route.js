import dbConnect from "@/lib/mongodb";
import Partner from "@/models/Partner";
import { isAdminCheck } from "@/utils/isAdminCheck";
import { NextResponse } from "next/server";

// POST a new partner
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
    const partner = await Partner.create(body);
    return NextResponse.json(
      { success: true, message: "Partner Create Successfully!", data: partner },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
