import ShippingPartners from "@/components/Home/shiping-partners/ShippingPartners";
import dbConnect from "@/lib/mongodb";
import Partner from "@/models/Partner";
import React from "react";

export const metadata = {
  title: "Global Shipping & Freight Partners | IHRACHANE Logistics Network",
  description:
    "Explore IHRACHANE's verified global shipping carriers and international freight partners for reliable air, ocean, and express delivery. Uluslararası nakliye ve lojistik ortakları.",
  keywords: [
    "shipping partners",
    "freight forwarders",
    "global logistics network",
    "china shipping lines",
    "international express cargo",
    "nakliye ortakları",
    "lojistik ağı",
    "uluslararası kargo",
    "navlun ve sevkiyat",
  ],
  alternates: {
    canonical: "https://www.ihrachane.com/shipping-partners",
  },
};

const page = async () => {
    await dbConnect()
    const partners = await Partner.find()
    
    return (
        <ShippingPartners partners={partners}/>
    );
};

export default page;