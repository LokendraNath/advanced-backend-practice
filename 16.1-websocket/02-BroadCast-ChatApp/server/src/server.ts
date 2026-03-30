import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

interface User {
  socket: WebSocket;
  room: string;
}

let allSocket: User[] = [];

wss.on("connection", (socket) => {
  socket.on("message", (msg) => {
    let parsedMessage = JSON.parse(msg as unknown as string);
    if (parsedMessage.payload.type === "join") {
      allSocket.push({
        socket,
        room: parsedMessage.payload.roomId,
      });
    } else if (parsedMessage.payload.type === "msg") {
      const userRoomId = allSocket.find((s) => s.socket === socket);
    }
    console.log(allSocket);
  });

  socket.on("close", () => {
    // allSocket = allSocket.filter((s) => s != socket);
  });
});
