"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";

export default function VerifyOtp() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [resendCooldown, setResendCooldown] = useState(60); // 60 seconds
  const [resendDisabled, setResendDisabled] = useState(true);

  const inputRefs = useRef([]);
  const router = useRouter();

  // get email from URL or localStorage
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const emailFromUrl = urlParams.get("email") || localStorage.getItem("email");

    if (!emailFromUrl) {
      toast.error("Invalid URL, please try again.");
      router.push("/login");
      return;
    }

    setEmail(emailFromUrl);
  }, [router]);

  // resend cooldown timer
  useEffect(() => {
    let timer;
    if (resendDisabled) {
      timer = setInterval(() => {
        setResendCooldown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setResendDisabled(false);
            return 60; // reset for next time
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendDisabled]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError("");

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1].focus();
      }

      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1].focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").trim();

    if (/^\d{6}$/.test(pastedData)) {
      const newOtp = pastedData.split("").slice(0, 6);
      setOtp(newOtp);

      setTimeout(() => {
        if (inputRefs.current[5]) {
          inputRefs.current[5].focus();
        }
      }, 0);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (otp.join("").length !== 6) {
      setError("Please enter the 6-digit code");
      return;
    }

    setIsLoading(true);
    try {
      const data = { otp: otp.join(""), email };

      const res = await axios.post("/api/auth/verify-otp", data);
      if (res.statusText === "OK") {
        toast.success("OTP verification Successful");
        router.push("/login");
      }

      localStorage.removeItem("email");
    } catch (err) {
      const msg = err.response?.data?.error || "Verification failed. Please try again.";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) return;

    setResendDisabled(true);
    try {
      const res = await axios.post("/api/auth/verify-otp/resend", { email });
      toast.success(res.data.message || "OTP resent successfully");
      setOtp(["", "", "", "", "", ""]); // clear previous OTP
    } catch (err) {
      const msg = err.response?.data?.error || "Failed to resend OTP";
      toast.error(msg);
      setResendDisabled(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full rounded-2xl shadow-lg overflow-hidden">
        <div className="py-6 px-4 sm:px-8 bg-orange-500 text-white text-center">
          <h1 className="text-2xl sm:text-3xl font-bold">Verify Your Account</h1>
          <p className="mt-2 text-sm sm:text-base">
            Enter the 6-digit code sent to{" "}
            <span className="underline">{email || "your email"}</span>
          </p>
        </div>

        <div className="p-6 sm:p-8">
          {error && (
            <div className="mb-6 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center">
              <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
                Verification Code
              </label>
              <div
                className="flex justify-center space-x-2 sm:space-x-3"
                onPaste={handlePaste}
              >
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onFocus={(e) => e.target.select()}
                    className="w-10 h-10 sm:w-12 sm:h-12 text-center text-xl font-semibold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500  transition duration-200"
                  />
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-400 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-orange-500 focus:ring-opacity-50 flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Verifying...
                </>
              ) : (
                "Verify Account"
              )}
            </button>
          </form>

          {/* Resend OTP */}
          <div className="mt-4 text-center flex items-center justify-center gap-2">
            <p>Didn&apos;t received otp? </p>
            <button
              onClick={handleResend}
              disabled={resendDisabled}
              className={`text-sm font-medium ${
                resendDisabled ? "text-gray-400" : "text-orange-600 hover:text-orange-500"
              }`}
            >
              {resendDisabled ? `Resend OTP in ${resendCooldown}s` : "Resend OTP"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
