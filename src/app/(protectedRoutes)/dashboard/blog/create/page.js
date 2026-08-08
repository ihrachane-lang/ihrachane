"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import { FaArrowLeft, FaCloudUploadAlt, FaSearch } from "react-icons/fa";

export default function CreateBlogPostPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingOg, setUploadingOg] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "Sourcing",
    excerpt: "",
    content: "",
    coverImage: "",
    tags: "",
    readTimeMinutes: 5,
    status: "draft",
    // SEO Fields
    metaTitle: "",
    metaDescription: "",
    keywords: "",
    ogImage: "",
    canonicalUrl: "",
  });

  const categoriesList = [
    "Sourcing",
    "Logistics",
    "Quality Control",
    "Import Guides",
    "Freight Shipping",
    "China Warehousing",
    "Industry News",
    "General",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      // Auto fill metaTitle if empty when title changes
      if (name === "title" && !prev.metaTitle) {
        updated.metaTitle = value;
      }
      // Auto fill metaDescription if empty when excerpt changes
      if (name === "excerpt" && !prev.metaDescription) {
        updated.metaDescription = value;
      }
      return updated;
    });
  };

  const handleImageUpload = async (file, field) => {
    if (!file) return;
    const isOg = field === "ogImage";
    if (isOg) setUploadingOg(true);
    else setUploadingCover(true);

    try {
      const body = new FormData();
      body.append("file", file);

      const res = await fetch("/api/blog/upload", {
        method: "POST",
        body,
      });

      const data = await res.json();
      if (data.success && data.url) {
        setFormData((prev) => ({
          ...prev,
          [field]: data.url,
          ...(!prev.ogImage && field === "coverImage" ? { ogImage: data.url } : {}),
        }));
        toast.success("Image uploaded successfully!");
      } else {
        toast.error(data.error || "Image upload failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error uploading image");
    } finally {
      if (isOg) setUploadingOg(false);
      else setUploadingCover(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.excerpt || !formData.content || !formData.coverImage) {
      toast.error("Please fill in all required fields (Title, Excerpt, Content, Cover Image)");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Blog post created successfully!");
        router.push("/dashboard/blog");
      } else {
        toast.error(data.error || "Failed to create post");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error saving blog post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#19203c] via-[#3b3b5f] to-[#1e1e30] text-white p-6 rounded-2xl shadow-xl flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Create New Blog Article</h1>
          <p className="text-gray-300 text-sm mt-1">
            Write content and configure custom SEO metadata for Google search optimization.
          </p>
        </div>
        <button
          onClick={() => router.back()}
          className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl transition flex items-center gap-2 text-sm"
        >
          <FaArrowLeft /> Back to List
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Main Content Card */}
        <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 space-y-6">
          <h2 className="text-xl font-bold text-gray-800 border-b pb-3">
            Article Details
          </h2>

          {/* Title & Category */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Article Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., Ultimate Guide to Factory Inspection in China"
                className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-[#19203c] focus:outline-none"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-[#19203c] focus:outline-none bg-white"
              >
                {categoriesList.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Excerpt */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Short Excerpt / Summary <span className="text-red-500">*</span>
            </label>
            <textarea
              name="excerpt"
              rows={3}
              value={formData.excerpt}
              onChange={handleInputChange}
              placeholder="Provide a compelling 2-3 sentence overview of this article..."
              className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-[#19203c] focus:outline-none"
              required
            />
          </div>

          {/* Cover Image Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Cover Featured Image <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="relative w-full sm:w-64 h-36 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 overflow-hidden flex items-center justify-center">
                {formData.coverImage ? (
                  <Image
                    src={formData.coverImage}
                    alt="Cover preview"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="text-center text-gray-400 p-4">
                    <FaCloudUploadAlt className="mx-auto text-3xl mb-1" />
                    <span className="text-xs">No image selected</span>
                  </div>
                )}
              </div>

              <div className="space-y-2 flex-1 w-full">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e.target.files[0], "coverImage")}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#19203c] file:text-white hover:file:bg-[#2c3355]"
                />
                <p className="text-xs text-gray-500">Or paste image URL directly:</p>
                <input
                  type="url"
                  name="coverImage"
                  value={formData.coverImage}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full rounded-lg border border-gray-300 p-2 text-sm focus:outline-none"
                />
                {uploadingCover && (
                  <p className="text-xs text-blue-600 font-medium animate-pulse">
                    Uploading image to Cloudinary...
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Main Article Content */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Article Content (HTML / Markdown / Text) <span className="text-red-500">*</span>
            </label>
            <textarea
              name="content"
              rows={14}
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Write or paste your article content here (HTML tags like <h3>, <p>, <ul>, <strong> supported)..."
              className="w-full rounded-lg border border-gray-300 p-4 font-mono text-sm focus:ring-2 focus:ring-[#19203c] focus:outline-none"
              required
            />
          </div>

          {/* Tags & Read Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Tags (Comma separated)
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                placeholder="e.g., Sourcing, China, Inspection, Shipping"
                className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Estimated Read Time (Minutes)
              </label>
              <input
                type="number"
                name="readTimeMinutes"
                min={1}
                max={60}
                value={formData.readTimeMinutes}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* DEDICATED SEO SETTINGS BOX */}
        <div className="bg-gradient-to-br from-slate-50 to-blue-50/50 p-6 rounded-2xl shadow-xl border border-blue-100 space-y-6">
          <div className="flex items-center gap-3 border-b border-blue-200 pb-3">
            <div className="p-2.5 bg-[#19203c] text-white rounded-xl">
              <FaSearch className="text-lg" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Search Engine Optimization (SEO) & Social Sharing
              </h2>
              <p className="text-xs text-gray-600">
                Customize how this article appears in Google Search results and social media cards.
              </p>
            </div>
          </div>

          {/* Meta Title */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-semibold text-gray-800">
                SEO Meta Title
              </label>
              <span
                className={`text-xs ${
                  formData.metaTitle.length > 60
                    ? "text-red-500 font-semibold"
                    : "text-gray-500"
                }`}
              >
                {formData.metaTitle.length}/60 chars (Recommended: 50-60)
              </span>
            </div>
            <input
              type="text"
              name="metaTitle"
              value={formData.metaTitle}
              onChange={handleInputChange}
              placeholder="Optimized Title for Google Search"
              className="w-full rounded-lg border border-gray-300 p-3 bg-white focus:ring-2 focus:ring-[#19203c] focus:outline-none"
            />
          </div>

          {/* Meta Description */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-semibold text-gray-800">
                SEO Meta Description
              </label>
              <span
                className={`text-xs ${
                  formData.metaDescription.length > 160
                    ? "text-red-500 font-semibold"
                    : "text-gray-500"
                }`}
              >
                {formData.metaDescription.length}/160 chars (Recommended: 120-160)
              </span>
            </div>
            <textarea
              name="metaDescription"
              rows={3}
              value={formData.metaDescription}
              onChange={handleInputChange}
              placeholder="Summarize key takeaways for Google snippet preview..."
              className="w-full rounded-lg border border-gray-300 p-3 bg-white focus:ring-2 focus:ring-[#19203c] focus:outline-none"
            />
          </div>

          {/* Keywords & OG Image */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-800">
                SEO Keywords (Comma Separated)
              </label>
              <input
                type="text"
                name="keywords"
                value={formData.keywords}
                onChange={handleInputChange}
                placeholder="factory audit, china sourcing, quality inspection"
                className="w-full rounded-lg border border-gray-300 p-3 bg-white focus:outline-none"
              />
              <p className="text-xs text-gray-500">
                Internal search & topical index tags for keyword mapping.
              </p>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-800">
                Social Share Image (OG Image)
              </label>
              <input
                type="text"
                name="ogImage"
                value={formData.coverImage}
                onChange={handleInputChange}
                placeholder="Image URL for Facebook / Twitter preview card"
                className="w-full rounded-lg border border-gray-300 p-3 bg-white focus:outline-none"
              />
            </div>
          </div>

          {/* Search Snippet Live Preview Box */}
          <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-inner space-y-1">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Google Search Result Snippet Preview
            </p>
            <p className="text-xs text-gray-600 truncate">
              https://www.ihrachane.com › blog › {formData.title ? "your-title-slug" : "slug"}
            </p>
            <h4 className="text-lg text-blue-800 font-medium truncate hover:underline cursor-pointer">
              {formData.metaTitle || formData.title || "Article Title Preview"} | IHRACHANE
            </h4>
            <p className="text-sm text-gray-600 line-clamp-2">
              {formData.metaDescription ||
                formData.excerpt ||
                "Your meta description preview will appear here in Google search snippet."}
            </p>
          </div>
        </div>

        {/* Publishing Bar */}
        <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-gray-700">Status:</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, status: "draft" }))}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
                  formData.status === "draft"
                    ? "bg-amber-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Draft
              </button>
              <button
                type="button"
                onClick={() => setFormData((prev) => ({ ...prev, status: "published" }))}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
                  formData.status === "published"
                    ? "bg-green-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Publish Now
              </button>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-2.5 rounded-xl bg-gradient-to-r from-[#19203c] via-[#3b3b5f] to-[#1e1e30] text-white font-semibold shadow-lg hover:opacity-95 transition text-sm disabled:opacity-50"
            >
              {loading ? "Saving Article..." : "Save & Submit"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
