"use client";

import Image from "next/image";
import Link from "next/link";

export default function Supplier() {
  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">
            WE ARE MORE THAN A SUPPLIER
          </h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Image Section - Redesigned */}
          <div className="order-2 lg:order-1">
            <div className="relative group">
              {/* Main image container */}
              <div className="relative z-10 bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-lg p-8 transform transition-transform duration-500 group-hover:scale-105">
                <Image
                  src={"/partners.png"}
                  alt="Supplier Illustration"
                  width={500}
                  height={400}
                  className="w-full h-auto object-contain rounded-lg"
                />
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-4 -right-4 w-full h-full rounded-xl border-2 border-orange-200 -z-0 group-hover:border-orange-300 transition-colors duration-500"></div>

              {/* Floating elements */}
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-orange-100 rounded-full opacity-70 group-hover:opacity-90 transition-opacity duration-500"></div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-orange-200 rounded-full opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>

              {/* Stats badge */}
              <div className="absolute -top-4 -right-4 bg-orange-500 text-white py-2 px-4 rounded-lg shadow-md z-20">
                <div className="text-center">
                  <div className="font-bold text-lg">500+</div>
                  <div className="text-xs">Partners</div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="order-1 lg:order-2 space-y-6">
            <div className="flex items-start">
              <div className="bg-orange-500 p-2 rounded-lg mr-4 flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
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
              <div>
                <h3 className="text-xl font-semibold text-black mb-2">
                  Exclusive Pricing and Favorable Terms
                </h3>
                <p className="text-gray-700">
                  Your dedicated sourcing specialist will work with you and
                  handle any of your requests, ensuring you collaborate
                  seamlessly with the Ihracphane team.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-orange-500 p-2 rounded-lg mr-4 flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
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
              <div>
                <h3 className="text-xl font-semibold text-black mb-2">
                  Stable Quality and Priority Delivery
                </h3>
                <p className="text-gray-700">
                  By working with the Ihracphane supply chain network, we will
                  help you to achieve cost savings, higher quality products, and
                  faster delivery.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-orange-500 p-2 rounded-lg mr-4 flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
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
              <div>
                <h3 className="text-xl font-semibold text-black mb-2">
                  Streamlined Procurement Process
                </h3>
                <p className="text-gray-700">
                  Ihracphane will bear all your buying risks instead of you. You
                  do not need to worry about your payment security, bad quality,
                  and late delivery when you work with Ihracphane.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <Link href={"#services"}>
                <button className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 flex items-center">
                  Discover Our Services
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
