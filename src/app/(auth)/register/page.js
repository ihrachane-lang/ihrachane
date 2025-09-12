"use client";

import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      toast.error("Password must be at least 6 character");
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      toast.error("Password do not match");
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      localStorage.setItem("email", formData?.email);
      try {
        const data = {
          name: `${formData?.firstName} ${formData?.lastName}`,
          email: formData?.email,
          password: formData?.password,
          agreeToTerms: formData?.agreeToTerms
        };
        const res = await axios.post("/api/auth/register", data);
        if (res.status === 201) {
          toast.success("Registration Successful");
          router.push(`/otp-verification/?${data?.email || formData?.email}`);
        }
      } catch (error) {
        toast(error.response.data.error);
        setErrors({ submit: error.message });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center p-4'>
      <div className='max-w-lg w-full bg-white rounded-2xl shadow-2xl overflow-hidden'>
        <div className='py-6 px-8 bg-orange-500 text-white text-center'>
          <h1 className='text-3xl font-bold'>Create Account</h1>
          <p className='mt-2'>
            Join our community and unlock exclusive features
          </p>
        </div>

        <div className='p-8'>
          <form onSubmit={handleSubmit} className='space-y-6 text-orange-500'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label
                  htmlFor='firstName'
                  className='block text-sm font-medium text-gray-700 mb-1'>
                  First Name
                </label>
                <input
                  type='text'
                  id='firstName'
                  name='firstName'
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${
                    errors.firstName ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-300`}
                  placeholder='John'
                />
                {errors.firstName && (
                  <p className='mt-1 text-xs text-red-500'>
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor='lastName'
                  className='block text-sm font-medium text-gray-700 mb-1'>
                  Last Name
                </label>
                <input
                  type='text'
                  id='lastName'
                  name='lastName'
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${
                    errors.lastName ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-300`}
                  placeholder='Doe'
                />
                {errors.lastName && (
                  <p className='mt-1 text-xs text-red-500'>{errors.lastName}</p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700 mb-1'>
                Email Address
              </label>
              <input
                type='email'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-300`}
                placeholder='john.doe@example.com'
              />
              {errors.email && (
                <p className='mt-1 text-xs text-red-500'>{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-gray-700 mb-1'>
                Password
              </label>
              <div className='relative'>
                <input
                  type={showPassword ? "text" : "password"}
                  id='password'
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-300 pr-10`}
                  placeholder='••••••••'
                />
                <button
                  type='button'
                  className='absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-orange-500 transition-colors'
                  onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-5 w-5'
                      viewBox='0 0 20 20'
                      fill='currentColor'>
                      <path d='M10 12a2 2 0 100-4 2 2 0 000 4z' />
                      <path
                        fillRule='evenodd'
                        d='M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z'
                        clipRule='evenodd'
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-5 w-5'
                      viewBox='0 0 20 20'
                      fill='currentColor'>
                      <path
                        fillRule='evenodd'
                        d='M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z'
                        clipRule='evenodd'
                      />
                      <path d='M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z' />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p className='mt-1 text-xs text-red-500'>{errors.password}</p>
              )}
            </div>

            <div>
              <label
                htmlFor='confirmPassword'
                className='block text-sm font-medium text-gray-700 mb-1'>
                Confirm Password
              </label>
              <div className='relative'>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id='confirmPassword'
                  name='confirmPassword'
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-300 pr-10`}
                  placeholder='••••••••'
                />
                <button
                  type='button'
                  className='absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-orange-500 transition-colors'
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-5 w-5'
                      viewBox='0 0 20 20'
                      fill='currentColor'>
                      <path d='M10 12a2 2 0 100-4 2 2 0 000 4z' />
                      <path
                        fillRule='evenodd'
                        d='M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z'
                        clipRule='evenodd'
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-5 w-5'
                      viewBox='0 0 20 20'
                      fill='currentColor'>
                      <path
                        fillRule='evenodd'
                        d='M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z'
                        clipRule='evenodd'
                      />
                      <path d='M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z' />
                    </svg>
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className='mt-1 text-xs text-red-500'>
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <div className='flex items-start'>
              <div className='flex items-center h-5'>
                <input
                  id='agreeToTerms'
                  name='agreeToTerms'
                  type='checkbox'
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className='focus:ring-orange-500 h-4 w-4 text-orange-600 border-gray-300 rounded'
                />
              </div>
              <div className='ml-3 text-sm'>
                <label
                  htmlFor='agreeToTerms'
                  className='font-medium text-gray-700'>
                  I agree to the{" "}
                  
                  <Link
                    href='/privacy'
                    className='text-orange-600 hover:text-orange-500'>
                    Privacy Policy
                  </Link>
                </label>
                {errors.agreeToTerms && (
                  <p className='mt-1 text-xs text-red-500'>
                    {errors.agreeToTerms}
                  </p>
                )}
              </div>
            </div>

            <button
              type='submit'
              disabled={isLoading}
              className='w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-400 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-orange-500 focus:ring-opacity-50 flex items-center justify-center'>
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
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className='mt-6 text-center'>
            <p className='text-sm text-gray-600'>
              Already have an account?
              <Link
                href='/login'
                className='font-medium text-orange-600 hover:text-orange-500 ml-1'>
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
