"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import "./navbar.css";
import { useRouter, usePathname } from "next/navigation";

export default function NavbarClient({ menus }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const categoryMenus = menus?.filter(
    (menu) => menu.url !== "/" && menu.url !== "/shipping-partners",
  );

  const primaryMenus = [
    { url: "/", path: "Home" },
    { url: "/shipping-partners", path: "Shipping Partners" },
    { url: "/about-us", path: "About Us" },
    { url: "/privacy", path: "Privacy" },
  ];

  const isSolutionsRoute = categoryMenus?.some((menu) => pathname === menu.url);

  function goToContact() {
    const contactEl = document.getElementById("contact");
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: "smooth" });
    } else if (pathname !== "/") {
      router.push("/#contact");
    } else {
      router.push("/#contact");
    }
    setIsMenuOpen(false);
    setIsAnimating(false);
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isMenuOpen) {
        toggleMenu();
      }
    };

    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    if (isMenuOpen) {
      setIsAnimating(true);
      setIsSolutionsOpen(false);
      setTimeout(() => {
        setIsMenuOpen(false);
        setIsAnimating(false);
      }, 400);
    } else {
      setIsMenuOpen(true);
      setIsAnimating(false);
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
          isScrolled
            ? "py-3.5 text-slate-800 shadow-[0_16px_50px_-28px_rgba(15,23,42,0.28)]"
            : "py-5 text-white"
        }`}
      >
        {/* Unscrolled dark background layer */}
        <div
          className={`absolute inset-0 bg-[linear-gradient(to_right,#422816,#141314,#141415,#271F13)] transition-opacity duration-500 pointer-events-none ${
            isScrolled ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* Scrolled white glass background layer */}
        <div
          className={`absolute inset-0 border-b border-orange-100/80 bg-white/90 backdrop-blur-xl transition-opacity duration-500 pointer-events-none ${
            isScrolled ? "opacity-100" : "opacity-0"
          }`}
        />

        <div className="site-container relative z-10">
          <div className="flex items-center justify-between gap-6">
            <Link
              href="/"
              className="flex items-center transition-transform duration-300 hover:scale-[1.02]"
            >
              <div className="relative h-9 sm:h-10 w-40">
                <Image
                  src="/logo/siteLogo/sidebarLogo.svg"
                  alt="IHRACHANE"
                  fill
                  className={`object-contain transition-opacity duration-500 ${
                    isScrolled ? "opacity-0" : "opacity-100"
                  }`}
                  priority
                />
                <Image
                  src="/logo/siteLogo/logo.svg"
                  alt="IHRACHANE"
                  fill
                  className={`object-contain transition-opacity duration-500 ${
                    isScrolled ? "opacity-100" : "opacity-0"
                  }`}
                  priority
                />
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-2">
              <div
                className={`flex items-center gap-1 rounded-full border px-2 py-1.5 transition-all duration-500 ${
                  isScrolled
                    ? "border-slate-200 bg-white/80 shadow-sm"
                    : "border-white/10 bg-white/5 backdrop-blur-md"
                }`}
              >
                {primaryMenus.map((menu) => {
                  const isActive = pathname === menu.url;
                  return (
                    <Link
                      key={menu.url}
                      href={menu.url}
                      className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                        isScrolled
                          ? isActive
                            ? "bg-orange-50 text-orange-700"
                            : "text-slate-700 hover:bg-orange-50 hover:text-orange-700"
                          : isActive
                            ? "bg-white/15 text-white"
                            : "text-white/90 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {menu.path}
                    </Link>
                  );
                })}

                {categoryMenus?.length ? (
                  <div className="relative group">
                    <button
                      className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                        isScrolled
                          ? isSolutionsRoute
                            ? "bg-orange-50 text-orange-700"
                            : "text-slate-700 hover:bg-orange-50 hover:text-orange-700"
                          : isSolutionsRoute
                            ? "bg-white/15 text-white"
                            : "text-white/90 hover:bg-white/10 hover:text-white"
                      }`}
                      aria-haspopup="true"
                    >
                      <span>Solutions</span>
                      <svg
                        className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    <div className="pointer-events-none absolute left-1/2 top-full z-50 w-[22rem] -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
                      <div className="grid gap-2 rounded-[1.75rem] border border-orange-100 bg-white p-3 shadow-[0_30px_70px_-28px_rgba(15,23,42,0.35)]">
                        {categoryMenus.map((menu) => {
                          const isActive = pathname === menu.url;
                          return (
                            <Link
                              key={menu.url}
                              href={menu.url}
                              className={`rounded-2xl px-4 py-3 text-sm font-semibold transition duration-200 ${
                                isActive
                                  ? "bg-orange-50 text-orange-700"
                                  : "text-slate-700 hover:bg-orange-50 hover:text-orange-700"
                              }`}
                            >
                              {menu.path.charAt(0).toUpperCase() +
                                menu.path.slice(1)}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>

              <button onClick={goToContact} className="site-button-primary">
                <span>Get Custom Offer</span>
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.4}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </div>

            <div className="lg:hidden flex items-center space-x-2.5">
              <button
                onClick={goToContact}
                className="rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-2 text-xs font-bold text-white shadow-[0_18px_34px_-18px_rgba(249,115,22,0.95)] transition-transform active:scale-95"
              >
                Get Offer
              </button>
              <button
                onClick={toggleMenu}
                className={`rounded-2xl p-2.5 transition-colors duration-500 ${
                  isScrolled
                    ? "text-slate-800 hover:bg-slate-100"
                    : "text-white hover:bg-white/10"
                }`}
                aria-label="Toggle navigation"
                aria-expanded={isMenuOpen}
              >
                {!isMenuOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {(isMenuOpen || isAnimating) && (
        <div
          className={`lg:hidden fixed inset-0 z-50 ${
            isAnimating ? "menu-overlay-closing" : "menu-overlay-opening"
          }`}
          onClick={toggleMenu}
        >
          <div
            className={`absolute right-0 top-0 h-full w-80 max-w-[88vw] overflow-hidden ${
              isAnimating ? "menu-panel-closing" : "menu-panel-opening"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex h-full flex-col border-l border-orange-100 bg-white/95 backdrop-blur-xl">
              <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
                <Link
                  href="/"
                  className="flex items-center"
                  onClick={toggleMenu}
                >
                  <Image
                    src="/logo/siteLogo/logo.svg"
                    alt="IHRACHANE"
                    height={32}
                    width={130}
                    className="h-8 w-auto object-contain"
                  />
                </Link>

                <button
                  onClick={toggleMenu}
                  className="rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800"
                >
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-6">
                <div className="space-y-1">
                  {primaryMenus.map((menu, index) => {
                    const isActive = pathname === menu.url;
                    return (
                      <Link
                        key={menu.url}
                        href={menu.url}
                        className={`menu-item ${
                          isAnimating
                            ? "menu-item-closing"
                            : "menu-item-opening"
                        } block rounded-2xl px-4 py-3 text-sm font-semibold transition-all ${
                          isActive
                            ? "bg-orange-50 text-orange-700"
                            : "text-slate-700 hover:bg-slate-50 hover:text-orange-700"
                        }`}
                        onClick={toggleMenu}
                        style={{
                          animationDelay: isAnimating
                            ? "0ms"
                            : `${index * 40}ms`,
                        }}
                      >
                        {menu.path}
                      </Link>
                    );
                  })}
                </div>

                {categoryMenus?.length ? (
                  <div className="mt-6 rounded-[1.5rem] border border-orange-100 bg-orange-50/60 p-3">
                    <button
                      className="flex w-full items-center justify-between rounded-2xl px-3 py-2 text-left text-sm font-bold text-slate-900"
                      onClick={() => setIsSolutionsOpen((prev) => !prev)}
                      aria-expanded={isSolutionsOpen}
                    >
                      <span>Solutions</span>
                      <svg
                        className={`h-4 w-4 transition-transform ${
                          isSolutionsOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {isSolutionsOpen ? (
                      <div className="mt-2 grid gap-1">
                        {categoryMenus.map((menu) => {
                          const isActive = pathname === menu.url;
                          return (
                            <Link
                              key={menu.url}
                              href={menu.url}
                              className={`rounded-2xl px-3 py-3 text-sm font-semibold ${
                                isActive
                                  ? "bg-white text-orange-700 shadow-sm"
                                  : "text-slate-700 hover:bg-white hover:text-orange-700"
                              }`}
                              onClick={toggleMenu}
                            >
                              <span className="bg-white border border-amber-50 px-3 rounded-md block ">
                                {menu.path.charAt(0).toUpperCase() +
                                  menu.path.slice(1)}
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>

              <div className="border-t border-slate-100 bg-slate-50/80 p-6">
                <button
                  className={`contact-button ${
                    isAnimating
                      ? "contact-button-closing"
                      : "contact-button-opening"
                  } w-full`}
                  onClick={goToContact}
                >
                  Get Custom Offer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
