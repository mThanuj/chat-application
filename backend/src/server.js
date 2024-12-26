import { app } from "./app.js";
import { PORT } from "./constants.js";
import { connectDB } from "./db/index.js";

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`MongoDB Connection error: ${err}`);
  });
