import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { JWT_SECRET } from "../constants.js";
import User from "../models/user.model.js";
import { getSocketId } from "../lib/sockets.js";

export const verify = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken || req.header("Authorization")?.split(" ")[1];

    if (!token) {
      throw new ApiError(401, "Unauthorized");
    }

    const { _id: userId } = await jwt.verify(token, JWT_SECRET);

    const user = await User.findById(userId).select("-password -refreshToken");
    if (!user) {
      throw new ApiError(401, "Access Token Expired");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error.message || "Invalid token");
  }
});
