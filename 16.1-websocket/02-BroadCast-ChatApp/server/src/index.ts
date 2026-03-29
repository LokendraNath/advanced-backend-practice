import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

let allSocket: WebSocket[] = [];

wss.on("connection", (socket) => {
  allSocket.push(socket);

  // When Socket Send Message
  socket.on("message", (msg) => {
    console.log(`User Message Is  "${msg.toString()}"`);

    // Send All Socket
    allSocket.forEach((s) => s.send(msg.toString()));
  });
});
