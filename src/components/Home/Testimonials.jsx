import { getTestimonials } from "@/lib/data/public-data";
import SectionIntro from "../shared/SectionIntro";
import TestimonialsCarousel from "./TestimonialsCarousel";

export default async function Testimonials() {
  const testimonials = await getTestimonials();

  return (
    <section className="site-section-soft overflow-hidden">
      <div className="site-container relative z-10">
        <SectionIntro
          badge="Testimonials"
          title={
            <>
              What Our{" "}
              <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
                Clients Say
              </span>
            </>
          }
          description="Proof matters. These testimonials highlight the confidence clients place in our sourcing, inspection, and logistics execution."
          className="mb-16"
        />

        <TestimonialsCarousel testimonials={testimonials} />
      </div>
    </section>
  );
}
