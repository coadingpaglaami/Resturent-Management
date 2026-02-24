"use client";
import { useOtpVerifyMutation } from "@/api/auth";
import { clearType, getEmail, getType, setRole, setTokens } from "@/lib/cookies";
import { useRouter } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";

import { setOtp as setCookieOTP } from "@/lib/cookies";

export const OTPVerification = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const router = useRouter();
  const [email, setEmail] = useState({
    email: "",
    type: "two_factor_auth" as "two_factor_auth" | "password_reset",
  });
  const { mutateAsync: otpVerifyMutation, isPending: isVerifying } =
    useOtpVerifyMutation();

  useEffect(() => {
    const email = getEmail() || "";
    const type = (getType() || "two_factor_auth") as
      | "two_factor_auth"
      | "password_reset";
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEmail({ email, type });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const value = e.target.value;
    if (value.match(/[^0-9]/)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleBackspace = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

const handleSubmit = async () => {
  try {
    const otpCode = otp.join("");

    console.log("OTP Submitted:", otpCode);

    // ✅ Wait for API response
    const res = await otpVerifyMutation({
      type: email.type,
      obj: {
        email: email.email,
        otp_code: otpCode,
      },
    });

    console.log("OTP Verify Response:", res);

    // ✅ Password reset flow
    if (email.type === "password_reset") {
      setCookieOTP(otpCode);
      router.push("/reset-password");
      return;
    }

    // ✅ 2FA flow
    if (email.type === "two_factor_auth" && res) {
      // If API returns tokens
      if ("access" in res && "refresh" in res) {
        setTokens(res.access as string, res.refresh as string);
        setRole(((res as unknown) as { user: { role: string } }).user.role);
      }

      clearType();
      router.push("/dashboard");
    }
  } catch (error) {
    console.error("OTP verification failed:", error);
  }
};

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4 min-h-screen">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-md p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 dark:bg-indigo-900 rounded-full mb-4">
            <svg
              className="w-8 h-8 text-indigo-600 dark:text-indigo-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-indigo-700 dark:text-indigo-300 mb-2">
            Check Your Email
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            We&apos;ve sent a 6-digit OTP to{" "}
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">
              {email.email}
            </span>
          </p>
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            Enter the code below to continue
          </p>
        </div>

        {/* OTP Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 text-center mb-4">
            Enter OTP Code
          </label>
          <div className="flex gap-2 justify-center">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleBackspace(e, index)}
                ref={(el) => {
                  if (el) inputRefs.current[index] = el;
                }}
                className="w-12 h-14 text-center text-xl font-semibold border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-indigo-500 dark:focus:border-indigo-400 transition-all"
              />
            ))}
          </div>
        </div>

        {/* Verify Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600 text-white font-semibold py-3 rounded-lg transition duration-200 shadow-md hover:shadow-lg mb-4 disabled:opacity-50"
          disabled={isVerifying || otp.some((digit) => digit === "")}
        >
          {isVerifying ? "Verifying..." : "Verify OTP"}
        </button>

        {/* Resend OTP */}
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Didn&apos;t receive the code?
          </p>
          <button className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-semibold text-sm">
            Resend OTP
          </button>
        </div>
      </div>
    </div>
  );
};
