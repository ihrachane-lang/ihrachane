import Image from "next/image";
import Link from "next/link";
import "./partners.css";
import SectionIntro from "../../shared/SectionIntro";
import { getPartners } from "@/lib/data/public-data";

export default async function Partners() {
  const partners = await getPartners();

  return (
    <section className="site-section-muted relative overflow-hidden">
      <div className="site-container relative z-10">
        <SectionIntro
          badge="Global Alliance"
          title={
            <>
              Our Trusted{" "}
              <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
                Strategic Partners
              </span>
            </>
          }
          description="We collaborate with established logistics providers, certified factories, and operational partners to keep delivery performance predictable."
          className="mb-16"
        />

        {partners.length > 0 ? (
          <div className="relative py-4 overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-32 bg-gradient-to-r from-[#fff7ed] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-32 bg-gradient-to-l from-[#fff7ed] to-transparent z-10 pointer-events-none" />

            <div className="animate-marquee-smooth py-2">
              {[...partners, ...partners, ...partners].map((partner, index) => (
                <div
                  key={`${partner._id.toString()}-${index}`}
                  className="site-panel site-card-hover flex h-40 w-52 flex-shrink-0 flex-col items-center justify-center rounded-[1.5rem] p-6 group"
                >
                  <div className="relative w-full h-20 mb-3 flex items-center justify-center p-2">
                    <Image
                      src={partner.partnerImage}
                      alt={
                        partner.partnerName
                          ? `${partner.partnerName} strategic partner logo`
                          : "Strategic partner logo"
                      }
                      fill
                      sizes="208px"
                      className="object-contain group-hover:scale-105 transition-transform duration-300"
                      unoptimized={
                        typeof partner.partnerImage === "string" &&
                        (partner.partnerImage.startsWith("http") ||
                          partner.partnerImage.startsWith("blob:") ||
                          partner.partnerImage.startsWith("data:"))
                      }
                    />
                  </div>
                  <h3 className="text-xs font-bold text-slate-800 group-hover:text-orange-600 transition-colors text-center truncate w-full">
                    {partner.partnerName}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="site-panel flex h-40 items-center justify-center rounded-[1.75rem] text-slate-400 font-medium">
            No partner logos listed at this time.
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16 text-center">
          <div className="site-stat">
            <div className="mb-1 text-3xl font-black text-orange-600">
              {partners.length}+
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Trusted Partners
            </div>
          </div>

          <div className="site-stat">
            <div className="mb-1 text-3xl font-black text-orange-600">15+</div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Specialized Industries
            </div>
          </div>

          <div className="site-stat">
            <div className="mb-1 text-3xl font-black text-orange-600">100%</div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-600">
              Fulfillment Guarantee
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <h3 className="mb-4 text-xl font-bold text-slate-900 sm:text-2xl">
            Interested in partnering with IHRACHANE?
          </h3>
          <Link href="#contact" className="site-button-primary">
            <span>Become a Partner</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
