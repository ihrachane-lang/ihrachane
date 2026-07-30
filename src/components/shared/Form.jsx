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
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    <section id="contact" className="site-section-muted overflow-hidden">
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

        <div className="site-panel mx-auto max-w-6xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="relative flex flex-col justify-between overflow-hidden bg-[radial-gradient(circle_at_top_right,rgba(251,146,60,0.18),transparent_22%),linear-gradient(180deg,#171717_0%,#09090b_100%)] p-8 text-white sm:p-10 lg:col-span-5 lg:p-12">
              <div className="site-grid-overlay absolute inset-0 opacity-30" />

              <div className="relative z-10 space-y-8">
                <div className="space-y-4">
                  <div className="site-badge-dark">Why teams choose IHRACHANE</div>
                  <h3 className="text-3xl font-black tracking-tight">
                    Premium sourcing support without the operational guesswork.
                  </h3>
                  <p className="text-sm leading-7 text-slate-300">
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
                      <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-orange-500/20 text-orange-300">
                        ✓
                      </div>
                      <span className="text-sm font-semibold text-slate-200">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative z-10 mt-12 grid gap-4 pt-8 sm:grid-cols-2">
                <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
                  <div className="text-2xl font-black text-orange-300">24h</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-400">
                    Response Window
                  </div>
                </div>
                <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
                  <div className="text-2xl font-black text-white">Global</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-400">
                    Logistics Reach
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 sm:p-10 lg:col-span-7 lg:p-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="site-label">
                      First Name *
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Jane"
                      className="site-input"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="lastName" className="site-label">
                      Last Name *
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Doe"
                      className="site-input"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="phone" className="site-label">
                      Phone Number *
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="site-input"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="site-label">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jane@company.com"
                      className="site-input"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="site-label">
                    How Can We Help You? *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Provide brief details regarding your products, estimated quantity, or shipping timeline..."
                    rows={4}
                    className="site-textarea min-h-36"
                    required
                  ></textarea>
                </div>

                <div className="space-y-4">
                  <button
                    disabled={loading}
                    type="submit"
                    className="site-button-primary w-full rounded-2xl py-4 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {loading ? (
                      <span className="animate-pulse">Submitting Inquiry...</span>
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

