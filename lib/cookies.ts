import { getCookie, setCookie, removeCookie } from "typescript-cookie";

export const getAccessToken = (): string | undefined =>
  getCookie("accessToken");
export const getRefreshToken = (): string | undefined =>
  getCookie("refreshToken");

export const setTokens = (access: string, refresh: string): void => {
  setCookie("accessToken", access, { secure: false });
  setCookie("refreshToken", refresh, { secure: false });
};

export const clearTokens = (): void => {
  removeCookie("accessToken");
  removeCookie("refreshToken");
  removeCookie("role");
};

export const getRole = (): string | undefined => getCookie("role");

export const setRole = (role: string): void => {
  setCookie("role", role, { secure: false });
};

export const getEmail = (): string | undefined => getCookie("email");

export const setEmail = (email: string): void => {
  setCookie("email", email, { secure: false });
};

export const clearEmail = (): void => {
  removeCookie("email");
};

export const getType = (): string | undefined => getCookie("type");
export const setType = (
  type: "password_reset" | "two_factor_auth" | undefined,
): void => {
  setCookie("type", type);
};

export const getOtp= (): string | undefined => getCookie("otp");
export const setOtp = (otp: string): void => {
  setCookie("otp", otp);
};
export const clearType = (): void => {
  removeCookie("type");
  removeCookie("email");
  removeCookie("otp");
};
