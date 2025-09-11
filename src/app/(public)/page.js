import Clients from "@/components/Home/Clients";
import Features from "@/components/Home/Features";
import Supplier from "@/components/Home/Supplier";
import Form from "@/components/shared/Form";
import Hero from "@/components/shared/Hero";
import SupplyChain from "@/components/Home/SupplyChain";
import OurServices from "@/components/Home/OurServices";
import Testimonials from "@/components/Home/Testimonials";
import Partners from "@/components/Home/partners/Partners";

export default async function Home() {
  return (
    <div className="">
      <Hero
        img={"https://i.ibb.co.com/6JX5JVzG/1.png"}
        info={{
          span: "Home",
          title: `We keep your items safe, expertly prepare your purchases, and manage the shipping process.`,
          details: `Streamline your logistics, cut warehouse costs, and deliver top-notch service to your customers. Claim your complimentary quote today to grow your business!`,
        }}
      />
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
