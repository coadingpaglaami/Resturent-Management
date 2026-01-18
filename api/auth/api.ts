import { LoginRequest, LoginResponse } from "@/interface/Login";
import axios from "@/lib/axios";

export const Login = async (payload: LoginRequest): Promise<LoginResponse> => {
  const { data } = await axios.post("/auth/login/", payload);
  return data;
};

