import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import next from "next";
import { setSocketIOInstance } from "~/server/socket";

import "~/server/cron/notifications";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    handle(req, res);
  });

  const io = new SocketIOServer(server, {
    cors: {
      origin: "*",
    },
  });

  setSocketIOInstance(io);

  io.on("connection", (socket) => {
    console.log("🔌 New client connected:", socket.id);

    socket.on("disconnect", () => {
      console.log("❌ Client disconnected");
    });
  });

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`✅ Ready on http://localhost:${PORT}`);
  });
});
