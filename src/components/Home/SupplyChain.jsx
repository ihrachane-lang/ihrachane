"use client";

import { useState } from "react";
import Image from "next/image";

const tabs = [
  {
    label: "Streamlined Supply Line",
    title: "A Streamlined Supply Line",
    description:
      "Whatever products you need, we develop source and deliver them to you, and help you achieve your sourcing goals: Cost saving, higher quality, and faster delivery.",
    icon: "📦", // You can replace with actual icons if needed
  },
  {
    label: "Worry-Free Solution",
    title: "Worry-Free Solution",
    description:
      "We manage the entire supply process with full transparency and communication, ensuring peace of mind and timely delivery every step of the way.",
    icon: "🛡️",
  },
  {
    label: "Power Behind Your Business Growth",
    title: "Business Growth Support",
    description:
      "By optimizing logistics and providing dependable service, we help you focus on scaling your business while we handle sourcing and delivery.",
    icon: "📈",
  },
];

export default function SupplyChain() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="relative bg-gradient-to-b from-white to-orange-50 py-16 lg:py-24 px-4 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-0 w-24 h-24 bg-orange-200 rounded-full blur-xl opacity-30"></div>
      <div className="absolute bottom-10 right-0 w-32 h-32 bg-orange-100 rounded-full blur-xl opacity-40"></div>
      
      <div className="container mx-auto relative z-10">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4">
            SUPPLY CHAIN OPTIMIZATION
          </h2>
          <div className="w-20 h-1 bg-orange-500 mx-auto rounded-full"></div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`flex items-center px-6 py-3 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${
                activeTab === index
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-200"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-orange-300 hover:shadow-md"
              }`}
              onClick={() => setActiveTab(index)}
            >
              <span className="mr-2 text-lg">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content + Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Tab Content Box */}
          <div className="relative">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-orange-100 transform transition-all duration-500 hover:shadow-xl">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 text-xl mr-4">
                  {tabs[activeTab].icon}
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-black">
                  {tabs[activeTab].title}
                </h3>
              </div>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                {tabs[activeTab].description}
              </p>
              
              {/* Decorative line */}
              <div className="mt-6 w-16 h-1 bg-orange-500 rounded-full"></div>
            </div>
            
            {/* Floating element */}
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-orange-200 rounded-full blur-xl opacity-30 z-0"></div>
          </div>

          {/* Right Image */}
          <div className="relative flex justify-center">
            <div className="relative w-full max-w-lg">
              <div className="absolute -inset-4 bg-orange-500 rounded-2xl rotate-3 opacity-10"></div>
              <div className="absolute -inset-4 bg-orange-300 rounded-2xl -rotate-3 opacity-10"></div>
              
              <div className="relative bg-white p-2 rounded-2xl shadow-lg border border-orange-100 transform transition-all duration-500 hover:scale-105">
                <Image
                  src={"/supply-chain-banner.png"}
                  alt="Cargo Containers"
                  width={600}
                  height={400}
                  className="rounded-xl object-cover w-full h-auto"
                />
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-orange-200 rounded-full blur-lg opacity-40"></div>
            <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-orange-300 rounded-full blur-lg opacity-30"></div>
          </div>
        </div>
        
        {/* Bottom decorative element */}
        <div className="mt-16 text-center">
          <div className="inline-flex space-x-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
            <div className="w-3 h-3 bg-orange-300 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
}