"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { uploadToCloudinaryClient } from "@/utils/uploadToCloudinaryClient";
import { getData } from "@/utils/axiosPublic";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const CreateSubCategoryService = () => {
  const [formData, setFormData] = useState({
    serviceName: "",
    selectedSubCategory: "",
    bannerImage: null,
    description: "",
  });

  const router = useRouter();

  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const { data } = await getData("/api/sub-categories");
        setSubCategories(data);
      } catch (error) {
        console.error("Failed to load subcategories:", error);
      }
    };
    fetchSubCategories();
  }, []);

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

  const validateForm = () => {
    if (!formData.serviceName.trim()) {
      setErrorMsg("Service name is required!");
      return false;
    }
    if (!formData.selectedSubCategory) {
      setErrorMsg("Please select a sub category!");
      return false;
    }
    if (!formData.bannerImage) {
      setErrorMsg("Please upload a banner image!");
      return false;
    }
    if (!formData.description.trim()) {
      setErrorMsg("Description is required!");
      return false;
    }
    setErrorMsg("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const imageUrl = await uploadToCloudinaryClient(formData.bannerImage);

      await axios.post("/api/sub-categories/services/create", {
        serviceName: formData.serviceName,
        selectedSubCategory: formData.selectedSubCategory,
        bannerImg: imageUrl,
        description: formData.description,
      });
      toast.success("Service added Successfully");
      setSuccessMsg("✅ Sub Category Service created successfully!");
      router.push("/dashboard/categories/service");

      setFormData({
        serviceName: "",
        selectedSubCategory: "",
        bannerImage: null,
        description: "",
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
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-lg max-w-4xl w-full overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-b from-[#19203c] via-[#3b3b5f] to-[#1e1e30] text-white px-6 py-4">
          <h2 className="text-xl font-semibold text-white">
            Create New Sub Category Service
          </h2>
          <p className="text-sm text-gray-200">
            Add a new service under a sub category
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {errorMsg && (
            <p className="mb-4 text-red-600 font-medium">{errorMsg}</p>
          )}
          {successMsg && (
            <p className="mb-4 text-green-600 font-medium">{successMsg}</p>
          )}

          {/* Service Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              SERVICE NAME <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="serviceName"
              value={formData.serviceName}
              onChange={handleChange}
              placeholder="e.g., Web Development"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>

          {/* Select Sub Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              SELECT SUB CATEGORY <span className="text-red-500">*</span>
            </label>
            <select
              name="selectedSubCategory"
              value={formData.selectedSubCategory}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-indigo-200"
            >
              <option value="">Choose a Sub Category</option>
              {subCategories?.map((sub) => (
                <option key={sub?._id} value={sub?._id}>
                  {sub?.title}
                </option>
              ))}
            </select>
          </div>

          {/* Upload Banner */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              BANNER IMAGE (1080×720) <span className="text-red-500">*</span>
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
              <input
                type="file"
                name="bannerImage"
                onChange={handleChange}
                accept="image/*"
                className="hidden"
                id="bannerUpload"
              />
              <label
                htmlFor="bannerUpload"
                className="cursor-pointer text-gray-500"
              >
                Click to upload or drag and drop <br />
                <span className="text-xs">PNG, JPG, GIF (MAX. 5MB)</span>
              </label>
              {formData.bannerImage && (
                <p className="mt-2 text-sm text-gray-600">
                  {formData.bannerImage.name}
                </p>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              DESCRIPTION <span className="text-red-500">*</span>
            </label>
            <textarea
              rows="5"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write about the service"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-indigo-200"
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex justify-between pt-4 border-t">
            <Link href={"/dashboard/categories/service"}>
              <button
                type="button"
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md shadow hover:bg-gray-300"
              >
                Back
              </button>
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-gradient-to-b from-[#19203c] via-[#3b3b5f] to-[#1e1e30] text-white rounded cursor-pointer disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Create Service"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSubCategoryService;
