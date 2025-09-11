"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const UpdateSocialLinks = ({ socialLinkId }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    socialName: "",
    socialIcon: "",
    socialLink: "",
  });
  const [loading, setLoading] = useState(false);

  // Fetch existing social link data
  useEffect(() => {
    async function fetchSocialLink() {
      try {
        const res = await fetch(`/api/company/social-links/${socialLinkId}`);
        const data = await res.json();
        if (data.success) {
          setFormData({
            socialName: data.data.socialName,
            socialIcon: data.data.socialIcon,
            socialLink: data.data.socialLink,
          });
        } else {
          toast.error(data.error || "Failed to fetch social link data");
        }
      } catch (error) {
        toast.error("Something went wrong while fetching data");
      }
    }

    fetchSocialLink();
  }, [socialLinkId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        `/api/company/social-links/update/${socialLinkId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();
      if (data.success) {
        toast.success("Social link updated successfully!");
        router.push("/dashboard/about/social-links");
      } else {
        toast.error(data.error || "Failed to update social link");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-b from-[#19203c] via-[#3b3b5f] to-[#1e1e30] p-5">
          <h1 className="text-2xl font-semibold text-white text-center">
            Update Social Media
          </h1>
          <p className="text-sm text-orange-100 text-center">
            Edit social media icon and link information
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Social Media Name */}
          <div>
            <label
              htmlFor="socialName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              SOCIAL MEDIA NAME
            </label>
            <input
              type="text"
              id="socialName"
              name="socialName"
              value={formData.socialName}
              onChange={handleChange}
              className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-3"
              placeholder="Enter Social Name"
              required
            />
          </div>

          {/* Social Media Icon */}
          <div>
            <label
              htmlFor="socialIcon"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              SOCIAL MEDIA ICON
            </label>
            <input
              type="text"
              id="socialIcon"
              name="socialIcon"
              value={formData.socialIcon}
              onChange={handleChange}
              className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-3"
              placeholder="Enter Social Icon (e.g., FaFacebook, FaTwitter)"
              required
            />
            <p className="mt-1 text-sm text-gray-500">
              Example:{" "}
              <code className="bg-gray-100 px-1 py-0.5 rounded">FaFacebook</code>,{" "}
              <code className="bg-gray-100 px-1 py-0.5 rounded">FaInstagram</code>
            </p>
          </div>

          {/* Social Media Link */}
          <div>
            <label
              htmlFor="socialLink"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              SOCIAL MEDIA LINK
            </label>
            <input
              type="url"
              id="socialLink"
              name="socialLink"
              value={formData.socialLink}
              onChange={handleChange}
              className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-3"
              placeholder="Enter Social Link (https://...)"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between pt-4 border-t">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
            >
              ← Back
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-b from-[#19203c] via-[#3b3b5f] to-[#1e1e30]"
            >
              {loading ? "Updating..." : "Update ✓"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateSocialLinks;
