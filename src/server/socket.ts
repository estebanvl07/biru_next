// server/socket.ts
import { Server as SocketIOServer } from "socket.io";

/* eslint-disable no-var */
declare global {
  var _io: SocketIOServer | null;
}
/* eslint-enable no-var */

global._io = global._io || null;

export const setSocketIOInstance = (server: SocketIOServer) => {
  console.log("🚀 Inicializando Socket.IO");
  global._io = server;
};

export const getIO = (): SocketIOServer => {
  if (!global._io) {
    throw new Error("Socket.IO no está inicializado");
  }
  return global._io;
};
