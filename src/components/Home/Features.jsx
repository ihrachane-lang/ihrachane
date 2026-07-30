import { FaUsers, FaShieldAlt, FaLock, FaSearch } from "react-icons/fa";
import SectionIntro from "../shared/SectionIntro";

const features = [
  {
    icon: <FaUsers className="text-2xl sm:text-3xl" />,
    title: "Customer First",
    description: "We prioritize your strategic goals with tailored sourcing and dedicated expert support."
  },
  {
    icon: <FaShieldAlt className="text-2xl sm:text-3xl" />,
    title: "100% Risk Protected",
    description: "End-to-end quality assurance, verified suppliers, and full transaction guarantees."
  },
  {
    icon: <FaLock className="text-2xl sm:text-3xl" />,
    title: "Data Privacy & Compliance",
    description: "Strict confidentiality and bank-grade data security across all operations."
  },
  {
    icon: <FaSearch className="text-2xl sm:text-3xl" />,
    title: "Rigorous Due Diligence",
    description: "Comprehensive factory audits, sample verification, and transparent reporting."
  },
];

export default function Features() {
  return (
    <section className="site-section-muted overflow-hidden">
      <div className="site-orb left-0 top-0 h-80 w-80 bg-orange-500/8" />
      <div className="site-container relative z-10">
        <SectionIntro
          badge="Trust Layer"
          title={
            <>
              Why Leading Businesses{" "}
              <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
                Choose IHRACHANE
              </span>
            </>
          }
          description="A premium sourcing partner should feel dependable before the first shipment. These are the standards we keep visible in every engagement."
          className="mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="site-panel site-card-hover group relative flex flex-col items-center rounded-[2rem] p-8 text-center"
            >
              <div className="relative mb-6">
                <div className="flex h-20 w-20 items-center justify-center rounded-[1.75rem] bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-[0_18px_50px_-20px_rgba(249,115,22,0.7)] transition-transform duration-500 group-hover:scale-110">
                  {feature.icon}
                </div>
              </div>

              <h3 className="mb-3 text-xl font-bold text-slate-900 transition-colors group-hover:text-orange-600">
                {feature.title}
              </h3>
              <p className="text-sm leading-7 text-slate-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
