import { v4 as uuidv4 } from "uuid";
import { WebSocketServer, WebSocket } from "ws";
import express from "express";
import cors from "cors";

import mongoose from "mongoose";
//@ts-ignore
import { Group } from "./models/groupModel";
import { Message } from "./models/msgModel.js";

const app = express();
const wss = new WebSocketServer({ port: 8080 });

app.use(cors());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.json());

interface userSocket {
  socket: WebSocket;
  roomId: string;
}
let users: userSocket[] = [];

mongoose
  .connect("mongodb://localhost:27017/chatAppWS")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.post("/createGroup", async (req, res) => {
  const { groupName } = req.body;
  const groupExist = await Group.findOne({ name: groupName });
  if (groupExist)
    return res.json({
      message: "Group already exists, Please Try Something Diffrent .",
    });

  const group = await Group.create({
    id: uuidv4(),
    name: groupName,
  });

  res.json({ groupId: group.id });
});

wss.on("connection", (socket) => {
  socket.on("message", async (msg) => {
    const messageData = JSON.parse(msg.toString());

    if (messageData.type === "join") {
      users.push({
        socket,
        roomId: messageData.payload.roomId,
      });
    }

    if (messageData.type === "chat") {
      const senderRoomId = users.find((s) => s.socket === socket)?.roomId;

      users.forEach((user) => {
        if (user.roomId === senderRoomId) {
          user.socket.send(messageData.payload.message);
        }
      });

      const createMessage = await Message.create({
        groupId: senderRoomId,
        message: messageData.payload.message,
        senderId: socket,
      });
    }
  });

  socket.on("close", () => {
    users = users.filter((u) => u.socket !== socket);
  });
});

app.listen(3030, () => console.log("App Listen On 3030"));
