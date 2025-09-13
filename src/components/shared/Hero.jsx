import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = ({ img, info }) => {
  return (
    <section className="pt-16 bg-gradient-to-r from-[#FF7416] to-[#FFA970]">
      <div className="container px-4 sm:px-6 lg:px-8 min-h-[700px] bg-gradient-to-l from-orange-100 to-orange-400 bg-[url('/pattern/boxes.svg')] bg-no-repeat bg-[position:right_bottom] grid md:grid-cols-2 gap-8 mx-auto relative">
        {/* Left Side: Text Content (center vertically) */}
        <div className="flex items-center">
          <div className="relative z-20 max-w-2xl text-center md:text-left">
            {info?.span !== "undefined" && (
              <p className="text-lg md:text-xl text-white font-semibold mb-4">
                {info?.span}
              </p>
            )}
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight mb-6">
              {info?.title}
            </h1>
            <p className="text-white text-md md:text-lg mb-8 opacity-90">
              {info?.details}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                href="#contact"
                className="bg-black text-white font-semibold py-3 px-8 rounded-full hover:scale-3d transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>

        {/* Right Side: Image (always bottom aligned) */}
        <div className="flex justify-center md:justify-end">
          {img && (
            <Image
              src={img}
              alt="Hero Image"
              width={500}
              height={400}
              className="max-w-full h-auto object-contain"
              priority
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
