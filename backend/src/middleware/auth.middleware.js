import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { JWT_SECRET } from "../constants.js";
import User from "../models/user.model.js";
import chalk from "chalk";

export const verify = asyncHandler(async (req, res, next) => {
  try {
    console.log(chalk.blue("🔒 Checking Authorization..."));

    const token =
      req.cookies?.accessToken || req.header("Authorization")?.split(" ")[1];

    if (!token) {
      console.log(chalk.red("❌ No token provided"));
      throw new ApiError(401, "Unauthorized");
    }

    console.log(chalk.blue("🔑 Verifying token..."));
    const { _id: userId } = await jwt.verify(token, JWT_SECRET);

    const user = await User.findById(userId).select("-password -refreshToken");
    if (!user) {
      console.log(chalk.red("❌ User not found or Access Token Expired"));
      throw new ApiError(401, "Access Token Expired");
    }

    console.log(chalk.green("✅ Token verified, user found"));
    req.user = user;
    next();
  } catch (error) {
    console.log(
      chalk.red("❌ Error during token verification:", error.message),
    );
    throw new ApiError(401, error.message || "Invalid token");
  }
});
