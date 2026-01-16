"use client";
import { Mail } from "lucide-react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";
import { AuthHeader } from "@/webcomponent/reusable/AuthHeader";

// Zod schema for validation
const signInSchema = z.object({
  email: z
    .email("Please enter a valid email address")
    .min(1, "Email is required"),
});

type SignInFormData = z.infer<typeof signInSchema>;

export const ForgotPassword = () => {
  const router = useRouter();
  // Initialize react-hook-form with zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = (data: SignInFormData) => {
    console.log(data);
    router.push("/verification");
  };

  return (
    <div className=" flex items-center justify-center p-4">
      <div className="bg-white rounded-md shadow-xl w-full max-w-md p-8">
        {/* Logo and Title */}
        <div className="text-center mb-20">
          <AuthHeader
            title="Welcome Back"
            subtitle="Sign in to your Restaurant Management Center"
          />
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {/* Email Field */}
          <div>
            <label className="block text-sm  mb-2">Email Address</label>
            <div className="relative flex flex-row justify-between">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Mail size={20} />
              </span>
              <input
                type="email"
                placeholder="mail@example.com"
                className={`w-full pl-10 pr-4 py-3 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                {...register("email")}
              />
            </div>
            {errors.email ? (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            ) : (
              <p className="text-xs">
                We&apos;ll send a verification code to this email
              </p>
            )}
          </div>

          {/* Remember Me & Forgot Password */}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 mt-8 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
          >
            Send OTP
          </button>
        </form>
      </div>
    </div>
  );
};
