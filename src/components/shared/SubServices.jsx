import Image from "next/image";

export default function SubService({ services }) {
  return (
    <section className="container mx-auto py-16 my-12  px-4 md:px-8 bg-gradient-to-b from-orange-100 to-orange-200 rounded-2xl">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center mb-5">
            <div className="h-1.5 w-12 bg-orange-500 mr-3 rounded-full"></div>
            <div className="h-1.5 w-6 bg-orange-500 rounded-full"></div>
            <div className="h-1.5 w-12 bg-orange-500 ml-3 rounded-full"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            Our <span className="text-orange-600">Sourcing Services</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Premium sourcing solutions tailored to your business needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services?.map((service, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1"
            >
              {/* Decorative corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 rotate-45 translate-x-8 -translate-y-8 bg-orange-500/20 group-hover:bg-orange-500/50 transition-colors duration-500"></div>
              </div>

              {/* Image Container */}
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={service.bannerImg}
                  alt={service.serviceName}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

                {/* Service name overlay on image */}
                <div className="absolute bottom-5 left-5 right-5">
                  <h3 className="text-xl font-bold text-white drop-shadow-md">
                    {service.serviceName}
                  </h3>
                </div>
              </div>

              {/* Content Container */}
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="h-0.5 w-8 bg-orange-500 mr-3"></div>
                  <div className="h-0.5 w-4 bg-orange-500"></div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {service.description}
                </p>

                {/* Decorative element at bottom */}
                <div className="mt-6 flex justify-center">
                  <div className="h-1 w-16 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full group-hover:w-20 transition-all duration-500"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom decorative section */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center justify-center mb-2">
            <div className="h-1 w-6 bg-orange-500 mr-1 rounded-full"></div>
            <div className="h-1 w-3 bg-orange-500 mx-1 rounded-full"></div>
            <div className="h-1 w-6 bg-orange-500 ml-1 rounded-full"></div>
          </div>
          <p className="text-gray-600 italic">
            Quality sourcing solutions for your business
          </p>
        </div>
      </div>
    </section>
  );
}
