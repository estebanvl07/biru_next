// hooks/useWebSocket.ts
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const socket: Socket = io("http://localhost:3000", {
  autoConnect: false,
});

type EventHandler = {
  [event: string]: (...args: any[]) => void;
};

export const useWebSocket = (handlers?: EventHandler) => {
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");

  useEffect(() => {
    socket.connect();

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);
      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    // Register custom handlers
    if (handlers) {
      Object.entries(handlers).forEach(([event, handler]) => {
        socket.on(event, handler);
      });
    }

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);

      if (handlers) {
        Object.entries(handlers).forEach(([event, handler]) => {
          socket.off(event, handler);
        });
      }
    };
  }, []);

  return {
    isConnected,
    transport,
    socket, // opcional si quieres usarlo directamente
  };
};
