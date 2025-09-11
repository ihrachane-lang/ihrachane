"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { uploadToCloudinaryClient } from "@/utils/uploadToCloudinaryClient";
import { getData } from "@/utils/axiosPublic";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { getClientUser } from "@/utils/getClientUser";

const CreateSubCategoryForm = () => {
  const { user } = getClientUser();
  const [formData, setFormData] = useState({
    subCategoryTitle: "",
    selectedCategory: "",
    bannerImage: null,
    subTitle: "",
  });

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data } = await getData("/api/categories");
      setCategories(data);
    }
    fetchData();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Validation
  const validateForm = () => {
    if (!formData.subCategoryTitle.trim()) {
      setErrorMsg("Sub Category Title is required!");
      return false;
    }
    if (!formData.selectedCategory) {
      setErrorMsg("Please select a category!");
      return false;
    }
    if (!formData.bannerImage) {
      setErrorMsg("Please upload a banner image!");
      return false;
    }
    if (!formData.subTitle.trim()) {
      setErrorMsg("Sub Title is required!");
      return false;
    }
    setErrorMsg("");
    return true;
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      // Step 1: Upload image to Cloudinary
      const imageUrl = await uploadToCloudinaryClient(formData.bannerImage);

      // Step 2: Send data to backend
      const res = await axios.post("/api/sub-categories/create", {
        title: formData.subCategoryTitle,
        selectedCategory: formData.selectedCategory,
        bannerImg: imageUrl,
        description: formData.subTitle,
        creatorInfo: user?.id,
      });

      toast.success("Sub Category Added Successfully");
      setSuccessMsg("✅ Sub Category created successfully!");
      router.push("/dashboard/categories/sub-list");

      // Reset form
      setFormData({
        subCategoryTitle: "",
        selectedCategory: "",
        bannerImage: null,
        subTitle: "",
      });
    } catch (error) {
      console.error(error);
      setErrorMsg(
        error.response?.data?.message || "Something went wrong! Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#19203c] to-[#1e1e30] p-6 rounded-t-xl -mx-8 -mt-8 mb-6">
        <h1 className="text-2xl font-bold text-white">
          Create New Sub Category
        </h1>
        <p className="text-sm text-gray-300">
          Add a new sub category under your selected main category
        </p>
      </div>

      {/* Messages */}
      {errorMsg && <p className="mb-4 text-red-600 font-medium">{errorMsg}</p>}
      {successMsg && (
        <p className="mb-4 text-green-600 font-medium">{successMsg}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Sub Category Title */}
        <div>
          <label
            htmlFor="subCategoryTitle"
            className="block text-sm font-semibold text-gray-700 mb-2 uppercase"
          >
            SUB CATEGORY TITLE *
          </label>
          <input
            type="text"
            id="subCategoryTitle"
            name="subCategoryTitle"
            value={formData.subCategoryTitle}
            onChange={handleChange}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#19203c] focus:ring-[#19203c] sm:text-sm p-3 border"
            placeholder="Enter Sub Category Title"
          />
        </div>

        {/* Select Category */}
        <div>
          <label
            htmlFor="selectedCategory"
            className="block text-sm font-semibold text-gray-700 mb-2 uppercase"
          >
            SELECT CATEGORY *
          </label>
          <select
            id="selectedCategory"
            name="selectedCategory"
            value={formData.selectedCategory}
            onChange={handleChange}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#19203c] focus:ring-[#19203c] sm:text-sm p-3 border"
          >
            <option disabled value="">
              Choose a Category
            </option>
            {categories?.map((category) => (
              <option key={category?._id} value={category?._id}>
                {category?.name?.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        {/* Banner Image Upload */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase">
            BANNER IMAGE (1080×720) *
          </label>
          <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50">
            <input
              type="file"
              name="bannerImage"
              onChange={handleChange}
              className="hidden"
              accept="image/*"
              id="bannerUpload"
            />
            <label
              htmlFor="bannerUpload"
              className="cursor-pointer flex flex-col items-center"
            >
              <svg
                className="w-10 h-10 text-gray-400 mb-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4"
                />
              </svg>
              <p className="text-gray-600 text-sm">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-400">PNG, JPG, GIF (MAX. 5MB)</p>
              <span className="mt-2 text-sm text-gray-500">
                {formData.bannerImage
                  ? formData.bannerImage.name
                  : "No file chosen"}
              </span>
            </label>
          </div>
        </div>

        {/* Sub Title */}
        <div>
          <label
            htmlFor="subTitle"
            className="block text-sm font-semibold text-gray-700 mb-2 uppercase"
          >
            SUB TITLE *
          </label>
          <input
            type="text"
            id="subTitle"
            name="subTitle"
            value={formData.subTitle}
            onChange={handleChange}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#19203c] focus:ring-[#19203c] sm:text-sm p-3 border"
            placeholder="Enter Sub Title"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between pt-4">
          <button
            type="button"
            className="px-5 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 text-sm font-medium rounded-md shadow text-white bg-gradient-to-b from-[#19203c] via-[#3b3b4f] to-[#1e1e30] hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Create Sub Category"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateSubCategoryForm;
