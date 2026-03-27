import axios from "axios";
const url = import.meta.env.VITE_SERVER_URL;
export const authConfig = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
  },
});
