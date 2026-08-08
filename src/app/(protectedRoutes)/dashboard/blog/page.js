"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { FaPlus, FaEdit, FaTrash, FaEye, FaSearch } from "react-icons/fa";

export default function BlogManagementPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/blog?limit=100");
      const data = await res.json();
      if (data.success) {
        setPosts(data.data || []);
      } else {
        toast.error("Failed to load blog posts");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching blog posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id, title) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const res = await fetch(`/api/blog/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        toast.success("Blog post deleted!");
        setPosts((prev) => prev.filter((p) => p._id !== id));
      } else {
        toast.error(data.error || "Failed to delete");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error deleting post");
    }
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      selectedStatus === "All" || post.status === selectedStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-[#19203c] via-[#3b3b5f] to-[#1e1e30] text-white p-6 rounded-2xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Blog Management</h1>
          <p className="text-gray-300 text-sm mt-1">
            Manage your articles, news, and SEO metadata settings.
          </p>
        </div>
        <Link
          href="/dashboard/blog/create"
          className="bg-slate-500 hover:bg-slate-600 text-white font-medium px-5 py-2.5 rounded-xl transition flex items-center gap-2 shadow-lg"
        >
          <FaPlus /> Create New Post
        </Link>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full sm:w-80">
          <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by title or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#19203c]"
          />
        </div>

        <div className="flex gap-2">
          {["All", "Published", "Draft"].map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
                selectedStatus === status
                  ? "bg-[#19203c] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Posts Table */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-500">
            Loading articles...
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            No blog posts found. Click <strong>&quot;Create New Post&quot;</strong> to write your first article.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-700 uppercase text-xs tracking-wider border-b border-gray-200">
                  <th className="p-4">Post</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">SEO Metadata</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-sm">
                {filteredPosts.map((post) => (
                  <tr key={post._id} className="hover:bg-gray-50 transition">
                    <td className="p-4 flex items-center gap-3">
                      <div className="relative w-16 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        {post.coverImage ? (
                          <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200" />
                        )}
                      </div>
                      <div>
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          className="font-semibold text-gray-900 hover:text-orange-600 line-clamp-1"
                        >
                          {post.title}
                        </Link>
                        <p className="text-xs text-gray-500 line-clamp-1">
                          /blog/{post.slug}
                        </p>
                      </div>
                    </td>
                    <td className="p-4 font-medium text-gray-700">
                      <span className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">
                        {post.category}
                      </span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                          post.status === "published"
                            ? "bg-green-100 text-green-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {post.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="text-xs space-y-1">
                        <p className="text-gray-700">
                          <span className="font-semibold">Meta Title:</span>{" "}
                          {post.seo?.metaTitle ? "Set" : "Default"}
                        </p>
                        <p className="text-gray-500">
                          <span className="font-semibold">Keywords:</span>{" "}
                          {post.seo?.keywords?.length || 0} items
                        </p>
                      </div>
                    </td>
                    <td className="p-4 text-gray-500 text-xs">
                      {new Date(
                        post.publishedAt || post.createdAt
                      ).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        {post.status === "published" && (
                          <Link
                            href={`/blog/${post.slug}`}
                            target="_blank"
                            className="p-2 text-gray-600 hover:text-blue-600 bg-gray-100 hover:bg-blue-50 rounded-lg transition"
                            title="Preview Post"
                          >
                            <FaEye />
                          </Link>
                        )}
                        <Link
                          href={`/dashboard/blog/edit/${post._id}`}
                          className="p-2 text-gray-600 hover:text-green-600 bg-gray-100 hover:bg-green-50 rounded-lg transition"
                          title="Edit Post & SEO"
                        >
                          <FaEdit />
                        </Link>
                        <button
                          onClick={() => handleDelete(post._id, post.title)}
                          className="p-2 text-gray-600 hover:text-red-600 bg-gray-100 hover:bg-red-50 rounded-lg transition"
                          title="Delete Post"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
