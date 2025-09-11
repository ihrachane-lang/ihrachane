"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { uploadToCloudinaryClient } from "@/utils/uploadToCloudinaryClient";
import toast from "react-hot-toast";

const UpdateClient = ({ clientId }) => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    clientName: "",
    clientLogo: "",
  });

  const [loading, setLoading] = useState(false);
  const [logoFile, setLogoFile] = useState(null);

  // Fetch existing client data
  useEffect(() => {
    async function fetchClient() {
      try {
        const res = await fetch(`/api/clients/${clientId}`);
        const data = await res.json();
        if (data.success) {
          setFormData({
            clientName: data.data.name,
            clientLogo: data.data.img,
          });
        } else {
          toast.error(data.error || "Failed to fetch client data");
        }
      } catch (error) {
        toast.error("Something went wrong while fetching client data");
      }
    }

    fetchClient();
  }, [clientId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setLogoFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let uploadedLogo = formData.clientLogo;

      if (logoFile) {
        uploadedLogo = await uploadToCloudinaryClient(logoFile);
      }

      const res = await fetch(`/api/clients/update/${clientId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.clientName,
          img: uploadedLogo,
        }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Client updated successfully!");
        router.push("/dashboard/client");
      } else {
        toast.error(data.error || "Failed to update client");
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
        <h1 className="text-2xl font-semibold text-white">Update Client</h1>
        <p className="text-sm text-indigo-200">
          Modify client details and update their logo
        </p>
      </div>

      {/* Form */}
      <form className="p-6 space-y-6" onSubmit={handleSubmit}>
        {/* Client Name */}
        <div>
          <label
            htmlFor="clientName"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            CLIENT NAME <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="clientName"
            name="clientName"
            value={formData.clientName}
            onChange={handleChange}
            className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3"
            placeholder="Enter Client Name"
            required
          />
        </div>

        {/* Client Logo Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            CLIENT LOGO (300×250) <span className="text-red-500">*</span>
          </label>

          <div className="flex justify-center">
            <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 overflow-hidden">
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
                ) : formData.clientLogo ? (
                  <img
                    src={formData.clientLogo}
                    alt="Current Logo"
                    className="h-24 w-24 object-cover rounded-md"
                  />
                ) : null}
              </div>

              <input
                type="file"
                name="clientLogo"
                className="hidden"
                accept=".jpg,.jpeg"
                onChange={handleFileChange}
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
            {loading ? "Updating..." : "Update Client ✓"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateClient;
