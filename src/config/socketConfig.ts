import { io } from "socket.io-client";

// backend URL
const url = import.meta.env.VITE_SERVER_URL;

console.log("Urlll " , url)

export const socket = io(url, {
  autoConnect: false, // control manually
  transports: ["websocket"], // faster than polling
});
