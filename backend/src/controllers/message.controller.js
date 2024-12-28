import asyncHandler from "../utils/asyncHandler.js";
import Message from "../models/message.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import User from "../models/user.model.js";
import { sendMessageToKafka } from "../utils/kafka/producer.js";

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
      { sender: user._id, receiver: receiverId },
      { sender: receiverId, receiver: user._id },
    ],
  });

  res.status(200).json(new ApiResponse(200, messages, "Messages fetched"));
});

export const sendMessage = asyncHandler(async (req, res) => {
  const { message } = req.body;
  const receiverId = req.params.id;
  const user = req.user;

  const messageToBeSent = {
    sender: user._id,
    receiver: receiverId,
    message,
  };

  await sendMessageToKafka(messageToBeSent);
  res.status(201).json(new ApiResponse(201,'',"Message sent successfully"));
});
