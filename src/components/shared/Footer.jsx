"use client";
import { getData } from "@/utils/axiosPublic";
import { getClientUser } from "@/utils/getClientUser";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaWhatsapp, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import LogOutBtn from "./LogOutBtn";
import Image from "next/image";

export default function Footer() {
  const { user } = getClientUser();
  const [social, setSocial] = useState([]);
  const [about, setAbout] = useState({});
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchFooterData() {
      try {
        const [socialRes, companyRes, categoryRes] = await Promise.allSettled([
          getData("/api/company/social-links"),
          getData("/api/company/details"),
          fetch("/api/categories/categoriesName").then((r) => r.json()),
        ]);

        if (socialRes.status === "fulfilled" && Array.isArray(socialRes.value?.data)) {
          setSocial(socialRes.value.data);
        }
        if (companyRes.status === "fulfilled" && companyRes.value?.data) {
          setAbout(companyRes.value.data);
        }
        if (categoryRes.status === "fulfilled" && categoryRes.value?.data) {
          setCategories(categoryRes.value.data);
        }
      } catch (e) {
        console.error("Error fetching footer data:", e);
      }
    }
    fetchFooterData();
  }, []);

  const processSvg = (svgContent) => {
    if (!svgContent) return "";
    return svgContent.replace(
      /<svg([^>]*)>/,
      '<svg$1 width="18" height="18" fill="currentColor" style="width: 18px; height: 18px;">'
    );
  };

  return (
    <footer className="relative overflow-hidden border-t border-orange-100/80 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.12),transparent_24%),linear-gradient(180deg,#171717_0%,#09090b_100%)] pt-20 text-slate-300">
      <div className="site-orb right-8 top-8 h-72 w-72 bg-orange-500/10" />

      <div className="site-container relative z-10">
        <div className="site-panel-dark mb-12 overflow-hidden border-white/8">
          <div className="grid gap-10 px-6 py-8 sm:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:px-12 lg:py-10">
            <div className="space-y-4">
              <div className="site-badge-dark">Built for sourcing, inspection, and delivery</div>
              <h2 className="site-title-dark max-w-2xl text-3xl lg:text-4xl">
                Ready to streamline your global supply chain with one trusted partner?
              </h2>
              <p className="site-copy-dark max-w-2xl">
                IHRACHANE helps teams source smarter, reduce risk, and move products faster with a fully managed procurement and logistics workflow.
              </p>
            </div>

            <div className="flex flex-col justify-center gap-4 lg:items-end">
              <Link href="/#contact" className="site-button-primary">
                Start a Project
              </Link>
              <Link href="/shipping-partners" className="site-button-dark">
                View Shipping Partners
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 border-b border-white/10 pb-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-12">
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

            <p className="max-w-sm text-sm leading-7 text-slate-400">
              Single center from supply to delivery. Streamlining end-to-end procurement, product sourcing, quality control, and global logistics for expanding enterprises.
            </p>

            <div className="flex items-center gap-3">
              {social?.map((item) => (
                <Link
                  href={item?.socialLink || "#"}
                  key={item?._id}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-orange-500/40 hover:text-orange-300"
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: processSvg(item?.socialIcon),
                    }}
                  />
                </Link>
              ))}
            </div>

            <div className="space-y-3 pt-2 text-sm text-slate-400">
              {about?.address && (
                <p className="flex items-start gap-3">
                  <FaMapMarkerAlt className="mt-0.5 flex-shrink-0 text-base text-orange-400" />
                  <span>{about?.address}</span>
                </p>
              )}
              {about?.phoneNumber && (
                <p className="flex items-center gap-3">
                  <FaPhoneAlt className="flex-shrink-0 text-sm text-orange-400" />
                  <span>{about?.phoneNumber}</span>
                </p>
              )}
              {about?.email && (
                <p className="flex items-center gap-3">
                  <FaEnvelope className="flex-shrink-0 text-sm text-orange-400" />
                  <span>{about?.email}</span>
                </p>
              )}
              {about?.whatsAppNumber && (
                <p className="flex items-center gap-3">
                  <FaWhatsapp className="flex-shrink-0 text-base text-emerald-400" />
                  <span className="font-semibold text-emerald-300">{about?.whatsAppNumber}</span>
                </p>
              )}
            </div>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <h4 className="border-b border-white/10 pb-3 text-sm font-bold uppercase tracking-[0.22em] text-white">
              Solutions
            </h4>
            <ul className="grid gap-2 text-sm">
              <li>
                <Link
                  href="/shipping-partners"
                  className="block rounded-xl py-1 text-slate-400 transition-colors hover:text-orange-300"
                >
                  Shipping Partners
                </Link>
              </li>
              {categories?.map((cat, index) => (
                <li key={index}>
                  <Link
                    href={`/home/${cat?.name?.toLowerCase().replace(/\s+/g, "-")}`}
                    className="block rounded-xl py-1 text-slate-400 transition-colors hover:text-orange-300"
                  >
                    {cat?.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <h4 className="border-b border-white/10 pb-3 text-sm font-bold uppercase tracking-[0.22em] text-white">
              Explore
            </h4>
            <ul className="grid gap-2 text-sm">
              <li>
                <Link href="/#contact" className="block py-1 text-slate-400 transition-colors hover:text-orange-300">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="block py-1 text-slate-400 transition-colors hover:text-orange-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="block py-1 text-slate-400 transition-colors hover:text-orange-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/shipping-partners" className="block py-1 text-slate-400 transition-colors hover:text-orange-300">
                  Logistics & Partners
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <h4 className="border-b border-white/10 pb-3 text-sm font-bold uppercase tracking-[0.22em] text-white">
              Portal Access
            </h4>
            <ul className="space-y-3 text-sm">
              {user ? (
                <>
                  <li>
                    <Link
                      href="/dashboard"
                      className="inline-flex rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-xs font-bold text-orange-300 transition-all hover:bg-orange-500/20"
                    >
                      Go to Dashboard
                    </Link>
                  </li>
                  <li className="pt-2">
                    <LogOutBtn />
                  </li>
                </>
              ) : (
                <li>
                  <Link
                    href="/login"
                    className="inline-flex rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-bold text-white transition-all hover:border-orange-500/40 hover:bg-white/10"
                  >
                    Client Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>

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

