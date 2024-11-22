import next from 'next';
import { parse } from "url";
import { createServer } from 'http';
import { Server as SocketIOServer } from "socket.io" 

// Inicializa el servidor Next.js
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

let io: SocketIOServer | undefined;

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url!, true);
    handle(req, res, parsedUrl);
  });

  io = new SocketIOServer(server)

  io.on('connection', (socket) => {
      console.log('Cliente conectado al WebSocket');
      
      socket.on('message', (message) => {
        console.log(`Mensaje recibido: ${message}`);
      });
    
      // Enviar un mensaje de bienvenida cuando un cliente se conecta
      socket.emit('message', 'Conexión establecida');
    });


  // Arrancar el servidor
  server.listen(3000, () => {
    console.log('Servidor Next.js y WebSocket escuchando en el puerto 3000');
  });
});

export { io }