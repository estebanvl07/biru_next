import React, { useState } from 'react';
import { useWebSocket } from '~/lib//hooks/useWebSocket';

const WebSocketComponent = () => {
  // const [message, setMessage] = useState('');
  const { isConnected, transport } = useWebSocket();

  // const handleSubmit = (event: React.FormEvent) => {
  //   event.preventDefault();
  //   sendMessage(message);
  //   setMessage('');
  // };

  return (
    <div>
      <h1>Componente WebSocket</h1>

      <div>
      <p>Status: { isConnected ? "connected" : "disconnected" }</p>
      <p>Transport: { transport }</p>
    </div>
{/* 
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Escribe un mensaje"
        />
        <button type="submit">Enviar</button>
      </form>

      <div>
        <h2>Mensajes recibidos:</h2>
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div> */}
    </div>
  );
};

export default WebSocketComponent;
