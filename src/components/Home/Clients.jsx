"use client";
import { getData } from "@/utils/axiosPublic";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Clients() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await getData("/api/clients");
        setClients(data);
      } catch (error) {
        console.error("Error fetching clients:", error);
        // Fallback data if API fails
        setClients([
          { _id: "1", img: "/client1.png", name: "Client 1" },
          { _id: "2", img: "/client2.png", name: "Client 2" },
          { _id: "3", img: "/client3.png", name: "Client 3" },
          { _id: "4", img: "/client4.png", name: "Client 4" },
          { _id: "5", img: "/client5.png", name: "Client 5" },
          { _id: "6", img: "/client6.png", name: "Client 6" },
        ]);
      }
    }
    fetchData();
  }, []);

  // Duplicate clients for seamless marquee animation
  const duplicatedClients = clients.length > 0 ? [...clients, ...clients] : [];

  return (
    <section className="bg-white py-16 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our <span className="text-orange-600">Proud Clients</span>
          </h2>
          <div className="h-1 w-16 bg-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We are honored to work with industry leaders and innovative
            companies
          </p>
        </div>

        {/* Marquee Container */}
        {duplicatedClients.length > 0 ? (
          <div className="relative overflow-hidden py-4">
            {/* Gradient Fades */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10"></div>

            {/* Marquee Animation */}
            <div className="flex animate-marquee space-x-8">
              {duplicatedClients.map(({ _id, img, name }, index) => (
                <div
                  key={`${_id}-${index}`}
                  className="flex-shrink-0 bg-gradient-to-bl from-orange-300 to-orange-400 rounded-xl p-6 w-48 h-32 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
                >
                  <div className="relative w-full h-16">
                    <Image
                      src={img || "/placeholder-client.png"}
                      alt={name || "Client logo"}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-contain"
                      onError={(e) => {
                        e.target.src =
                          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjYwIiB2aWV3Qm94PSIwIDAgMTIwIDYwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMTIwIiBoZWlnaHQ9IjYwIiByeD0iOCIgZmlsbD0iI0ZGRiIgc3Ryb2tlPSIjRUE4QjQwIiBzdHJva2Utd2lkdGg9IjIiLz4KPHRleHQgeD0iNjAiIHk9IjMwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiNFQThCNDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPkNsaWVudCBMb2dvPC90ZXh0Pgo8L3N2Zz4K";
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-40">
            <div className="animate-pulse text-gray-400">
              Loading clients...
            </div>
          </div>
        )}

        {/* Bottom decorative element */}
        <div className="flex justify-center mt-12">
          <div className="h-1 w-20 bg-orange-500 rounded-full"></div>
        </div>
      </div>

      {/* Custom CSS for marquee animation */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
          display: flex;
          width: max-content;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
