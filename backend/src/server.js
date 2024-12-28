import connectDB from "./lib/db.js";
import { PORT } from "./constants.js";
import { server } from "./lib/sockets.js";
import { producer } from "./utils/kafka/producer.js";

server.listen(PORT, async () => {
  console.log(`Server started on port ${PORT}`);
  connectDB();
  await producer.connect();
  console.log("Connected producer");
});

server.on("error", (error) => {
  console.log(error);
});

process.on("SIGTERM", () => {
  server.close(() => {
    console.log("Process terminated");
  });
});
