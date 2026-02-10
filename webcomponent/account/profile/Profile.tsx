"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Loader2, Camera } from "lucide-react";

import {
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useChangePasswordMutation,
  useToggle2FAMutation,
} from "@/api/auth"; // adjust path to your hooks file
import { UpdateUserProfileRequest } from "@/interface/Auth";
import { toast } from "sonner";
// adjust path

// ────────────────────────────────────────────────
// Zod Schema
// ────────────────────────────────────────────────
const profileSchema = z
  .object({
    firstName: z.string().min(1, "First name is required").trim(),
    lastName: z.string().min(1, "Last name is required").trim(),
    email: z.string().email("Invalid email").min(1, "Email is required"),
    phoneNumber: z
      .string()
      .regex(/^[+]?[\d\s()-]+$/, "Invalid phone number")
      .optional()
      .or(z.literal("")),
    role: z.enum(["ADMIN", "MANAGER", "STAFF"]).optional(),
    avatarFile: z.any().optional(), // we handle file separately
    // Password fields — only validated if newPassword is present
    currentPassword: z.string().optional(),
    newPassword: z.string().optional(),
    confirmPassword: z.string().optional(),
    is2FAEnabled: z.boolean().optional(),
  })
  .refine(
    (data) => {
      if (data.newPassword && data.newPassword.length > 0) {
        return data.newPassword.length >= 8;
      }
      return true;
    },
    {
      message: "Password must be at least 8 characters",
      path: ["newPassword"],
    },
  )
  .refine(
    (data) => {
      if (data.newPassword && data.newPassword.length > 0) {
        return data.newPassword === data.confirmPassword;
      }
      return true;
    },
    { message: "Passwords do not match", path: ["confirmPassword"] },
  )
  .refine(
    (data) => {
      if (data.newPassword && data.newPassword.length > 0) {
        return data.currentPassword && data.currentPassword.length > 0;
      }
      return true;
    },
    { message: "Current password required", path: ["currentPassword"] },
  );

type ProfileFormValues = z.infer<typeof profileSchema>;

export const Profile = () => {
  const { data: user, isLoading: isProfileLoading,refetch } = useGetUserProfileQuery();

  const updateProfileMutation = useUpdateUserProfileMutation();
  const changePasswordMutation = useChangePasswordMutation();
  const toggle2FAMutation = useToggle2FAMutation();

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageError, setImageError] = useState("");

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      role: "STAFF",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      is2FAEnabled: false,
    },
  });

  // Populate form when user data loads
  useEffect(() => {
    if (user) {
      form.reset({
        firstName: user.first_name || "",
        lastName: user.last_name || "",
        email: user.email || "",
        phoneNumber: user.phone || "",
        role: (user.role as "ADMIN" | "MANAGER" | "STAFF") || "STAFF",
        is2FAEnabled: user.is_2fa_enabled || false,
      });

      if (user.avatar) {
        setImagePreview(user.avatar); // assuming it's a URL
      }
    }
  }, [user, form]);

  const getInitials = () => {
    const fn = form.watch("firstName")?.trim()?.[0]?.toUpperCase() || "";
    const ln = form.watch("lastName")?.trim()?.[0]?.toUpperCase() || "";
    return fn + ln || "?";
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setImageError("File size must be less than 2MB");
      return;
    }
    if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
      setImageError("Only JPG, PNG, GIF allowed");
      return;
    }

    setImageError("");
    setImageFile(file);

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const onSubmit = async (values: ProfileFormValues) => {
    const isPasswordChange = !!values.newPassword;

    try {
      // 1. Update profile (including avatar if changed)
      const profilePayload = {
        first_name: values.firstName,
        last_name: values.lastName,
        phone: values.phoneNumber || "",
        role: values.role as "ADMIN" | "MANAGER" | "STAFF",
        ...(imageFile && { avatar: imageFile }),
        is_2fa_enabled: values.is2FAEnabled ?? false,
      };

      await updateProfileMutation.mutateAsync(
        profilePayload as UpdateUserProfileRequest /* adjust type as needed */,
      );

      // 2. Change password if requested
      if (isPasswordChange) {
        await changePasswordMutation.mutateAsync({
          old_password: values.currentPassword!,
          new_password: values.newPassword!,
        });
      }

      // Optional: show toast "Profile updated"
      toast.success("Profile updated successfully!");

      // Reset password fields after success
      form.setValue("currentPassword", "");
      form.setValue("newPassword", "");
      form.setValue("confirmPassword", "");
    } catch (err: unknown) {
      console.error(err);
      const error = err as Error & { message?: string };
      toast.error("Error: " + (error?.message || "Something went wrong"));
    }
  };

  const isSubmitting =
    updateProfileMutation.isPending ||
    changePasswordMutation.isPending ||
    toggle2FAMutation.isPending ||
    isProfileLoading;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6 md:p-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Profile Settings</h1>
          <p className="text-slate-400 mt-1">
            Update your personal information, avatar, password and security
            settings.
          </p>
        </div>

        {isProfileLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          </div>
        ) : (
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 md:p-8 shadow-xl">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                {/* Avatar */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                  <div className="relative shrink-0">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover border-2 border-slate-600"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-linear-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold shadow-inner">
                        {getInitials()}
                      </div>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="avatar-upload"
                      className="cursor-pointer inline-flex items-center gap-2 bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-md text-sm font-medium transition"
                    >
                      <Camera size={16} />
                      Change Photo
                    </label>
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/jpeg,image/png,image/gif"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <p className="text-xs text-slate-400 mt-2">
                      JPG, PNG or GIF • Max 2MB
                    </p>
                    {imageError && (
                      <p className="text-xs text-red-400 mt-1">{imageError}</p>
                    )}
                  </div>
                </div>

                {/* Two-column fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="bg-slate-900 border-slate-700"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            className="bg-slate-900 border-slate-700"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            disabled
                            className="bg-slate-950 border-slate-700 text-slate-400"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            {...field}
                            className="bg-slate-900 border-slate-700"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled
                            className="bg-slate-950 border-slate-700 text-slate-400"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* 2FA Toggle */}
                  <FormField
                    control={form.control}
                    name="is2FAEnabled"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border border-slate-700 p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Two-Factor Authentication
                          </FormLabel>
                          <FormDescription>
                            Add an extra layer of security to your account.
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={(checked) => {
                              field.onChange(checked);
                              // Optional: call mutation immediately or on save
                              toggle2FAMutation.mutate(
                                { enable: checked },
                                {
                                  onSuccess: () => {
                                    toast.success(
                                      `2FA ${checked ? "enabled" : "disabled"} successfully!`,
                                    );
                                    refetch(); // Refresh profile data to get updated 2FA status
                                  },
                                },
                              );
                            }}
                            disabled={toggle2FAMutation.isPending}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                {/* Change Password Section */}
                <div className="border-t border-slate-700 pt-8">
                  <h3 className="text-lg font-medium mb-4">Change Password</h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField
                      control={form.control}
                      name="currentPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              {...field}
                              className="bg-slate-900 border-slate-700"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              {...field}
                              className="bg-slate-900 border-slate-700"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm New Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              {...field}
                              className="bg-slate-900 border-slate-700"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-600 hover:bg-blue-700 min-w-[140px]"
                  >
                    {isSubmitting && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Save Changes
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      form.reset();
                      setImagePreview(user?.avatar || null);
                      setImageFile(null);
                      setImageError("");
                    }}
                    className="border-slate-600 hover:bg-slate-700"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        )}
      </div>
    </div>
  );
};
