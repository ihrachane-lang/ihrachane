"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import "./navbar.css";
import { useRouter } from "next/navigation";

export default function NavbarClient({ menus }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const router = useRouter();

  function goToContact() {
    router.push("/#contact");
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    if (isMenuOpen) {
      // Start closing animation
      setIsAnimating(true);
      setTimeout(() => {
        setIsMenuOpen(false);
        setIsAnimating(false);
      }, 500);
    } else {
      setIsMenuOpen(true);
      setIsAnimating(false);
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-100 ${
          isScrolled
            ? "bg-white text-gray-700 shadow-md py-2"
            : "bg-transparent text-white py-4"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src={
                  isScrolled
                    ? "/logo/siteLogo/logo.svg"
                    : "/logo/siteLogo/sidebarLogo.svg"
                }
                alt="IHRCHANE"
                height={40}
                width={160}
              />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              {menus?.map((menu, index) => (
                <Link
                  key={index}
                  href={menu.url}
                  className="hover:text-orange-700 px-3 py-2 rounded-md text-lg font-medium transition-colors duration-200"
                >
                  {menu.path.toUpperCase()}
                </Link>
              ))}

              {/* Contact Button */}
              <button
                onClick={goToContact}
                className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-2 rounded-full text-lg font-medium transition-colors duration-200 shadow-sm"
              >
                Get Offer
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button className="bg-black px-3 py-1 rounded-xl text-white">Get Offer</button>
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-orange-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500 transition-colors duration-200"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isMenuOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
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
                    aria-hidden="true"
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

        {/* Mobile Menu Overlay */}
        {(isMenuOpen || isAnimating) && (
          <div
            className={`md:hidden fixed inset-0 z-40 ${
              isAnimating ? "menu-overlay-closing" : "menu-overlay-opening"
            }`}
            onClick={toggleMenu}
          >
            {/* Menu panel with slide-in animation */}
            <div
              className={`absolute right-0 top-0 h-full w-80 bg-white shadow-xl ${
                isAnimating ? "menu-panel-closing" : "menu-panel-opening"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col h-full">
                {/* Header with close button */}
                <div className="flex justify-between items-center p-6 border-b">
                  <Link
                    href="/"
                    className="flex items-center"
                    onClick={toggleMenu}
                  >
                    <Image
                      src="/logo/siteLogo/logo.svg"
                      alt="IHRCHANE"
                      height={32}
                      width={120}
                    />
                  </Link>

                  <button
                    onClick={toggleMenu}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                  >
                    <svg
                      className="h-6 w-6 text-gray-500"
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

                {/* Menu items with staggered animation */}
                <div className="flex-1 overflow-y-auto py-8 px-6">
                  <div className="space-y-6">
                    {menus?.map((menu, index) => (
                      <Link
                        key={index}
                        href={menu.url}
                        className={`menu-item ${
                          isAnimating
                            ? "menu-item-closing"
                            : "menu-item-opening"
                        } block`}
                        onClick={toggleMenu}
                        style={{
                          animationDelay: isAnimating
                            ? "0ms"
                            : `${index * 50}ms`,
                        }}
                      >
                        {menu.path.toUpperCase()}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Contact button at bottom */}
                <div className="p-6 border-t">
                  <button
                    className={`contact-button ${
                      isAnimating
                        ? "contact-button-closing"
                        : "contact-button-opening"
                    }`}
                    onClick={() => {
                      toggleMenu();
                      goToContact();
                    }}
                    style={{
                      animationDelay: isAnimating
                        ? "0ms"
                        : `${menus.length * 50}ms`,
                    }}
                  >
                    Get Offer
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
