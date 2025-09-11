"use client";
import { getData } from "@/utils/axiosPublic";
import { getClientUser } from "@/utils/getClientUser";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import LogOutBtn from "./LogOutBtn";

export default function Footer() {
  const { user } = getClientUser();
  const [social, setSocial] = useState([]);
  const [about, setAbout] = useState({});

  useEffect(() => {
    async function fetchData() {
      const { data } = await getData("/api/company/social-links");
      setSocial(data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const { data } = await getData("/api/company/details");
      setAbout(data);
    }
    fetchData();
  }, []);

  // Function to process SVG content and add styling
  const processSvg = (svgContent) => {
    // Add width, height and style to the SVG element
    return svgContent.replace(
      /<svg([^>]*)>/,
      '<svg$1 width="20" height="20" style="width: 20px; height: 20px; cursor: pointer; hover:text-gray-300">'
    );
  };

  return (
    <footer className="bg-[#000d26] text-white py-10 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Left Side - Logo & Info */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">İHRAÇHANE</h2>

          {/* Social Icons */}
          <div className="flex space-x-4 text-lg">
            {social?.map((item) => (
              <Link href={item?.socialLink} key={item?._id}>
                <div
                  className="social-icon-container"
                  dangerouslySetInnerHTML={{
                    __html: processSvg(item?.socialIcon),
                  }}
                />
              </Link>
            ))}
          </div>

          {/* Address & Contact Info */}
          <div className="italic space-y-1">
            <p>{about?.address}</p>
            <p>{about?.phoneNumber}</p>
            <p>{about?.email}</p>
            <p className="flex items-center gap-2">
              <FaWhatsapp className="text-green-500" /> {about?.whatsAppNumber}
            </p>
          </div>
        </div>

        {/* Right Side - Links */}
        <div>
          <h4 className="font-semibold mb-2">Services</h4>
          <ul className="text-sm space-y-1">
            <li>Sourcing</li>
            <li>Dropshipping</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Explore</h4>
          <ul className="text-sm space-y-1">
            <li>
              <Link href="#contact">Contact US</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Corporate</h4>
          <ul className="text-sm space-y-1">
            {user && (
              <li>
                {" "}
                <Link href="/dashboard">Dashboard</Link>{" "}
              </li>
            )}
            {user ? (
              <li className="my-6">
                {" "}
                <LogOutBtn />{" "}
              </li>
            ) : (
              <li>
                <Link className="my-4" href="/login">login</Link>{" "}
              </li>
            )}
          </ul>
        </div>
      </div>
    </footer>
  );
}
