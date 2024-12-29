import express from "express";
import cookieparser from "cookie-parser";
import cors from "cors";
import { CORS_ORIGIN } from "./constants.js";
import chalk from "chalk";

const app = express();

console.log(chalk.cyan("🛠 Setting up middleware..."));

app.use(express.json());
console.log(chalk.green("✅ JSON body parser enabled"));

app.use(express.urlencoded({ extended: true }));
console.log(chalk.green("✅ URL-encoded parser enabled"));

app.use(cookieparser());
console.log(chalk.green("✅ Cookie parser enabled"));

app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  }),
);
console.log(
  chalk.green(`✅ CORS configured with origin: ${chalk.yellow(CORS_ORIGIN)}`),
);

app.on("error", (error) => {
  console.log(chalk.red.bold("❌ Application Error:"));
  console.error(chalk.red(error));
  throw error;
});

import authrouter from "./routes/auth.routes.js";
import messagerouter from "./routes/message.route.js";

console.log(chalk.cyan("🛠 Setting up routes..."));

app.use("/api/v1/auth", authrouter);
console.log(chalk.green("✅ Auth routes configured at /api/v1/auth"));

app.use("/api/v1/messages", messagerouter);
console.log(chalk.green("✅ Message routes configured at /api/v1/messages"));

console.log(
  chalk.blue.bold(
    "\n🚀 Application setup complete! Ready for server initialization.\n",
  ),
);

export default app;
