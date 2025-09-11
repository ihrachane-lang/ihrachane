import {
  serviceFilterFields,
  servicePopulateFields,
  serviceSearchableFields,
} from "@/constants/service.constant";
import dbConnect from "@/lib/mongodb";
import Service from "@/models/Service";
import { getPaginatedData } from "@/utils/getPaginatedData";
import { NextResponse } from "next/server";

// GET all services
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
      Service,
      query,
      serviceSearchableFields,
      servicePopulateFields,
      serviceFilterFields
    );
    return NextResponse.json({
      success: true,
      message: "Services Retrieved Successfully!",
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
