// Pagination Interface
export interface Pagination {
  page: number;
  limit: number;
}

// EntityResponse Interface

export interface EntityResponse {
  id: string;
  email: string;
  name: string;
  role: "ADMIN" | "MANAGER" | "STAFF";
  status: string;
  avatar: string | null;
  date: string;
}

// Auth Request and Response Types

// /auth/2fa/toggle
export interface Toggle2FARequest {
  enable: boolean;
}

export interface Toggle2FAResponse {
  message: string;
}

// /auth/invite
export interface InviteUserRequest {
  email: string;
  role: "ADMIN" | "MANAGER" | "STAFF";
}

export interface InviteUserResponse {
  message: string;
  token: string;
}

// /auth/login
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  refresh: string;
  access: string;
  user: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    role: string;
    avatar: string | null;
    is_2fa_enabled: boolean;
  };
}

// /auth/login/verify
export interface LoginVerifyResponse {
  refresh: string;
  access: string;
  user: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    role: string;
    avatar: string | null;
    is_2fa_enabled: boolean;
  };
}

// /auth/password/forgot
export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  message: string;
}

// /auth/password/reset
export interface ResetPasswordRequest {
  email: string;
  otp_code: string;
  new_password: string;
}

export interface ResetPasswordResponse {
  message: string;
}

// /auth/register
export interface RegisterRequest {
  token: string;
  password: string;
  first_name: string;
  last_name: string;
  phone: string;
}

export interface RegisterResponse {
  token: string;
  first_name: string;
  last_name: string;
  phone: string;
}

// /auth/token/refresh
export interface RefreshTokenRequest {
  refresh: string;
}

export interface RefreshTokenResponse {
  access: string;
  refresh: string;
}

// /auth/me
export interface UserProfile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  role: string;
  avatar: string | null;
  is_2fa_enabled: boolean;
  date_joined: string;
}

// /auth/password/change
export interface ChangePasswordRequest {
  old_password: string;
  new_password: string;
}

export interface ChangePasswordResponse {
  old_password: string;
  new_password: string;
}

// /auth/users/{id}/role
export interface UpdateUserRoleRequest {
  role: "ADMIN" | "MANAGER" | "STAFF";
}

// /auth/me
export interface MeResponse {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  role: string;
  avatar: string | null;
  status: string;
  is_2fa_enabled: boolean;
  date_joined: string;
}

// /auth/invite/verify/{token}
export interface InviteVerifyResponse {
  email: string;
  role: string;
  valid: boolean;
}

export interface UpdateUserProfileRequest {
  first_name: string;
  last_name: string;
  phone: string;
  role: "ADMIN" | "MANAGER" | "STAFF";
  avatar: Blob | File; // Binary avatar
  is_2fa_enabled: boolean;
}
