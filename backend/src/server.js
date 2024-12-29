import connectDB from "./lib/db.js";
import { PORT } from "./constants.js";
import { server } from "./lib/sockets.js";
import { producer } from "./utils/kafka/producer.js";
import { init as initConsumer } from "./utils/kafka/consumer.js";
import { init as initAdmin } from "./utils/kafka/admin.js";
import chalk from "chalk";

server.listen(PORT, async () => {
  console.log(chalk.green.bold(`🚀 Server started on port ${PORT}\n`));

  console.log(chalk.cyan("⏳ Connecting to the database..."));
  connectDB();
  console.log(chalk.green("✅ Database connected!\n"));

  console.log(chalk.cyan("⏳ Initializing Kafka Admin..."));
  await initAdmin();
  console.log(chalk.green("✅ Kafka Admin initialized!\n"));

  console.log(chalk.cyan("⏳ Connecting Kafka producer..."));
  await producer.connect();
  console.log(chalk.green("✅ Kafka producer connected!\n"));

  console.log(chalk.cyan("⏳ Initializing Kafka consumer..."));
  await initConsumer("chat-application");
  console.log(chalk.green("✅ Kafka consumer initialized!\n"));

  console.log(chalk.yellow.bold("✨ All systems operational!\n"));
});

server.on("error", (error) => {
  console.log(chalk.red.bold("❌ Server Error:"));
  console.log(error);
});

process.on("SIGTERM", () => {
  console.log(chalk.yellow("⚠️ Process termination initiated..."));
  server.close(() => {
    console.log(chalk.blue("🔵 Server closed successfully. Goodbye!"));
  });
});
