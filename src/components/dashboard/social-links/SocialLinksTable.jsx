import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getData } from "@/utils/axiosPublic";
import axios from "axios";

const SocialLinksTable = () => {
  const [data, setData] = useState([]);

  const [open, setOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const { data } = await getData("/api/company/social-links");
      setData(data);
    }
    fetchData();
  }, []);

  // // console.log(data);

  const handleDelete = async () => {
    // return // console.log(deleteItem?._id);
    try {
      await axios.delete(`/api/company/social-links/delete/${deleteItem?._id}`);
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
                <div className="text-sm text-gray-900">{index + 1}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{item?.socialName}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap flex gap-2 justify-center">
                <Link
                  href={`/dashboard/about/social-links/${item._id}`}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 w-fit"
                >
                  <CiEdit className="text-sm cursor-pointer text-gray-900" />
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

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-6">
            <h2 className="text-lg font-semibold text-gray-900">
              Delete Social Link
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Are you sure you want to delete{" "}
              <span className="font-medium text-gray-900">
                {deleteItem?.socialName}
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

export default SocialLinksTable;
