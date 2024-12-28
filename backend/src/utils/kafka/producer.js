import kafka from "./client.js";
import { KAFKA_TOPIC } from "../../constants.js";

const producer = kafka.producer();

const sendMessageToKafka = async (messageToBeSent) => {
  return await producer.send({
    topic: KAFKA_TOPIC,
    messages: [
      {
        value: JSON.stringify(messageToBeSent),
      },
    ],
  });
};

export { producer, sendMessageToKafka };
