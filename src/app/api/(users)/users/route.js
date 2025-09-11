import {
  userPopulateFields,
  userSearchableFields,
} from "@/constants/user.constant";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { getPaginatedData } from "@/utils/getPaginatedData";
import { isAdminCheck } from "@/utils/isAdminCheck";
import { NextResponse } from "next/server";

// GET all users
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
      User,
      query,
      userSearchableFields,
      userPopulateFields,
      userSearchableFields
    );

    const safeData = res.data.map((user) => {
      const { password, ...rest } = user._doc || user;
      return rest;
    });

    return NextResponse.json({
      success: true,
      message: "Users Retrieved Successfully!",
      meta: res.pagination,
      data: safeData,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
