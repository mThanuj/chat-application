import { app } from "./app.js";
import connectDB from "./db/index.js";
import { PORT } from "./constants.js";
import http from "http";
import { Server } from "socket.io";
import Message from "./models/message.model.js";

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log(`ERROR: ${error}`);
      throw error;
    });

    const server = http.createServer(app);
    const io = new Server(server, {
      cors: {
        origin: "*",
      },
    });

    let onlineUsers = new Map();

    io.on("connection", (socket) => {
      console.log("Client connected:", socket.id);

      socket.on("login", (userId) => {
        onlineUsers.set(userId, socket.id);
      });

      socket.on("directMessage", async ({ sender, receiver, message }) => {
        const newMessage = await Message.create({
          sender,
          receiver,
          message,
        });

        const receiverSocketId = onlineUsers.get(receiver);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit("directMessage", newMessage);
        }
      });

      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });
    });

    server.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Server error: ${err}`);
  });
