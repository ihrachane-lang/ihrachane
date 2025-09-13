"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getData } from "@/utils/axiosPublic";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const { data } = await getData("/api/testimonials");
      setTestimonials(data);
    }
    fetchData();
  }, []);

  // Calculate how many slides to show based on screen size
  const slidesToShow =
    typeof window !== "undefined"
      ? window.innerWidth >= 1024
        ? 3
        : window.innerWidth >= 768
        ? 2
        : 1
      : 1;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + slidesToShow >= testimonials.length
        ? 0
        : prevIndex + slidesToShow
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - slidesToShow < 0
        ? testimonials.length - slidesToShow
        : prevIndex - slidesToShow
    );
  };

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, slidesToShow]);

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-orange-500 font-medium tracking-wider text-sm uppercase mb-4 block">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
            What Our <span className="font-medium">Clients Say</span>
          </h2>
          <div className="w-16 h-0.5 bg-orange-400 mx-auto"></div>
        </div>

        {/* Testimonials Slider */}
        <div className="relative mb-16">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow duration-300"
            aria-label="Previous testimonials"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-orange-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow duration-300"
            aria-label="Next testimonials"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-orange-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Slider Container */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / slidesToShow)
                }%)`,
              }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial._id}
                  className="flex-shrink-0 px-3"
                  style={{ width: `${100 / slidesToShow}%` }}
                >
                  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col group">
                    {/* Top section with quote icon and text */}
                    <div className="flex-1">
                      <div className="text-orange-400 text-5xl mb-2 font-serif">
                        "
                      </div>

                      {/* Testimonial text */}
                      <p className="text-gray-700 mb-6 leading-relaxed text-sm line-clamp-5">
                        {testimonial.clientFeedback}
                      </p>
                    </div>

                    {/* Client info */}
                    <div className="flex items-start pt-4">
                      <div className="relative mr-4 flex-shrink-0">
                        {/* Client Image - Fixed as rounded avatar */}
                        <div className="w-12 h-12 relative overflow-hidden rounded-full border-2 border-white shadow-sm">
                          <Image
                            src={testimonial.clientImage}
                            alt={testimonial.clientName}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center border border-white">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3 w-3 text-white"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 truncate text-sm">
                          {testimonial.clientName}
                        </p>

                        <p className="text-gray-500 text-xs truncate mb-2">
                          {testimonial.clientDesignation}
                        </p>

                        {/* Company info with highlight */}
                        <div className="bg-gray-50 rounded-lg p-2 -mx-2 group-hover:bg-orange-50 transition-colors duration-300">
                          <div className="flex items-center">
                            {/* Company Logo - Larger and more prominent */}
                            <div className="w-5 h-5 mr-2 relative flex-shrink-0 bg-white p-0.5 rounded">
                              <Image
                                src={testimonial.companyLogo}
                                alt={testimonial.companyName}
                                fill
                                className="object-contain"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              />
                            </div>
                            <span className="text-xs font-medium text-gray-800 truncate">
                              {testimonial.companyName}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({
              length: Math.ceil(testimonials.length / slidesToShow),
            }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * slidesToShow)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentIndex >= index * slidesToShow &&
                  currentIndex < (index + 1) * slidesToShow
                    ? "bg-orange-500 w-6"
                    : "bg-gray-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">
                  500+
                </div>
                <div className="text-orange-800 text-sm font-medium">
                  Happy Clients
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">
                  98%
                </div>
                <div className="text-orange-800 text-sm font-medium">
                  Satisfaction
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">
                  {experience()}+
                </div>
                <div className="text-orange-800 text-sm font-medium">
                  Years Experience
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">
                  24/7
                </div>
                <div className="text-orange-800 text-sm font-medium">
                  Support
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

function experience() {
  const startYear = 2021;
  const currentYear = new Date().getFullYear();
  const difference = currentYear - startYear;
  return difference;
}


