import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/userModel.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { COOKIE_OPTIONS } from "../constants.js";

const generateTokens = async (user) => {
  try {
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500);
  }
};

export const signup = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const existing = await User.findOne({ username });
  if (existing) {
    throw new ApiError(409, "Username already exists");
  }

  const user = new User({ username, password });
  const { accessToken, refreshToken } = await generateTokens(user);

  await user.save();

  const response = new ApiResponse(201, user, "User created");

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
    throw new ApiError(401, "User not registered");
  }

  if (!(await user.checkPassword(password))) {
    throw new ApiError(401, "Invalid credentials");
  }

  const { accessToken, refreshToken } = await generateTokens(user);

  return res
    .cookie("accessToken", accessToken, COOKIE_OPTIONS)
    .cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
    .status(200)
    .json(new ApiResponse(200, user, "Login successful"));
});

export const logout = asyncHandler(async (req, res) => {});

export const refreshAccessToken = asyncHandler(async (req, res) => {});
