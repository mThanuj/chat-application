import { config } from "dotenv";
config({});

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;
const CORS_ORIGIN = process.env.CORS_ORIGIN;
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.COUDINARY_API_SECRET;
const JWT_SECRET = process.env.JWT_SECRET;
const ACCESS_EXPIRY = process.env.ACCESS_EXPIRY;
const REFRESH_EXPIRY = process.env.REFRESH_EXPIRY;
const KAFKA_CLIENT_ID = process.env.KAFKA_CLIENT_ID;
const KAFKA_TOPIC = process.env.KAFKA_TOPIC;
const KAFKA_CONSUMER_GROUP = process.env.KAFKA_CONSUMER_GROUP;
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  sameSite: "strict",
};

export {
  PORT,
  MONGODB_URI,
  CORS_ORIGIN,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  JWT_SECRET,
  ACCESS_EXPIRY,
  REFRESH_EXPIRY,
  COOKIE_OPTIONS,
  KAFKA_CLIENT_ID,
  KAFKA_TOPIC,
  KAFKA_CONSUMER_GROUP,
};
