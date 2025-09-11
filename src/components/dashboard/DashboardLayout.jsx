"use client";
import { useState } from "react";
import Sidebar from "./Sidebar";
import HamburgerMenu from "./HamburgerMenu";
import { useSession, signOut } from "next-auth/react";
import UserAvatar from "./UserAvatar";
import Link from "next/link";
import FullscreenToggle from "./FullscreenToggle";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { data: session } = useSession();
  const user = session?.user || {};

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile header */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between md:justify-end p-4">
            <div className="md:hidden">
              <HamburgerMenu toggleSidebar={toggleSidebar} />
            </div>
            <div className="flex gap-6 items-center relative">
              <FullscreenToggle/>
              <div
                className="flex items-center gap-4 cursor-pointer relative"
                onClick={toggleDropdown}
              >
                <div>
                  <h2 className="font-semibold">{user?.name}</h2>
                  <p className="text-gray-600 text-sm">{user?.email}</p>
                </div>
                <UserAvatar user={user} size={40} />
              </div>

              {/* Dropdown menu */}
              {dropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-md z-50">
                  <Link href={"/dashboard/profilesettings"}>
                    {" "}
                    <button className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">
                      Profile
                    </button>
                  </Link>
                  <button
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => signOut()}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
            <div className="w-6"></div>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-white">
          {children}
        </div>
      </div>
    </div>
  );
}
