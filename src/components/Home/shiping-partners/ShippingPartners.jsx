import HomeHeroSection from "../HomeHeroSection";
import Image from "next/image";
import Cta from "./Cta";

const ShippingPartners = ({ partners }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50">
      <HomeHeroSection />

      {/* Partners Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our <span className="text-orange-600">Shipping Partners</span>
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              We collaborate with the world&apos;s leading shipping providers to
              ensure your packages are delivered safely and on time, no matter
              where they need to go.
            </p>
            <div className="w-24 h-1 bg-orange-500 mx-auto mt-6 rounded-full"></div>
          </div>

          {/* Partners Grid */}
          {partners.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
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
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  No Partners Yet
                </h3>
                <p className="text-gray-600">
                  Check back later for our shipping partners.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {partners.map((partner) => (
                <div
                  key={partner._id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <div className="relative h-48 bg-gradient-to-r from-orange-50 to-orange-100 flex items-center justify-center p-6">
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
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {partner.partnerName}
                    </h3>
                   
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium bg-orange-100 text-orange-800 px-3 py-1 rounded-full">
                        Verified Partner
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(partner.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Stats Section */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl shadow-lg mt-16 p-8 text-white">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {partners.length}+
                </div>
                <div className="text-lg">Trusted Partners</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">
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

          {/* CTA Section */}
          <Cta />
        </div>
      </section>
    </div>
  );
};

export default ShippingPartners;
