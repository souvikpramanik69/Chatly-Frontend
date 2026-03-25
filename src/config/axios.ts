
import axios from "axios"
const url = import.meta.env.SERVER_URL || "http://localhost:8001";
export const authConfig = axios.create({
    baseURL: url,
    headers: {
        "Content-Type": "application/json",
    },
})