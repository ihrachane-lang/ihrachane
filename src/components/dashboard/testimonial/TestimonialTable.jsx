"use client";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { useEffect, useState } from "react";
import { getData } from "@/utils/axiosPublic";
import axios from "axios";

const TestimonialTable = () => {
  const [data, setData] = useState([]);
  const [meta, setMeta] = useState({});
  const [page, setPage] = useState(1);
  const limit = 5; // items per page

  const [open, setOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const res = await getData(
        `/api/testimonials?page=${page}&limit=${limit}`
      );
      setData(res?.data || []);
      setMeta(res?.meta || {});
    }
    fetchData();
  }, [page]);

  const handleDelete = async () => {
    // return // console.log(deleteItem?._id);
    try {
      await axios.delete(`/api/testimonials/delete/${deleteItem?._id}`);
      setData((prev) => prev.filter((item) => item?._id !== deleteItem?._id));
    } catch (error) {
      console.error("Delete failed", error);
    } finally {
      setOpen(false);
      setDeleteItem(null);
    }
  };

  const openModal = (item) => {
    // console.log(item);
    setDeleteItem(item);
    setOpen(true);
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
              COMPANY NAME
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
                  {(page - 1) * limit + (index + 1)}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{item?.companyName}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap flex gap-2 justify-center">
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

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-4 space-x-2">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Previous
        </button>

        {/* Page numbers */}
        {Array.from({ length: meta?.totalPages || 1 }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 border rounded ${
              page === i + 1 ? "bg-gray-500 text-white" : "bg-white"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() =>
            setPage((prev) =>
              meta?.totalPages ? Math.min(prev + 1, meta.totalPages) : prev + 1
            )
          }
          disabled={page === meta?.totalPages}
          className="px-3 py-1 border rounded disabled:opacity-50"
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

export default TestimonialTable;
