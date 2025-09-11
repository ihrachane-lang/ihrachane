"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const CreateClientForm = () => {
  const [formData, setFormData] = useState({
    clientName: "",
    clientLogo: null,
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
  };

  return (
    <div className="max-w-3xl mx-auto  shadow-md rounded-lg overflow-hidden ">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#19203c] via-[#3b3b5f] to-[#1e1e30] p-5">
        <h1 className="text-2xl font-semibold text-white">
          Create New Client
        </h1>
        <p className="text-sm text-indigo-200">
          Add a new client to showcase in your portfolio
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Client Name */}
        <div>
          <label
            htmlFor="clientName"
            className="block text-sm font-medium text-gray-700 mb-1"
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
            placeholder="e.g., Microsoft"
            required
          />
        </div>

        {/* Client Logo Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            CLIENT LOGO (300×250) <span className="text-red-500">*</span>
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
                <p className="text-xs text-gray-500">
                  JPG only (Max 5MB)
                </p>
              </div>
              <input
                type="file"
                name="clientLogo"
                onChange={handleChange}
                className="hidden"
                accept=".jpg,.jpeg"
              />
            </label>
          </div>

          {/* Preview */}
          {formData.clientLogo && (
            <p className="mt-2 text-sm text-gray-600">
              Selected: {formData.clientLogo.name}
            </p>
          )}
        </div>

        {/* Footer Buttons */}
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
            className="px-6 py-2 text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-b from-[#19203c] via-[#3b3b5f] to-[#1e1e30] cursor-pointer"
          >
            Create Client ✓
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateClientForm;
