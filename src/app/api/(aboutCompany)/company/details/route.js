import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import CompanyDetails from "@/models/CompanyDetails";
import { isAdminCheck } from "@/utils/isAdminCheck";

// GET: Fetch company details (only one record)
export async function GET() {
  try {
    await dbConnect();
    const companyDetails = await CompanyDetails.findOne({});
    return NextResponse.json({ success: true, data: companyDetails || null });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST: Create or update company details
export async function POST(request) {
  try {
    await dbConnect();
    const isAdmin = await isAdminCheck();
    if (!isAdmin) {
      return NextResponse.json(
        {success: false, error: "Forbidden: Admin access only" },
        { status: 403 }
      );
    }
    const body = await request.json();

    // Check if a record already exists
    let companyDetails = await CompanyDetails.findOne({});

    if (companyDetails) {
      // Update the existing document
      companyDetails = await CompanyDetails.findByIdAndUpdate(
        companyDetails._id,
        { $set: body },
        { new: true, runValidators: true }
      );
    } else {
      // Create a new document (only once)
      companyDetails = await CompanyDetails.create(body);
    }

    return NextResponse.json({ success: true, data: companyDetails });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
