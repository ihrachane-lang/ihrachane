import dbConnect from "@/lib/mongodb";
import ContactForm from "@/models/ContactForm";
import { NextResponse } from "next/server";

// POST a new message
export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const message = await ContactForm.create(body);
    return NextResponse.json(
      { success: true, message: "Message Sent Successfully!", data: message },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
