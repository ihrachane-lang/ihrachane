"use client";

import { getData, postData } from "@/utils/axiosPublic";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const UpdateCompanyForm = () => {
  const [formData, setFormData] = useState({
    companyAddress: "",
    phoneNumber: "",
    companyEmail: "",
    whatsappNumber: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // GET data from backend
  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await getData("/api/company/details");
        if (data) {
          setFormData({
            companyAddress: data?.address || "",
            phoneNumber: data?.phoneNumber || "",
            companyEmail: data?.email || "",
            whatsappNumber: data?.whatsAppNumber || "",
          });
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle submit (POST → create or update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const payload = {
        address: formData.companyAddress,
        phoneNumber: formData.phoneNumber,
        email: formData.companyEmail,
        whatsAppNumber: formData.whatsappNumber,
      };

      // console.log(payload);

      const res = await postData("/api/company/details", payload);

      if (res?.success) {
        toast.success("Company Info Updated");
        setMessage("✅ Company details saved successfully!");
      } else {
        setMessage("❌ Something went wrong.");
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Error while saving data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-b from-[#19203c] via-[#3b3b5f] to-[#1e1e30] p-5">
          <h1 className="text-2xl font-semibold text-white text-center">
            Update Company
          </h1>
          <p className="text-sm text-orange-100 text-center">
            Update address, contact number, and company email below
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Company Address */}
          <div>
            <label
              htmlFor="companyAddress"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              COMPANY ADDRESS
            </label>
            <textarea
              id="companyAddress"
              name="companyAddress"
              value={formData.companyAddress}
              onChange={handleChange}
              rows={3}
              className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-3"
              placeholder="Enter Company Address"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              PHONE NUMBER
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-3"
              placeholder="Enter Phone Number"
            />
          </div>

          {/* Company Email */}
          <div>
            <label
              htmlFor="companyEmail"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              COMPANY EMAIL
            </label>
            <input
              type="email"
              id="companyEmail"
              name="companyEmail"
              value={formData.companyEmail}
              onChange={handleChange}
              className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-3"
              placeholder="Enter Company Email"
            />
          </div>

          {/* WhatsApp Number */}
          <div>
            <label
              htmlFor="whatsappNumber"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              COMPANY WHATSAPP NUMBER
            </label>
            <input
              type="tel"
              id="whatsappNumber"
              name="whatsappNumber"
              value={formData.whatsappNumber}
              onChange={handleChange}
              className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm p-3"
              placeholder="Enter WhatsApp Number"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t flex justify-between items-center">
            <p className="text-sm text-gray-600">{message}</p>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-b from-[#19203c] via-[#3b3b5f] to-[#1e1e30] hover:opacity-90 cursor-pointer disabled:opacity-50"
            >
              {loading ? "Saving..." : "Submit ✓"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCompanyForm;
