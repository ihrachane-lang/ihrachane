import Image from "next/image";
import Link from "next/link";
import { FaBoxOpen, FaArrowRight } from "react-icons/fa";
import SectionIntro from "../shared/SectionIntro";

export default function Service({ subCategories, contentSideImg, slug }) {
  return (
    <section id="categories" className="site-section-muted relative overflow-hidden">
      <div className="site-container relative z-10">
        <SectionIntro
          badge="Specialized Offerings"
          title={
            <>
              Our{" "}
              <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
                Sourcing Categories
              </span>
            </>
          }
          description="Choose a focused category to explore vetted manufacturing options, quality support, and tailored logistics execution."
          className="mb-16"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-5 relative group">
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-orange-500 to-amber-500 blur-xl opacity-20 transition duration-500 group-hover:opacity-35" />

            <div className="site-panel relative h-80 w-full overflow-hidden rounded-[2rem] bg-slate-900 sm:h-96 lg:h-[460px]">
              {contentSideImg ? (
                <Image
                  src={contentSideImg}
                  alt="Sourcing Services Showcase"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-400 font-bold">
                  IHRACHANE Sourcing
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 text-white font-bold text-lg drop-shadow">
                Verified Global Supply Chain
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-4">
            {subCategories?.map((subCategory) => (
              <Link
                href={`/home/${slug}/${subCategory?._id}`}
                key={subCategory?._id}
                className="site-panel site-card-hover group flex items-start gap-5 rounded-[1.75rem] p-6 sm:p-7"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 text-xl text-white shadow-md shadow-orange-500/20 transition-transform group-hover:scale-110">
                  <FaBoxOpen />
                </div>

                <div className="flex-1 min-w-0 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                      {subCategory?.title}
                    </h3>
                    <FaArrowRight className="text-slate-400 group-hover:text-orange-500 group-hover:translate-x-1.5 transition-all text-sm flex-shrink-0 ml-2" />
                  </div>

                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                    {subCategory?.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

