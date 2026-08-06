import Link from "next/link";
import React from "react";

const SingleService = ({ index, service }) => {
  return (
    <div
      key={index}
      className="group relative site-panel-dark flex flex-col justify-between overflow-hidden rounded-[2rem] border-white/10 p-8 sm:p-10"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-gradient-to-br from-orange-500 to-amber-500 text-xl font-black text-white shadow-[0_18px_40px_-20px_rgba(249,115,22,0.7)] transition-transform duration-300 group-hover:scale-105">
            0{index + 1}
          </div>
          <span className="rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-orange-300">
            Solution
          </span>
        </div>

        <h3 className="mb-3 text-2xl font-extrabold text-white transition-colors group-hover:text-orange-300">
          {service?.title}
        </h3>

        <p className="mb-8 text-sm leading-7 text-slate-300 sm:text-base">
          {service?.description}
        </p>
      </div>

      <Link
        href="#contact"
        className="group/link inline-flex items-center gap-2 border-t border-white/10 pt-4 text-sm font-bold text-orange-300 transition-colors hover:text-orange-200"
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

