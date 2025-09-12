import Partners from "@/components/Home/partners/Partners";
import SubWrapper from "@/components/shared/SubWrapper";
import SourcingSection from "@/components/sourcing/SourcingSection";

const page = async ({ params }) => {
  const { id } = await params;
  return (
    <div>
      <SubWrapper id={id} />
      <Partners/>
      <SourcingSection />
    </div>
  );
};

export default page;
