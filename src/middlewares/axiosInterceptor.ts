import axios from "axios";
import { authConfig } from "../config/axios";

authConfig.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

authConfig.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If token expired (401) and not retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // call refresh token API
        const res = await axios.post(
          "http://localhost:5000/api/auth/refresh",
          {},
          { withCredentials: true }
        );

        const newAccessToken = res.data.accessToken;

        // store new token
        localStorage.setItem("accessToken", newAccessToken);

        // update header and retry original request
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return authConfig(originalRequest);
      } catch (err) {
        console.error("Refresh token failed");

        // logout user
        localStorage.removeItem("accessToken");
        window.location.href = "/login";

        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);