"use client";
import { getClientUser } from "@/utils/getClientUser";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const CreateCategoryForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    bannerImg: null,
    contentSideImg: null,
    contentTitle: "",
    mainBannerSpan: "",
    mainBannerHeader: "",
    mainBannerDescription: "",
  });

  const { user } = getClientUser();
  // console.log(user);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else if (name === "name") {
      // Convert to lowercase and remove spaces
      const processedValue = value.toLowerCase().replace(/\s+/g, "");
      setFormData((prev) => ({ ...prev, [name]: processedValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData();
    for (let key in formData) {
      if (formData[key]) formDataToSend.append(key, formData[key]);
    }
    formDataToSend.append("creatorInfo", user?.id);

    // return // console.log(formDataToSend);
    const res = await fetch("/api/categories/create", {
      method: "POST",
      body: formDataToSend,
    });

    const data = await res.json();
    if (data.success) {
      toast.success("Category created successfully!");
      setLoading(false);
      router.push("/dashboard/categories/list");
    } else {
      toast.error("Error: " + data.error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen  p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-orange-100">
        {/* Header */}
        <div
          className="bg-gradient-to-b from-[#19203c] via-[#3b3b4f] to-[#1e1e30]
        text-white p-6 "
        >
          <h1 className="text-3xl font-bold">Create New Category</h1>
          <p className="text-orange-100 mt-2">
            Add a new product category to your store
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Category Name */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CATEGORY NAME <span className="text-orange-600">*</span>
              <span className="text-xs text-gray-500 ml-2">
                (will be converted to lowercase with no spaces)
              </span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 shadow-sm focus:border-[#19203c] focus:ring-[#19203c] p-3 transition"
              placeholder="e.g., ElectronicsGadgets"
              required
            />
            <p className="text-xs text-gray-500">
              Preview: {formData.name || "(will appear here)"}
            </p>
          </div>

          {/* Image Uploads */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Banner Image */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                BANNER IMAGE (1080×720){" "}
                <span className="text-orange-600">*</span>
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF (MAX. 5MB)
                    </p>
                  </div>
                  <input
                    type="file"
                    name="bannerImg"
                    onChange={handleChange}
                    accept="image/*"
                    className="hidden"
                    required
                  />
                </label>
              </div>
              <p className="text-sm text-gray-600 truncate">
                {formData.bannerImg
                  ? formData.bannerImg.name
                  : "No file chosen"}
              </p>
            </div>

            {/* Content Slide Image */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                CONTENT SLIDE IMAGE (1080×720){" "}
                <span className="text-orange-600">*</span>
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF (MAX. 5MB)
                    </p>
                  </div>
                  <input
                    type="file"
                    name="contentSideImg"
                    onChange={handleChange}
                    accept="image/*"
                    className="hidden"
                    required
                  />
                </label>
              </div>
              <p className="text-sm text-gray-600 truncate">
                {formData.contentSideImg
                  ? formData.contentSideImg.name
                  : "No file chosen"}
              </p>
            </div>
          </div>

          {/* Content Title */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              CONTENT TITLE <span className="text-orange-600">*</span>
            </label>
            <input
              type="text"
              name="contentTitle"
              value={formData.contentTitle}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 shadow-sm focus:border-[#19203c] focus:ring-[#19203c] p-3 transition"
              placeholder="Enter Content Title"
              required
            />
          </div>

          {/* Main Banner Fields */}
          <div className="space-y-6 p-4 bg-gray-100 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
              Main Banner Content
            </h3>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                MAIN BANNER SPAN TEXT
              </label>
              <input
                type="text"
                name="mainBannerSpan"
                value={formData.mainBannerSpan}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 shadow-sm focus:border-[#19203c] focus:ring-[#19203c] p-3 transition"
                placeholder="e.g., New Collection, Limited Time, etc."
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                MAIN BANNER HEADER
              </label>
              <input
                type="text"
                name="mainBannerHeader"
                value={formData.mainBannerHeader}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 shadow-sm focus:border-[#19203c] focus:ring-[#19203c] p-3 transition"
                placeholder="Enter a compelling headline"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                MAIN BANNER PARAGRAPH
              </label>
              <textarea
                name="mainBannerDescription"
                value={formData.mainBannerDescription}
                onChange={handleChange}
                rows={4}
                className="w-full rounded-lg border border-gray-300 shadow-sm focus:border-[#19203c] focus:ring-[#19203c] p-3 transition"
                placeholder="Describe your category or promotion"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-between pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 border border-gray-300 cursor-pointer rounded-lg bg-white text-gray-700 hover:bg-gray-50 transition flex items-center"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                ></path>
              </svg>
              Back
            </button>
            <button
              disabled={loading}
              type="submit"
              className="px-6 py-3 rounded-lg bg-gradient-to-b from-[#19203c] via-[#3b3b5f] to-[#1e1e30] text-white transition shadow-md hover:shadow-lg flex items-center"
            >
              {loading ? "Loading ..." : "Create Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCategoryForm;
