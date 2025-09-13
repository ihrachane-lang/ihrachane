"use client";

import { useRouter } from "next/navigation";

const Cta = () => {
  const router = useRouter();
  
  function goToContact() {
    router.push("/#contact");
  }
  return (
    <div className="text-center mt-16">
      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
        Want to become a shipping partner?
      </h3>
      <button
        onClick={goToContact}
        className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
      >
        Get in Touch
      </button>
    </div>
  );
};

export default Cta;
