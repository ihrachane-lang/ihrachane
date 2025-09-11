"use client";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";

export default function ResetPassword() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [error, setError] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [timer, setTimer] = useState(60); // countdown 60 sec
  const inputRefs = useRef([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL or LocalStorage থেকে email নেওয়া
  useEffect(() => {
    const emailFromUrl = searchParams.get("email");
    const emailFromLocal = localStorage.getItem("ForgotPasswordEmail");
    const finalEmail = emailFromUrl || emailFromLocal;

    if (!finalEmail) {
      toast.error("Invalid or expired reset link!");
      router.push("/");
    } else {
      setEmail(finalEmail);
    }
  }, [searchParams, router]);

  // countdown শুরু
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

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

  // Submit Reset Password
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp.join("").length !== 6) {
      setError("Please enter the 6-digit code");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setIsLoading(true);
    try {
      const data = {
        resetCode: otp.join(""),
        email,
        newPassword,
      };
      const res = await axios.post("/api/auth/reset-password/confirm", data);

      if (res.status === 200) {
        toast.success("Password reset successful!");
        localStorage.removeItem("ForgotPasswordEmail");
        router.push("/login");
      }
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Something went wrong";
      toast.error(errorMsg);
      setError(errorMsg || "Reset failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    if (timer > 0) return;
    setResendLoading(true);
    try {
      await axios.post("/api/auth/reset-password/resend-otp", { email });
      toast.success("OTP resent successfully");
      setTimer(60); // আবার 60 sec timer শুরু
    } catch (err) {
      toast.error("Failed to resend OTP");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center p-4'>
      <div className='max-w-md w-full rounded-2xl shadow-lg overflow-hidden'>
        <div className='py-6 px-4 sm:px-8 bg-orange-500 text-white text-center'>
          <h1 className='text-2xl sm:text-3xl font-bold'>Reset Password</h1>
          <p className='mt-2 text-sm sm:text-base'>
            Enter the code sent to <span className='underline'>{email}</span>
          </p>
        </div>

        <div className='p-6 sm:p-8'>
          {error && (
            <div className='mb-6 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm'>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* OTP Input */}
            <div className='flex flex-col items-center'>
              <label className='block text-sm font-medium text-gray-700 mb-4 text-center'>
                Verification Code
              </label>
              <div
                className='flex justify-center space-x-2 sm:space-x-3'
                onPaste={handlePaste}>
                {otp?.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type='text'
                    inputMode='numeric'
                    maxLength='1'
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onFocus={(e) => e.target.select()}
                    className='w-10 h-10 sm:w-12 sm:h-12 text-center text-xl font-semibold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200'
                  />
                ))}
              </div>

              {/* Resend OTP + Timer */}
              <div className='mt-4 flex items-center space-x-2'>
                <p>Didn&apos;t received otp? </p>
                <button
                  type='button'
                  disabled={timer > 0 || resendLoading}
                  onClick={handleResendOtp}
                  className={`text-sm font-medium ${
                    timer > 0 || resendLoading
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-orange-500 hover:underline"
                  }`}>
                  {resendLoading ? "Resending..." : "Resend OTP"}
                </button>
                {timer > 0 && (
                  <span className='text-sm text-gray-600'>({timer}s left)</span>
                )}
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                New Password
              </label>
              <input
                type='password'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none'
                placeholder='Enter new password'
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Confirm Password
              </label>
              <input
                type='password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none'
                placeholder='Confirm new password'
              />
            </div>

            <button
              type='submit'
              disabled={isLoading}
              className='w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-500 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-orange-500 focus:ring-opacity-50 flex items-center justify-center'>
              {isLoading ? (
                <>
                  <svg
                    className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'>
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='4'></circle>
                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                  </svg>
                  Resetting...
                </>
              ) : (
                "Reset Password"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
