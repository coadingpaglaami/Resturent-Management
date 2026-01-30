import axios from "axios";
import { getAccessToken } from "./cookies";

const axiosInstance = axios.create({
  baseURL: "http://31.97.10.158:8000",
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default axiosInstance;
