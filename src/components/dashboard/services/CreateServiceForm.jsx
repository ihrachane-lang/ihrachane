"use client";

import { getClientUser } from "@/utils/getClientUser";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const CreateServiceForm = () => {
  const { user } = getClientUser();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    creatorInfo: user?.id,
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await axios.post("/api/services/create", formData);
    if (data.success) {
      toast.success("Service Added Successfully");
      router.push("/dashboard/services");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-lg max-w-2xl w-full overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-b from-[#19203c] via-[#3b3b5f] to-[#1e1e30] px-6 py-4">
          <h1 className="text-xl font-semibold text-white">
            Create New Service
          </h1>
          <p className="text-sm text-gray-200">
            Add a new service to your platform
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
              value={formData.description}
              onChange={handleChange}
              rows={4}
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
              className="px-6 py-2 bg-gradient-to-b from-[#19203c] via-[#3b3b5f] to-[#1e1e30] text-white rounded-md shadow cursor-pointer"
            >
              Submit
            </button>
          </div>
        </form>

        {/* Footer */}
        <footer className="py-4 text-center text-sm text-gray-500 border-t">
          2024 © Irhachan
        </footer>
      </div>
    </div>
  );
};

export default CreateServiceForm;
