import connectDB from "./lib/db.js";
import { PORT } from "./constants.js";
import { server } from "./lib/sockets.js";

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  connectDB();
});

server.on("error", (error) => {
  console.log(error);
});

process.on("SIGTERM", () => {
  server.close(() => {
    console.log("Process terminated");
  });
});
