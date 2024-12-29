import { getSocketId, io } from "../../lib/sockets.js";
import kafka from "./client.js";
import { MongoClient, ObjectId } from "mongodb";
import chalk from "chalk";

const mongoConnect = async () => {
  const mongoClient = new MongoClient(
    "mongodb+srv://mThanuj:6qlLNJtrgZhhyXqN@cluster0.0f4no.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  );
  await mongoClient.connect();
  const db = mongoClient.db("test");
  const collection = db.collection("messages");
  return collection;
};

async function init(groupId) {
  const consumer = kafka.consumer({ groupId });
  await consumer.connect();

  let buffer = [];
  const batchSize = 3;
  const flushBuffer = async () => {
    if (buffer.length > 0) {
      const messages = buffer.splice(0, buffer.length);
      try {
        const collection = await mongoConnect();
        await collection.insertMany(messages);
        console.log(chalk.green("✅ Messages saved to MongoDB"));
      } catch (error) {
        console.error(
          chalk.red("❌ Error saving messages to MongoDB:", error.message),
        );
      }
    }
  };

  setInterval(flushBuffer, 2000);

  await consumer.subscribe({
    topics: ["message_topic"],
    fromBeginning: true,
  });

  await consumer.run({
    autoCommit: true,
    eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
      const msg = JSON.parse(message.value.toString("utf-8"));
      const messageToBeSent = {
        sender: new ObjectId(msg.sender),
        receiver: new ObjectId(msg.receiver),
        message: msg.message,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const receiverSocketId = getSocketId(msg.receiver);
      if (receiverSocketId) {
        console.log(
          chalk.cyan(`📩 Sending message to socket ${receiverSocketId}`),
        );
        io.to(receiverSocketId).emit("newMessage", messageToBeSent);
      } else {
        console.log(
          chalk.yellow(`⚠️ No socket found for receiver ${msg.receiver}`),
        );
      }

      buffer.push(messageToBeSent);
      if (buffer.length > batchSize) {
        console.log(chalk.cyan(`⏳ Buffer size exceeded, flushing buffer`));
        await flushBuffer();
      }
    },
  });
}

export { init };
