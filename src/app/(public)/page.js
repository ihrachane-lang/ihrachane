import Clients from "@/components/Home/Clients";
import Features from "@/components/Home/Features";
import Supplier from "@/components/Home/Supplier";
import Form from "@/components/shared/Form";
import SupplyChain from "@/components/Home/SupplyChain";
import OurServices from "@/components/Home/OurServices";
import Testimonials from "@/components/Home/Testimonials";
import Partners from "@/components/Home/partners/Partners";
import HomeHeroSection from "@/components/Home/HomeHeroSection";

export const metadata = {
  title: "IHRACHANE | Global Supply Chain, Product Sourcing & Logistics",
  description:
    "Single center from supply to delivery. IHRACHANE offers managed factory sourcing, supplier inspection, China warehousing, and global shipping logistics. Küresel tedarik zinciri ve lojistik temsilciliği.",
  keywords: [
    "ihrachane",
    "global supply chain",
    "china product sourcing agent",
    "supplier verification",
    "international freight forwarding",
    "küresel tedarik zinciri",
    "çin tedarik temsilcisi",
    "navlun taşımacılığı",
    "ürün ve fabrika denetimi",
  ],
  alternates: {
    canonical: "https://www.ihrachane.com",
  },
};

export default async function Home() {
  return (
    <div className="">
      <HomeHeroSection />
      <Features />
      <OurServices />
      <SupplyChain />
      <Supplier />
      <Testimonials />
      <Partners />
      <Clients />
      <Form />
    </div>
  );
}
