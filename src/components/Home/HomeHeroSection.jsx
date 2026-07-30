import React from "react";
import Hero from "../shared/Hero";
import dbConnect from "@/lib/mongodb";
import HomeHero from "@/models/HomeHero";

const HomeHeroSection = async ({ slug = "home" }) => {
  await dbConnect();
  const data = await HomeHero.findOne({ slug }).lean();
  return (
    <Hero
      img={data?.image}
      info={{
        span: data?.slug || slug,
        title: data?.title,
        details: data?.description,
      }}
    />
  );
};

export default HomeHeroSection;
