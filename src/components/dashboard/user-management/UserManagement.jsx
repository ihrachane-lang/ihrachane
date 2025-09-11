"use client";

import { getData } from "@/utils/axiosPublic";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [meta, setMeta] = useState({}); // pagination metadata
  const [page, setPage] = useState(1);
  const limit = 5;

  const [open, setOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const res = await getData(`/api/users?page=${page}&limit=${limit}`);
      setUsers(res?.data || []);
      setMeta(res?.meta || {});
    }
    fetchData();
  }, [page]);

  // ✅ Role update handler
  const handleRoleChange = async (id, newRole) => {
    try {
      const res = await axios.put(`/api/users/update-role/${id}`, {
        role: newRole,
      });

      if (res?.data?.success) {
        // frontend state update
        setUsers((prev) =>
          prev.map((user) =>
            user._id === id ? { ...user, role: newRole } : user
          )
        );
        toast.success("User role updated successfully!");
      } else {
        toast.error(res?.data?.error || "Something went wrong!");
      }
    } catch (error) {
      toast.error(error?.response?.data?.error || "Failed to update role!");
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= meta.totalPages) {
      setPage(newPage);
    }
  };

  const handleDelete = async () => {
    // return // console.log(deleteItem?._id);
    try {
      await axios.delete(`/api/users/delete/${deleteItem?._id}`);
      setUsers((prev) => prev.filter((item) => item?._id !== deleteItem?._id));
    } catch (error) {
      toast.error("Delete failed", error.message);
    } finally {
      setOpen(false);
      setDeleteItem(null);
    }
  };

  const openModal = (item) => {
    // // console.log(item);
    setDeleteItem(item);
    setOpen(true);
  };

  return (
    <div className="p-6 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">User Management</h2>

      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50 text-gray-600 text-sm uppercase">
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3">Verified</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr
                key={user?._id}
                className="border-b last:border-none hover:bg-gray-50"
              >
                {/* Avatar + Name + Email */}
                <td className="px-6 py-4 flex items-center gap-3">
                  <div>
                    <p className="font-medium text-gray-800">{user?.name}</p>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                  </div>
                </td>

                {/* Role dropdown */}
                <td className="px-6 py-4">
                  <select
                    value={user?.role}
                    onChange={(e) =>
                      handleRoleChange(user?._id, e.target.value)
                    }
                    className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                    <option value="super_admin">Super Admin</option>
                  </select>
                </td>

                {/* Verified */}
                <td className="px-6 py-4 text-gray-600">
                  {user?.verified ? "True" : "False"}
                </td>

                {/* Actions */}
                <td className="px-6 py-4 flex justify-end gap-3">
                  <div
                    onClick={() => openModal(user)}
                    className="p-2 rounded-full bg-gray-100 hover:bg-red-200 w-fit "
                  >
                    <AiOutlineDelete className="text-sm text-gray-900" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-6 gap-3">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="px-3 py-1 bg-gray-200 rounded-md disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {page} of {meta?.totalPages || 1}
        </span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === meta?.totalPages}
          className="px-3 py-1 bg-gray-200 rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Delete Testimonial
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Are you sure you want to delete{" "}
              <span className="font-medium text-gray-900">
                {deleteItem?.companyName}
              </span>
              ? This action cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm font-semibold hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
