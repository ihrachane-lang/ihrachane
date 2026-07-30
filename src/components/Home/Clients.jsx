"use client";
import { getData } from "@/utils/axiosPublic";
import { useEffect, useState } from "react";
import SectionIntro from "../shared/SectionIntro";

export default function Clients() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await getData("/api/clients");
        if (Array.isArray(data) && data.length > 0) {
          setClients(data);
        }
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    }
    fetchData();
  }, []);

  const duplicatedClients = clients.length > 0 ? [...clients, ...clients, ...clients] : [];

  return (
    <section className="site-section-soft overflow-hidden">
      <div className="site-container">
        <SectionIntro
          badge="Global Reach"
          title={
            <>
              Brands That{" "}
              <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
                Trust Our Team
              </span>
            </>
          }
          description="We support ambitious startups, operators, and established companies that need reliable sourcing and delivery execution."
          className="mb-16"
        />

        {duplicatedClients.length > 0 ? (
          <div className="relative overflow-hidden py-4">
            <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            <div className="flex animate-marquee-smooth space-x-6">
              {duplicatedClients.map(({ _id, img, name }, index) => (
                <div
                  key={`${_id}-${index}`}
                  className="site-panel site-card-hover flex h-32 w-48 flex-shrink-0 flex-col items-center justify-center rounded-[1.5rem] p-6 group"
                >
                  <div className="relative w-full h-16 flex items-center justify-center">
                    <img
                      src={img || "/placeholder-client.png"}
                      alt={name || "Client logo"}
                      className="object-contain max-h-full max-w-full group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  {name && (
                    <span className="text-[11px] font-bold text-slate-600 group-hover:text-orange-600 transition-colors mt-2 truncate w-full text-center">
                      {name}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="site-panel flex h-32 items-center justify-center rounded-[1.75rem] text-slate-400 font-medium">
            Loading client directory...
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes marquee-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        .animate-marquee-smooth {
          animation: marquee-scroll 30s linear infinite;
          display: flex;
          width: max-content;
        }
        .animate-marquee-smooth:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}

