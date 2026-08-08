"use client";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import SectionIntro from "./SectionIntro";

const Form = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);

  const validateField = (name, value) => {
    let error = "";
    if (!value.trim()) {
      error = "This field is required";
    } else if (name === "email" && !/^\S+@\S+\.\S+$/.test(value)) {
      error = "Please enter a valid email address";
    } else if (name === "phone" && value.replace(/\D/g, "").length < 6) {
      error = "Please enter a valid phone number";
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateAll = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const err = validateField(key, formData[key]);
      if (err) newErrors[key] = err;
    });
    setErrors(newErrors);
    setTouched({
      firstName: true,
      lastName: true,
      phone: true,
      email: true,
      message: true,
    });
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateAll()) {
      toast.error("Please fill in all required fields correctly.");
      return;
    }

    const data = {
      name: `${formData.firstName} ${formData.lastName}`,
      phone: formData.phone,
      email: formData.email,
      message: formData.message,
    };

    setLoading(true);

    try {
      const res = await axios.post("/api/contacts/messages/create", data);

      if (res.data.success) {
        toast.success("Message sent successfully! Our experts will contact you soon.");
        setFormData({
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          message: "",
        });
        setErrors({});
        setTouched({});
      } else {
        toast.error("Something went wrong, please try again later.");
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Server error occurred.");
      } else if (error.request) {
        toast.error("Network error. Please check your internet connection.");
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="site-section-muted overflow-hidden bg-orange-50/30 py-16">
      <div className="site-container relative z-10">
        <SectionIntro
          badge="Direct Inquiry"
          title={
            <>
              Get Expert{" "}
              <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
                Supply Solutions
              </span>
            </>
          }
          description="Share your sourcing, product, or logistics requirements and our team will respond with a tailored recommendation within 24 hours."
          className="mb-16"
        />

        <div className="site-panel mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-orange-100 bg-white shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Box: Rich Orange Theme */}
            <div className="relative flex flex-col justify-between overflow-hidden bg-gradient-to-br from-orange-600 via-orange-500 to-amber-500 p-8 text-white sm:p-10 lg:col-span-5 lg:p-12">
              <div className="site-grid-overlay absolute inset-0 opacity-10" />

              <div className="relative z-10 space-y-8">
                <div className="space-y-4">
                  <div className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                    Why teams choose IHRACHANE
                  </div>
                  <h3 className="text-3xl font-black tracking-tight text-white">
                    Premium sourcing support without the operational guesswork.
                  </h3>
                  <p className="text-sm leading-7 text-orange-100">
                    Direct access to vetted supplier databases, verified quality control specialists, and coordinated international freight support.
                  </p>
                </div>

                <ul className="space-y-4">
                  {[
                    "24-hour response commitment for qualified requests",
                    "Factory negotiation, pricing support, and quality oversight",
                    "End-to-end sourcing, inspection, and logistics coordination",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-white/20 text-white font-bold backdrop-blur-sm">
                        ✓
                      </div>
                      <span className="text-sm font-semibold text-white">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative z-10 mt-12 grid gap-4 pt-8 sm:grid-cols-2">
                <div className="rounded-[1.5rem] border border-white/20 bg-white/10 p-4 backdrop-blur-md">
                  <div className="text-2xl font-black text-white">24h</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.2em] text-orange-100">
                    Response Window
                  </div>
                </div>
                <div className="rounded-[1.5rem] border border-white/20 bg-white/10 p-4 backdrop-blur-md">
                  <div className="text-2xl font-black text-white">Global</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.2em] text-orange-100">
                    Logistics Reach
                  </div>
                </div>
              </div>
            </div>

            {/* Right Box: Form Inputs & Submit Button */}
            <div className="p-8 sm:p-10 lg:col-span-7 lg:p-12 bg-white">
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="block text-sm font-bold text-neutral-800">
                      First Name *
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Jane"
                      className={`site-input ${
                        errors.firstName
                          ? "border-red-400 focus:border-red-500 focus:ring-red-500/15"
                          : ""
                      }`}
                    />
                    {errors.firstName && (
                      <p className="text-xs text-red-500 font-medium">{errors.firstName}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="lastName" className="block text-sm font-bold text-neutral-800">
                      Last Name *
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Doe"
                      className={`site-input ${
                        errors.lastName
                          ? "border-red-400 focus:border-red-500 focus:ring-red-500/15"
                          : ""
                      }`}
                    />
                    {errors.lastName && (
                      <p className="text-xs text-red-500 font-medium">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="phone" className="block text-sm font-bold text-neutral-800">
                      Phone Number *
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="+1 (555) 000-0000"
                      className={`site-input ${
                        errors.phone
                          ? "border-red-400 focus:border-red-500 focus:ring-red-500/15"
                          : ""
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-xs text-red-500 font-medium">{errors.phone}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-bold text-neutral-800">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="jane@company.com"
                      className={`site-input ${
                        errors.email
                          ? "border-red-400 focus:border-red-500 focus:ring-red-500/15"
                          : ""
                      }`}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500 font-medium">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="block text-sm font-bold text-neutral-800">
                    How Can We Help You? *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Provide brief details regarding your products, estimated quantity, or shipping timeline..."
                    rows={4}
                    className={`site-textarea min-h-36 ${
                      errors.message
                        ? "border-red-400 focus:border-red-500 focus:ring-red-500/15"
                        : ""
                    }`}
                  ></textarea>
                  {errors.message && (
                    <p className="text-xs text-red-500 font-medium">{errors.message}</p>
                  )}
                </div>

                <div className="space-y-4">
                  {/* Vibrant Orange Submit Button */}
                  <button
                    disabled={loading}
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-orange-600 px-6 py-4 text-base font-bold text-white shadow-lg shadow-orange-500/20 transition-all duration-300 hover:bg-orange-500 hover:shadow-orange-500/40 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Submitting Inquiry...</span>
                      </div>
                    ) : (
                      <>
                        <span>Submit Inquiry</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </button>

                  <p className="rounded-2xl bg-orange-50 px-4 py-3 text-center text-xs font-medium text-slate-600">
                    Your information stays confidential and is only used to respond to your request.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Form;