import dbConnect from "@/lib/mongodb";
import Service from "@/models/Service";
import Link from "next/link";
import SingleService from "./SingleService";

export const dynamic = "force-dynamic";
export const revalidate = 0; // always fresh
export const fetchCache = "force-no-store"; // disable route cache

const ServiceCard = async () => {
  // This forces request to be considered unique → breaks cache
  const requestHeaders = headers();
  requestHeaders.get("x-no-cache"); // just reading it busts cache

  
  await dbConnect();
  const services = await Service.find().lean(); // lean added

  return (
    <div
      id="services"
      className="bg-gradient-to-br container mx-auto from-orange-400 via-orange-500 to-orange-600 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden rounded-2xl"
    >
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-orange-300 rounded-full opacity-20"></div>
        <div className="absolute top-1/4 -right-20 w-80 h-80 bg-white rounded-full opacity-10 delay-1000"></div>
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-orange-200 rounded-full opacity-15 delay-2000"></div>
      </div>

      <div className="container mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center mb-6 bg-white/20 p-2 rounded-full">
            <div className="h-1 w-12 bg-white rounded-full mr-2 animate-pulse"></div>
            <div className="h-1 w-4 bg-white rounded-full mr-2 animate-pulse delay-300"></div>
            <div className="h-1 w-8 bg-white rounded-full animate-pulse delay-700"></div>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 drop-shadow-lg">
            Our{" "}
            <span className="text-orange-100 bg-clip-text bg-gradient-to-r from-white to-orange-200">
              Services
            </span>
          </h1>

          <p className="text-lg md:text-xl text-orange-100 max-w-2xl mx-auto leading-relaxed drop-shadow">
            Professional solutions tailored to your business needs
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {services?.map((service, index) => (
            <SingleService key={index} index={index} service={service} />
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-20 text-center">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-10 md:p-12 shadow-2xl border border-orange-200/30">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg">
              Ready to get started?
            </h2>
            <p className="text-orange-100 text-xl mb-8 max-w-2xl mx-auto drop-shadow">
              Let us help you transform your business with our professional
              services
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link
                href="#contact"
                className="px-8 py-4 bg-white text-orange-600 font-bold rounded-xl shadow-lg hover:bg-orange-50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-lg"
              >
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
