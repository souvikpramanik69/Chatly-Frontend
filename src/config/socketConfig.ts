import { io } from "socket.io-client";

// backend URL
const url = import.meta.env.SERVER_URL || "https://hf3bn65j-8001.inc1.devtunnels.ms";
// change in production

export const socket = io(url, {
  autoConnect: false, // control manually
  transports: ["websocket"], // faster than polling
});