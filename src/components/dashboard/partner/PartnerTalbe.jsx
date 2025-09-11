"use client";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getData } from "@/utils/axiosPublic";
import Image from "next/image";
import axios from "axios";

const PartnerTable = () => {
  const [partners, setPartners] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    limit: 5,
    totalDocuments: 0,
  });

  const [open, setOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);

  const [loading, setLoading] = useState(false);

  const fetchPartners = async (page = 1, limit = 5) => {
    try {
      setLoading(true);
      const res = await getData(`/api/partners?page=${page}&limit=${limit}`);
      // console.log("API /api/partners response:", res);

      setPartners(res?.data || []);
      setPagination({
        currentPage: res?.meta?.currentPage ?? 1,
        totalPages: res?.meta?.totalPages ?? 1,
        limit: res?.meta?.limit ?? limit,
        totalDocuments: res?.meta?.totalDocuments ?? (res?.data?.length || 0),
      });
    } catch (err) {
      console.error("Failed to fetch partners:", err);
      setPartners([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartners(pagination.currentPage, pagination.limit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.currentPage, pagination.limit]);

  const handlePageChange = (page) => {
    if (page < 1 || page > pagination.totalPages) return;
    setPagination((prev) => ({ ...prev, currentPage: page }));
  };

  const handleLimitChange = (e) => {
    const newLimit = Number(e.target.value) || 5;
    setPagination((prev) => ({ ...prev, limit: newLimit, currentPage: 1 }));
  };

  const handleDelete = async () => {
    // return // console.log(deleteItem?._id);
    try {
      await axios.delete(`/api/partners/delete/${deleteItem?._id}`);
      setPartners((prev) =>
        prev.filter((item) => item?._id !== deleteItem?._id)
      );
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
      {loading && <p className="p-4 text-center">Loading...</p>}

      {!loading && partners.length === 0 && (
        <p className="p-4 text-center text-gray-500">No partners found.</p>
      )}

      {!loading && partners.length > 0 && (
        <>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SL. NO
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  NAME
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  LOGO
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {partners.map((item, index) => (
                <tr key={item?._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {(pagination.currentPage - 1) * pagination.limit +
                        (index + 1)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {item?.partnerName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {item?.partnerImage ? (
                      <Image
                        src={item.partnerImage}
                        alt={item.partnerName}
                        height={40}
                        width={40}
                        className="h-10 w-10 object-contain rounded"
                      />
                    ) : (
                      <span className="text-gray-400">No Logo</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap flex gap-2 justify-center">
                    <Link
                      href={`/dashboard/partner/${item?._id}`}
                      className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 w-fit cursor-pointer"
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

          {/* Pagination Controls */}
          <div className="flex items-center justify-between mt-4 gap-4">
            {/* Prev/Next */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                disabled={pagination.currentPage === 1}
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
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
                className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>

            {/* Per Page Limit */}
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">Per page:</label>
              <select
                value={pagination.limit}
                onChange={handleLimitChange}
                className="border rounded px-2 py-1"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
              <div className="text-sm text-gray-500">
                {pagination.totalDocuments} items
              </div>
            </div>
          </div>
        </>
      )}

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Delete Sub-Category
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Are you sure you want to delete{" "}
              <span className="font-medium text-gray-900">
                {deleteItem?.partnerName}
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

export default PartnerTable;
