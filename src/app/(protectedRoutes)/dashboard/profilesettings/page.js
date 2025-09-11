"use client";
import { getData } from "@/utils/axiosPublic";
import { getClientUser } from "@/utils/getClientUser";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ProfileSettings = () => {
  const { user } = getClientUser();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  // password states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    async function fetchData() {
      const { data: res } = await getData(`/api/users/${user.id}`);
      setData(res);
    }
    if (user?.id) fetchData();
  }, [user]);

  // 🔹 handle profile info update
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data: res } = await axios.put(`/api/users/update/${user.id}`, {
        name: e.target.name.value,
        email: e.target.email.value,
      });
      toast.success(res.message || "Profile updated successfully!");
      setData(res.data);
    } catch (error) {
      toast.error(error.response?.data?.error || "Update failed!");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 handle password update
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    setLoading(true);
    try {
      const { data: res } = await axios.post(
        `/api/users/change-password/${user.id}`,
        {
          currentPassword,
          newPassword,
        }
      );
      toast.success(res.message || "Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error(error.response?.data?.error || "Password update failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" max-w-6xl mx-auto space-y-8">
      {/* Profile Information */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-1">
          Profile Information
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Update your account’s profile information and email address.
        </p>

        <form className="space-y-5" onSubmit={handleProfileUpdate}>
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              defaultValue={data?.name}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              defaultValue={data?.email}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Save Button */}
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2 bg-gray-500 text-white rounded-md shadow hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? "Saving..." : "SAVE"}
          </button>
        </form>
      </div>

      {/* Update Password */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-1">
          Update Password
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Ensure your account is using a long, random password to stay secure.
        </p>

        <form className="space-y-5" onSubmit={handlePasswordUpdate}>
          {/* Current Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Password
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Save Button */}
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2 bg-gray-500 text-white rounded-md shadow hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? "Saving..." : "SAVE"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileSettings;
