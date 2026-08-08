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
    <footer className="relative overflow-hidden border-t border-orange-500/20 bg-slate-950 pt-20 text-slate-300">
      {/* Soft Ambient Glows (Very subtle orange highlights) */}
      <div className="absolute -top-24 right-1/4 h-96 w-96 rounded-full bg-orange-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-24 left-10 h-80 w-80 rounded-full bg-amber-500/5 blur-[100px] pointer-events-none" />

      <div className="site-container relative z-10">
        {/* Top CTA Banner: Soft Warm Gradient Card */}
        <div className="mb-16 overflow-hidden rounded-3xl border border-orange-500/20 bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-900 p-8 shadow-2xl backdrop-blur-xl sm:p-10 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="space-y-4">
              <div className="inline-block rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1 text-xs font-semibold tracking-wide text-orange-400">
                Built for sourcing, inspection, and delivery
              </div>
              <h2 className="text-3xl font-extrabold text-white lg:text-4xl">
                Ready to streamline your global supply chain with one trusted partner?
              </h2>
              <p className="max-w-2xl text-slate-400 text-sm leading-relaxed">
                IHRACHANE helps teams source smarter, reduce risk, and move products faster with a fully managed procurement and logistics workflow.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-end">
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center rounded-xl bg-orange-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition-all duration-300 hover:bg-orange-600 hover:shadow-orange-500/30"
              >
                Start a Project
              </Link>
              <Link
                href="/shipping-partners"
                className="inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-800/60 px-6 py-3.5 text-sm font-semibold text-slate-200 transition-all duration-300 hover:border-orange-500/40 hover:bg-slate-800 hover:text-white"
              >
                View Shipping Partners
              </Link>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-10 border-b border-slate-800/80 pb-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-block">
              <Image
                src={"/logo/siteLogo/sidebarLogo.svg"}
                height={48}
                width={160}
                alt="IHRACHANE"
                className="h-10 w-auto object-contain"
              />
            </Link>

            <p className="max-w-sm text-sm leading-relaxed text-slate-400">
              Single center from supply to delivery. Streamlining end-to-end procurement, product sourcing, quality control, and global logistics for expanding enterprises.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5">
              {social?.map((item) => (
                <Link
                  href={item?.socialLink || "#"}
                  key={item?._id?.toString()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-slate-400 transition-all duration-300 hover:-translate-y-0.5 hover:border-orange-500/50 hover:bg-orange-500/10 hover:text-orange-400"
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
            <div className="space-y-3 pt-2 text-sm text-slate-400">
              {about?.address && (
                <p className="flex items-start gap-3">
                  <FaMapMarkerAlt className="mt-1 flex-shrink-0 text-orange-500" />
                  <span className="leading-snug">{about.address}</span>
                </p>
              )}
              {about?.phoneNumber && (
                <p className="flex items-center gap-3">
                  <FaPhoneAlt className="flex-shrink-0 text-orange-500" />
                  <span>{about.phoneNumber}</span>
                </p>
              )}
              {about?.email && (
                <p className="flex items-center gap-3">
                  <FaEnvelope className="flex-shrink-0 text-orange-500" />
                  <span>{about.email}</span>
                </p>
              )}
              {about?.whatsAppNumber && (
                <p className="flex items-center gap-3">
                  <FaWhatsapp className="flex-shrink-0 text-base text-emerald-500" />
                  <span className="font-medium text-emerald-400">{about.whatsAppNumber}</span>
                </p>
              )}
            </div>
          </div>

          {/* Solutions Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="border-b border-slate-800 pb-3 text-xs font-bold uppercase tracking-widest text-slate-200">
              Solutions
            </h4>
            <ul className="grid gap-2.5 text-sm">
              <li>
                <Link
                  href="/shipping-partners"
                  className="block text-slate-400 transition-colors hover:text-orange-400"
                >
                  Shipping Partners
                </Link>
              </li>
              {categories?.map((cat) => (
                <li key={cat._id?.toString()}>
                  <Link
                    href={`/${cat.slug || cat.name.toLowerCase().replace(/\s+/g, "-")}`}
                    className="block text-slate-400 transition-colors capitalize hover:text-orange-400"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="border-b border-slate-800 pb-3 text-xs font-bold uppercase tracking-widest text-slate-200">
              Explore
            </h4>
            <ul className="grid gap-2.5 text-sm">
              <li>
                <Link href="/blog" className="block font-medium text-orange-400 transition-colors hover:text-orange-300">
                  Blog & Insights
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="block text-slate-400 transition-colors hover:text-orange-400">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="block text-slate-400 transition-colors hover:text-orange-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="block text-slate-400 transition-colors hover:text-orange-400">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/shipping-partners" className="block text-slate-400 transition-colors hover:text-orange-400">
                  Logistics & Partners
                </Link>
              </li>
            </ul>
          </div>

          {/* Portal Access */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="border-b border-slate-800 pb-3 text-xs font-bold uppercase tracking-widest text-slate-200">
              Portal Access
            </h4>
            <ul className="space-y-3 text-sm">
              <FooterAuth />
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 py-8 text-center text-xs font-medium text-slate-500 sm:flex-row sm:text-left">
          <p>© {new Date().getFullYear()} IHRACHANE Supply Chain Management. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="transition-colors hover:text-slate-300">
              Privacy Policy
            </Link>
            <Link href="/about-us" className="transition-colors hover:text-slate-300">
              About Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}