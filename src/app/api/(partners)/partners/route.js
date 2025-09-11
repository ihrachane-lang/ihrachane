import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Partner from "@/models/Partner";
import { getPaginatedData } from "@/utils/getPaginatedData";
import {
  partnerFilterFields,
  partnerPopulateFields,
  partnerSearchableFields,
} from "@/constants/partner.constant";

// GET all partners
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
      Partner,
      query,
      partnerSearchableFields,
      partnerPopulateFields,
      partnerFilterFields
    );
    return NextResponse.json({
      success: true,
      message: "Partners Retrieved Successfully!",
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
