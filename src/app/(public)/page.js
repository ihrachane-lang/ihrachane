import Clients from "@/components/Home/Clients";
import Features from "@/components/Home/Features";
import Supplier from "@/components/Home/Supplier";
import Form from "@/components/shared/Form";
import SupplyChain from "@/components/Home/SupplyChain";
import OurServices from "@/components/Home/OurServices";
import Testimonials from "@/components/Home/Testimonials";
import Partners from "@/components/Home/partners/Partners";
import HomeHeroSection from "@/components/Home/HomeHeroSection";

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
