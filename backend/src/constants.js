import { config } from "dotenv";
import chalk from "chalk";

config({});

console.log(chalk.cyan("🛠 Loading environment variables..."));
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;
const CORS_ORIGIN = process.env.CORS_ORIGIN;
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
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

const requiredEnvVars = {
  MONGODB_URI,
  CORS_ORIGIN,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  JWT_SECRET,
  ACCESS_EXPIRY,
  REFRESH_EXPIRY,
  KAFKA_CLIENT_ID,
  KAFKA_TOPIC,
  KAFKA_CONSUMER_GROUP,
  COOKIE_OPTIONS,
};

let missingVars = [];
for (const [key, value] of Object.entries(requiredEnvVars)) {
  if (!value) {
    missingVars.push(key);
  }
}

if (missingVars.length > 0) {
  console.log(chalk.red.bold("❌ Missing required environment variables:"));
  console.log(chalk.red(missingVars.join(", ")));
  process.exit(1);
} else {
  console.log(
    chalk.green.bold("✅ All required environment variables are set!\n"),
  );
}

console.log(chalk.blue("Environment Configuration:"));
console.log(chalk.yellow(`- PORT: ${PORT}`));
console.log(chalk.yellow(`- CORS_ORIGIN: ${CORS_ORIGIN}`));
console.log(chalk.yellow(`- ACCESS_EXPIRY: ${ACCESS_EXPIRY}`));
console.log(chalk.yellow(`- REFRESH_EXPIRY: ${REFRESH_EXPIRY}`));
console.log(chalk.green("\nEnvironment variables loaded successfully!\n"));

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
  KAFKA_CLIENT_ID,
  KAFKA_TOPIC,
  KAFKA_CONSUMER_GROUP,
  COOKIE_OPTIONS,
};
