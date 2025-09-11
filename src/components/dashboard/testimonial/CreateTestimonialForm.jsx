"use client";

import { useState } from "react";
import axios from "axios";
import { uploadToCloudinaryClient } from "@/utils/uploadToCloudinaryClient";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { getClientUser } from "@/utils/getClientUser";

const CreateTestimonialForm = () => {
  const { user } = getClientUser();
  const [formData, setFormData] = useState({
    companyName: "",
    clientLogo: null,
    clientName: "",
    clientDesignation: "",
    clientFeedback: "",
    clientProfileImage: null,
  });

  const router = useRouter();

  const [loading, setLoading] = useState(false);

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
    if (!formData.companyName.trim()) return "Company Name is required";
    if (!formData.clientName.trim()) return "Client Name is required";
    if (!formData.clientFeedback.trim()) return "Client Feedback is required";
    if (!formData.clientLogo) return "Client Logo is required";
    if (!formData.clientProfileImage) return "Client Profile Image is required";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorMsg = validateForm();
    if (errorMsg) {
      alert(errorMsg);
      return;
    }

    try {
      setLoading(true);

      // --- Upload images to Cloudinary ---
      const logoUrl = await uploadToCloudinaryClient(formData.clientLogo);
      const profileUrl = await uploadToCloudinaryClient(
        formData.clientProfileImage
      );

      // --- Prepare payload ---
      const payload = {
        companyName: formData.companyName,
        companyLogo: logoUrl,
        clientImage: profileUrl,
        clientName: formData.clientName,
        clientDesignation: formData.clientDesignation,
        clientFeedback: formData.clientFeedback,
        creatorInfo: user?.id,
      };

      // --- Send to API ---
      const res = await axios.post("/api/testimonials/create", payload);

      if (res.data.success) {
        toast.success("Testimonial Added Successfully");

        setFormData({
          companyName: "",
          clientLogo: null,
          clientName: "",
          clientDesignation: "",
          clientFeedback: "",
          clientProfileImage: null,
        });

        router.push("/dashboard/testimonial");
      } else {
        toast.error("Failed to add testimonial");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong: " + err.message);
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
            Create New Testimonial
          </h1>
          <p className="text-sm text-orange-100 text-center">
            Fill the form below to add a new client testimonial
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Company Name */}
          <div>
            <label
              htmlFor="companyName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              COMPANY NAME
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-3"
              placeholder="Enter Company Name"
            />
          </div>

          {/* Client Logo Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CLIENT LOGO (300×30)
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-4 pb-4">
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
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500">JPG only (300×30)</p>
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
            {formData.clientLogo && (
              <p className="mt-2 text-sm text-gray-600">
                Selected file:{" "}
                <span className="font-medium">{formData.clientLogo.name}</span>
              </p>
            )}
          </div>

          {/* Client Name */}
          <div>
            <label
              htmlFor="clientName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              CLIENT NAME
            </label>
            <input
              type="text"
              id="clientName"
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
              className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-3"
              placeholder="Enter Client Name"
            />
          </div>

          {/* Client Designation */}
          <div>
            <label
              htmlFor="clientDesignation"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              CLIENT DESIGNATION
            </label>
            <input
              type="text"
              id="clientDesignation"
              name="clientDesignation"
              value={formData.clientDesignation}
              onChange={handleChange}
              className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-3"
              placeholder="Enter Client Designation"
            />
          </div>

          {/* Client Feedback */}
          <div>
            <label
              htmlFor="clientFeedback"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              CLIENT FEEDBACK
            </label>
            <textarea
              id="clientFeedback"
              name="clientFeedback"
              value={formData.clientFeedback}
              onChange={handleChange}
              rows={4}
              className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-3"
              placeholder="Enter Client Feedback"
            />
          </div>

          {/* Client Profile Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CLIENT PROFILE IMAGE (500×500)
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-4 pb-4">
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
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500">JPG only (500×500)</p>
                </div>
                <input
                  type="file"
                  name="clientProfileImage"
                  onChange={handleChange}
                  className="hidden"
                  accept=".jpg,.jpeg"
                />
              </label>
            </div>
            {formData.clientProfileImage && (
              <p className="mt-2 text-sm text-gray-600">
                Selected file:{" "}
                <span className="font-medium">
                  {formData.clientProfileImage.name}
                </span>
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-between pt-4 border-t">
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
            >
              ← Back
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-b from-[#19203c] via-[#3b3b5f] to-[#1e1e30] cursor-pointer"
            >
              {loading ? "Submitting..." : "Submit ✓"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTestimonialForm;
