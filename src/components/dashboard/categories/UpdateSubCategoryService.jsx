"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { uploadToCloudinaryClient } from "@/utils/uploadToCloudinaryClient";
import toast from "react-hot-toast";

const UpdateSubCategoryService = ({ serviceId }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    serviceName: "",
    description: "",
    bannerImg: "", // store uploaded image url
  });
  const [preview, setPreview] = useState(""); // preview image
  const [uploading, setUploading] = useState(false);

  // fetch sub-category service data
  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await fetch(`/api/sub-categories/services/${serviceId}`);
        const result = await res.json();
        if (result.success) {
          setFormData({
            serviceName: result.data.serviceName || "",
            description: result.data.description || "",
            bannerImg: result.data.bannerImg || "",
          });
          setPreview(result.data.bannerImg || "");
        }
      } catch (error) {
        console.error("Error fetching service:", error);
      }
    };
    fetchService();
  }, [serviceId]);

  // input change (text only)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // handle image upload
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadToCloudinaryClient(file);
      setFormData((prev) => ({ ...prev, bannerImg: url }));
      setPreview(url);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Image upload failed!");
    } finally {
      setUploading(false);
    }
  };

  // update submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `/api/sub-categories/services/update/${serviceId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (data.success) {
        toast.success("Sub-Category Service updated successfully!");
        router.push("/dashboard/categories/service");
      } else {
        toast.error(data.error || "Error updating service");
      }
    } catch (error) {
      console.error("Error updating service:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-orange-100">
        {/* Header */}
        <div className="bg-gradient-to-b from-[#19203c] via-[#3b3b5f] to-[#1e1e30]  p-6 text-white">
          <h1 className="text-3xl font-bold">Update Sub-Category Service</h1>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Service Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Service Name *
            </label>
            <input
              type="text"
              name="serviceName"
              value={formData.serviceName}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full rounded-lg border p-3"
            />
          </div>

          {/* Banner Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Banner Image
            </label>
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-40 h-40 object-cover rounded-lg mb-4 border"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 
                file:px-4 file:rounded-lg file:border-0 
                file:text-sm file:font-semibold 
                file:bg-[#19203c] file:text-white 
                hover:file:bg-[#2d365f]"
            />
            {uploading && (
              <p className="text-sm text-gray-500 mt-2">Uploading...</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-between pt-6 border-t">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 border rounded-lg bg-white text-gray-700"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={uploading}
              className={`px-6 py-3 rounded-lg ${
                uploading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-b from-[#19203c] via-[#3b3b5f] to-[#1e1e30]"
              } text-white`}
            >
              {uploading ? "Uploading..." : "Update Service"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateSubCategoryService;
