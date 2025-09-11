"use client";

import { useState } from "react";
import { countries } from "./countries";
import Header from "./Header";
import MoreInfo from "./MoreInfo";
import axios from "axios";
import toast from "react-hot-toast";

export default function SourcingPage() {
  const [formData, setFormData] = useState({
    name: "", // Changed from firstName/lastName to match backend
    email: "",
    company: "",
    country: "",
    phone: "", // Will combine phoneCode and phoneNumber
    preferredContactMethod: "",
    productRequirements: {
      expectedQuantity: "",
      productDescription: "",
      budgetRange: "",
      requiredTimeline: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    success: null,
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle nested productRequirements fields
    if (name.startsWith("productRequirements.")) {
      const requirementField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        productRequirements: {
          ...prev.productRequirements,
          [requirementField]: value,
        },
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setSubmitStatus({ success: null, message: "" });

    try {
      // Prepare data for API (combine phone code and number)
      const submitData = {
        ...formData,
        phone: `${formData.phoneCode}${formData.phoneNumber}`,
        // Remove temporary fields not needed by API
        phoneCode: undefined,
        phoneNumber: undefined,
      };
      // // console.log(submitData);
      // Make API request

      
      const response = await axios.post(
        "/api/contacts/sourcing-requests/create",
        submitData
      );
      // // console.log(response);

      if (response.data.success) {
        setSubmitStatus({ success: true, message: response.data.message });
        toast.success("Request send successfully");
        // Reset form on successful submission
        setFormData({
          name: "",
          email: "",
          company: "",
          country: "",
          phone: "",
          phoneCode: "+1",
          phoneNumber: "",
          preferredContactMethod: "",
          productRequirements: {
            expectedQuantity: "",
            productDescription: "",
            budgetRange: "",
            requiredTimeline: "",
          },
        });
      } else {
        toast.error("Failed to submit form");
        setSubmitStatus({
          success: false,
          message: response.data.error || "Failed to submit form",
        });
      }
    } catch (error) {
      // console.error("Submission error:", error);
      toast.error(error);
      setSubmitStatus({
        success: false,
        message:
          error.response?.data?.error ||
          "An error occurred while submitting the form",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      id="contact"
      className="container mx-auto bg-gradient-to-b from-orange-50 to-white py-12 px-4 sm:px-6 lg:px-8 rounded-2xl"
    >
      {/* Top Section */}
      <Header />

      {/* Status Message */}
      {submitStatus.message && (
        <div
          className={`max-w-6xl mx-auto mb-6 p-4 rounded-lg text-center ${
            submitStatus.success
              ? "bg-green-100 text-green-800 border border-green-400"
              : "bg-red-100 text-red-800 border border-red-400"
          }`}
        >
          {submitStatus.message}
        </div>
      )}

      {/* Main Form & Info Section */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Form */}
        <form
          className="lg:col-span-2 bg-white shadow-xl rounded-2xl p-10 space-y-8 border border-orange-100"
          onSubmit={handleSubmit}
        >
          {/* Form Heading */}
          <div className="pb-4 border-b border-orange-200">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Product Sourcing Request
            </h2>
            <p className="text-gray-600 text-base mt-2">
              Submit your product requirements and we'll connect you with{" "}
              <span className="font-medium text-orange-600">
                verified suppliers worldwide.
              </span>
            </p>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-300 rounded-xl px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
            />
          </div>

          {/* Company & Country */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Company *
              </label>
              <input
                type="text"
                name="company"
                required
                value={formData.company}
                onChange={handleChange}
                className="border border-gray-300 rounded-xl px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Country *
              </label>
              <select
                name="country"
                required
                value={formData.country}
                onChange={handleChange}
                className="border border-gray-300 rounded-xl px-4 py-3 w-full bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
              >
                <option disabled value="">
                  Select your country
                </option>
                {countries.map((country) => (
                  <option key={country.code} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="border border-gray-300 rounded-xl px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Phone Number *
              </label>
              <div className="flex">
                <select
                  name="phoneCode"
                  value={formData.phoneCode || "+1"}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-l-xl px-3 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                >
                  {countries.map((country) => (
                    <option key={country.code} value={country.phone}>
                      {country.phone}
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  name="phoneNumber"
                  required
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="border border-gray-300 border-l-0 rounded-r-xl px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                  placeholder="123 456 7890"
                />
              </div>
            </div>
          </div>

          {/* Preferred Contact */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Preferred Contact Method *
            </label>
            <div className="flex items-center gap-6">
              {["Phone", "WhatsApp", "Email"].map((method) => (
                <label
                  key={method}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="preferredContactMethod"
                    value={method.toLowerCase()}
                    checked={
                      formData.preferredContactMethod === method.toLowerCase()
                    }
                    onChange={handleChange}
                    className="text-orange-600 focus:ring-orange-500"
                    required
                  />
                  <span className="text-gray-700">{method}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Product Requirements */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Product Requirements
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <input
                  type="text"
                  name="productRequirements.expectedQuantity"
                  placeholder="Expected Quantity e.g., 1000 units"
                  value={formData.productRequirements.expectedQuantity}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-xl px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                />
              </div>
              <div>
                <select
                  name="productRequirements.budgetRange"
                  value={formData.productRequirements.budgetRange}
                  onChange={handleChange}
                  className="border border-gray-300 rounded-xl px-4 py-3 w-full bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
                >
                  <option disabled value="">
                    Select budget range
                  </option>
                  <option value="<$1000">&lt;$1000</option>
                  <option value="$1000-$5000">$1000-$5000</option>
                  <option value=">$5000">&gt;$5000</option>
                </select>
              </div>
            </div>
            <div className="mb-4">
              <textarea
                name="productRequirements.productDescription"
                placeholder="Product Description *"
                required
                value={formData.productRequirements.productDescription}
                onChange={handleChange}
                className="border border-gray-300 rounded-xl px-4 py-3 w-full h-32 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Required Timeline
              </label>
              <select
                name="productRequirements.requiredTimeline"
                value={formData.productRequirements.requiredTimeline}
                onChange={handleChange}
                className="border border-gray-300 rounded-xl px-4 py-3 w-full bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition"
              >
                <option disabled value="">
                  When do you need this?
                </option>
                <option value="1-2 weeks">1-2 weeks</option>
                <option value="1 month">1 month</option>
                <option value="2+ months">2+ months</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-lg font-semibold py-4 px-6 rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Submitting..." : "Submit Sourcing Request"}
          </button>
        </form>

        {/* Right Info Section */}
        <MoreInfo />
      </div>
    </div>
  );
}
