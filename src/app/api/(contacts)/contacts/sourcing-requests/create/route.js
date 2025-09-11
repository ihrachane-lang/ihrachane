import dbConnect from "@/lib/mongodb";
import SourcingRequestForm from "@/models/SourcingRequestForm";
import { NextResponse } from "next/server";

// POST a new request
export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    // console.log(body);
    const req = await SourcingRequestForm.create(body);
    return NextResponse.json(
      { success: true, message: "Request Sent Successfully!", data: req },
      { status: 201 }
    );
  } catch (error) {
    // console.log(error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
