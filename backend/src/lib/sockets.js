import http from "http";
import { Server } from "socket.io";
import app from "../app.js";
import { CORS_ORIGIN } from "../constants.js";
import User from "../models/user.model.js";
import { sendMessageToKafka } from "../utils/kafka/producer.js";

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: CORS_ORIGIN,
  },
});

let onlineUsers = new Map();

io.on("connection", async (socket) => {
  try {
    const userId = socket.handshake.query.userId;

    console.log("Client connected:", userId);
    onlineUsers.set(userId, socket.id);

    for (const [id, socketId] of onlineUsers.entries()) {
      const onlineUserDocs = await User.find({
        _id: {
          $in: Array.from(onlineUsers.keys()),
          $ne: id,
        },
      }).select("-password -refreshToken");

      io.to(socketId).emit("getOnlineUsers", onlineUserDocs);
    }

    socket.on("sendMessage", async (messageToBeSent) => {
      await sendMessageToKafka(messageToBeSent);
    });

    socket.on("disconnect", async () => {
      if (onlineUsers.has(userId)) {
        onlineUsers.delete(userId);
      }

      for (const [id, socketId] of onlineUsers.entries()) {
        const onlineUserDocs = await User.find({
          _id: {
            $in: Array.from(onlineUsers.keys()),
            $ne: id,
          },
        }).select("-password -refreshToken");

        io.to(socketId).emit("getOnlineUsers", onlineUserDocs);
      }

      console.log("Client disconnected");
    });
  } catch (error) {
    console.log("Error on connecting client:", error.message);
  }
});

export { server, io };
