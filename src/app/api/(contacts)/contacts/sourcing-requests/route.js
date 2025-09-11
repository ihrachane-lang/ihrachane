import { sourcingRequestFilterFields, sourcingRequestPopulateFields, sourcingRequestSearchableFields } from "@/constants/sourcingRequest.constant";
import dbConnect from "@/lib/mongodb";
import SourcingRequestForm from "@/models/SourcingRequestForm";
import { getPaginatedData } from "@/utils/getPaginatedData";
import { NextResponse } from "next/server";

// GET all requests
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
      SourcingRequestForm,
      query,
      sourcingRequestSearchableFields,
      sourcingRequestPopulateFields,
      sourcingRequestFilterFields
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
