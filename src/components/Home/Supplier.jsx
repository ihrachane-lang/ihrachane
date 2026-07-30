"use client";

import Image from "next/image";
import Link from "next/link";
import SectionIntro from "../shared/SectionIntro";

export default function Supplier() {
  return (
    <section className="site-section-soft">
      <div className="site-container">
        <SectionIntro
          badge="Beyond Sourcing"
          title={
            <>
              We Are{" "}
              <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
                More Than a Supplier
              </span>
            </>
          }
          description="A strong sourcing partner should improve margin protection, product confidence, and operational speed at the same time."
          className="mb-16"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative group">
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-orange-500 to-amber-500 blur-xl opacity-20 transition duration-500 group-hover:opacity-35" />

              <div className="site-panel relative p-6 sm:p-8 transition-all duration-500 group-hover:scale-[1.01]">
                <Image
                  src={"/partners.png"}
                  alt="Supplier Partnership Network"
                  width={500}
                  height={400}
                  className="w-full h-auto object-contain rounded-2xl"
                />
              </div>

              <div className="absolute -right-4 -top-4 z-20 flex items-center gap-3 rounded-[1.5rem] bg-gradient-to-r from-orange-500 to-amber-500 p-4 text-white shadow-[0_20px_55px_-25px_rgba(249,115,22,0.95)]">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 text-lg font-black">
                  500+
                </div>
                <div>
                  <div className="font-bold text-sm leading-none">Verified</div>
                  <div className="text-xs text-orange-100 font-medium">Global Partners</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 space-y-8">
            <div className="flex items-start gap-4 group">
              <div className="rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 p-3.5 text-white shadow-md shadow-orange-500/20 transition-transform group-hover:scale-110">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 8l3 5m0 0l3-5m-3 5v4m-3-5h6m-6 3h6m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-slate-900 transition-colors group-hover:text-orange-600">
                  Exclusive Pricing & Flexible Terms
                </h3>
                <p className="text-sm leading-7 text-slate-600 sm:text-base">
                  Your dedicated sourcing specialist negotiates optimal unit pricing and volume discounts directly with vetted manufacturers.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 group">
              <div className="rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 p-3.5 text-white shadow-md shadow-orange-500/20 transition-transform group-hover:scale-110">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-slate-900 transition-colors group-hover:text-orange-600">
                  Rigorous Quality Control & Expedited Freight
                </h3>
                <p className="text-sm leading-7 text-slate-600 sm:text-base">
                  By leveraging the IHRACHANE network, we ensure strict quality compliance, defect reduction, and priority shipping schedules.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 group">
              <div className="rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 p-3.5 text-white shadow-md shadow-orange-500/20 transition-transform group-hover:scale-110">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-slate-900 transition-colors group-hover:text-orange-600">
                  Risk-Free Procurement Guarantee
                </h3>
                <p className="text-sm leading-7 text-slate-600 sm:text-base">
                  IHRACHANE absorbs procurement risks. Protect your capital against payment fraud, sub-standard batches, or unexpected logistics delays.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <Link href={"#services"} className="site-button-primary">
                <span>Discover Our Services</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
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

