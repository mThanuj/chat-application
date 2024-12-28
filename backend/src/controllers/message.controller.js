import asyncHandler from "../utils/asyncHandler.js";
import Message from "../models/message.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import User from "../models/user.model.js";
import { sendMessageToKafka } from "../utils/kafka/producer.js";
import { getSocketId, io } from "../lib/sockets.js";

export const getUsers = asyncHandler(async (req, res) => {
  const id = req.user._id;
  const users = await User.find({ _id: { $ne: id } }).select(
    "-password -refreshToken",
  );

  res.status(200).json(new ApiResponse(200, users, "Users fetched"));
});

export const getMessages = asyncHandler(async (req, res) => {
  const user = req.user;
  const receiverId = req.params.id;

  const messages = await Message.find({
    $or: [
      {
        sender: user._id,
        receiver: receiverId,
      },
      {
        sender: receiverId,
        receiver: user._id,
      },
    ],
  }).sort({ createdAt: 1 });

  res.status(200).json(new ApiResponse(200, messages, "Messages fetched"));
});

export const sendMessage = async (req, res) => {
  try {
    const { id: receiver } = req.params;
    const sender = req.user._id;
    const { message } = req.body;

    const newMessage = {
      sender,
      receiver,
      message,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await sendMessageToKafka(newMessage);

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
