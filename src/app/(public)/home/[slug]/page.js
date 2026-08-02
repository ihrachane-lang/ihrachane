import Partners from "@/components/Home/partners/Partners";
import Wrapper from "@/components/shared/Wrapper";
import SourcingSection from "@/components/sourcing/SourcingSection";
import React from "react";
import dbConnect from "@/lib/mongodb";
import Category from "@/models/Category";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const formattedTitle = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  let categoryData = null;
  try {
    await dbConnect();
    categoryData = await Category.findOne({
      name: { $regex: new RegExp(`^${formattedTitle}$`, "i") },
    }).lean();
  } catch (e) {
    console.error("Error fetching metadata category:", e);
  }

  const title = categoryData?.mainBannerHeader
    ? `${categoryData.mainBannerHeader} | IHRACHANE`
    : `${formattedTitle} Sourcing Solutions | IHRACHANE`;

  const description = categoryData?.mainBannerDescription
    ? categoryData.mainBannerDescription
    : `Verified ${formattedTitle} procurement, supplier inspection, quality control, and shipping logistics by IHRACHANE. ${formattedTitle} tedarik ve lojistik çözümleri.`;

  return {
    title,
    description,
    keywords: [
      `${formattedTitle} sourcing`,
      `${formattedTitle} procurement`,
      `${formattedTitle} china suppliers`,
      "ihrachane",
      `${formattedTitle} tedarik`,
      `${formattedTitle} üretici bulma`,
      "ürün denetimi",
    ],
    alternates: {
      canonical: `https://www.ihrachane.com/home/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.ihrachane.com/home/${slug}`,
    },
  };
}

const page = async ({ params }) => {
  const { slug } = await params;
  return (
    <div>
      <Wrapper slug={slug} />
      <Partners/>
      <SourcingSection />
    </div>
  );
};

export default page;
