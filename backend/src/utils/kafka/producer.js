import kafka from "./client.js";
import { KAFKA_TOPIC } from "../../constants.js";
import chalk from "chalk";

const producer = kafka.producer();

const sendMessageToKafka = async (messageToBeSent) => {
  try {
    const result = await producer.send({
      topic: KAFKA_TOPIC,
      messages: [
        {
          key: "message",
          value: JSON.stringify(messageToBeSent),
        },
      ],
    });

    return result;
  } catch (error) {
    console.error(
      chalk.red("❌ Failed to send message to Kafka:", error.message),
    );
    throw error;
  }
};

export { producer, sendMessageToKafka };
