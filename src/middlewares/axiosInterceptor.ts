import axios from "axios";
import { authConfig } from "../config/axios";
import Cookies from "js-cookie";
authConfig.interceptors.request.use(
  (config) => {
    
    const token = Cookies.get("access_token");

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
        // const res = await axios.post(
        //   "http://localhost:8001/api/auth/refresh",
        //   {},
        //   { withCredentials: true }
        // );

        // const newAccessToken = res.data.accessToken;

        // // store new token
        // Cookies.set("access_token", newAccessToken);

        // // update header and retry original request
        // originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // return authConfig(originalRequest);
      } catch (err) {
        console.error("Refresh token failed");

        // logout user
        Cookies.remove("access_token");
        window.location.href = "/login";

        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);