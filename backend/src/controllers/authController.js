import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/userModel.js";
import ApiResponse from "../utils/ApiResponse.js";

export const signup = asyncHandler(async (req, res) => {
    const {username,password} = req.body;
    const user = new User({username,password});
    await user.save();
    const response = new ApiResponse(201,user,"User created");
    res.status(response.statusCode).json(response);
});

export const login = asyncHandler(async (req, res) => {});

export const logout = asyncHandler(async (req, res) => {});
