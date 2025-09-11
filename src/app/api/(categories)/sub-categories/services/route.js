import {
  subCategoryServiceFilterFields,
  subCategoryServicePopulateFields,
  subCategoryServiceSearchableFields,
} from "@/constants/subCategoryService.constant";
import dbConnect from "@/lib/mongodb";
import SubCategoryService from "@/models/SubCategoryService";
import { getPaginatedData } from "@/utils/getPaginatedData";
import { NextResponse } from "next/server";

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
      SubCategoryService,
      query,
      subCategoryServiceSearchableFields,
      subCategoryServicePopulateFields,
      subCategoryServiceFilterFields
    );
    return NextResponse.json({
      success: true,
      message: "Sub-Category Services Retrieved Successfully!",
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
