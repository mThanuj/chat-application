import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { ACCESS_EXPIRY, JWT_SECRET, REFRESH_EXPIRY } from "../constants.js";
import bcryptjs from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: false,
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcryptjs.hash(this.password, 10);
  next();
});

userSchema.methods.checkPassword = async function (password) {
  return await bcryptjs.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    JWT_SECRET,
    { expiresIn: ACCESS_EXPIRY },
  );
};

userSchema.methods.generateRefreshToken = async function () {
  const refreshToken = jwt.sign(
    {
      _id: this._id,
    },
    JWT_SECRET,
    { expiresIn: REFRESH_EXPIRY },
  );

  this.refreshToken = refreshToken;
  // this.refreshToken = await bcryptjs.hash(refreshToken, 10);
  return refreshToken;
};

const User = mongoose.model("User", userSchema);

export default User;
