import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { COOKIE_OPTIONS } from "../constants.js";
import chalk from "chalk";

const generateTokens = async (user) => {
  try {
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    await user.save();

    return { accessToken, refreshToken };
  } catch (error) {
    console.log(chalk.red(`❌ Error generating tokens: ${error.message}`));
    throw new ApiError(500, error.message);
  }
};

export const signup = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const existing = await User.findOne({ username });
  if (existing) {
    console.log(chalk.yellow(`⚠️ Username ${username} already exists`));
    throw new ApiError(409, "Username already exists");
  }

  const user = new User({ username, password });
  const { accessToken, refreshToken } = await generateTokens(user);
  const response = new ApiResponse(201, user, "User created");

  console.log(chalk.green(`✅ User ${username} created successfully`));

  res
    .cookie("accessToken", accessToken, COOKIE_OPTIONS)
    .cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
    .status(response.statusCode)
    .json(response);
});

export const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    console.log(chalk.yellow(`⚠️ User ${username} not registered`));
    throw new ApiError(401, "User not registered");
  }
  if (!(await user.checkPassword(password))) {
    console.log(chalk.yellow(`⚠️ Invalid credentials for ${username}`));
    throw new ApiError(401, "Invalid credentials");
  }

  const { accessToken, refreshToken } = await generateTokens(user);
  user.password = null;
  user.refreshToken = null;
  console.log(chalk.green(`✅ User ${username} logged in successfully`));

  return res
    .cookie("accessToken", accessToken, COOKIE_OPTIONS)
    .cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
    .status(200)
    .json(
      new ApiResponse(200, { ...user._doc, accessToken }, "Login successful"),
    );
});

export const logout = asyncHandler(async (req, res) => {
  for (let cookie in req.cookies) {
    res.clearCookie(cookie);
  }
  console.log(chalk.green("✅ User logged out successfully"));

  res
    .status(200)
    .json(new ApiResponse(200, "", "User logged out successfully"));
});

export const refreshAccessToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    console.log(chalk.yellow("⚠️ No refresh token found"));
    throw new ApiError(401, "No refresh token found");
  }

  const user = await User.findOne({ refreshToken });
  if (!user) {
    console.log(chalk.yellow(`⚠️ Invalid refresh token`));
    throw new ApiError(401, "Invalid refresh token");
  }

  const { accessToken, newRefreshToken } = await generateTokens(user);
  console.log(chalk.green(`✅ Token refreshed for user ${user.username}`));

  res
    .status(200)
    .cookie("accessToken", accessToken)
    .cookie("refreshToken", newRefreshToken)
    .json(
      new ApiResponse(200, { accessToken, refreshToken }, "token refreshed"),
    );
});

export const getCurrentUser = asyncHandler(async (req, res) => {
  console.log(chalk.green(`✅ Fetched user data for ${req.user.username}`));

  return res.status(200).json(new ApiResponse(200, req.user, "Fetched User"));
});
