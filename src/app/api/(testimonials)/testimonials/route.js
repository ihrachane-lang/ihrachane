import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";
import { getPaginatedData } from "@/utils/getPaginatedData";
import {
  testimonialFilterFields,
  testimonialPopulateFields,
  testimonialSearchableFields,
} from "@/constants/testimonial.constant";

// GET all testimonials
export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const query = {
      page: searchParams.get("page"),
      limit: searchParams.get("limit"),
      sortField: searchParams.get("sortField"),
      sortOrder: searchParams.get("sortOrder"),
      search: searchParams.get("search"),
    };

    const res = await getPaginatedData(
      Testimonial,
      query,
      testimonialSearchableFields,
      testimonialPopulateFields,
      testimonialFilterFields
    );
    return NextResponse.json({
      success: true,
      message: "Testimonials Retrieved Successfully!",
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
