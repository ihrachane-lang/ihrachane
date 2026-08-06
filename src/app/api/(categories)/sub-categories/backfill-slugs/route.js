import dbConnect from "@/lib/mongodb";
import SubCategory from "@/models/SubCategory";
import { NextResponse } from "next/server";
import { isAdminCheck } from "@/utils/isAdminCheck";
import { revalidateSubCategories, revalidateCategories, sitemapChanged } from "@/lib/revalidate-public";
import { slugify } from "@/lib/slug";

export async function POST() {
  try {
    await dbConnect();
    const isAdmin = await isAdminCheck();
    if (!isAdmin) {
      return NextResponse.json(
        { success: false, error: "Forbidden: Admin access only" },
        { status: 403 }
      );
    }

    const allSubs = await SubCategory.find({}, { title: 1, slug: 1, selectedCategory: 1 }).lean();

    const slugCounts = new Map();
    const updates = [];
    const skipped = [];
    let generated = 0;

    for (const sub of allSubs) {
      let currentSlug = sub.slug;
      const title = sub.title || "";

      if (!currentSlug) {
        currentSlug = slugify(title);
      }

      if (!currentSlug) {
        skipped.push({ id: sub._id.toString(), reason: "empty-title" });
        continue;
      }

      const compoundKey = `${sub.selectedCategory?.toString() || "none"}::${currentSlug}`;
      let counter = slugCounts.get(compoundKey) || 0;
      let finalSlug = currentSlug;

      while (slugCounts.has(`${sub.selectedCategory?.toString() || "none"}::${finalSlug}`)) {
        counter += 1;
        finalSlug = `${currentSlug}-${counter}`;
      }
      slugCounts.set(`${sub.selectedCategory?.toString() || "none"}::${finalSlug}`, counter);

      if (finalSlug !== sub.slug) {
        updates.push({
          updateOne: {
            filter: { _id: sub._id },
            update: { $set: { slug: finalSlug } },
          },
        });
        generated += 1;
      } else {
        slugCounts.set(compoundKey, counter);
      }
    }

    let result;
    if (updates.length > 0) {
      result = await SubCategory.bulkWrite(updates, { ordered: false });
    } else {
      result = { modifiedCount: 0 };
    }

    try {
      revalidateSubCategories({});
      revalidateCategories();
      sitemapChanged();
    } catch (_rErr) {
      // next revalidate helpers safe to ignore here
    }

    return NextResponse.json(
      {
        success: true,
        message: "SubCategory slug backfill complete",
        stats: {
          total: allSubs.length,
          generated,
          modifiedCount: result.modifiedCount,
          skipped: skipped.length,
          skippedDetails: skipped.slice(0, 10),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("SubCategory backfill error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
