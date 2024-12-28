import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "chat-application",
  brokers: ["localhost:9092"],
});

export default kafka;
