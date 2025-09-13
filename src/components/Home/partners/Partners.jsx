// app/partners/page.js
import dbConnect from "@/lib/mongodb";
import Partner from "@/models/Partner";
import "./partners.css";

export const dynamic = "force-dynamic";
export const revalidate = 0;               // always fresh
export const fetchCache = "force-no-store"; // disable route cache

async function getPartners() {
  await dbConnect();
  const partners = await Partner.find().populate("creatorInfo", "name");
  return partners;
}

export default async function Partners() {
  const partners = await getPartners();

  return (
    <div className="bg-gradient-to-br from-orange-50 to-orange-100 py-16 px-4 flex items-center justify-center">
      <div className="container mx-auto w-full">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our <span className="text-orange-600">Valued Partners</span>
          </h2>
          <div className="h-1 w-16 bg-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We are proud to collaborate with industry leaders and innovative companies
          </p>
        </div>

        {/* Marquee Container */}
{/* Marquee Container */}
{partners.length > 0 ? (
  <div className="marquee-container py-4">
    {/* Gradient Fades */}
    <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-orange-50 to-transparent z-10"></div>
    <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-orange-50 to-transparent z-10"></div>

    {/* Marquee Animation */}
    <div className="animate-marquee">
      {[...partners, ...partners, ...partners].map((partner, index) => (
        <div
          key={`${partner._id.toString()}-${index}`}
          className="flex-shrink-0 bg-white rounded-xl p-6 w-48 h-40 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-all duration-300 border border-orange-100 hover:border-orange-300 group"
        >
          <div className="relative w-full h-24 mb-4">
            <img
              src={partner.partnerImage}
              alt={partner.partnerName}
              className="object-contain w-full h-full"
            />
          </div>
          <h3 className="text-sm font-semibold text-gray-800 group-hover:text-orange-600 transition-colors text-center">
            {partner.partnerName}
          </h3>
        </div>
      ))}
    </div>
  </div>
) : (
  <div className="flex justify-center items-center h-40">
    <div className="text-gray-400">No partners available</div>
  </div>
)}


        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mt-16 text-center">
          <div className="bg-white rounded-xl p-4 md:p-6 shadow-md border border-orange-100">
            <div className="text-2xl md:text-4xl font-bold text-orange-600">{partners.length}+</div>
            <div className="text-gray-600 mt-1 md:mt-2 text-sm md:text-base">Trusted Partners</div>
          </div>
          <div className="bg-white rounded-xl p-4 md:p-6 shadow-md border border-orange-100">
            <div className="text-2xl md:text-4xl font-bold text-orange-600">15+</div>
            <div className="text-gray-600 mt-1 md:mt-2 text-sm md:text-base">Industries</div>
          </div>
          <div className="bg-white rounded-xl p-4 md:p-6 shadow-md border border-orange-100">
            <div className="text-2xl md:text-4xl font-bold text-orange-600">100%</div>
            <div className="text-gray-600 mt-1 md:mt-2 text-sm md:text-base">Satisfaction</div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12 md:mt-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6">Want to become a partner?</h2>
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 md:py-3 md:px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
            Get in Touch
          </button>
        </div>

        {/* Bottom decorative element */}
        <div className="flex justify-center mt-12">
          <div className="h-1 w-20 bg-orange-500 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}