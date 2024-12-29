import kafka from "./client.js";
import chalk from "chalk";

async function init() {
  const admin = kafka.admin();

  try {
    console.log(chalk.blue("📡 Connecting to Kafka admin..."));
    await admin.connect();
    console.log(chalk.green("✅ Connected to Kafka admin"));

    console.log(chalk.blue("🔧 Creating topics..."));
    await admin.createTopics({
      topics: [
        {
          topic: "message_topic",
          numPartitions: 3,
          replicationFactor: 1,
        },
      ],
    });
    console.log(chalk.green("✅ Topic 'message_topic' created successfully"));
  } catch (error) {
    console.error(chalk.red("❌ Error:", error.message));
  } finally {
    console.log(chalk.blue("🔌 Disconnecting from Kafka admin..."));
    await admin.disconnect();
    console.log(chalk.green("✅ Disconnected from Kafka admin"));
  }
}

export { init };
