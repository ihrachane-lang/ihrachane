"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { uploadToCloudinaryClient } from "@/utils/uploadToCloudinaryClient";
import toast from "react-hot-toast";

const PartnerUpdate = ({ partnerId }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    partnerName: "",
    partnerLogo: "",
  });
  const [logoFile, setLogoFile] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch existing partner data
  useEffect(() => {
    async function fetchPartner() {
      try {
        const res = await fetch(`/api/partners/${partnerId}`);
        const data = await res.json();
        if (data.success) {
          setFormData({
            partnerName: data.data.partnerName,
            partnerLogo: data.data.partnerImage,
          });
        } else {
          toast.error(data.error || "Failed to fetch partner data");
        }
      } catch (error) {
        toast.error("Something went wrong while fetching partner data");
      }
    }
    fetchPartner();
  }, [partnerId]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setLogoFile(files[0]);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let uploadedLogo = formData.partnerLogo;

      if (logoFile) {
        uploadedLogo = await uploadToCloudinaryClient(logoFile);
      }

      const res = await fetch(`/api/partners/update/${partnerId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          partnerName: formData.partnerName,
          partnerImage: uploadedLogo,
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Partner updated successfully!");
        router.push("/dashboard/partner");
      } else {
        toast.error(data.error || "Failed to update partner");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto shadow-md rounded-lg overflow-hidden bg-white">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#19203c] via-[#3b3b5f] to-[#1e1e30] p-5">
        <h1 className="text-2xl font-semibold text-white">Update Partner</h1>
        <p className="text-sm text-orange-100">
          Edit partner details and update their logo
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Partner Name */}
        <div>
          <label
            htmlFor="partnerName"
            className="block text-sm font-medium text-gray-700 mb-2"
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

          <div className="flex justify-center">
            <label className="flex flex-col items-center justify-center w-full max-w-md h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 overflow-hidden">
              <div className="flex flex-col items-center justify-center pt-5 pb-2">
                <svg
                  className="w-8 h-8 mb-2 text-gray-400"
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
                <p className="mb-1 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500">JPG only (Max 5MB)</p>
              </div>

              {/* Image Preview */}
              <div className="w-full flex justify-center mt-2">
                {logoFile ? (
                  <img
                    src={URL.createObjectURL(logoFile)}
                    alt="Preview"
                    className="h-24 w-24 object-cover rounded-md"
                  />
                ) : formData.partnerLogo ? (
                  <img
                    src={formData.partnerLogo}
                    alt="Current Logo"
                    className="h-24 w-24 object-cover rounded-md"
                  />
                ) : null}
              </div>

              <input
                type="file"
                name="partnerLogo"
                className="hidden"
                accept=".jpg,.jpeg"
                onChange={handleChange}
              />
            </label>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between pt-4 border-t">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            ← Back
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-b from-[#19203c] via-[#3b3b5f] to-[#1e1e30]"
          >
            {loading ? "Updating..." : "Update Partner ✓"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PartnerUpdate;
