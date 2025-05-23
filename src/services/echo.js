import Echo from "laravel-echo";
import io from "socket.io-client";

window.io = io;

const echo = new Echo({
  broadcaster: "socket.io",
  host: `${process.env.REACT_APP_ECHO_HOST || "http://54.206.82.85" }:${process.env.REACT_APP_ECHO_PORT || 6001}`, // Use your public IP or domain
  transports: ["websocket"], // Force WebSockets
  auth: {
    headers: {
      "X-CSRF-TOKEN": document.head.querySelector('meta[name="csrf-token"]')?.content
    }
  },
  encrypted: true
});

echo.connector.socket.on("connect", () => {
  console.log("✅ Echo Connected:", echo.connector.socket.id);
});

echo.connector.socket.on("connect_error", (err) => {
  console.error("❌ Echo Connection Error:", err);
});

export default echo;