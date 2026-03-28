import { WebSocketServer } from "ws";
const wss = new WebSocketServer({ port: 8000 });

wss.on("connection", function (socket) {
  // if user send us message
  socket.on("message", function (data) {
    if (data.toString() === "Pinga") {
      socket.send("Tapori");
    }
  });
});
