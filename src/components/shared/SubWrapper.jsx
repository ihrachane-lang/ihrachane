"use client";

import { getData } from "@/utils/axiosPublic";
import { useEffect, useState } from "react";
import Hero from "./Hero";
import SubService from "./SubServices";

const SubWrapper = ({ id }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const { data } = await getData(`/api/sub-categories/${id}`);
      setData(data);
    }
    fetchData();
  }, [id]);

  return (
    <>
      <Hero
        img={data?.bannerImg}
        info={{
          span: `${data?.span}`,
          title: `${data?.title}`,
          details: `${data?.description}`,
        }}
      />
      {data?.subCategoryServices?.length  && (
        <SubService services={data?.subCategoryServices} />
      )}
    </>
  );
};

export default SubWrapper;
