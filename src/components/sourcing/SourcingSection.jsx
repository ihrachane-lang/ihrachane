"use client";

import { useState } from "react";
import { countries } from "./countries";
import Header from "./Header";
import MoreInfo from "./MoreInfo";
import axios from "axios";
import toast from "react-hot-toast";

export default function SourcingPage() {
  const [formData, setFormData] = useState({
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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    success: null,
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

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
      const submitData = {
        ...formData,
        phone: `${formData.phoneCode}${formData.phoneNumber}`,
        phoneCode: undefined,
        phoneNumber: undefined,
      };

      const response = await axios.post(
        "/api/contacts/sourcing-requests/create",
        submitData
      );

      if (response.data.success) {
        setSubmitStatus({ success: true, message: response.data.message });
        toast.success("Sourcing request submitted successfully!");
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
        toast.error("Failed to submit sourcing request.");
        setSubmitStatus({
          success: false,
          message: response.data.error || "Failed to submit form",
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "An error occurred");
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
    <div id="contact" className="site-section-muted relative overflow-hidden">
      <div className="site-container relative z-10">
        <Header />

        {submitStatus.message && (
          <div
            className={`mx-auto mb-8 max-w-6xl rounded-2xl border p-4 text-center text-sm font-semibold shadow-sm ${
              submitStatus.success
                ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                : "bg-rose-50 text-rose-800 border border-rose-200"
            }`}
          >
            {submitStatus.message}
          </div>
        )}

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start mt-8">
          <form
            className="site-panel lg:col-span-8 space-y-8 rounded-[2rem] p-8 sm:p-12"
            onSubmit={handleSubmit}
          >
            <div className="pb-6 border-b border-slate-200/80 space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Product Sourcing Request
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Provide your product specifications below. Our sourcing specialists will verify supplier options and return a customized quote within 24 hours.
              </p>
            </div>

            <div className="space-y-2">
              <label className="site-label">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Jane Doe"
                className="site-input"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="site-label">
                  Company Name *
                </label>
                <input
                  type="text"
                  name="company"
                  required
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Acme Global Ltd."
                  className="site-input"
                />
              </div>

              <div className="space-y-2">
                <label className="site-label">
                  Destination Country *
                </label>
                <select
                  name="country"
                  required
                  value={formData.country}
                  onChange={handleChange}
                  className="site-select"
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="site-label">
                  Work Email *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="jane@company.com"
                  className="site-input"
                />
              </div>

              <div className="space-y-2">
                <label className="site-label">
                  Phone Number *
                </label>
                <div className="flex">
                  <select
                    name="phoneCode"
                    value={formData.phoneCode || "+1"}
                    onChange={handleChange}
                    className="rounded-l-2xl border border-r-0 border-slate-300 bg-slate-50 px-3 py-3.5 text-xs font-bold text-slate-900 outline-none transition-all focus:border-orange-500"
                  >
                    {countries.map((country) => (
                      <option key={country.code} value={country.phone}>
                        {`${country.code} ${country.phone}`}
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    name="phoneNumber"
                    required
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="site-input rounded-l-none rounded-r-2xl"
                    placeholder="555-0199"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="site-label">
                Preferred Contact Method *
              </label>
              <div className="flex flex-wrap gap-4 sm:gap-6">
                {["Phone", "WhatsApp", "Email"].map((method) => (
                  <label
                    key={method}
                    className="inline-flex cursor-pointer items-center gap-2.5 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:border-orange-200 hover:bg-orange-50/60"
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
                    <span>{method}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-6 pt-4 border-t border-slate-200/80">
              <h3 className="text-base font-extrabold text-slate-900">
                Product Requirements & Specifications
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="site-label">
                    Expected Quantity
                  </label>
                  <input
                    type="text"
                    name="productRequirements.expectedQuantity"
                    placeholder="e.g., 5,000 units"
                    value={formData.productRequirements.expectedQuantity}
                    onChange={handleChange}
                    className="site-input"
                  />
                </div>

                <div className="space-y-2">
                  <label className="site-label">
                    Target Budget Range
                  </label>
                  <select
                    name="productRequirements.budgetRange"
                    value={formData.productRequirements.budgetRange}
                    onChange={handleChange}
                    className="site-select"
                  >
                    <option disabled value="">
                      Select target budget
                    </option>
                    <option value="<$1000">&lt;$1,000</option>
                    <option value="$1000-$5000">$1,000 - $5,000</option>
                    <option value=">$5000">&gt;$5,000</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="site-label">
                  Product Description & Material Specs *
                </label>
                <textarea
                  name="productRequirements.productDescription"
                  placeholder="Detail your product specifications, target dimensions, material requirements, or packaging guidelines..."
                  required
                  value={formData.productRequirements.productDescription}
                  onChange={handleChange}
                  rows={4}
                  className="site-textarea min-h-36"
                ></textarea>
              </div>

              <div className="space-y-2">
                <label className="site-label">
                  Required Timeline
                </label>
                <select
                  name="productRequirements.requiredTimeline"
                  value={formData.productRequirements.requiredTimeline}
                  onChange={handleChange}
                  className="site-select"
                >
                  <option disabled value="">
                    Estimated deadline
                  </option>
                  <option value="1-2 weeks">Urgent (1-2 weeks)</option>
                  <option value="1 month">Standard (1 month)</option>
                  <option value="2+ months">Flexible (2+ months)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="site-button-primary w-full rounded-2xl py-4 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? (
                <span className="animate-pulse">Submitting Request...</span>
              ) : (
                <>
                  <span>Submit Sourcing Request</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </form>

          <div className="lg:col-span-4">
            <MoreInfo />
          </div>
        </div>
      </div>
    </div>
  );
}

