"use client";

import { getData } from "@/utils/axiosPublic";
import { useEffect, useState } from "react";
import Hero from "./Hero";
import HeroSkeleton from "./HeroSkeleton";
import Breadcrumbs from "./Breadcrumbs";
import SubService from "./SubServices";

const SubWrapper = ({ id, slug }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const { data } = await getData(`/api/sub-categories/${id}`);
        setData(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  if (loading) {
    return <HeroSkeleton />;
  }

  const breadcrumbItems = [];
  if (slug) {
    breadcrumbItems.push({
      label: slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      href: `/home/${slug}`,
    });
  }
  if (data?.title) {
    breadcrumbItems.push({ label: data.title });
  }

  return (
    <>
      <Hero
        img={data?.bannerImg}
        info={{
          span: data?.span || undefined,
          title: data?.title || undefined,
          details: data?.description || undefined,
        }}
        secondaryHref="#services"
        secondaryLabel="View Solutions"
      />
      {breadcrumbItems.length > 0 && (
        <div className="border-b border-orange-100/60 bg-white/90 backdrop-blur-sm">
          <Breadcrumbs items={breadcrumbItems} />
        </div>
      )}
      {data?.subCategoryServices?.length > 0 && (
        <SubService services={data?.subCategoryServices} />
      )}
    </>
  );
};

export default SubWrapper;
