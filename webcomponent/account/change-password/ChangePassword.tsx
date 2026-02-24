"use client";
import { Lock } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthHeader } from "@/webcomponent/reusable/AuthHeader";
import { useResetPasswordMutation } from "@/api/auth";
import { useEffect, useState } from "react";
import { getEmail, getOtp } from "@/lib/cookies";

// Zod schema for validation
const passwordSchema = z
  .object({
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .min(1, "Password is required"),
    new_password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .min(1, "Password is required"),
  })
  .refine((data) => data.password === data.new_password, {
    message: "Passwords don't match",
    path: ["new_password"],
  });

type PasswordForm = z.infer<typeof passwordSchema>;

export const ChangePassword = () => {
  const router = useRouter();
  // Initialize react-hook-form with zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
  });
  const { mutate: resetPasswordMutation, isPending: isResetting } =
    useResetPasswordMutation();
  const [emailOTp, setOTp] = useState({
    email: "",
    otpCode: "",
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOTp({
      email: getEmail() || "",
      otpCode: getOtp() || "",
    });
  }, []);

  const onSubmit = (data: PasswordForm) => {
    console.log("Form submitted", data);
    resetPasswordMutation({
      email: emailOTp.email,
      otp_code: emailOTp.otpCode,
      new_password: data.password,
    });
    router.push("/success");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 rounded-md shadow-xl w-full max-w-md p-8">
        {/* Logo and Title */}
        <div className="text-center mb-20">
          <AuthHeader
            title="Create New Password"
            subtitle={`Enter your new password. Make sure it's strong and secure.`}
          />
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {/* New Password Field */}
          <div>
            <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300">
              New Password
            </label>
            <div className="relative flex flex-row justify-between">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                <Lock size={20} />
              </span>
              <input
                type="password"
                placeholder="Enter your new password"
                className={`w-full pl-10 pr-4 py-3 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${errors.password ? "border-red-500" : "border-gray-300 dark:border-gray-600"}`}
                {...register("password")}
              />
            </div>
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300">
              Confirm Password
            </label>
            <div className="relative flex flex-row justify-between">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                <Lock size={20} />
              </span>
              <input
                type="password"
                placeholder="Confirm your new password"
                className={`w-full pl-10 pr-4 py-3 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${errors.new_password ? "border-red-500" : "border-gray-300 dark:border-gray-600"}`}
                {...register("new_password")}
              />
            </div>
            {errors.new_password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.new_password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600 text-white font-semibold py-3 mt-8 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
          >
            {isResetting ? "Changing Password..." : "Change Password"}
          </button>

          {/* Link to Login if password was changed */}
          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
            Remember your password?
            <Link
              href="/login"
              className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-semibold"
            >
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
