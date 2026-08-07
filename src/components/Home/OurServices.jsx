import Link from "next/link";
import SingleService from "./SingleService";
import SectionIntro from "../shared/SectionIntro";
import { getServices } from "@/lib/data/public-data";

export default async function OurServices() {
  const services = await getServices();

  return (
    <section
      id="services"
      className="site-section-dark relative my-10 overflow-hidden py-20"
    >
      <div className="site-container relative z-10">
        <SectionIntro
          badge="Capabilities"
          title={
            <>
              Comprehensive{" "}
              <span className="bg-gradient-to-r from-white via-orange-100 to-amber-200 bg-clip-text text-transparent drop-shadow-sm">
                Supply Chain Solutions
              </span>
            </>
          }
          description="End-to-end services designed to simplify procurement, increase confidence in supplier selection, and accelerate international delivery."
          className="mb-16"
        />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-10">
          {services?.map((service, index) => (
            <SingleService
              key={service._id?.toString() || index}
              index={index}
              service={service}
            />
          ))}
        </div>

        {/* CTA Banner section */}
        <div className="mt-20">
          <div className="relative overflow-hidden rounded-[2rem] bg-slate-800/50 p-8 text-center border border-white/10 shadow-2xl backdrop-blur-xl sm:p-12">
            <div className="absolute -bottom-10 -right-10 h-64 w-64 rounded-full bg-orange-500/20 blur-3xl pointer-events-none" />

            <h3 className="mb-4 text-2xl font-black tracking-tight text-white sm:text-3xl lg:text-4xl">
              Ready to Optimize Your Global Sourcing?
            </h3>
            <p className="mx-auto mb-8 max-w-2xl text-base font-medium leading-relaxed text-slate-300 sm:text-lg">
              Connect with our sourcing specialists today for a customized proposal tailored to your business needs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="#contact"
                className="site-button-secondary border-orange-500 bg-orange-500 text-white hover:bg-orange-600 transition-colors"
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