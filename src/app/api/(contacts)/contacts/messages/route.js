import {
  contactFormFilterFields,
  contactFormPopulateFields,
  contactFormSearchableFields,
} from "@/constants/contactForm.constant";
import dbConnect from "@/lib/mongodb";
import ContactForm from "@/models/ContactForm";
import { getPaginatedData } from "@/utils/getPaginatedData";
import { isAdminCheck } from "@/utils/isAdminCheck";
import { NextResponse } from "next/server";

// GET all messages
export async function GET(req) {
  try {
    await dbConnect();
    const isAdmin = await isAdminCheck();
    if (!isAdmin) {
      return NextResponse.json(
        { success: false, error: "Forbidden: Admin access only" },
        { status: 403 }
      );
    }
    const { searchParams } = new URL(req.url);
    const query = {
      page: searchParams.get("page"),
      limit: searchParams.get("limit"),
      sortField: searchParams.get("sortField"),
      sortOrder: searchParams.get("sortOrder"),
      search: searchParams.get("search"),
    };

    const res = await getPaginatedData(
      ContactForm,
      query,
      contactFormSearchableFields,
      contactFormPopulateFields,
      contactFormFilterFields
    );
    return NextResponse.json({
      success: true,
      message: "Messages Retrieved Successfully!",
      meta: res.pagination,
      data: res.data,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
