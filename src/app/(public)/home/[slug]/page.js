import Partners from "@/components/Home/partners/Partners";
import Wrapper from "@/components/shared/Wrapper";  
import SourcingSection from "@/components/sourcing/SourcingSection";
import React from "react";

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
