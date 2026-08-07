"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

export default function TestimonialsCarousel({ testimonials }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSlidesToShow(3);
      } else if (window.innerWidth >= 640) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(1);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    if (!testimonials.length) return;
    setCurrentIndex((prevIndex) =>
      prevIndex + slidesToShow >= testimonials.length ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    if (!testimonials.length) return;
    setCurrentIndex((prevIndex) =>
      prevIndex <= 0 ? Math.max(0, testimonials.length - slidesToShow) : prevIndex - 1
    );
  };

  useEffect(() => {
    if (!testimonials.length) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex + slidesToShow >= testimonials.length ? 0 : prevIndex + 1
      );
    }, 6000);

    return () => clearInterval(interval);
  }, [slidesToShow, testimonials.length]);

  if (!testimonials.length) return null;

  const experienceYears = new Date().getFullYear() - 2021;

  return (
    <>
      <div className="relative mb-20">
        <button
          onClick={prevSlide}
          className="absolute -left-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-slate-200 bg-white p-3 text-slate-800 shadow-lg transition-all duration-300 hover:bg-orange-50 hover:text-orange-600 hover:shadow-xl sm:-left-5"
          aria-label="Previous testimonial"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute -right-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-slate-200 bg-white p-3 text-slate-800 shadow-lg transition-all duration-300 hover:bg-orange-50 hover:text-orange-600 hover:shadow-xl sm:-right-5"
          aria-label="Next testimonial"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div className="overflow-hidden py-4 px-1">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)`,
            }}
          >
            {testimonials.map((item) => (
              <div
                key={item._id?.toString()}
                className="flex-shrink-0 px-3"
                style={{ width: `${100 / slidesToShow}%` }}
              >
                <div className="site-panel site-card-hover group flex h-full flex-col justify-between rounded-[2rem] p-6 sm:p-8">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex text-amber-400 gap-1 text-sm">
                        <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                      </div>
                      <span className="text-4xl font-serif text-orange-400/40 leading-none">“</span>
                    </div>

                    <p className="text-slate-700 text-sm sm:text-base leading-relaxed italic line-clamp-4">
                      "{item.clientFeedback}"
                    </p>
                  </div>

                  <div className="pt-6 border-t border-slate-200/60 mt-6 flex items-center gap-4">
                    <div className="relative flex h-12 w-12 flex-shrink-0 overflow-hidden rounded-full border-2 border-orange-500 shadow-md">
                      {item.clientImage ? (
                        <Image
                          src={item.clientImage}
                          alt={item.clientName || "Client"}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-orange-100 flex items-center justify-center font-bold text-orange-600">
                          {item.clientName?.charAt(0) || "C"}
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h4 className="truncate text-sm font-bold text-slate-900 transition-colors group-hover:text-orange-600 sm:text-base">
                        {item.clientName}
                      </h4>
                      <p className="text-slate-500 text-xs truncate font-medium">
                        {item.clientDesignation}
                      </p>
                      {item.companyName && (
                        <span className="inline-block mt-1 text-[11px] font-semibold text-orange-700 bg-orange-100/70 px-2 py-0.5 rounded-full truncate">
                          {item.companyName}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({
            length: Math.ceil(testimonials.length / slidesToShow),
          }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx * slidesToShow)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex >= idx * slidesToShow &&
                currentIndex < (idx + 1) * slidesToShow
                  ? "bg-orange-500 w-8"
                  : "bg-slate-300 hover:bg-slate-400 w-2"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

<div className="rounded-[2rem] border border-orange-100 bg-white/90 p-8 text-black shadow-lg backdrop-blur-md sm:p-12">
  <div className="grid grid-cols-2 gap-6 divide-y divide-orange-100 text-center md:grid-cols-4 md:divide-x md:divide-y-0 sm:gap-8">
    <div className="pt-4 md:pt-0">
      <div className="mb-1 text-3xl font-black text-orange-600 sm:text-4xl lg:text-5xl">
        500+
      </div>
      <div className="text-xs font-bold uppercase tracking-wider text-slate-700 sm:text-sm">
        Happy Clients
      </div>
    </div>
    <div className="pt-4 md:pt-0">
      <div className="mb-1 text-3xl font-black text-black sm:text-4xl lg:text-5xl">
        98%
      </div>
      <div className="text-xs font-bold uppercase tracking-wider text-slate-700 sm:text-sm">
        Satisfaction Rate
      </div>
    </div>
    <div className="pt-4 md:pt-0">
      <div className="mb-1 text-3xl font-black text-orange-600 sm:text-4xl lg:text-5xl">
        {experienceYears}+
      </div>
      <div className="text-xs font-bold uppercase tracking-wider text-slate-700 sm:text-sm">
        Years Experience
      </div>
    </div>
    <div className="pt-4 md:pt-0">
      <div className="mb-1 text-3xl font-black text-black sm:text-4xl lg:text-5xl">
        24/7
      </div>
      <div className="text-xs font-bold uppercase tracking-wider text-slate-700 sm:text-sm">
        Dedicated Support
      </div>
    </div>
  </div>
</div>
    </>
  );
}
