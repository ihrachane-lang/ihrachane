"use client";
import Hero from "../shared/Hero";
import { useEffect, useState } from "react";

const HomeHeroSection = () => {
  const [data, setData] = useState({});
  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/home/hero");
      const result = await res.json();
      setData(result);
    }
    fetchData();
  }, []);
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
