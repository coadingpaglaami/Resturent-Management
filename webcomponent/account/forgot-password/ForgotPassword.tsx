"use client";

import { Mail, ArrowLeft, Loader2 } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { AuthHeader } from "@/webcomponent/reusable/AuthHeader";
import { useForgotPasswordMutation } from "@/api/auth";
import { setEmail, setType } from "@/lib/cookies";

// Zod schema
const forgotPasswordSchema = z.object({
  email: z.email().min(1, "Email is required"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export const ForgotPassword = () => {
  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const mutation = useForgotPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting: formIsSubmitting },
    reset,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const isLoading = mutation.isPending || formIsSubmitting;

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      // ✅ Wait for success
      await mutation.mutateAsync({
        email: data.email,
      });

      // ✅ After success
      setEmail(data.email);
      setType("password_reset");

      setSuccessMessage(
        "We've sent a password reset link to your email. Please check your inbox (and spam folder).",
      );

      reset();

      router.push("/verification");
    } catch (error) {
      console.error("Forgot password error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
        {/* Header */}
        <div className="px-8 pt-10 pb-6 text-center">
          <AuthHeader
            title="Forgot Password?"
            subtitle="No worries — we'll send you reset instructions."
          />
        </div>

        {/* Success message */}
        {successMessage ? (
          <div className="px-8 pb-8 text-center space-y-6">
            <div className="text-green-600 dark:text-green-400 font-medium">
              {successMessage}
            </div>
            <button
              onClick={() => router.push("/login")}
              className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium transition"
            >
              <ArrowLeft size={16} />
              Back to Sign In
            </button>
          </div>
        ) : (
          /* Form */
          <form
            className="px-8 pb-10 space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Email Field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email Address
              </label>

              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
                  size={18}
                />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className={`
                    w-full pl-10 pr-4 py-3 rounded-lg border bg-white dark:bg-gray-800
                    text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500
                    focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
                    transition-all duration-200
                    ${errors.email ? "border-red-500" : "border-gray-300 dark:border-gray-700"}
                  `}
                  {...register("email")}
                  disabled={isLoading}
                />
              </div>

              {errors.email && (
                <p className="text-sm text-red-600 dark:text-red-400">
                  {errors.email.message}
                </p>
              )}

              {!errors.email && (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  We&apos;ll email you a secure link to reset your password.
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`
                w-full flex items-center justify-center gap-2
                bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800
                text-white font-semibold py-3 rounded-lg
                shadow-md hover:shadow-lg transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                disabled:opacity-60 disabled:cursor-not-allowed
              `}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Sending...
                </>
              ) : (
                "Send Reset Link"
              )}
            </button>

            {/* Back link */}
            <div className="text-center">
              <button
                type="button"
                onClick={() => router.push("/login")}
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
              >
                ← Back to Sign In
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
