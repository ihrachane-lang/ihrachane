import Partners from "@/components/Home/partners/Partners";
import SubWrapper from "@/components/shared/SubWrapper";
import SourcingSection from "@/components/sourcing/SourcingSection";

const page = async ({ params }) => {
  const { id, slug } = await params;
  return (
    <div>
      <SubWrapper id={id} slug={slug} />
      <Partners/>
      <SourcingSection />
    </div>
  );
};

export default page;
