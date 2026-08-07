import Image from "next/image";
import Link from "next/link";

export default function Hero({
  img,
  info,
  primaryHref = "#contact",
  primaryLabel = "Get Custom Offer →",
  secondaryHref = "#services",
  secondaryLabel = "Explore Services",
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500/80 text-white py-20 lg:py-28">

      <div className="site-container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          
          {/* Left Content */}
          <div className="space-y-6 text-center lg:col-span-6 lg:text-left">
            {info?.span && info?.span !== "undefined" && (
              <span className="inline-block text-sm font-semibold tracking-wide text-orange-100 uppercase">
                {info?.span}
              </span>
            )}

            <div className="space-y-4">
              <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl xl:text-5xl leading-tight">
                {info?.title || "We find and ship the most affordable products for you"}
              </h1>
              <p className="mx-auto max-w-xl text-base text-orange-100/90 sm:text-lg lg:mx-0">
                {info?.details ||
                  "Simplify your search for the right product, reduce shipping costs, and provide your customers with a great experience. Get a free quote now to grow your business!"}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col items-center gap-4 pt-2 sm:flex-row sm:justify-center lg:justify-start">
              <Link
                href={primaryHref}
                className="rounded-full bg-slate-950 px-8 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:bg-slate-800 hover:shadow-xl focus:ring-2 focus:ring-slate-950 focus:outline-none"
              >
                {primaryLabel}
              </Link>
              {secondaryHref && secondaryLabel && (
                <Link
                  href={secondaryHref}
                  className="rounded-full border border-white/40 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-white/10"
                >
                  {secondaryLabel}
                </Link>
              )}
            </div>
          </div>

          {/* Right Image / Graphics Area */}
          <div className="lg:col-span-6">
            <div className="relative mx-auto w-full max-w-md lg:max-w-none flex justify-center items-center">
              {/* Hexagon Pattern Background Effect */}
              <div 
                className="absolute -inset-10 bg-contain bg-center bg-no-repeat pointer-events-none"
                style={{ backgroundImage: "url('/pattern/boxes.svg')" }}
              />

              {img ? (
                <div className="relative z-10 w-full max-w-lg">
                  <Image
                    src={img}
                    alt={info?.title || "Hero Image"}
                    width={550}
                    height={450}
                    className="h-auto w-full object-contain"
                    priority
                  />
                </div>
              ) : (
                <div className="relative z-10 flex h-80 w-full items-center justify-center rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 p-8 text-center text-white">
                  <span className="text-xl font-semibold">
                    {info?.title || "Trusted Global Sourcing"}
                  </span>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}