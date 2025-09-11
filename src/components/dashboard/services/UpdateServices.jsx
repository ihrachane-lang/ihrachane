"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import toast from "react-hot-toast";

const UpdateServices = () => {
  const router = useRouter();
  const params = useParams(); // Next.js route params
  const { id } = params; // service id from URL

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  // Fetch existing service data
  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await fetch(`/api/services/${id}`);
        const data = await res.json();
        if (data.success) {
          setFormData({
            title: data.data.title,
            description: data.data.description,
          });
        } else {
          toast.error(data.error || "Failed to load service");
        }
      } catch (err) {
        toast.error("Something went wrong while fetching service");
      }
    };

    if (id) fetchService();
  }, [id]);

  // Handle form input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit (Update service)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/services/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success("Service updated successfully!");
        router.push("/dashboard/services"); // redirect to services list page
      } else {
        toast.error(data.error || "Update failed");
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="shadow-lg rounded-lg max-w-2xl w-full overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-b from-[#19203c] via-[#3b3b5f] to-[#1e1e30] px-6 py-4">
          <h1 className="text-xl font-semibold text-white">Update Service</h1>
          <p className="text-sm text-gray-200">
            Modify your existing service details
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Service Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              SERVICE TITLE <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring focus:ring-indigo-200"
              placeholder="Enter Service Title"
            />
          </div>

          {/* Service Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              SERVICE DESCRIPTION <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring focus:ring-indigo-200"
              placeholder="Enter Service Paragraph Text"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between pt-4 border-t">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md shadow hover:bg-gray-300 cursor-pointer"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-gradient-to-b from-[#19203c] via-[#3b3b5f] to-[#1e1e30] text-white rounded-md shadow cursor-pointer disabled:opacity-50"
            >
              {loading ? "Updating..." : "Submit"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default UpdateServices;
