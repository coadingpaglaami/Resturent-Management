import { LoginRequest, LoginResponse } from "@/interface/Login";
import {
  Toggle2FARequest,
  InviteUserRequest,
  ResetPasswordRequest,
  RegisterRequest,
  RefreshTokenRequest,
  ChangePasswordRequest,
  UpdateUserRoleRequest,
  MeResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ResetPasswordResponse,
  RegisterResponse,
  InviteVerifyResponse,
  EntityResponse,
  UserProfile,
} from "@/interface/Auth";
import axios from "@/lib/axios";

export const Login = async (payload: LoginRequest): Promise<LoginResponse> => {
  const { data } = await axios.post("/auth/login/", payload);
  return data;
};

export const toggle2FA = async (payload: Toggle2FARequest) => {
  const { data } = await axios.post(`/auth/2fa/toggle/`, payload);
  return data;
};

// /auth/invite
export const inviteUser = async (payload: InviteUserRequest) => {
  const { data } = await axios.post(`/auth/invite/`, payload);
  return data;
};

// /auth/password/forgot
export const forgotPassword = async (
  payload: ForgotPasswordRequest,
): Promise<ForgotPasswordResponse> => {
  const { data } = await axios.post(`/auth/password/forgot/`, payload);
  return data;
};

// /auth/password/reset
export const resetPassword = async (
  payload: ResetPasswordRequest,
): Promise<ResetPasswordResponse> => {
  const { data } = await axios.post(`/auth/password/reset/`, payload);
  return data;
};

// /auth/register
export const register = async (
  payload: RegisterRequest,
): Promise<RegisterResponse> => {
  const { data } = await axios.post(`/auth/register/`, payload);
  return data;
};

// /auth/token/refresh
export const refreshToken = async (payload: RefreshTokenRequest) => {
  const { data } = await axios.post(`/auth/token/refresh/`, payload);
  return data;
};

// /auth/me
export const getUserProfile = async (): Promise<MeResponse> => {
  const { data } = await axios.get(`/auth/me/`);
  return data;
};

// /auth/password/change
export const changePassword = async (payload: ChangePasswordRequest) => {
  const { data } = await axios.patch(`/auth/password/change/`, payload);
  return data;
};

// /auth/users/{id}/role
export const updateUserRole = async (
  userId: string,
  payload: UpdateUserRoleRequest,
) => {
  const { data } = await axios.patch(`/auth/users/${userId}/role/`, payload);
  return data;
};

// /auth/invite/verify/{token}
export const verifyInviteToken = async (
  token: string,
): Promise<InviteVerifyResponse> => {
  const { data } = await axios.get(`/auth/invite/verify/${token}`);
  return data;
};

export const getUsersList = async (): Promise<EntityResponse[]> => {
  const { data } = await axios.get(`/auth/users/`);
  return data;
};

export const PauseUser = async (
  userId: string,
  payload: { is_active: boolean },
): Promise<UserProfile> => {
  const { data } = await axios.patch(`/auth/users/${userId}/role/`, payload);
  return data;
};

export const deleteUserOrInvite = async ({
  id,
  status,
}: {
  id: string;
  status: string;
}): Promise<{ message: string }> => {
  const endpoint =
    status !== "Active"
      ? `/auth/invites/${id}/delete/`
      : `/auth/users/${id}/delete/`;

  const { data } = await axios.delete(endpoint);
  return data;
};

export const updateUserProfile = async (payload: {
  first_name: string;
  last_name: string;
  phone: string;
  role: "ADMIN" | "MANAGER" | "STAFF";
  avatar: Blob | File; // Avatar as binary data (e.g., Blob or File object)
  is_2fa_enabled: boolean;
}): Promise<UserProfile> => {
  const formData = new FormData();
  formData.append("first_name", payload.first_name);
  formData.append("last_name", payload.last_name);
  formData.append("phone", payload.phone);
  formData.append("role", payload.role);
  formData.append("is_2fa_enabled", String(payload.is_2fa_enabled));

  if (payload.avatar) {
    formData.append("avatar", payload.avatar); // Binary data (Blob/File)
  }

  const { data } = await axios.put(`/auth/me`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};
