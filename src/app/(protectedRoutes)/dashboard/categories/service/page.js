"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { getData } from "@/utils/axiosPublic"; // তোমার axios wrapper
import axios from "axios";

const SubCategoryServicePage = () => {
  const [data, setData] = useState([]);

  const [open, setOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    limit: 5,
  });

  // Fetch data from API
  const fetchData = async (page = 1, limit = 5) => {
    try {
      const res = await getData(
        `/api/sub-categories/services?page=${page}&limit=${limit}`
      );

      setData(res?.data || []);
      setPagination({
        currentPage: res?.meta?.currentPage || 1,
        totalPages: res?.meta?.totalPages || 1,
        limit: res?.meta?.limit || 5,
      });
    } catch (error) {
      console.error("Failed to fetch sub-category services:", error);
    }
  };

  useEffect(() => {
    fetchData(pagination.currentPage, pagination.limit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePageChange = (page) => {
    if (page > 0 && page <= pagination.totalPages) {
      fetchData(page, pagination.limit);
    }
  };

  const handleDelete = async () => {
    // return // console.log(deleteItem?._id);
    try {
      await axios.delete(`/api/sub-categories/services/delete/${deleteItem._id}`);
      setData((prev) => prev.filter((item) => item._id !== deleteItem._id));
    } catch (error) {
      console.error("Delete failed", error);
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
    <div className="p-6 flex justify-center">
      {/* Card Wrapper */}
      <div className="bg-white shadow-md rounded-xl min-w-full p-6">
        {/* Header + Add Button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-700">
            Sub Category Service List
          </h2>
          <Link href={"/dashboard/categories/service/createService"}>
            <button className="bg-gradient-to-b from-[#19203c] via-[#3b3b5f] to-[#1e1e30]  cursor-pointer text-white px-4 py-2 rounded-lg shadow">
              Add Sub Category
            </button>
          </Link>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-gray-700">
            <thead>
              <tr className="text-gray-500 text-left border-b">
                <th className="px-6 py-3">SL. NO</th>
                <th className="px-6 py-3">NAME</th>
                <th className="px-6 py-3">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr
                  key={item?._id}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-100"
                  } hover:bg-gray-50 transition`}
                >
                  <td className="px-6 py-4">
                    {(pagination.currentPage - 1) * pagination.limit +
                      index +
                      1}
                  </td>
                  <td className="px-6 py-4">{item?.serviceName}</td>
                  <td className="px-6 py-4 flex gap-3">
                    <Link
                      href={`/dashboard/categories/service/${item?._id}`}
                      className="p-2 rounded-full bg-gray-100 w-fit hover:bg-gray-200"
                    >
                      <CiEdit className="text-sm text-gray-900" />
                    </Link>
                    <div
                      onClick={() => openModal(item)}
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
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Delete Sub-Category Service
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Are you sure you want to delete{" "}
              <span className="font-medium text-gray-900">
                {deleteItem?.serviceName}
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

export default SubCategoryServicePage;
