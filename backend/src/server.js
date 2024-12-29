import connectDB from "./lib/db.js";
import { PORT } from "./constants.js";
import { server } from "./lib/sockets.js";
import { producer } from "./utils/kafka/producer.js";
import { init as initConsumer } from "./utils/kafka/consumer.js";
import { init as initAdmin } from "./utils/kafka/admin.js";

server.listen(PORT, async () => {
  console.log(`Server started on port ${PORT}\n\n\n\n\n\n`);
  connectDB();
  await initAdmin();
  console.log("Initialized Admin\n\n\n\n\n\n");
  await producer.connect();
  console.log("Connected producer\n\n\n\n\n\n");
  await initConsumer("chat-application");
  console.log("Connected consumer\n\n\n\n\n\n");
});

server.on("error", (error) => {
  console.log(error);
});

process.on("SIGTERM", () => {
  server.close(() => {
    console.log("Process terminated");
  });
});
