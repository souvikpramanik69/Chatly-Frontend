import { io } from "socket.io-client";

// backend URL
const url = import.meta.env.SERVER_URL || "http://localhost:8001";
// change in production

export const socket = io(url, {
  autoConnect: false, // control manually
  transports: ["websocket"], // faster than polling
});
