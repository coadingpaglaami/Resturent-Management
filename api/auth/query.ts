import { LoginRequest, LoginResponse } from "@/interface/Login";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { Login } from "./api";
import { setTokens } from "@/lib/cookies";

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
    },
  });
};
