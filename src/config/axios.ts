
import axios from "axios"
// const url = import.meta.env.SERVER_URL || "http://localhost:8001";
const url = import.meta.env.SERVER_URL || "https://hf3bn65j-8001.inc1.devtunnels.ms";
export const authConfig = axios.create({
    baseURL: url,
    headers: {
        "Content-Type": "application/json",
    },
})