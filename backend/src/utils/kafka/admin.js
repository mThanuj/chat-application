import kafka from "./client.js";

async function init() {
  const admin = kafka.admin();

  admin.connect();

  await admin.createTopics({
    topics: [
      {
        topic: "message_topic",
        numPartitions: 3,
        replicationFactor: 1,
      },
    ],
  });

  admin.disconnect();
}

init();
