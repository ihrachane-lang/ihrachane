"use client";

import { useState } from "react";
import Image from "next/image";
import SectionIntro from "../shared/SectionIntro";

const tabs = [
  {
    label: "Streamlined Supply Line",
    title: "A Streamlined Supply Line",
    description:
      "Whatever products you need, we develop, source, and deliver them to your specifications. We help you achieve core sourcing goals: significant cost savings, higher quality control, and accelerated market delivery.",
    icon: "📦",
  },
  {
    label: "Worry-Free Solution",
    title: "Worry-Free Sourcing Guarantee",
    description:
      "We manage the entire supply chain lifecycle with complete transparency, real-time status updates, and proactive risk mitigation every step of the way.",
    icon: "🛡️",
  },
  {
    label: "Business Growth Support",
    title: "Powering Scale & Growth",
    description:
      "By optimizing logistics networks and providing dependable fulfillment, we free up your time to focus on marketing, scaling operations, and growing market share.",
    icon: "📈",
  },
];

export default function SupplyChain() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="site-section-soft overflow-hidden">
      <div className="site-container relative z-10">
        <SectionIntro
          badge="Optimization"
          title={
            <>
              Supply Chain{" "}
              <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
                Excellence
              </span>
            </>
          }
          description="Reduce delays, de-risk supplier decisions, and create a smoother fulfillment engine with a workflow built around visibility and control."
          className="mb-16"
        />

        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {tabs.map((tab, index) => {
            const isActive = activeTab === index;
            return (
              <button
                key={index}
                className={`flex items-center gap-2 rounded-full px-6 py-3 text-xs font-bold tracking-wide transition-all duration-300 sm:text-sm ${
                  isActive
                    ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-[0_18px_40px_-18px_rgba(249,115,22,0.85)] scale-[1.02]"
                    : "border border-slate-200 bg-white text-slate-700 shadow-sm hover:border-orange-300 hover:bg-orange-50/50"
                }`}
                onClick={() => setActiveTab(index)}
              >
                <span className="text-base">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center max-w-6xl mx-auto">
          <div className="lg:col-span-6 space-y-6">
            <div className="site-panel relative overflow-hidden p-8 sm:p-10 transition-all duration-500">
              <div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-orange-500 to-amber-500" />

              <div className="flex items-center gap-4 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-2xl text-orange-600 shadow-sm">
                  {tabs[activeTab].icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  {tabs[activeTab].title}
                </h3>
              </div>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                {tabs[activeTab].description}
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-lg group">
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-orange-500 to-amber-500 blur-xl opacity-20 transition duration-500 group-hover:opacity-35" />

              <div className="site-panel relative overflow-hidden p-3 transition-all duration-500 group-hover:scale-[1.02]">
                <Image
                  src={"/supply-chain-banner.png"}
                  alt="Supply Chain Freight Operations"
                  width={600}
                  height={400}
                  className="rounded-2xl object-cover w-full h-auto"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
