"use client";

import Image from "next/image";
import SectionIntro from "../shared/SectionIntro";

export default function ClientsMarquee({ clients }) {
  const duplicatedClients = clients.length > 0 ? [...clients, ...clients, ...clients] : [];

  if (!duplicatedClients.length) {
    return null;
  }

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

        <div className="relative overflow-hidden py-4">
          <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <div className="flex animate-marquee-smooth space-x-6">
            {duplicatedClients.map(({ _id, img, name }, index) => (
              <div
                key={`${_id?.toString()}-${index}`}
                className="site-panel site-card-hover flex h-32 w-48 flex-shrink-0 flex-col items-center justify-center rounded-[1.5rem] p-6 group"
              >
                <div className="relative w-full h-16 flex items-center justify-center">
                  <Image
                    src={img || "/placeholder-client.png"}
                    alt={name ? `${name} client logo` : "Client logo"}
                    fill
                    sizes="192px"
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                    unoptimized={
                      typeof img === "string" &&
                      (img.startsWith("http") || img.startsWith("blob:") || img.startsWith("data:"))
                    }
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
