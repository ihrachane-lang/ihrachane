import Image from "next/image";
import SectionIntro from "./SectionIntro";

export default function SubService({ services }) {
  return (
    <section id="services" className="site-section-soft relative my-8 overflow-hidden">
      <div className="site-container relative z-10">
        <SectionIntro
          badge="Specialized Capabilities"
          title={
            <>
              Our{" "}
              <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
                Detailed Solutions
              </span>
            </>
          }
          description="Targeted services designed to improve quality outcomes, reduce manufacturing risk, and streamline distribution."
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services?.map((service, index) => (
            <div
              key={index}
              className="site-panel site-card-hover group flex flex-col justify-between overflow-hidden rounded-[2rem]"
            >
              <div>
                <div className="relative h-60 w-full overflow-hidden bg-slate-900">
                  {service.bannerImg ? (
                    <Image
                      src={service.bannerImg}
                      alt={service.serviceName || "Service"}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-500 font-bold">
                      İhraçHane
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>

                  <div className="absolute bottom-4 left-6 right-6">
                    <h3 className="text-lg uppercase font-extrabold text-white drop-shadow sm:text-xl">
                      {service.serviceName}
                    </h3>
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-4">
                  <div className="w-10 h-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full group-hover:w-16 transition-all duration-300" />
                  <p className="text-sm font-semibold leading-7 text-slate-600">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

