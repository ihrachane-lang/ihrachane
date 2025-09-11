"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { uploadToCloudinaryClient } from "@/utils/uploadToCloudinaryClient";
import toast from "react-hot-toast";

const UpdateSubCategory = ({ subCatId }) => {
  // // console.log(subCatId);
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    bannerImg: "",
  });

  const [uploading, setUploading] = useState(false);

  // fetch sub-category data
  useEffect(() => {
    const fetchSubCategory = async () => {
      try {
        const res = await fetch(`/api/sub-categories/${subCatId}`);
        const result = await res.json();

        if (result.success) {
          setFormData({
            title: result.data?.title || "",
            description: result.data?.description || "",
            bannerImg: result.data?.bannerImg || "",
          });
        }
      } catch (error) {
        console.error("Error fetching sub-category:", error);
      }
    };

    if (subCatId) fetchSubCategory();
  }, [subCatId]);

  // input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // image upload
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      const url = await uploadToCloudinaryClient(file);
      setFormData((prev) => ({ ...prev, bannerImg: url }));
      setUploading(false);
    } catch (error) {
      console.error("Upload failed:", error);
      setUploading(false);
      alert("Image upload failed!");
    }
  };

  // update submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // // console.log(formData);
    try {
      const res = await fetch(`/api/sub-categories/update/${subCatId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      // // console.log(data);
      if (data.success) {
        toast.success("Sub-category updated successfully!");
        router.push("/dashboard/categories/sub-list");
      } else {
        alert(data.error || "Error updating sub-category");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-orange-100">
        <div className="bg-gradient-to-b from-[#19203c] via-[#3b3b4f] to-[#1e1e30] p-6 text-white">
          <h1 className="text-3xl font-bold">Update Sub Category</h1>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              TITLE <span className="text-orange-600">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full rounded-lg border p-3 border-gray-300 shadow-sm"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              DESCRIPTION
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full rounded-lg border border-gray-300 shadow-sm p-3"
              placeholder="Write about this sub-category"
            />
          </div>

          {/* Banner Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              BANNER IMAGE
            </label>
            {formData.bannerImg && (
              <div className="mb-3">
                <img
                  src={formData.bannerImg}
                  alt="Banner"
                  className="h-32 w-full object-cover rounded-lg border"
                />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-2 bg-gray-200 rounded-md font-semibold"
            />
            {uploading && (
              <p className="text-sm text-blue-600 mt-2">Uploading image...</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-between pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 border border-gray-300 rounded-lg bg-white text-gray-700"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={uploading}
              className="px-6 py-3 rounded-lg bg-gradient-to-b from-[#19203c] via-[#3b3b5f] to-[#1e1e30] text-white disabled:opacity-50"
            >
              {uploading ? "Uploading..." : "Update Sub-Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateSubCategory;
