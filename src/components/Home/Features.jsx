// components/Features.jsx
import { FaUsers, FaShieldAlt, FaLock, FaSearch } from "react-icons/fa";

const features = [
  {
    icon: <FaUsers className="text-3xl" />,
    title: "Customer First",
    description: "We prioritize your needs with personalized solutions"
  },
  {
    icon: <FaShieldAlt className="text-3xl" />,
    title: "100% Risk Free",
    description: "Complete protection with our satisfaction guarantee"
  },
  {
    icon: <FaLock className="text-3xl" />,
    title: "Privacy",
    description: "Your data remains secure with our advanced encryption"
  },
  {
    icon: <FaSearch className="text-3xl" />,
    title: "Due Diligence",
    description: "Thorough research ensures the best outcomes for you"
  },
];

export default function Features() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-orange-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-4">
            Why Choose Us
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We are committed to excellence and dedicated to your success
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl shadow-lg overflow-hidden 
                         border border-orange-100 hover:shadow-xl transition-all duration-300
                         flex flex-col items-center text-center p-8"
            >
              {/* Hover effect background */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-orange-600 
                            opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
              
              {/* Icon container with attractive design */}
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-orange-100 rounded-full transform 
                              scale-110 group-hover:scale-125 transition-transform duration-300" />
                <div className="relative z-10 w-20 h-20 rounded-full bg-orange-500 
                              flex items-center justify-center text-white
                              group-hover:bg-orange-600 transition-colors duration-300">
                  {feature.icon}
                </div>
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-bold text-black mb-3 group-hover:text-orange-600 transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
              
              {/* Decorative element */}
              <div className="mt-6 w-12 h-1 bg-orange-500 rounded-full 
                            group-hover:w-16 transition-all duration-300" />
            </div>
          ))}
        </div>
        
        {/* Bottom decorative element */}
        <div className="mt-16 text-center">
          <div className="inline-block h-1 w-24 bg-orange-500 rounded-full"></div>
          <div className="inline-block h-1 w-6 bg-orange-300 rounded-full mx-2"></div>
          <div className="inline-block h-1 w-12 bg-orange-400 rounded-full"></div>
        </div>
      </div>
    </section>
  );
}