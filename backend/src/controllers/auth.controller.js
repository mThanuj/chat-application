import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { COOKIE_OPTIONS } from "../constants.js";

const generateTokens = async (user) => {
  try {
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    await user.save();
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, error.message);
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
  user.password = null;
  user.refreshToken = null;
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

  res
    .status(200)
    .json(new ApiResponse(200, "", "User logged out successfully"));
});

export const refreshAccessToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    throw new ApiError(401, "No refresh token found");
  }

  const user = await User.findOne({ refreshToken });
  if (!user) {
    throw new ApiError(401, "Invalid refresh token");
  }

  const { accessToken, newRefreshToken } = await generateTokens(user);

  res
    .status(200)
    .cookie("accessToken", accessToken)
    .cookie("refreshToken", newRefreshToken)
    .json(
      new ApiResponse(200, { accessToken, refreshToken }, "token refreshed"),
    );
});

export const getCurrentUser = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, req.user, "Fetched User"));
});
