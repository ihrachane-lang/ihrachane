import {
  subCategoryFilterFields,
  subCategoryPopulateFields,
  subCategorySearchableFields,
} from "@/constants/subCategory.constant";
import dbConnect from "@/lib/mongodb";
import SubCategory from "@/models/SubCategory";
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
      SubCategory,
      query,
      subCategorySearchableFields,
      subCategoryPopulateFields,
      subCategoryFilterFields
    );
    return NextResponse.json({
      success: true,
      message: "All Sub-Category Data Retrieved Successfully!",
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
