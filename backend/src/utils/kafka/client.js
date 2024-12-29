import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "chat-application",
  brokers: ["kafka:29092"],
});

export default kafka;
