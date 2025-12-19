'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';



// Zod validation schema
const profileSchema = z.object({
  firstName: z.string().min(1, 'First name is required').trim(),
  lastName: z.string().min(1, 'Last name is required').trim(),
  email: z.email('Invalid email format').min(1, 'Email is required'),
  phoneNumber: z.string().regex(/^[+]?[\d\s()-]+$/, 'Invalid phone number format').optional().or(z.literal('')),
  role: z.string().optional(),
  defaultLocation: z.string().optional(),
  currentPassword: z.string().optional(),
  newPassword: z.string().optional(),
  confirmPassword: z.string().optional(),
}).refine((data) => {
  if (data.newPassword && data.newPassword.length > 0) {
    return data.newPassword.length >= 8;
  }
  return true;
}, {
  message: 'Password must be at least 8 characters',
  path: ['newPassword'],
}).refine((data) => {
  if (data.newPassword && data.newPassword.length > 0) {
    return data.newPassword === data.confirmPassword;
  }
  return true;
}, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
}).refine((data) => {
  if (data.newPassword && data.newPassword.length > 0) {
    return data.currentPassword && data.currentPassword.length > 0;
  }
  return true;
}, {
  message: 'Current password is required to set new password',
  path: ['currentPassword'],
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export const Profile = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageError, setImageError] = useState('');

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@example.com',
      phoneNumber: '+1 (555) 123-4567',
      role: 'Admin',
      defaultLocation: '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const getInitials = () => {
    const firstName = form.watch('firstName') || '';
    const lastName = form.watch('lastName') || '';
    const first = firstName.trim().charAt(0).toUpperCase();
    const last = lastName.trim().charAt(0).toUpperCase();
    return `${first}${last}`;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setImageError('File size must be less than 2MB');
        return;
      }
      
      if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
        setImageError('Only JPG, PNG, or GIF files are allowed');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string | null);
        setImageError('');
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data:ProfileFormValues) => {
    console.log('Form submitted:', data);
    alert('Profile updated successfully!');
  };

  const handleCancel = () => {
    form.reset();
    setImagePreview(null);
    setImageError('');
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-8">
      <div className="block mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-white mb-2">Profile</h1>
          <p className="text-slate-400">Manage Your Profile Information and Change Your Password</p>
        </div>

        <div className="bg-slate-800 rounded-lg p-8 border border-slate-700">
          <h2 className="text-lg font-medium text-white mb-6">Profile Settings</h2>

          <Form {...form}>
            <div onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Profile Photo */}
              <div className="mb-8">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    {imagePreview ? (
                      <img 
                        src={imagePreview} 
                        alt="Profile" 
                        className="w-20 h-20 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-semibold">
                        {getInitials()}
                      </div>
                    )}
                  </div>
                  <div>
                    <label htmlFor="photo-upload" className="cursor-pointer">
                      <div className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium inline-block transition-colors">
                        Change Photo
                      </div>
                    </label>
                    <input 
                      id="photo-upload" 
                      type="file" 
                      accept="image/jpeg,image/png,image/gif"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <p className="text-xs text-slate-400 mt-2">JPG, PNG or GIF. Max size 2MB</p>
                    {imageError && <p className="text-xs text-red-400 mt-1">{imageError}</p>}
                  </div>
                </div>
              </div>

              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-300">First Name</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          className="bg-slate-900 border-slate-700 text-slate-100 focus:border-blue-500"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-300">Last Name</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          className="bg-slate-900 border-slate-700 text-slate-100 focus:border-blue-500"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-300">Email</FormLabel>
                    <FormControl>
                      <Input 
                        type="email"
                        {...field} 
                        className="bg-slate-900 border-slate-700 text-slate-100 focus:border-blue-500"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              {/* Phone Number */}
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-300">Phone Number</FormLabel>
                    <FormControl>
                      <Input 
                        type="tel"
                        {...field} 
                        className="bg-slate-900 border-slate-700 text-slate-100 focus:border-blue-500"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              {/* Role and Default Location */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-300">Role</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          className="bg-slate-900 border-slate-700 text-slate-100 focus:border-blue-500"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="defaultLocation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-300">Default Location</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          className="bg-slate-900 border-slate-700 text-slate-100 focus:border-blue-500"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Change Password Section */}
              <div className="border-t border-slate-700 pt-6">
                <h3 className="text-base font-medium text-white mb-4">Change Password</h3>
                
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="currentPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-300">Current Password</FormLabel>
                        <FormControl>
                          <Input 
                            type="password"
                            {...field} 
                            className="bg-slate-900 border-slate-700 text-slate-100 focus:border-blue-500"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-300">New Password</FormLabel>
                        <FormControl>
                          <Input 
                            type="password"
                            {...field} 
                            className="bg-slate-900 border-slate-700 text-slate-100 focus:border-blue-500"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-300">Confirm New Password</FormLabel>
                        <FormControl>
                          <Input 
                            type="password"
                            {...field} 
                            className="bg-slate-900 border-slate-700 text-slate-100 focus:border-blue-500"
                          />
                        </FormControl>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  type="button"
                  onClick={form.handleSubmit(onSubmit)}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <span className="mr-2">💾</span>
                  Save Changes
                </Button>
                <Button
                  type="button"
                  onClick={handleCancel}
                  variant="secondary"
                  className="bg-slate-700 hover:bg-slate-600 text-slate-200"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

