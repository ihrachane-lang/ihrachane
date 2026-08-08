"use client";

import { useRouter } from "next/navigation";

const Cta = () => {
  const router = useRouter();
  
  function goToContact() {
    router.push("/sourcing#contact");
  }
  return (
    <div className="mt-16 text-center">
      <h3 className="mb-6 text-2xl font-bold text-slate-900 md:text-3xl">
        Want to become a shipping partner?
      </h3>
      <button
        onClick={goToContact}
        className="site-button-primary"
      >
        Get in Touch
      </button>
    </div>
  );
};

export default Cta;
