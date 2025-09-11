"use client";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

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
        toast.success("Message Sent Successfully");
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
    <section
      id="contact"
      className="bg-gradient-to-br container mx-auto from-orange-100 to-orange-200 py-16 px-4 rounded-2xl"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-gray-500 to-gray-700 bg-clip-text text-transparent">
              Get Expert
            </span>{" "}
            <span className="bg-gradient-to-r from-orange-500 to-orange-700 bg-clip-text text-transparent">
              Solutions
            </span>
          </h2>
          <p className="text-gray-600 font-semibold max-w-2xl mx-auto">
            Submit the form below and our experts will get back to you with
            tailored solutions for your needs.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Visual Element Sidebar - Hidden on mobile */}
            <div className="hidden md:block md:w-2/5 bg-gradient-to-b from-orange-500 to-orange-600 p-8">
              <div className="h-full flex flex-col justify-center">
                <div className="text-white">
                  <h3 className="text-xl font-bold mb-4">Why Contact Us?</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <svg
                        className="w-5 h-5 mt-0.5 mr-2 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Expert consultation</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-5 h-5 mt-0.5 mr-2 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Quick response time</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="w-5 h-5 mt-0.5 mr-2 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Customized solutions</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-10">
                  <div className="bg-white/10 text-gray-800 p-4 rounded-lg">
                    <p className="text-sm">
                      "The expert team provided exceptional guidance that helped
                      solve our complex challenges efficiently."
                    </p>
                    <p className="text-sm font-medium mt-2">
                      - Satisfied Client
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Content */}
            <div className="md:w-3/5 p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* First Name */}
                  <div className="flex flex-col">
                    <label
                      htmlFor="firstName"
                      className="text-gray-700 text-sm font-medium mb-2"
                    >
                      First Name *
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Enter your first name"
                      className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  {/* Last Name */}
                  <div className="flex flex-col">
                    <label
                      htmlFor="lastName"
                      className="text-gray-700 text-sm font-medium mb-2"
                    >
                      Last Name *
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Enter your last name"
                      className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Phone */}
                  <div className="flex flex-col">
                    <label
                      htmlFor="phone"
                      className="text-gray-700 text-sm font-medium mb-2"
                    >
                      Phone Number *
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col">
                    <label
                      htmlFor="email"
                      className="text-gray-700 text-sm font-medium mb-2"
                    >
                      Email *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                      className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col">
                  <label
                    htmlFor="message"
                    className="text-gray-700 text-sm font-medium mb-2"
                  >
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    rows={4}
                    className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    required
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    disabled={loading}
                    type="submit"
                    className="w-full bg-orange-500 text-white font-medium py-3 px-4 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors"
                  >
                    {loading ? "Loading..." : "Submit Request"}
                  </button>
                </div>

                {/* Privacy Note */}
                <p className="text-xs text-gray-500 text-center">
                  We respect your privacy. Your information will be used solely
                  to respond to your inquiry.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Form;
