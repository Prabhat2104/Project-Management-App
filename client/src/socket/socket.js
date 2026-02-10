import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_BACKEND_URL, {
  autoConnect: false,
  withCredentials: true,
});

socket.on("connect", () => {
  console.log("🟢 Frontend socket connected:", socket.id);
});

socket.on("connect_error", (err) => {
  console.error("🔴 Socket connection error:", err.message);
});

export default socket;


