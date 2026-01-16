"use client";
import { Lock } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthHeader } from '@/webcomponent/reusable/AuthHeader';

// Zod schema for validation
const passwordSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters").min(1, "Password is required"),
  new_password: z.string().min(6, "Password must be at least 6 characters").min(1, "Password is required"),
}).refine((data) => data.password === data.new_password, {
  message: "Passwords don't match",
  path: ['new_password'],
});

type PasswordForm = z.infer<typeof passwordSchema>;

export const ChangePassword = () => {
  const router = useRouter()
  // Initialize react-hook-form with zod validation
  const { register, handleSubmit, formState: { errors } } = useForm<PasswordForm>({
    resolver: zodResolver(passwordSchema),
  });

  const onSubmit = (data: PasswordForm) => {
    console.log('Form submitted', data);
    router.push("/success")
    // You can handle the actual password change here, e.g., API call
    // alert('Password changed successfully!');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-md shadow-xl w-full max-w-md p-8">
        {/* Logo and Title */}
        <div className="text-center mb-20">
          <AuthHeader title='Create New Password' subtitle={`Enter your new password. Make sure it's strong and secure.`} />
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {/* New Password Field */}
          <div>
            <label className="block text-sm mb-2">New Password</label>
            <div className="relative flex flex-row justify-between">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Lock size={20} />
              </span>
              <input
                type="password"
                placeholder="Enter your new password"
                className={`w-full pl-10 pr-4 py-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                {...register("password")}
              />
            </div>
            {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-sm mb-2">Confirm Password</label>
            <div className="relative flex flex-row justify-between">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Lock size={20} />
              </span>
              <input
                type="password"
                placeholder="Confirm your new password"
                className={`w-full pl-10 pr-4 py-3 border ${errors.new_password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                {...register("new_password")}
              />
            </div>
            {errors.new_password && <p className="text-sm text-red-500 mt-1">{errors.new_password.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 mt-8 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
          >
            Change Password
          </button>

          {/* Link to Login if password was changed */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Remember your password? 
            <Link href="/login" className="text-indigo-600 hover:text-indigo-700 font-semibold">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}