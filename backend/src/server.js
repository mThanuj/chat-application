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

      socket.on("login", (user) => {
        onlineUsers.set(user._id, { socketId: socket.id, ...user });

        socket.emit(
          "onlineUsers",
          Array.from(onlineUsers.values()).filter((u) => u._id !== user._id),
        );
      });

      socket.on("directMessage", async ({ sender, receiver, message }) => {
        const newMessage = await Message.create({
          sender,
          receiver,
          message,
        });

        const receiverSocketId = onlineUsers.get(receiver);
        if (receiverSocketId) {
          io.to(receiverSocketId.socketId).emit("directMessage", newMessage);
        }
      });

      socket.on("disconnect", () => {
        const user = onlineUsers.get(user._id);
        if (user) {
          onlineUsers.delete(user._id);
        }
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
