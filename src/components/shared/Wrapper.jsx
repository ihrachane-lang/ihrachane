"use client";

import { useEffect, useState } from "react";
import Hero from "./Hero";
import HeroSkeleton from "./HeroSkeleton";
import Breadcrumbs from "./Breadcrumbs";
import Service from "../sourcing/Service";
import { getData } from "@/utils/axiosPublic";

const Wrapper = ({ slug }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const { data } = await getData(`/api/categories/by-name/${slug}`);
        setData(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [slug]);

  const categoryName =
    data?.mainBannerHeader ||
    slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  if (loading) {
    return (
      <>
        <HeroSkeleton />
      </>
    );
  }

  return (
    <>
      <Hero
        img={data?.bannerImg}
        info={{
          span: data?.mainBannerSpan,
          title: data?.mainBannerHeader,
          details: data?.mainBannerDescription,
        }}
        secondaryHref="#categories"
        secondaryLabel="Browse Categories"
      />
      <div className="border-b border-orange-100/60 bg-white/90 backdrop-blur-sm">
        <Breadcrumbs items={[{ label: categoryName }]} />
      </div>
      {data?.subCategories?.length > 0 && (
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
