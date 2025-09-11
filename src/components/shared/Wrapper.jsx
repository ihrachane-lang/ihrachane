"use client";

import { useEffect, useState } from "react";
import Hero from "./Hero";
import Service from "../sourcing/Service";
import { getData } from "@/utils/axiosPublic";

const Wrapper = ({ slug }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data } = await getData(`/api/categories/by-name/${slug}`);
      setData(data);
    }
    fetchData();
  }, [slug]);

  return (
    <>
      <Hero
        img={data?.bannerImg}
        info={{
          span: data?.mainBannerSpan,
          title: data?.mainBannerHeader,
          details: data?.mainBannerDescription,
        }}
      />
      {data?.subCategories?.length && (
        <Service
          subCategories={data?.subCategories}
          contentSideImg={data?.contentSideImg}
          slug={slug}
        />
      )}
    </>
  );
};

export default Wrapper;
