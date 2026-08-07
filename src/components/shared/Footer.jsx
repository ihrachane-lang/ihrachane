import Link from "next/link";
import Image from "next/image";
import { FaWhatsapp, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import {
  getCategoryNames,
  getCompanyDetails,
  getSocialLinks,
} from "@/lib/data/public-data";
import { slugify } from "@/lib/slug";
import FooterAuth from "./FooterAuth";

function processSvg(svgContent) {
  if (!svgContent) return "";
  return svgContent.replace(
    /<svg([^>]*)>/,
    '<svg$1 width="18" height="18" fill="currentColor" style="width: 18px; height: 18px;">'
  );
}

export default async function Footer() {
  const [social, about, categories] = await Promise.all([
    getSocialLinks(),
    getCompanyDetails(),
    getCategoryNames(),
  ]);

  return (
    <footer className="relative overflow-hidden border-t border-orange-500/20 bg-gradient-to-b from-orange-950/80 via-slate-950 to-black pt-20 text-orange-100/90">
      {/* Background Glowing Ambient Orbs */}
      <div className="site-orb right-8 top-8 h-80 w-80 rounded-full bg-orange-600/15 blur-3xl" />
      <div className="site-orb left-8 bottom-12 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl" />

      <div className="site-container relative z-10">
        {/* Top Call To Action Panel */}
        <div className="site-panel-dark mb-12 overflow-hidden rounded-3xl border border-orange-500/30 bg-gradient-to-r from-orange-900/40 via-orange-950/60 to-slate-900/80 shadow-2xl backdrop-blur-md">
          <div className="grid gap-10 px-6 py-8 sm:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:px-12 lg:py-10">
            <div className="space-y-4">
              <div className="inline-block rounded-full bg-orange-500/10 px-3 py-1 text-xs font-semibold tracking-wide text-orange-400 border border-orange-500/20">
                Built for sourcing, inspection, and delivery
              </div>
              <h2 className="text-3xl font-extrabold text-white lg:text-4xl">
                Ready to streamline your global supply chain with one trusted partner?
              </h2>
              <p className="max-w-2xl text-orange-100/80">
                IHRACHANE helps teams source smarter, reduce risk, and move products faster with a fully managed procurement and logistics workflow.
              </p>
            </div>

            <div className="flex flex-col justify-center gap-4 lg:items-end">
              <Link href="/#contact" className="site-button-primary bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-orange-500/20 transition-all hover:scale-105">
                Start a Project
              </Link>
              <Link href="/shipping-partners" className="site-button-dark border border-orange-500/30 bg-orange-950/50 hover:bg-orange-900/60 text-orange-200 font-semibold px-6 py-3 rounded-xl transition-all">
                View Shipping Partners
              </Link>
            </div>
          </div>
        </div>

        {/* Main Footer Links & Information */}
        <div className="grid grid-cols-1 gap-10 border-b border-orange-500/20 pb-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-block">
              <Image
                src={"/logo/siteLogo/sidebarLogo.svg"}
                height={48}
                width={160}
                alt="IHRACHANE"
                className="h-10 w-auto object-contain brightness-110"
              />
            </Link>

            <p className="max-w-sm text-sm leading-7 text-orange-100/70">
              Single center from supply to delivery. Streamlining end-to-end procurement, product sourcing, quality control, and global logistics for expanding enterprises.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {social?.map((item) => (
                <Link
                  href={item?.socialLink || "#"}
                  key={item?._id?.toString()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-2xl border border-orange-500/20 bg-orange-950/40 text-orange-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-orange-400 hover:bg-orange-500/20 hover:text-white"
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: processSvg(item?.socialIcon),
                    }}
                  />
                </Link>
              ))}
            </div>

            {/* Contact Details */}
            <div className="space-y-3 pt-2 text-sm text-orange-100/80">
              {about?.address && (
                <p className="flex items-start gap-3">
                  <FaMapMarkerAlt className="mt-0.5 flex-shrink-0 text-base text-orange-400" />
                  <span>{about.address}</span>
                </p>
              )}
              {about?.phoneNumber && (
                <p className="flex items-center gap-3">
                  <FaPhoneAlt className="flex-shrink-0 text-sm text-orange-400" />
                  <span>{about.phoneNumber}</span>
                </p>
              )}
              {about?.email && (
                <p className="flex items-center gap-3">
                  <FaEnvelope className="flex-shrink-0 text-sm text-orange-400" />
                  <span>{about.email}</span>
                </p>
              )}
              {about?.whatsAppNumber && (
                <p className="flex items-center gap-3">
                  <FaWhatsapp className="flex-shrink-0 text-base text-emerald-400" />
                  <span className="font-semibold text-emerald-300">{about.whatsAppNumber}</span>
                </p>
              )}
            </div>
          </div>

          {/* Solutions Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="border-b border-orange-500/20 pb-3 text-sm font-bold uppercase tracking-[0.22em] text-amber-400">
              Solutions
            </h4>
            <ul className="grid gap-2 text-sm">
              <li>
                <Link
                  href="/shipping-partners"
                  className="block rounded-xl py-1 text-orange-100/70 transition-colors hover:text-amber-300"
                >
                  Shipping Partners
                </Link>
              </li>
              {categories?.map((cat) => (
                <li key={cat._id?.toString()}>
                  <Link
                    href={`/${cat.slug || cat.name.toLowerCase().replace(/\s+/g, "-")}`}
                    className="block rounded-xl py-1 text-orange-100/70 transition-colors hover:text-amber-300"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="border-b border-orange-500/20 pb-3 text-sm font-bold uppercase tracking-[0.22em] text-amber-400">
              Explore
            </h4>
            <ul className="grid gap-2 text-sm">
              <li>
                <Link href="/blog" className="block py-1 font-semibold text-orange-400 transition-colors hover:text-orange-300">
                  Blog & Insights
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="block py-1 text-orange-100/70 transition-colors hover:text-amber-300">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="block py-1 text-orange-100/70 transition-colors hover:text-amber-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="block py-1 text-orange-100/70 transition-colors hover:text-amber-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/shipping-partners" className="block py-1 text-orange-100/70 transition-colors hover:text-amber-300">
                  Logistics & Partners
                </Link>
              </li>
            </ul>
          </div>

          {/* Portal Access */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="border-b border-orange-500/20 pb-3 text-sm font-bold uppercase tracking-[0.22em] text-amber-400">
              Portal Access
            </h4>
            <ul className="space-y-3 text-sm">
              <FooterAuth />
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 py-8 text-center text-xs font-medium text-orange-200/60 sm:flex-row sm:text-left">
          <p>© {new Date().getFullYear()} IHRACHANE Supply Chain Management. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="transition-colors hover:text-amber-300">
              Privacy Policy
            </Link>
            <Link href="/about-us" className="transition-colors hover:text-amber-300">
              About Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}