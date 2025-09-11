"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { FaArrowRightLong } from "react-icons/fa6";
import { menuItems } from "@/utils/dashboardMenu";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const pathname = usePathname();
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  // Expand relevant submenu if URL matches
  useEffect(() => {
    if (pathname?.startsWith("/dashboard/categories")) {
      setIsCategoriesOpen(true);
    }
    if (pathname?.startsWith("/dashboard/about")) {
      setIsAboutOpen(true);
    }
  }, [pathname]);

  const isActive = (path) => pathname === path;
  const isSubItemActive = (subItems) =>
    subItems.some((item) => pathname === item.path);

  const handleLinkClick = () => {
    if (window.innerWidth < 768) toggleSidebar();
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 backdrop-blur-sm z-20 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed md:static top-0 left-0 z-30 w-64 h-full 
        bg-gradient-to-b from-[#19203c] via-[#3b3b5f] to-[#1e1e30]
        text-white flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
      >
        {/* Logo */}
        <div className="p-4 border-b border-gray-600 flex items-center justify-between">
          <Link href="/" className="flex items-center rounded-md">
            <Image
              src="/logo/siteLogo/sidebarLogo.svg"
              alt="IHRCHANE"
              height={40}
              width={160}
            />
          </Link>
          <button className="md:hidden text-white" onClick={toggleSidebar}>
            ✕
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto pt-5">
          <ul>
            {menuItems.map((item) => (
              <li key={item.name} className="px-4">
                {item.isHeader ? (
                  <div className="text-gray-100 text-xs uppercase  tracking-wider mt-6 mb-2 px-2">
                    {item.name}
                  </div>
                ) : item.hasSubmenu ? (
                  <div>
                    <button
                      onClick={() => {
                        if (item.name === "Categories")
                          setIsCategoriesOpen(!isCategoriesOpen);
                        if (item.name === "About Company")
                          setIsAboutOpen(!isAboutOpen);
                      }}
                      className={`w-full flex items-center p-2 rounded-lg transition-colors ${
                        isSubItemActive(item.subItems)
                          ? "bg-[#3b3b5f] border-l-4 border-gray-500"
                          : "hover:bg-[#2c3355]"
                      }`}
                    >
                      <span className="mr-3">{item.icon}</span>
                      <span className="flex-1 text-left">{item.name}</span>
                      <span className="ml-auto">
                        {(item.name === "Categories" && isCategoriesOpen) ||
                        (item.name === "About Company" && isAboutOpen) ? (
                          // Chevron Up
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path d="M18 15l-6-6-6 6" />
                          </svg>
                        ) : (
                          // Chevron Down
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        )}
                      </span>
                    </button>

                    {(item.name === "Categories" && isCategoriesOpen) ||
                    (item.name === "About Company" && isAboutOpen) ? (
                      <ul className="ml-6 mt-1 space-y-1">
                        {item.subItems.map((subItem) => (
                          <li key={subItem.name}>
                            <Link
                              href={subItem.path}
                              className={`flex items-center gap-2 p-2 rounded-lg transition-colors ${
                                isActive(subItem.path)
                                  ? "bg-[#3b3b5f] border-l-4 border-gray-500"
                                  : "hover:bg-[#2c3355]"
                              }`}
                              onClick={handleLinkClick}
                            >
                              <FaArrowRightLong /> {subItem.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ) : (
                  <Link
                    href={item.path}
                    className={`flex items-center p-2 rounded-lg transition-colors ${
                      isActive(item.path)
                        ? "bg-[#3b3b5f] border-l-4 border-gray-500"
                        : "hover:bg-[#2c3355]"
                    }`}
                    onClick={handleLinkClick}
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
         
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
