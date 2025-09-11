// components/CreateSocialMediaForm.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const CreateSocialMediaForm = () => {
  const [formData, setFormData] = useState({
    socialName: "",
    socialIcon: "",
    socialLink: "",
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(
        "/api/company/social-links/create",
        formData
      );

      // console.log("✅ Response:", data);
      alert("Social media created successfully!");
      router.back(); // back to previous page
    } catch (error) {
      console.error("❌ Error:", error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-b from-[#19203c] via-[#3b3b5f] to-[#1e1e30] p-5">
          <h1 className="text-2xl font-semibold text-white text-center">
            Create New Social Media
          </h1>
          <p className="text-sm text-orange-100 text-center">
            Add new social media platform with icon and link
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
             placeholder='Enter SVG code here, e.g., <svg width="..." height="..." viewBox="...">...</svg>'
              required
            />
            <p className="mt-1 text-sm text-gray-500">
              Example: <br />
              <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">
                &lt;svg xmlns="http://www.w3.org/2000/svg" width="24"
                height="24" viewBox="0 0 24 24" fill="none"&gt; &lt;path d="..."
                /&gt; &lt;/svg&gt;
              </code>
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
              disabled={loading}
            >
              ← Back
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-b from-[#19203c] via-[#3b3b5f] to-[#1e1e30] cursor-pointer disabled:opacity-70"
            >
              {loading ? "Submitting..." : "Submit ✓"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSocialMediaForm;
