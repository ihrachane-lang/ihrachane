"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { uploadToCloudinaryClient } from "@/utils/uploadToCloudinaryClient"; // same helper you already made
import toast from "react-hot-toast";

const CreatePartnerForm = () => {
  const [formData, setFormData] = useState({
    partnerName: "",
    partnerLogo: null,
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const router = useRouter();

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
    if (!formData.partnerName.trim()) {
      setErrorMsg("Partner name is required!");
      return false;
    }
    if (!formData.partnerLogo) {
      setErrorMsg("Partner logo is required!");
      return false;
    }
    setErrorMsg("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      // Step 1: Upload logo to Cloudinary
      const imageUrl = await uploadToCloudinaryClient(formData.partnerLogo);

      // Step 2: Send partner data to backend
      const res = await axios.post("/api/partners/create", {
        partnerName: formData.partnerName,
        partnerImage: imageUrl,
      });

      if (res?.data?.success) {
        toast.success("Partner Added Successfully");
        setSuccessMsg("✅ Partner created successfully!");
        router.push("/dashboard/partner");
      }

      // Reset form
      setFormData({
        partnerName: "",
        partnerLogo: null,
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
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden ">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#19203c] via-[#3b3b5f] to-[#1e1e30] p-5">
        <h1 className="text-2xl font-semibold text-white">
          Create New Partner
        </h1>
        <p className="text-sm text-orange-100">
          Add partner details and upload their logo
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Show error/success */}
        {errorMsg && <p className="text-red-600">{errorMsg}</p>}
        {successMsg && <p className="text-green-600">{successMsg}</p>}

        {/* Partner Name */}
        <div>
          <label
            htmlFor="partnerName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            PARTNER NAME <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="partnerName"
            name="partnerName"
            value={formData.partnerName}
            onChange={handleChange}
            className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-3"
            placeholder="Enter Partner Name"
            required
          />
        </div>

        {/* Partner Logo Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            PARTNER LOGO (300×250) <span className="text-red-500">*</span>
          </label>

          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6H16a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500">JPG only (Max 5MB)</p>
              </div>
              <input
                type="file"
                name="partnerLogo"
                onChange={handleChange}
                className="hidden"
                accept=".jpg,.jpeg"
              />
            </label>
          </div>

          {formData.partnerLogo && (
            <p className="mt-2 text-sm text-gray-600">
              Selected file:{" "}
              <span className="font-medium">{formData.partnerLogo.name}</span>
            </p>
          )}
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
            className="px-6 py-2 text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-b from-[#19203c] via-[#3b3b5f] to-[#1e1e30] cursor-pointer disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit ✓"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePartnerForm;
