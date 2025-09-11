"use client";

import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { useEffect, useState } from "react";
import { getData } from "@/utils/axiosPublic";
import axios from "axios";
import Link from "next/link";

const ServiceTable = () => {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    limit: 5,
  });

  const [open, setOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);

  const fetchData = async (page = 1, limit = 5) => {
    try {
      const  res  = await getData(
        `/api/services?page=${page}&limit=${limit}`
      );
      setData(res?.data || []);
      setPagination({
        currentPage: res?.meta?.currentPage,
        totalPages: res?.meta?.totalPages,
        limit: res?.meta?.limit,
      });
    } catch (err) {
      console.error("Failed to fetch data:", err);
    }
  };

  useEffect(() => {
    fetchData(pagination.currentPage, pagination.limit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/services/delete/${deleteItem._id}`);
      setData((prev) => prev.filter((item) => item._id !== deleteItem._id));
    } catch (error) {
      console.error("Delete failed", error);
    } finally {
      setOpen(false);
      setDeleteItem(null);
    }
  };

  const openModal = (item) => {
    setDeleteItem(item);
    setOpen(true);
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= pagination.totalPages) {
      fetchData(page, pagination.limit);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              SL. NO
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              TITLE
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              ACTION
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data?.map((item, index) => (
            <tr key={item?._id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {(pagination.currentPage - 1) * pagination.limit + index + 1}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{item?.title}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap flex gap-2 justify-center">
              <Link
                  href={`/dashboard/services/${item._id}`}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-300 w-fit"
                >
                  <CiEdit className="text-sm text-gray-900" />
                </Link>
                <div
                  onClick={() => openModal(item)}
                  className="p-2 rounded-full bg-gray-100 hover:bg-red-300 w-fit "
                >
                  <AiOutlineDelete className="text-sm text-gray-900" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-4 gap-2">
        <button
          onClick={() => handlePageChange(pagination.currentPage - 1)}
          disabled={pagination.currentPage === 1}
          className="px-3 py-1 rounded border text-sm disabled:opacity-50"
        >
          Previous
        </button>

        {[...Array(pagination.totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`px-3 py-1 rounded border text-sm ${
              pagination.currentPage === i + 1
                ? "bg-gray-500 text-white"
                : "bg-white"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(pagination.currentPage + 1)}
          disabled={pagination.currentPage === pagination.totalPages}
          className="px-3 py-1 rounded border text-sm disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Delete Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Delete Service
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Are you sure you want to delete{" "}
              <span className="font-medium text-gray-900">
                {deleteItem?.title}
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

export default ServiceTable;
