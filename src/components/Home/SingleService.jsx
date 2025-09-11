import Link from "next/link";
import React from "react";

const SingleService = ({index, service}) => {
  return (
    <div
      key={index}
      className="group relative bg-white rounded-3xl shadow-2xl hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-orange-100 hover:border-orange-200 transform hover:-translate-y-3"
    >
      {/* Animated elements */}
      <div className="absolute top-0 right-0 w-40 h-40 -mr-20 -mt-20 bg-orange-500 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-700 group-hover:scale-110"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 -ml-16 -mb-16 bg-orange-400 rounded-full opacity-30 group-hover:opacity-40 transition-opacity duration-700 group-hover:scale-110"></div>

      <div className="relative p-8 md:p-10">
        {/* Icon/Number Container */}
        <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl mb-6 group-hover:from-orange-600 group-hover:to-orange-700 transition-all duration-500 shadow-lg">
          <div className="text-3xl font-bold text-white drop-shadow">
            {index + 1}
          </div>
        </div>

        {/* Service Title */}
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors duration-500">
          {service?.title}
        </h3>

        {/* Description */}
        <p className="text-gray-700 leading-relaxed mb-8 text-lg">
          {service?.description}
        </p>

        {/* CTA Button */}
        <Link href="#contact" className="flex items-center text-orange-600 font-semibold group-hover:text-orange-700 transition-colors duration-300 text-lg">
          Contact Now
          <svg
            className="w-5 h-5 ml-2 transform group-hover:translate-x-3 transition-transform duration-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </Link>
      </div>

      {/* Hover shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
    </div>
  );
};

export default SingleService;
