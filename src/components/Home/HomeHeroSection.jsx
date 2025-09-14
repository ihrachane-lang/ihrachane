import React from "react";
import Hero from "../shared/Hero";
import dbConnect from "@/lib/mongodb";
import HomeHero from "@/models/HomeHero";

const HomeHeroSection = async () => {
  await dbConnect();
  const data = await HomeHero.findOne().lean()
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
