"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // modal state
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [isResetLoading, setIsResetLoading] = useState(false);

  useEffect(() => {
    if (router?.query?.unauthorized) {
      toast.error("You are not allowed to access this page");
      signOut({ redirect: false });
    }
  }, [router?.query]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        const res = await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: false,
        });
        if (res.ok) {
          router.push("/dashboard");
          toast.success("Login Successful");
        } else {
          toast.error(res.error);
        }
      } catch (err) {
        toast.error("Something went wrong");
        // console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // forgot password handler
  const handleResetPassword = async () => {
    if (!forgotEmail.trim()) {
      toast.error("Please enter your email");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(forgotEmail)) {
      toast.error("Invalid email format");
      return;
    }

    setIsResetLoading(true);
    try {
      const res = await axios.post("/api/auth/reset-password", {
        email: forgotEmail,
      });

      if (res.status === 201) {
        toast.success(res.message || "Reset OTP sent to your email");

        // Save email in local storage
        localStorage.setItem("ForgotPasswordEmail", forgotEmail);

        // Close modal
        setShowForgotModal(false);
        setForgotEmail("");

        // redirect to reset-password page
        router.push(`/reset-password?email=${encodeURIComponent(forgotEmail)}`);
      } else {
        toast.error(res.data.error || "Failed to send reset password email");
      }
    } catch (err) {
      // console.log(err);
      toast.error(
        err.response?.data?.error || "Failed to send reset password email"
      );
    } finally {
      setIsResetLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4">
      {/* Background overlay when modal open */}
      {showForgotModal && (
        <div className="absolute inset-0 bg-orange-100 bg-opacity-30 backdrop-blur-sm z-10"></div>
      )}

      <div
        className={`relative max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 z-20 ${
          showForgotModal ? "opacity-40" : "opacity-100"
        }`}
      >
        <div className="py-6 px-8 bg-orange-500 text-white text-center">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="mt-2">Sign in to access your account</p>
        </div>

        <div className="p-8">
          {errors.submit && (
            <div className="mb-6 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
              {errors.submit}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-300`}
                placeholder="leroy@jenkins.com"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
              )}
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-xs text-orange-600 hover:text-orange-500 transition-colors"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-300 pr-10`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-orange-500 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "👁" : "🙈"}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">{errors.password}</p>
              )}
            </div>

            <div className="flex items-center">
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
              />
              <label
                htmlFor="rememberMe"
                className="ml-2 block text-sm text-gray-700"
              >
                Remember me
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-400 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-orange-500 focus:ring-opacity-50 flex items-center justify-center"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don&apos;t have an account yet?
              <Link
                href="/register"
                className="font-medium text-orange-600 hover:text-orange-500 ml-1"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 flex items-center justify-center px-4 z-30">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg relative z-40">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Reset Password
            </h2>
            <input
              type="email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowForgotModal(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleResetPassword}
                disabled={isResetLoading}
                className="px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 disabled:bg-orange-400"
              >
                {isResetLoading ? "Sending..." : "Reset Password"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
