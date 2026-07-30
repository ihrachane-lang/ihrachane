import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = ({
  img,
  info,
  primaryHref = "#contact",
  primaryLabel = "Request a Custom Offer",
  secondaryHref = "#services",
  secondaryLabel = "Explore Services",
}) => {
  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(251,146,60,0.16),transparent_24%),linear-gradient(180deg,#171717_0%,#09090b_100%)] text-white">
      <div className="site-orb -left-10 top-16 h-72 w-72 bg-orange-500/18" />
      <div className="site-orb right-0 top-20 h-[26rem] w-[26rem] bg-amber-500/12" />
      <div className="site-grid-overlay absolute inset-0 opacity-40" />

      <div className="site-container relative z-10 py-16 sm:py-20 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="space-y-8 text-center lg:col-span-7 lg:text-left">
            {info?.span && info?.span !== "undefined" && (
              <div className="site-badge-dark">
                <span className="h-2 w-2 rounded-full bg-orange-400 animate-pulse" />
                <span className="text-orange-200">
                  {info?.span}
                </span>
              </div>
            )}

            <div className="space-y-5">
              <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl xl:text-6xl">
                {info?.title || "Global Supply Chain & Sourcing Solutions"}
              </h1>
              <p className="mx-auto max-w-2xl text-base leading-8 text-slate-300 sm:text-lg lg:mx-0 lg:text-xl">
                {info?.details || "Streamlining end-to-end procurement, supplier management, and global delivery for modern growth-focused businesses."}
              </p>
            </div>

            <div className="flex flex-col items-center gap-4 pt-2 sm:flex-row sm:justify-center lg:justify-start">
              <Link href={primaryHref} className="site-button-primary w-full sm:w-auto">
                <span>{primaryLabel}</span>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              {secondaryHref && (
                <Link href={secondaryHref} className="site-button-dark w-full sm:w-auto">
                  {secondaryLabel}
                </Link>
              )}
            </div>

            <div className="grid max-w-2xl gap-4 pt-3 sm:grid-cols-3 lg:mx-0">
              <div className="site-panel-dark p-5 text-left">
                <div className="text-2xl font-black text-orange-300">Verified</div>
                <div className="mt-1 text-sm text-slate-300">Supplier vetting, inspection, and sourcing controls</div>
              </div>
              <div className="site-panel-dark p-5 text-left">
                <div className="text-2xl font-black text-white">Global</div>
                <div className="mt-1 text-sm text-slate-300">Coverage across product sourcing, warehousing, and freight</div>
              </div>
              <div className="site-panel-dark p-5 text-left">
                <div className="text-2xl font-black text-orange-300">24/7</div>
                <div className="mt-1 text-sm text-slate-300">Dedicated communication and shipment visibility</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            {img ? (
              <div className="relative mx-auto w-full max-w-xl">
                <div className="absolute -inset-3 rounded-[2.25rem] bg-gradient-to-r from-orange-500/35 to-amber-500/20 blur-3xl" />
                <div className="site-panel-dark relative overflow-hidden rounded-[2rem] border-white/10 p-4 sm:p-6">
                  <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-orange-300/60 to-transparent" />
                  <Image
                    src={img}
                    alt={info?.title || "Hero Image"}
                    width={550}
                    height={420}
                    className="h-auto w-full rounded-[1.5rem] object-cover animate-float"
                    priority
                  />

                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-[1.25rem] border border-white/10 bg-white/5 p-4">
                      <div className="text-xs font-bold uppercase tracking-[0.2em] text-orange-200">End-to-End</div>
                      <div className="mt-2 text-sm text-slate-300">From sourcing brief to final-mile delivery coordination.</div>
                    </div>
                    <div className="rounded-[1.25rem] border border-white/10 bg-white/5 p-4">
                      <div className="text-xs font-bold uppercase tracking-[0.2em] text-orange-200">Trust Built In</div>
                      <div className="mt-2 text-sm text-slate-300">Transparent communication, quality control, and partner oversight.</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="site-panel-dark flex h-72 items-center justify-center rounded-[2rem] border-white/10 p-8 text-center sm:h-96">
                <div className="space-y-3">
                  <div className="site-badge-dark">IHRACHANE</div>
                  <span className="block text-lg font-semibold text-slate-300">Trusted global sourcing and logistics operations</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

