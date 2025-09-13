import React from "react";
import Hero from "../shared/Hero";
import dbConnect from "@/lib/mongodb";
import HomeHero from "@/models/HomeHero";

// 👇 Add this line
export const dynamic = "force-dynamic";

const HomeHeroSection = async () => {
  await dbConnect();
  const data = await HomeHero.findOne();
  return (
    <Hero
      img={data?.image}
      info={{
        span: data?.slug,
        title: data?.title,
        details: data?.description,
      }}
    />
  );
};

export default HomeHeroSection;
