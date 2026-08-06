import HomeHeroSection from "../HomeHeroSection";
import Image from "next/image";
import Cta from "./Cta";
import SectionIntro from "@/components/shared/SectionIntro";

const ShippingPartners = ({ partners }) => {
  return (
    <div className="min-h-screen">
      <HomeHeroSection slug="shipping-partners" />

      <section className="site-section-soft">
        <div className="site-container">
          <SectionIntro
            badge="Shipping Network"
            title={
              <>
                Our{" "}
                <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
                  Shipping Partners
                </span>
              </>
            }
            description="We work with established carriers and logistics partners to keep deliveries secure, predictable, and globally connected."
            className="mb-16"
          />

          {partners.length === 0 ? (
            <div className="py-12 text-center">
              <div className="site-panel mx-auto max-w-md rounded-[2rem] p-8">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
                  <svg
                    className="w-8 h-8 text-orange-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">
                  No Partners Yet
                </h3>
                <p className="text-slate-600">
                  Check back later for our shipping partners.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {partners.map((partner) => (
                <div
                  key={partner._id}
                  className="site-panel site-card-hover overflow-hidden rounded-[1.75rem]"
                >
                  <div className="relative flex h-48 items-center justify-center bg-gradient-to-r from-orange-50 to-orange-100 p-6">
                    <div className="relative w-40 h-32">
                      <Image
                        src={partner.partnerImage}
                        alt={partner.partnerName}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 160px, 160px"
                      />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="mb-2 text-xl font-bold text-slate-900">
                      {partner.partnerName}
                    </h3>

                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-800">
                        Verified Partner
                      </span>
                      <span className="text-xs text-slate-500">
                        {new Date(partner.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-16 rounded-[2rem] bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 p-8 text-white shadow-[0_28px_70px_-34px_rgba(249,115,22,0.85)]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="mb-2 text-4xl font-bold md:text-5xl">
                  {partners.length}+
                </div>
                <div className="text-lg">Trusted Partners</div>
              </div>
              <div className="text-center">
                <div className="mb-2 text-4xl font-bold md:text-5xl">
                  Worldwide
                </div>
                <div className="text-lg">Global Coverage</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">24/7</div>
                <div className="text-lg">Support</div>
              </div>
            </div>
          </div>

          <Cta />
        </div>
      </section>
    </div>
  );
};

export default ShippingPartners;
