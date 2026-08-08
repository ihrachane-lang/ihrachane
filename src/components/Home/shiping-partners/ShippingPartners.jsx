import HomeHeroSection from "../HomeHeroSection";
import Image from "next/image";
import Cta from "./Cta";
import SectionIntro from "@/components/shared/SectionIntro";
import { FaPlane, FaShip, FaTruck, FaShieldAlt, FaBoxOpen, FaClock } from "react-icons/fa";

const ShippingPartners = ({ partners = [] }) => {
  const shippingServices = [
    {
      icon: <FaPlane className="text-3xl text-orange-500" />,
      title: "Air Express Shipping",
      description: "Fastest delivery options via leading global air carriers for urgent shipments.",
    },
    {
      icon: <FaShip className="text-3xl text-orange-500" />,
      title: "Ocean Freight (FCL/LCL)",
      description: "Cost-effective container shipping solutions for large volume commercial orders.",
    },
    {
      icon: <FaTruck className="text-3xl text-orange-500" />,
      title: "Door-to-Door Logistics",
      description: "Hassle-free inland transportation with complete customs clearance support.",
    },
  ];

  const keyBenefits = [
    {
      icon: <FaShieldAlt className="text-xl text-orange-500" />,
      title: "Cargo Insurance",
      desc: "Full coverage against damage or loss during transit.",
    },
    {
      icon: <FaClock className="text-xl text-orange-500" />,
      title: "On-Time Guarantee",
      desc: "Predictable schedules with direct routes.",
    },
    {
      icon: <FaBoxOpen className="text-xl text-orange-500" />,
      title: "Customs Clearance",
      desc: "Seamless documentation & tax processing.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <HomeHeroSection slug="shipping-partners" />

      <section className="site-section-soft py-16">
        <div className="site-container mx-auto px-4 max-w-7xl">
          
          {/* Section Intro */}
          <SectionIntro
            badge="Shipping Network"
            title={
              <>
                Our{" "}
                <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
                  Global Shipping Partners
                </span>
              </>
            }
            description="We collaborate with world-class logistics providers and carriers to ensure safe, cost-effective, and timely delivery across borders."
            className="mb-16"
          />

          {/* ----- NEW SECTION 1: Shipping Services Offered ----- */}
          <div className="mb-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            {shippingServices.map((service, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition text-center"
              >
                <div className="mb-4 inline-flex p-4 bg-orange-50 rounded-2xl">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{service.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>

          {/* ----- PARTNERS GRID ----- */}
          {partners.length === 0 ? (
            <div className="py-12 text-center">
              <div className="site-panel mx-auto max-w-md rounded-[2rem] bg-white p-8 border border-slate-100 shadow-sm">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100">
                  <svg
                    className="w-8 h-8 text-orange-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
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
                  No Partners Listed Yet
                </h3>
                <p className="text-slate-600">
                  Check back later for our verified shipping partner updates.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {partners.map((partner) => (
                <div
                  key={partner._id}
                  className="bg-white overflow-hidden rounded-[1.75rem] border border-slate-100 shadow-sm hover:shadow-xl transition duration-300 flex flex-col justify-between"
                >
                  <div className="relative flex h-44 items-center justify-center bg-slate-50 p-6 border-b border-slate-100">
                    <div className="relative h-full w-full">
                      <Image
                        src={partner.partnerImage}
                        alt={partner.partnerName}
                        fill
                        className="object-contain" 
                        sizes="(max-width: 768px) 100vw, 300px"
                      />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="mb-2 text-xl font-bold text-slate-900">
                      {partner.partnerName}
                    </h3>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                      <span className="rounded-full bg-orange-50 border border-orange-200/60 px-3 py-1 text-xs font-semibold text-orange-700">
                        Verified Partner
                      </span>
                      <span className="text-xs text-slate-400">
                        {new Date(partner.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric"
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ----- NEW SECTION 2: Key Partnership Advantages ----- */}
          <div className="mt-20 bg-orange-200 p-8 md:p-12 rounded-[2rem] border border-slate-100 shadow-sm">
            <h3 className="text-2xl font-bold text-slate-900 text-center mb-8">
              Why Our Logistics Network Matters
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {keyBenefits.map((benefit, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50">
                  <div className="p-3 bg-white rounded-xl shadow-sm">
                    {benefit.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-base">{benefit.title}</h4>
                    <p className="text-slate-500 text-xs mt-1 leading-relaxed">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ----- STATS BANNER ----- */}
          <div className="mt-16 rounded-[2rem] bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-10 text-white shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-500/20 via-transparent to-transparent opacity-70" />
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="mb-2 text-4xl font-bold md:text-5xl text-orange-400">
                  {partners.length > 0 ? `${partners.length}+` : "15+"}
                </div>
                <div className="text-slate-300 text-sm font-medium uppercase tracking-wider">Trusted Carriers</div>
              </div>
              <div className="text-center md:border-x border-slate-700/60 px-4">
                <div className="mb-2 text-4xl font-bold md:text-5xl text-white">
                  120+
                </div>
                <div className="text-slate-300 text-sm font-medium uppercase tracking-wider">Global Destinations</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2 text-orange-400">99.2%</div>
                <div className="text-slate-300 text-sm font-medium uppercase tracking-wider">On-Time Delivery Rate</div>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <Cta />
          </div>

        </div>
      </section>
    </div>
  );
};

export default ShippingPartners;