import Link from "next/link";
import SingleService from "./SingleService";
import SectionIntro from "../shared/SectionIntro";
import { getServices } from "@/lib/data/public-data";

export default async function OurServices() {
  const services = await getServices();

  return (
    <section
      id="services"
      className="site-section-dark my-10 overflow-hidden relative"
    >
      <div className="site-container relative z-10">
        <SectionIntro
          badge="Capabilities"
          title={
            <>
              Comprehensive{" "}
              <span className="bg-gradient-to-r from-orange-300 via-orange-400 to-amber-300 bg-clip-text text-transparent">
                Supply Chain Solutions
              </span>
            </>
          }
          description="End-to-end services designed to simplify procurement, increase confidence in supplier selection, and accelerate international delivery."
          dark
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {services?.map((service, index) => (
            <SingleService
              key={service._id?.toString() || index}
              index={index}
              service={service}
            />
          ))}
        </div>

        <div className="mt-20">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-orange-600/90 via-orange-700 to-amber-600/80 p-8 text-center shadow-[0_30px_80px_-32px_rgba(249,115,22,0.9)] sm:p-12">
            <div className="absolute -right-10 -bottom-10 h-64 w-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />

            <h3 className="mb-4 text-2xl font-black tracking-tight text-white sm:text-3xl lg:text-4xl">
              Ready to Optimize Your Global Sourcing?
            </h3>
            <p className="mx-auto mb-8 max-w-2xl text-base font-medium leading-relaxed text-orange-50 sm:text-lg">
              Connect with our sourcing specialists today for a customized proposal tailored to your business needs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="#contact"
                className="site-button-secondary border-white bg-white text-orange-700 hover:bg-orange-50"
              >
                <span>Request Custom Quote</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
