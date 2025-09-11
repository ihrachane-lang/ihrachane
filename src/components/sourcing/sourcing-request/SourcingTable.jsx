"use client";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { useEffect, useState } from "react";
import { getData } from "@/utils/axiosPublic";
import axios from "axios";
import toast from "react-hot-toast";

const SourcingTable = () => {
  const [data, setData] = useState([]);
  const [meta, setMeta] = useState({});
  const [page, setPage] = useState(1);
  const limit = 5; // per page requests

  const [reload, setReload] = useState(false);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [statusUpdates, setStatusUpdates] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getData(
          `/api/contacts/sourcing-requests?page=${page}&limit=${limit}`
        );
        setData(res?.data || []);
        setMeta(res?.meta || {});
        console.log(reload);
      } catch (err) {
        console.error("Failed to fetch sourcing requests:", err);
      }
    }
    fetchData();
  }, [page, reload]);

  const handleDelete = async () => {
    try {
      await axios.delete(
        `/api/contacts/sourcing-requests/delete/${selectedItem?._id}`
      );
      setData((prev) => prev.filter((item) => item?._id !== selectedItem?._id));
    } catch (error) {
      console.error("Delete failed", error);
    } finally {
      setOpenDeleteModal(false);
      setSelectedItem(null);
    }
  };

  const handleStatusChange = async (itemId, newStatus) => {
    try {
      // console.log(newStatus);
      const res = await axios.put(
        `/api/contacts/sourcing-requests/update-status/${itemId}`,
        {
          status: newStatus,
        }
      );
      if (res.status === 200) {
        toast.success("Status Updated");
        setReload(!reload);
        setStatusUpdates((prev) => {
          const newState = { ...prev };
          delete newState[itemId];
          return newState;
        });
      }
    } catch (error) {
      console.error("Status update failed", error);
    }
  };

  const openDeleteModalHandler = (item) => {
    setSelectedItem(item);
    setOpenDeleteModal(true);
  };

  const openDetailModalHandler = (item) => {
    setSelectedItem(item);
    setOpenDetailModal(true);
  };

  return (
    <div className="overflow-x-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Sourcing Requests</h1>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              SL. NO
            </th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Phone
            </th>
            <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              ACTIONS
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data?.map((item, index) => (
            <tr key={item?._id}>
              <td className="px-1 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {(page - 1) * limit + (index + 1)}
                </div>
              </td>
              <td className="px-3 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{item?.email}</div>
              </td>
              <td className="px-3 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {item?.phone || "N/A"}
                </div>
              </td>
              <td className="px-3 py-4 whitespace-nowrap">
                <select
                  value={
                    statusUpdates[item._id] || item.productRequirements.status
                  }
                  onChange={(e) => {
                    setStatusUpdates((prev) => ({
                      ...prev,
                      [item._id]: e.target.value,
                    }));
                    handleStatusChange(item._id, e.target.value);
                  }}
                  className="text-sm border rounded p-1"
                >
                  <option value="pending">Pending</option>
                  <option value="cancel">Cancel</option>
                  <option value="done">Done</option>
                  <option value="in-progress">In Progress</option>
                </select>
              </td>
              <td className="px-3 py-4 whitespace-nowrap flex gap-2 justify-center">
                <button
                  onClick={() => openDetailModalHandler(item)}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 w-fit"
                >
                  <AiOutlineEye className="text-sm text-gray-900" />
                </button>
                <button
                  onClick={() => openDeleteModalHandler(item)}
                  className="p-2 rounded-full bg-gray-100 hover:bg-red-200 w-fit"
                >
                  <AiOutlineDelete className="text-sm text-gray-900" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-4 space-x-2">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Previous
        </button>

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

      {/* Delete Confirmation Modal */}
      {openDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Delete Sourcing Request
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Are you sure you want to delete the sourcing request from{" "}
              <span className="font-medium text-gray-900">
                {selectedItem?.email}
              </span>
              ? This action cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setOpenDeleteModal(false)}
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

      {/* Detail View Modal */}
      {openDetailModal && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl max-w-xl w-full max-h-[85vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-gray-600 to-gray-500 p-6 text-white">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold">
                    Sourcing Request Details
                  </h2>
                  <p className="text-gray-100 text-sm mt-1">
                    Submitted on{" "}
                    {new Date(selectedItem.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => setOpenDetailModal(false)}
                  className="text-white/80 hover:text-white rounded-full p-1 transition-colors"
                  aria-label="Close"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto flex-grow">
              <div className="space-y-5">
                {/* Contact Information */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Contact Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="bg-gray-100 p-2 rounded-md mr-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-gray-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Email</p>
                        <p className="text-sm font-medium text-gray-900">
                          {selectedItem.email}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-gray-100 p-2 rounded-md mr-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-gray-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Phone</p>
                        <p className="text-sm font-medium text-gray-900">
                          {selectedItem.phone || "N/A"}
                        </p>
                      </div>
                    </div>

                    {selectedItem.company && (
                      <div className="flex items-start">
                        <div className="bg-gray-100 p-2 rounded-md mr-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-4 0H9m4 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v12m4 0h2"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Company</p>
                          <p className="text-sm font-medium text-gray-900">
                            {selectedItem.company}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Product Requirements */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Product Requirements
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-500">Status</span>
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-800 capitalize">
                        {selectedItem.productRequirements.status}
                      </span>
                    </div>

                    {selectedItem.productRequirements.name && (
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-500">
                          Product Name
                        </span>
                        <span className="text-xs font-medium text-gray-900 text-right">
                          {selectedItem.productRequirements.name}
                        </span>
                      </div>
                    )}

                    {selectedItem.productRequirements.expectedQuantity && (
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-500">
                          Expected Quantity
                        </span>
                        <span className="text-xs font-medium text-gray-900">
                          {selectedItem.productRequirements.expectedQuantity}
                        </span>
                      </div>
                    )}

                    {selectedItem.productRequirements.budgetRange && (
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-500">
                          Budget Range
                        </span>
                        <span className="text-xs font-medium text-gray-900">
                          {selectedItem.productRequirements.budgetRange}
                        </span>
                      </div>
                    )}

                    {selectedItem.productRequirements.requiredTimeline && (
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-500">Timeline</span>
                        <span className="text-xs font-medium text-gray-900">
                          {selectedItem.productRequirements.requiredTimeline}
                        </span>
                      </div>
                    )}

                    {selectedItem.productRequirements.productDescription && (
                      <div>
                        <p className="text-xs text-gray-500 mb-1">
                          Product Description
                        </p>
                        <p className="text-xs font-medium text-gray-900 bg-white p-3 rounded border border-gray-200">
                          {selectedItem.productRequirements.productDescription}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Additional Information */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Additional Information
                  </h3>
                  <div className="space-y-3">
                    {selectedItem.country && (
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-500">Country</span>
                        <span className="text-xs font-medium text-gray-900">
                          {selectedItem.country}
                        </span>
                      </div>
                    )}

                    {selectedItem.preferredContactMethod && (
                      <div className="flex justify-between">
                        <span className="text-xs text-gray-500">
                          Preferred Contact
                        </span>
                        <span className="text-xs font-medium text-gray-900 capitalize">
                          {selectedItem.preferredContactMethod}
                        </span>
                      </div>
                    )}

                    {selectedItem.message && (
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Message</p>
                        <p className="text-xs font-medium text-gray-900 bg-white p-3 rounded border border-gray-200">
                          {selectedItem.message}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 p-4 bg-gray-50 flex justify-end">
              <button
                onClick={() => setOpenDetailModal(false)}
                className="px-5 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SourcingTable;
