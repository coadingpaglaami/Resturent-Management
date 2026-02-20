import { LoginRequest, LoginResponse } from "@/interface/Login";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import {
  changePassword,
  deleteUserOrInvite,
  forgotPassword,
  getUserProfile,
  getUsersList,
  inviteUser,
  Login,
  PauseUser,
  refreshToken,
  register,
  resetPassword,
  toggle2FA,
  updateUserProfile,
  updateUserRole,
  verifyInviteToken,
} from "./api";
import { setRole, setTokens } from "@/lib/cookies";
import {
  ChangePasswordRequest,
  EntityResponse,
  InviteUserRequest,
  InviteVerifyResponse,
  MeResponse,
  RefreshTokenRequest,
  RegisterRequest,
  ResetPasswordRequest,
  Toggle2FARequest,
  UpdateUserRoleRequest,
} from "@/interface/Auth";

export const useLoginMutation = (): UseMutationResult<
  LoginResponse,
  Error,
  LoginRequest
> => {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: (data: LoginRequest) => {
      return Login(data);
    },
    onSuccess: (data) => {
      setTokens(data.access, data.refresh);
      setRole(data.user.role);
    },
  });
};

// Toggle 2FA
export const useToggle2FAMutation = () => {
  return useMutation({
    mutationKey: ["toggle2FA"],
    mutationFn: (payload: Toggle2FARequest) => toggle2FA(payload),
  });
};

// Invite User
export const useInviteUserMutation = () => {
  return useMutation({
    mutationKey: ["inviteUser"],
    mutationFn: (payload: InviteUserRequest) => inviteUser(payload),
  });
};

// Forgot Password
export const useForgotPasswordMutation = () => {
  return useMutation({
    mutationKey: ["forgotPassword"],
    mutationFn: (payload: { email: string }) => forgotPassword(payload),
  });
};

// Reset Password
export const useResetPasswordMutation = () => {
  return useMutation({
    mutationKey: ["resetPassword"],
    mutationFn: (payload: ResetPasswordRequest) => resetPassword(payload),
  });
};

// Register
export const useRegisterMutation = () => {
  return useMutation({
    mutationKey: ["register"],
    mutationFn: (payload: RegisterRequest) => register(payload),
  });
};

// Refresh Token
export const useRefreshTokenMutation = () => {
  return useMutation({
    mutationKey: ["refreshToken"],
    mutationFn: (payload: RefreshTokenRequest) => refreshToken(payload),
  });
};

// Get User Profile
export const useGetUserProfileQuery = (): UseQueryResult<MeResponse, Error> => {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: () => getUserProfile(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Change Password
export const useChangePasswordMutation = () => {
  return useMutation({
    mutationKey: ["changePassword"],
    mutationFn: (payload: ChangePasswordRequest) => changePassword(payload),
  });
};

// Update User Role
export const useUpdateUserRoleMutation = () => {
  return useMutation({
    mutationKey: ["updateUserRole"],
    mutationFn: ({
      userId,
      payload,
    }: {
      userId: string;
      payload: UpdateUserRoleRequest;
    }) => updateUserRole(userId, payload),
  });
};

// Verify Invite Token
export const useVerifyInviteTokenQuery = (
  token: string,
): UseQueryResult<InviteVerifyResponse, Error> => {
  return useQuery({
    queryKey: ["verifyInviteToken", token],
    queryFn: () => verifyInviteToken(token),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const usePauseUser = () => {
  return useMutation({
    mutationKey: ["updateUserRole"],
    mutationFn: ({
      userId,
      payload,
    }: {
      userId: string;
      payload: { is_active: boolean };
    }) => PauseUser(userId, payload),
  });
};

export const useDeleteUserMutation = () => {
  return useMutation({
    mutationFn: deleteUserOrInvite,
  });
};


export const useGetUsersListQuery = (): UseQueryResult<
  EntityResponse[],
  Error
> => {
  return useQuery({
    queryKey: ["allusers"],
    queryFn: () => getUsersList(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useUpdateUserProfileMutation = () => {
  return useMutation({
    mutationKey: ["updateUserProfile"],
    mutationFn: (payload: {
      first_name: string;
      last_name: string;
      phone: string;
      role: "ADMIN" | "MANAGER" | "STAFF";
      avatar: Blob | File; // Binary avatar
      is_2fa_enabled: boolean;
    }) => updateUserProfile(payload),
  });
};
