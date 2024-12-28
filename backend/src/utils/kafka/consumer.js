import kafka from "./client.js";

async function init(groupId) {
  const consumer = kafka.consumer({ groupId });
  await consumer.connect();

  await consumer.subscribe({
    topics: ["message_topic"],
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
      console.log(
        `${groupId}: [${topic}]: PART:${partition}:`,
        message.value.toString(),
      );
    },
  });
}

export { init };
