// TODO: configuration web sockets

// import ws from "ws";

// import { applyWSSHandler } from "@trpc/server/adapters/ws";
// import { appRouter } from "./root";
// import { createContext } from "./context";

// const wss = new ws.Server({
//   port: 3001,
// });

// const handler = applyWSSHandler({
//   wss,
//   router: appRouter,
//   createContext,
// });

// wss.on("connection", (ws) => {
//   console.log(`➕➕ Connection (${wss.clients.size})`);
//   ws.once("close", () => {
//     console.log(`➖➖ Connection (${wss.clients.size})`);
//   });
// });

// process.on("SIGTERM", () => {
//   console.log("SIGTERM");
//   handler.broadcastReconnectNotification();
//   wss.close();
// });

// console.log("✅ WebSocket Server listening on ws://localhost:3001");
