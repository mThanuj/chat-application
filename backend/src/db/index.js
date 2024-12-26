import mongoose from "mongoose";
import { MONGODB_URI } from ".././constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(MONGODB_URI);

    console.log(
      `MongoDB Connected. DB HOST: ${connectionInstance.connection.host}`,
    );
  } catch (error) {
    console.log(`MongoDB connection failed: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
