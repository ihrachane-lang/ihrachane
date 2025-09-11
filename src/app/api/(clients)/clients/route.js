import {
  clientFilterFields,
  clientPopulateFields,
  clientSearchableFields,
} from "@/constants/client.constant";
import dbConnect from "@/lib/mongodb";
import Client from "@/models/Client";
import { getPaginatedData } from "@/utils/getPaginatedData";
import { NextResponse } from "next/server";

// GET all clients
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
      Client,
      query,
      clientSearchableFields,
      clientPopulateFields,
      clientFilterFields
    );
    return NextResponse.json({
      success: true,
      message: "Clients Retrieved Successfully!",
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
