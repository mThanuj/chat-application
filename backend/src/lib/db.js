import mongoose from "mongoose";
import { MONGODB_URI } from ".././constants.js";
import chalk from "chalk";

const connectDB = async () => {
  try {
    console.log(chalk.blue("🔌 Connecting to MongoDB..."));
    const connectionInstance = await mongoose.connect(MONGODB_URI);

    console.log(
      chalk.green(
        `✅ MongoDB Connected. DB HOST: ${connectionInstance.connection.host}`,
      ),
    );
  } catch (error) {
    console.log(chalk.red(`❌ MongoDB connection failed: ${error.message}`));
    process.exit(1);
  }
};

export default connectDB;
