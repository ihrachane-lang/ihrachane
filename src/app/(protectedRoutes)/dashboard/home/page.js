"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { uploadToCloudinaryClient } from "@/utils/uploadToCloudinaryClient";
import Image from "next/image";

const UpdatePostForm = () => {
  const [formData, setFormData] = useState({
    slug: "",
    title: "",
    description: "",
    image: "",
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch existing post
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/home/hero");
        if (!res.ok) return; // No post yet
        const data = await res.json();
        setFormData({
          slug: data.slug || "",
          title: data.title || "",
          description: data.description || "",
          image: data.image || "",
        });
      } catch (err) {
        console.error("Error fetching post:", err);
      }
    }
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      let imageUrl = formData.image;

      // Upload new image if selected
      if (file) {
        imageUrl = await uploadToCloudinaryClient(file);
      }

      const payload = {
        slug: formData.slug,
        title: formData.title,
        description: formData.description,
        image: imageUrl,
      };

      const res = await fetch("/api/home/hero/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Something went wrong");

      toast.success("Post saved successfully!");
      setFormData((prev) => ({ ...prev, image: imageUrl }));
      setFile(null);
      setMessage(data.message);
    } catch (err) {
      console.error(err);
      toast.error(err.message);
      setMessage("❌ Error while saving post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-b from-[#19203c] via-[#3b3b5f] to-[#1e1e30] p-5">
          <h1 className="text-2xl font-semibold text-white text-center">
            Update Hero Section
          </h1>
          <p className="text-sm text-orange-100 text-center">
            Add or update your hero section details below
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Slug */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Slug
            </label>
            <input
              type="text"
              name="slug"
              value={formData?.slug}
              onChange={handleChange}
              className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-3"
              placeholder="Enter Slug"
            />
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData?.title}
              onChange={handleChange}
              className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-3"
              placeholder="Enter Title"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData?.description}
              onChange={handleChange}
              rows={4}
              className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-3"
              placeholder="Enter Description"
            />
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image
            </label>
            {formData?.image && (
              <Image
                width={80}
                height={50}
                src={formData?.image}
                alt="Preview"
                className="mb-2 w-32 h-32 object-cover rounded"
              />
            )}
            <input
              className="bg-gray-300 p-4 rounded-lg w-full"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          {/* Submit */}
          <div className="pt-4 border-t flex justify-between items-center">
            <p className="text-sm text-gray-600">{message}</p>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-b from-[#19203c] via-[#3b3b5f] to-[#1e1e30] hover:opacity-90 cursor-pointer disabled:opacity-50"
            >
              {loading ? "Saving..." : "Submit ✓"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePostForm;
