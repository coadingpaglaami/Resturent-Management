"use client";
import { Lock, Mail } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthHeader } from "@/webcomponent/reusable/AuthHeader";
import { useLoginMutation } from "@/api/auth";

const signInSchema = z.object({
  email: z
    .email("Please enter a valid email address")
    .min(1, "Email is required"),
  password: z
    .string()
    .min(4, "Password must be at least 6 characters")
    .min(1, "Password is required"),
});

console.log(process.env.NEXT_PUBLIC_API_URL,'signin url ');
type SignInFormData = z.infer<typeof signInSchema>;

export const SignIn = () => {
  const router = useRouter();
  const loginMutation = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      await loginMutation.mutateAsync({
        email: data.email,
        password: data.password,
      });
      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="p-4">
      <div className="bg-white dark:bg-gray-900 rounded-md shadow-xl w-full max-w-md p-8">
        <div className="text-center mb-4">
          <AuthHeader
            title="Welcome Back"
            subtitle={`Sign in to your Restaurant Management Center`}
          />
        </div>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-100">
              Email Address
            </label>
            <div className="relative flex flex-row justify-between">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                <Mail size={20} />
              </span>
              <input
                type="email"
                placeholder="mail@example.com"
                className={`w-full pl-10 pr-4 py-3 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                  errors.email ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                }`}
                {...register("email")}
                disabled={loginMutation.isPending}
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
              Password
            </label>
            <div className="relative flex flex-row justify-between">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                <Lock size={20} />
              </span>
              <input
                type="password"
                placeholder="Enter your password"
                className={`w-full pl-10 pr-4 py-3 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                  errors.password ? "border-red-500" : "border-gray-300 dark:border-gray-600"
                }`}
                {...register("password")}
                disabled={loginMutation.isPending}
              />
            </div>
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {loginMutation.isError && (
            <div className="text-sm text-red-500 text-center">
              {loginMutation.error?.message ||
                "Login failed. Please try again."}
            </div>
          )}

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 text-indigo-600 border-gray-300 dark:border-gray-600 rounded focus:ring-indigo-500"
              />
              <span className="text-gray-600 dark:text-gray-400">Remember me</span>
            </label>
            <Link
              href="/forgot-password"
              className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium"
            >
              Forgot password?
            </Link>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            By continuing an account, you agree to{" "}
            <a href="#" className="text-indigo-600 dark:text-indigo-400 hover:underline">
              Terms of use
            </a>{" "}
            and{" "}
            <a href="#" className="text-indigo-600 dark:text-indigo-400 hover:underline">
              Privacy Policy
            </a>
            .
          </p>

          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loginMutation.isPending ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
};
