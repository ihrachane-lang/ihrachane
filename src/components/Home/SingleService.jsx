import Link from "next/link";
import React from "react";

const SingleService = ({ index, service }) => {
  return (
    <div
      key={index}
      className="group relative flex flex-col justify-between overflow-hidden rounded-[2rem] border border-[#E2E8F0] bg-white p-8 shadow-sm backdrop-blur-md transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/10 sm:p-10"
    >
      {/* Subtle brand orange hover highlight */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F56600]/5 via-transparent to-[#FF7A00]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div>
        <div className="flex items-center justify-between mb-6">
          {/* Index badge with Brand Orange styling */}
          <div className="flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-[#071D49] text-xl font-black text-white shadow-[0_10px_25px_-10px_rgba(245,102,0,0.4)] transition-transform duration-300 group-hover:scale-105">
            {index + 1}
          </div>
          <span className="rounded-full border border-[#0B2A5B]/20 bg-[#0B2A5B]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#0B2A5B]">
            Solution
          </span>
        </div>

        {/* Title in Primary Navy #071D49, turns Brand Orange on card hover */}
        <h3 className="mb-3 text-2xl font-extrabold text-[#071D49] transition-colors group-hover:text-[#F56600]">
          {service?.title}
        </h3>

        {/* Description in Main Text tone #334155 */}
        <p className="mb-8 text-sm leading-7 text-[#334155] sm:text-base">
          {service?.description}
        </p>
      </div>

      {/* Action link in Brand Orange */}
      <Link
        href="/#contact"
        className="group/link inline-flex items-center gap-2 border-t border-[#E2E8F0] pt-4 text-sm font-bold text-[#F56600] transition-colors hover:text-[#D95400]"
      >
        <span>Inquire About This Service</span>
        <svg
          className="h-4 w-4 transform transition-transform duration-300 group-hover/link:translate-x-1.5"
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
  );
};

export default SingleService;
